import React, { Component, Fragment } from 'react';
import { func, object, string } from 'prop-types';

import { CustomSelect, InfoModal } from 'aqueduct-components';

// constants
import { BASIN_MODAL_PROPS, WATER_RISK_PROPS } from 'constants/filters';
import { BASIN_INDICATORS, INDICATORS } from 'components/map/constants';

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

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.indicator !== nextState.indicator;
  }

  getFilter(filterProp) {
    const { tabFilters } = this.props;
    return this.state[filterProp] || tabFilters.basins[filterProp];
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
    this.setState(newFilters);
  }

  handleSliderChange(threshold = null) {
    this.props.setTabFilters({
      basins: { threshold, indicator: this.getFilter('indicator') }
    });
    this.setState({ threshold });
  }

  render() {
    const {
      name = '',
      setFilters,
      setTabFilters,
      toggleMobileFilters
    } = this.props;
    let indicator = this.getFilter('indicator');
    const indicatorIds = Object.keys(BASIN_INDICATORS);
    if (!indicatorIds.includes(indicator)) {
      indicator = null;
    }
    const threshold = this.getFilter('threshold');

    const indicators = indicatorIds.map(key => ({ label: BASIN_INDICATORS[key].name, value: key }));

    const handleApply = () => {
      const newFilters = {
        indicator,
        threshold: this.state.threshold
      };
      setFilters(newFilters);
      setTabFilters({ basins: { ...newFilters, indicator: (BASIN_INDICATORS[indicator] && BASIN_INDICATORS[indicator].rawField) || indicator } });
      toggleMobileFilters(false);
    };

    return (
      <div>
        <div className="c-filters-header">
          <h1 className="title">{name}</h1>
        </div>
        <div className="c-filters">
          <div className="filters-section">
            <div className="c-filters-item">
              <div className="filter-item-header">
                <span className="title">Desired condition threshold</span>
                <TooltipIcon handleClick={() => this.handleTooltipClick()} />
              </div>
            </div>
            <div className="filters-section">
              <div className="row expanded collapse">
                <div className="medium-8 column">
                  <div className="c-filters-item -inline" style={{ marginBottom: 25 }}>
                    <CustomSelect
                      className="-m-0"
                      options={indicators}
                      value={indicator}
                      placeholder={'Select Indicator'}
                      onValueChange={({ value }) => { this.handleIndicatorSelect(value); }}
                    />
                    <TooltipIcon handleClick={() => this.handleInfoClick()} />
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
                          <p><strong>{INDICATORS[indicator]} Desired Condition </strong></p>
                          <p style={{ fontSize: 16 }}>(Adjust slider to set a desired condition threshold)</p>
                        </div>
                      </div>
                    </div>
                    <ThresholdSlider
                      indicatorId={indicator}
                      threshold={threshold}
                      handleChange={(value) => { this.handleSliderChange(value); }}
                    />
                  </div>
                </div>
                <div style={{ marginTop: 35 }} className="c-btn-menu -theme-secondary">
                  <button className="btn-menu-btn -shout" onClick={handleApply}>Apply Changes</button>
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
