import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import objectPath from 'object-path'
import { PluginLeaflet } from 'layer-manager/dist/layer-manager';
import { LayerManager, Layer } from 'layer-manager/dist/components';
import {
  Map as WRIMap,
  MapPopup,
  Legend as VizzLegend,
  LegendItemToolbar,
  LegendListItem,
  LegendItemButtonInfo,
  LegendItemButtonOpacity
} from 'vizzuality-components/dist/bundle';
import {
  MapControls,
  ShareButton,
  ZoomControl,
  Legend,
  Icon
} from 'aqueduct-components';
import isEqual from 'lodash/isEqual';

// utils
import { logEvent } from 'utils/analytics';

// components
import BasemapControl from './basemap-control';
import LayerPopup from './popups/layer';
import AnalysisPopup from './popups/analysis';

// constants
import { LABEL_LAYER_CONFIG } from './constants';

class DesktopMap extends PureComponent {
  componentWillReceiveProps(nextProps) {
    const {
      layers,
      indicator,
      setLoading,
      analysisSelectedData
    } = this.props;
    const {
      layers: nextLayers,
      indicator: nextIndicator,
      analysisSelectedData: nextAnalysisSelectedData,
      analysisData,
      sidebarWidth
    } = nextProps;
    const layersChanged = !isEqual(layers, nextLayers);
    const indicatorChanged = !isEqual(indicator, nextIndicator);
    const selectedChanged = !isEqual(analysisSelectedData, nextAnalysisSelectedData);

    if ((layersChanged || indicatorChanged) && nextIndicator) {
      setLoading(true);
      if (this.popup) this.popup._close();
    }

    if (selectedChanged) {
      const currentPoint = analysisData[nextAnalysisSelectedData[0]];

      if (currentPoint && this.map) {
        const { latitude, longitude } = currentPoint;
        this.map.fitBounds(
          L.latLng(latitude, longitude).toBounds(500),
          {
            paddingTopLeft: [sidebarWidth, 0],
            maxZoom: 4
          }
        );
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { analysisSelectedData, analysisData, points, setPopupData, setPopupLocation } = this.props;
    const { analysisSelectedData: prevAnalysisSelectedData } = prevProps;
    const analysisSelectedDataPopupChanged = analysisSelectedData !== prevAnalysisSelectedData;

    if (analysisSelectedDataPopupChanged) {
      setPopupData({ ...analysisData[analysisSelectedData] });
      if (analysisData[analysisSelectedData]) {
        const { latitude: lat, longitude: lng } = analysisData[analysisSelectedData];
        setPopupLocation({ lat, lng });
      } else if (points[analysisSelectedData]) {
        const nextPopupPosition = points[analysisSelectedData];
        setPopupLocation(nextPopupPosition);
      } else {
        setPopupLocation(null);
      }
    }
  }

  handlePoint(event) {
    const { latlng, layer } = event;
    const {
      analysisSelectedData,
      onAddPoint,
      onAddUnknownLocation,
      points,
      analysisData,
      setSelectedData
    } = this.props;

    if (layer) {
      const { editing: { _marker: { _latlng } } } = layer;
      const { lat, lng } = _latlng;
      const indexFromData = analysisData.findIndex(({ longitude, latitude }) => {
        return isEqual({ lat: latitude, lng: longitude }, ({ lat, lng }));
      });

      if (indexFromData === -1) {
        const indexFromPoints = points.findIndex(_point => isEqual(_point, ({ lat, lng })));
        if (indexFromPoints !== -1) setSelectedData([indexFromPoints]);
      }


      if (indexFromData !== -1 && analysisSelectedData.includes(indexFromData)) {
        setSelectedData([]);
      } else if (indexFromData !== -1) {
        setSelectedData([indexFromData]);
      }

    } else {
      onAddPoint({ lat: latlng.lat, lng: latlng.lng });
      onAddUnknownLocation();
    }
  }

  handleRemovePoint() {
    const {
      analysisData,
      analysisSelectedData,
      setSelectedData,
      onRemovePoint,
      onApplyAnalysis,
      points
    } = this.props;
    let pointToRemove = null;

    const locationToRemove = analysisData[analysisSelectedData];

    if (!locationToRemove) pointToRemove = points[analysisSelectedData[0]];

    if (locationToRemove) {
      const { longitude: lng, latitude: lat } = locationToRemove;
      onRemovePoint({ lat, lng });
    }

    if (pointToRemove) {
      const { lng, lat } = pointToRemove;
      onRemovePoint({
        lat,
        lng
      });
    }

    if (locationToRemove || pointToRemove) {
      setSelectedData([]);
      if (locationToRemove) onApplyAnalysis();
    }
  }

  handleAnalysis() {
    const {
      onApplyAnalysis,
      setSelectedData
    } = this.props;

    onApplyAnalysis();
    setSelectedData([]);
  }

  handleLayerOpacity(layer, opacity) {
    const { setLayerParametrization } = this.props;

    setLayerParametrization({ opacity });
  }

  handleClickMap(e) {
    const { popup: { data: currentData }, setPopupLocation, setPopupData } = this.props;
    const { latlng, data } = e;
    setPopupLocation(latlng);
    setPopupData({ ...currentData, ...data && data });
  }

  updateMap(event, map) {
    const { setMapParams } = this.props;

    setMapParams({
      zoom: map.getZoom(),
      center: map.getCenter()
    });

    logEvent('Map', 'map-movement', window.location.hash);
  }

  handleBoundaries() {
    const { boundaries, setBoundaries } = this.props;

    setBoundaries(!boundaries);
  }

  render() {
    const {
      map,
      basemap,
      layers,
      loading,
      indicator,
      mapMode,
      setMapParams,
      toggleSourceModal,
      toggleShareModal,
      layerGroup,
      popup,
      boundaries,
      analysisPopupColumns,
      setLoading,
      onUpdateLocation
    } = this.props;
    const { zoom, minZoom, maxZoom } = map;
    const mapEvents = { moveend: (e, _map) => { this.updateMap(e, _map); } };
    const mapClass = classnames('c-map', ({ '-analysis ': mapMode === 'analysis' }));

    return (
      <div className="l-map">
        <WRIMap
          mapOptions={map}
          events={mapEvents}
          basemap={basemap}
          customClass={mapClass}
          onReady={(_map) => { this.map = _map; }}
          {...boundaries && { label: LABEL_LAYER_CONFIG }}
        >
          {_map =>
            <Fragment>
              <LayerManager
                map={_map}
                plugin={PluginLeaflet}
                onReady={() => { if (loading) setLoading(false); }}
              >
                {layers.map((layer, i) => {
                  const l = { ...layer }
                  // if (l.slug === 'Annual-indicator-layer-with-threshold') {
                  //   const p = 'layerConfig.body.layers.0.options.sql'
                  //   const p3 = 'layerConfig.body.layers.0.options.cartocss'
                  //   // const p2 = 'layerConfig.params_config'
                  //   if (objectPath.get(l, p)) objectPath.set(l, p, `SELECT s.aq30_id as cartodb_id, coalesce(NULLIF({{label}},''), 'No Data') as label, r.the_geom, r.the_geom_webmercator, (CASE WHEN {{label}} = 'Insignificant Trend' THEN -1 ELSE coalesce({{indicator}}, -9999)END) as water_risk FROM water_risk_indicators_annual s LEFT JOIN y2018m12d06_rh_master_shape_v01 r on s.aq30_id=r.aq30_id WHERE s.pfaf_id != -9999 and s.gid_1 != '-9999' and r.aqid != -9999 and {{value}} < {{threshold}} ORDER BY s.aq30_id`)
                  //   if (objectPath.get(l, p3)) objectPath.set(l, p3, "#water_risk_indicators_annual [water_risk=4] { polygon-fill:#990000; line-color:#990000 } #water_risk_indicators_annual [water_risk=3] { polygon-fill:  #FF1900; line-color:  #FF1900 } #water_risk_indicators_annual [water_risk=2] { polygon-fill: #FF9900; line-color: #FF9900 } #water_risk_indicators_annual [water_risk=1] { polygon-fill: #FFE600; line-color:  #FFE600 } #water_risk_indicators_annual [water_risk=0] { polygon-fill: #FFFF99; line-color:  #FFFF99 } #water_risk_indicators_annual [water_risk=-1] { polygon-fill: #808080; line-color:  #808080 } #water_risk_indicators_annual [water_risk<-1] { polygon-fill: #4E4E4E; line-color:  #4E4E4E }")
                  //   // if (objectPath.get(l, p2)) objectPath.set(l, p2, [
                  //   //   {
                  //   //     key: 'threshold',
                  //   //     required: false,
                  //   //     default: 0,
                  //   //   },
                  //   //   {
                  //   //     key: 'value',
                  //   //     required: true,
                  //   //     default: 0,
                  //   //   },
                  //   // ])
                  //   // l.params = {
                  //   //   ...l.params,
                  //   //   threshold: (() => {
                  //   //     let t = objectPath.get(this.props, 'filters.threshold')
                  //   //     t = parseInt(t)
                  //   //     if (isNaN(t)) return -1
                  //   //     if (t >= 80) return ((t - 80) / 20) + 4
                  //   //     if (t >= 40) return ((t - 40) / 40) + 3
                  //   //     if (t >= 20) return ((t - 20) / 20) + 2
                  //   //     if (t >= 10) return ((t - 10) / 10) + 1
                  //   //     if (t >= 0) return (t / 10)
                  //   //     return -1
                  //   //   })(),
                  //   //   indicator: l.params.indicator.replace(/(.*?)_cat/, '$1_score')
                  //   // }
                  // }
                  console.log({l, filters: this.props.filters})
                  return (
                    <Layer
                      {...l}
                      key={l.id}
                      opacity={l.opacity}
                      zIndex={1000 - i}
                      {...l.params && { params: l.params }}
                      {...l.sqlParams && { sqlParams: l.sqlParams }}
                      {...l.decodeParams && { decodeParams: l.decodeParams }}
                      {...l.interactionConfig && {
                        interactivity: ['carto', 'cartodb'].includes(l.provider)
                          ? (l.interactionConfig.output || []).map(o => o.column)
                          : true
                      }}
                      events={{
                        ...mapMode === 'analysis' && { click: (e) => { this.handlePoint(e, _map); } },
                        ...mapMode === 'view' && { click: (e) => { this.handleClickMap(e); } }
                      }}
                    />
                  );
                }).filter(e => e)}
              </LayerManager>

              <MapControls>
                <ZoomControl
                  zoom={zoom}
                  minZoom={minZoom}
                  maxZoom={maxZoom}
                  onZoomChange={(_zoom) => { setMapParams({ zoom: _zoom }); }}
                />
                <BasemapControl />
                <button
                  type="submit"
                  onClick={() => { this.handleBoundaries(); }}
                >
                  <Icon
                    name="icon-boundaries"
                    className="title-icon"
                  />
                </button>
                <ShareButton onClick={toggleShareModal} />
              </MapControls>

              <MapPopup
                map={_map}
                latlng={popup.latlng}
                data={{
                  layers,
                  data: popup.data,
                  columns: analysisPopupColumns
                }}
                onReady={(_popup) => { this.popup = _popup; }}
              >
                {mapMode === 'analysis' ?
                  <AnalysisPopup
                    onRemovePoint={() => { this.handleRemovePoint(); }}
                    onFetchAnalysis={() => { this.handleAnalysis(); }}
                    onUpdateLocation={(location) => { onUpdateLocation(location); }}
                  /> :
                  <LayerPopup />
                }
              </MapPopup>

              { layers.length && indicator &&
                <div className="l-map-legend">
                  <VizzLegend sortable={false}>
                    {layerGroup.map((_layerGroup, i) => (
                      <LegendListItem
                        index={i}
                        key={_layerGroup.dataset}
                        onChangeInfo={() => { toggleSourceModal(indicator); }}
                        onChangeOpacity={(_layer, _opacity) => { this.handleLayerOpacity(_layer, _opacity); }}
                        layerGroup={_layerGroup}
                        toolbar={(
                          <LegendItemToolbar>
                            <LegendItemButtonOpacity
                              trackStyle={{ backgroundColor: '#2E57B8' }}
                              handleStyle={{ backgroundColor: '#2E57B8' }}
                            />
                            <LegendItemButtonInfo />
                          </LegendItemToolbar>
                        )}
                      >
                        <Legend filters={{}} />
                      </LegendListItem>
                    ))}
                  </VizzLegend>
                </div>
              }
            </Fragment>
          }
        </WRIMap>
      </div>
    );
  }
}

DesktopMap.propTypes = {
  map: PropTypes.object.isRequired,
  basemap: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  layers: PropTypes.array.isRequired,
  points: PropTypes.array.isRequired,
  analysisData: PropTypes.array.isRequired,
  analysisSelectedData: PropTypes.array.isRequired,
  layerGroup: PropTypes.array.isRequired,
  indicator: PropTypes.string.isRequired,
  boundaries: PropTypes.bool.isRequired,
  popup: PropTypes.object.isRequired,
  analysisPopupColumns: PropTypes.array.isRequired,
  mapMode: PropTypes.string.isRequired,
  sidebarWidth: PropTypes.number.isRequired,
  setMapParams: PropTypes.func.isRequired,
  setLayerParametrization: PropTypes.func.isRequired,
  setPopupLocation: PropTypes.func.isRequired,
  setPopupData: PropTypes.func.isRequired,
  onAddPoint: PropTypes.func.isRequired,
  onRemovePoint: PropTypes.func.isRequired,
  onFetchAnalysis: PropTypes.func.isRequired,
  toggleSourceModal: PropTypes.func.isRequired,
  toggleShareModal: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  setSelectedData: PropTypes.func.isRequired,
  onApplyAnalysis: PropTypes.func.isRequired,
  onAddUnknownLocation: PropTypes.func.isRequired,
  setBoundaries: PropTypes.func.isRequired,
  onUpdateLocation: PropTypes.func.isRequired
};

export default DesktopMap;
