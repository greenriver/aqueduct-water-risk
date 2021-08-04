import React, { Component, Fragment } from 'react';
import { func, object, string } from 'prop-types';

import { CustomSelect, InfoModal } from 'aqueduct-components';

import ContentModal from '../../ui/modal/content/';
import TooltipIcon from '../../ui/TooltipIcon';
import ThresholdSlider from './ThresholdSlider';

// constants
import { BASIN_MODAL_PROPS, WATER_RISK_PROPS  } from 'constants/filters';
import { LEGENDS, INDICATORS } from 'components/map/constants';

class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indicator: this.props.tabFilters.action.indicator || '',
      threshold: this.props.tabFilters.action.threshold
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.indicator !== nextState.indicator;
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

  getFilter(filterProp) {
    const { tabFilters } = this.props;
    return this.state[filterProp] || tabFilters.action[filterProp];
  }

  handleIndicatorSelect(indicator) {
    this.props.setTabFilters({
      action: {
        indicator,
        threshold: LEGENDS[indicator].defaultValue
      }
    });
    this.setState({ indicator });
  }

  handleSliderChange(threshold = null) {
    this.props.setTabFilters({
      action: { threshold, indicator: this.getFilter('indicator')}
    });
    this.setState({ threshold });
  }

  render() {
    const { name = '', setFilters, setTabFilters } = this.props;
    const indicator = this.getFilter('indicator');
    const threshold = this.getFilter('threshold');

    const indicators = Object.keys(LEGENDS)
      .filter((key) => Object.keys(INDICATORS).includes(key) )
      .map((key) => ({ label: INDICATORS[key], value: key } ));

    const handleApply = () => {
      const newFilters = {
        indicator,
        threshold: this.state.threshold
      };
      setFilters(newFilters);
      setTabFilters({ action: newFilters });
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
                <span className="title">Highlight basins exceeding desired condition threshold</span>
                <TooltipIcon handleClick={() => this.handleTooltipClick()} />
              </div>
            </div>
            <div className="filters-section">
              <div className="row expanded collapse">
                <div className="small-8 column">
                  <div className="c-filters-item -inline" style={ {marginBottom: 25} }>
                    <CustomSelect
                      className='-m-0'
                      options={indicators}
                      value={indicator}
                      placeholder={'Select Indicator'}
                      onValueChange={({ value }) => { this.handleIndicatorSelect(value) }}
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
                          <p style={{ fontSize: 16 }}>(adjust slider to change results)</p>
                        </div>
                      </div>
                    </div>
                    <ThresholdSlider indicatorId={indicator} threshold={threshold} handleChange={ (value) => this.handleSliderChange(value) } />
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
  name: string.isRequired,
  filters: object,
  tabFilters: object,
  setFilters: func.isRequired,
  setTabFilters: func.isRequired,
  toggleModal: func.isRequired,
  toggleAside: func.isRequired
};

export default Filters;
