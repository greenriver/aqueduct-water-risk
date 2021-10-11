import React, { Component, Fragment } from 'react';
import { func, object, string } from 'prop-types';

import { CustomSelect, InfoModal } from 'aqueduct-components';

// constants
import { BASIN_MODAL_PROPS, WATER_RISK_PROPS } from 'constants/filters';
import { BASIN_INDICATORS, INDICATORS } from 'components/map/constants';

// utils
import { debounce, isNil } from 'utils/general';

import ContentModal from '../../ui/modal/content';
import TooltipIcon from '../../ui/TooltipIcon';
import ThresholdSlider from './ThresholdSlider';

class Filters extends Component {
  constructor(props) {
    super(props);
    const { indicator, threshold } = this.props.tabFilters.basins || {};
    const activeIndicator = indicator || this.props.filters.indicator;
    const activeThreshold = threshold ||
      this.props.filters.threshold ||
      (BASIN_INDICATORS[activeIndicator] && BASIN_INDICATORS[activeIndicator].defaultValue);
    this.state = {
      indicator: activeIndicator,
      threshold: +activeThreshold
    };
  }

  componentDidMount() {
    const newFilters = {
      threshold: this.props.tabFilters.basins.threshold || (BASIN_INDICATORS[this.props.tabFilters.basins] ? BASIN_INDICATORS[this.props.tabFilters.basins].defaultValue : null),
      indicator: this.props.tabFilters.basins.indicator || null
    };
    if (!Object.keys(BASIN_INDICATORS).includes(this.props.filters.indicator)) {
      this.props.setFilters({
        ...this.props.filters,
        ...newFilters
      });
    }
    if (!Object.keys(BASIN_INDICATORS).includes(this.props.tabFilters.indicator)) {
      this.props.setTabFilters({
        ...this.props.tabFilters,
        basins: {
          ...this.props.tabFilters.basins,
          ...newFilters
        }
      });
    }
  }

  shouldComponentUpdate(nextProps) {
    return this.props.tabFilters.basins.indicator !== nextProps.tabFilters.basins.indicator;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.tabFilters.indicator !== this.props.tabFilters.indicator) this.handleApply();
  }

  getFilter(filterProp) {
    const { tabFilters, filters } = this.props;
    return !isNil(tabFilters.basins[filterProp]) ? tabFilters.basins[filterProp] : filters[filterProp];
  }

  handleTooltipClick() {
    const { toggleModal } = this.props;
    return toggleModal(true, {
      children: ContentModal,
      childrenProps: BASIN_MODAL_PROPS
    });
  }

  handleInfoClick() {
    const { toggleAside } = this.props;
    return toggleAside(true, {
      children: InfoModal,
      childrenProps: WATER_RISK_PROPS
    });
  }

  handleIndicatorSelect(indicator) {
    const newFilters = {
      indicator,
      threshold: BASIN_INDICATORS[indicator].defaultValue
    };
    this.props.setTabFilters({
      basins: newFilters
    });
    setImmediate(() => this.handleApply()); // Wait until next event loop so that tabFilters update is done and handleApply will work right
  }

  handleSliderChange(threshold = null) {
    this.props.setTabFilters({
      basins: { threshold, indicator: this.getFilter('indicator') }
    });
    this.setState({ threshold });
  }

  handleApply() {
    const {
      setFilters,
      setTabFilters,
      toggleMobileFilters
    } = this.props;
    const indicator = this.getFilter('indicator');
    const newFilters = {
      indicator: this.getFilter('indicator'),
      threshold: this.getFilter('threshold')
    };
    setFilters(newFilters);
    setTabFilters({ basins: { ...newFilters, indicator: (BASIN_INDICATORS[indicator] && BASIN_INDICATORS[indicator].rawField) || indicator } });
    toggleMobileFilters(false);
  }

  render() {
    const {
      name = ''
    } = this.props;
    let indicator = this.getFilter('indicator');
    const indicatorIds = Object.keys(BASIN_INDICATORS);
    if (!indicatorIds.includes(indicator)) {
      indicator = null;
    }
    const debouncedApply = debounce(() => this.handleApply());
    const threshold = this.getFilter('threshold');

    const indicators = indicatorIds.map(key => ({ label: BASIN_INDICATORS[key].name, value: key }));

    return (
      <div>
        <div className="c-filters-header">
          <h1 className="title">{name}</h1>
        </div>
        <div className="c-filters">
          <div className="filters-section">
            <div className="filters-section">
              <div className="row expanded collapse">
                <div className="medium-8 column">
                  <div className="c-filters-item" style={{ marginBottom: 25 }}>
                    <div className="filter-item-header" style={{ marginBottom: 16 }}>
                      <span className="title">Select Water Risk Indicator</span> <TooltipIcon handleClick={() => this.handleInfoClick()} />
                    </div>
                    <CustomSelect
                      className="-m-0"
                      options={indicators}
                      value={indicator}
                      placeholder={'Select Indicator'}
                      onValueChange={({ value }) => { this.handleIndicatorSelect(value); }}
                    />
                  </div>
                </div>
              </div>
            </div>
            { indicator &&
              <Fragment>
                <div className="filters-section">
                  <div className="c-filters-item">
                    <div className="filter-item-header" style={{ marginBottom: 60 }}>
                      <div className="title">
                        <div>
                          <p><strong>{INDICATORS[indicator]} Desired Condition </strong> <TooltipIcon handleClick={() => this.handleTooltipClick()} /></p>
                          <p style={{ fontSize: 16 }}>(Adjust slider to set a desired condition threshold)</p>
                        </div>
                      </div>
                    </div>
                    <ThresholdSlider
                      indicatorId={indicator}
                      threshold={parseFloat(threshold)}
                      handleChange={(value) => { this.handleSliderChange(value); debouncedApply(); }}
                    />
                  </div>
                </div>
              </Fragment>
            }
          </div>
        </div>
      </div>
    );
  }
}

Filters.propTypes = {
  name: string,
  filters: object,
  tabFilters: object,
  setFilters: func.isRequired,
  setTabFilters: func.isRequired,
  toggleMobileFilters: func.isRequired,
  toggleModal: func.isRequired,
  toggleAside: func.isRequired
};

export default Filters;
