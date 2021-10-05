import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { SegmentedUi } from 'aqueduct-components';
import isEqual from 'lodash/isEqual';
import isIexplorer from 'is-iexplorer';
import { toastr } from 'react-redux-toastr';

// components
import BaselineTab from 'components/pages/map/baseline-tab';
import FutureTab from 'components/pages/map/future-tab';
import PrioritizeBasinsTab from 'components/pages/map/basins-tab';
import CustomAccordion from 'components/ui/custom-accordion';
import Analyzer from 'components/analyzer';
import BasinAnalyzer from 'components/basin-analyzer';
import BasinAnalyzerHeader from 'components/basin-analyzer/header';
import AnalyzerHeader from 'components/analyzer/header';

// utils
import { logEvent } from 'utils/analytics';

// constants
import { SCOPE_OPTIONS } from 'constants/app';
import { TIMEFRAME_OPTIONS } from 'constants/filters';
import { INDICATORS, DEFAULT_FUTURE_INDICATOR } from 'constants/indicators';


class TabbedFilters extends PureComponent {
  componentWillMount() {
    const {
      getLayers,
      updateUrl
    } = this.props;

    getLayers();
    updateUrl();
  }

  componentWillReceiveProps(nextProps) {
    const {
      filters,
      ponderation,
      scope,
      advanced,
      mapState,
      geostore,
      updateUrl
    } = this.props;
    const {
      filters: nextFilters,
      ponderation: nextPonderation,
      scope: nextScope,
      advanced: nextAdvanced,
      mapState: nextMapState,
      geostore: nextGeostore
    } = nextProps;

    const filtersChanged = !isEqual(filters, nextFilters);
    const mapStateChanged = !isEqual(mapState, nextMapState);
    const ponderationChanged = ponderation.scheme !== nextPonderation.scheme;
    const scopeChanged = scope !== nextScope;
    const advancedModeChanged = advanced !== nextAdvanced;
    const geostoreChanged = geostore !== nextGeostore;

    // updates URL if any of these params change
    if (filtersChanged || ponderationChanged
      || scopeChanged || mapStateChanged
      || advancedModeChanged || geostoreChanged) updateUrl();

    const InternetWarningDisplay = localStorage.getItem('AQ_INTERNET_WARNING_DISPLAY');

    if (isIexplorer && !InternetWarningDisplay) {
      toastr.warning('Internet Explorer support is not supported in this site. Many features might not work as expected.', { timeOut: 5000 });
      localStorage.setItem('AQ_INTERNET_WARNING_DISPLAY', true);
    }
  }

  onChangeTab({ value }) {
    const {
      setScope,
      setFilters,
      tabFilters,
      filters: { projection, timeScale }
    } = this.props;
    const isFuture = value === 'future';
    const defaultIndicator = timeScale === 'annual' ? INDICATORS[0].id : 'bws_cat';
    let indicator = null;
    switch (value) {
      case 'future':
        indicator = DEFAULT_FUTURE_INDICATOR[projection];
        break;
      case 'basins':
        indicator = (tabFilters.basins && tabFilters.basins.indicator) || '';
        break;
      default:
        indicator = defaultIndicator;
    }

    setScope(value);
    setFilters({
      year: isFuture ? TIMEFRAME_OPTIONS[0].value : 'baseline',
      indicator
    });

    logEvent('Analysis', 'Change Tab', value);
  }

  render() {
    const {
      scope,
      analyzerOpen
    } = this.props;

    return (
      <Fragment>
        <SegmentedUi
          className="-tabs"
          items={SCOPE_OPTIONS}
          selected={scope}
          onChange={(tab) => { this.onChangeTab(tab); }}
        />
        <div className="l-mapview-content">
          {scope === 'baseline' && (<BaselineTab />)}
          {scope === 'future' && (<FutureTab />)}
          {scope === 'basins' && (<PrioritizeBasinsTab />)}
        </div>
        <CustomAccordion
          className="l-analyzer-accordion"
          open={analyzerOpen}
          header={scope === 'basins' ? <BasinAnalyzerHeader /> : <AnalyzerHeader />}
        >
          {scope === 'basins' ? <BasinAnalyzer /> : <Analyzer />}
        </CustomAccordion>
      </Fragment>
    );
  }
}

TabbedFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  tabFilters: PropTypes.object.isRequired,
  ponderation: PropTypes.object.isRequired,
  scope: PropTypes.string.isRequired,
  advanced: PropTypes.bool.isRequired,
  analyzerOpen: PropTypes.bool.isRequired,
  mapState: PropTypes.object.isRequired,
  geostore: PropTypes.any,
  setScope: PropTypes.func.isRequired,
  updateUrl: PropTypes.func.isRequired,
  getLayers: PropTypes.func.isRequired,
  setFilters: PropTypes.func.isRequired
};

TabbedFilters.defaultProps = { geostore: null };

export default TabbedFilters;
