import React, { PureComponent } from 'react';
import { array, func, string, object } from 'prop-types';
import { Spinner } from 'aqueduct-components';

import {
  Layout
} from 'components/ui/analyzer';
import { BASIN_INDICATORS } from 'components/map/constants';

// utils
import { logEvent } from 'utils/analytics';

// components
import DataTable from './table';


const isValidIndicator = indicator => !!(indicator && BASIN_INDICATORS[indicator]);
class BasinAnalyzer extends PureComponent {
  componentDidMount() {
    this.onApplyAnalysis();
  }

  componentDidUpdate(prevProps) {
    const { filters: { indicator, threshold } = {} } = this.props;
    const { filters: { indicator: prevIndicator, threshold: prevThreshold } = {} } = prevProps;
    if (!isValidIndicator(indicator)) return;
    if (indicator !== prevIndicator || threshold !== prevThreshold) {
      this.onApplyAnalysis();
    }
  }

  onApplyAnalysis() {
    const { onApplyBasinAnalysis } = this.props;

    logEvent('Analysis', 'Analyze Locations', 'Start Analysis');
    onApplyBasinAnalysis();
  }

  toggleModal(children, size = '-auto') {
    const { toggleModal } = this.props;

    toggleModal(true, {
      children,
      size
    });
  }

  handleMapMode() {
    const {
      mapMode,
      setMapMode,
      toggleMobileFilters
    } = this.props;
    const nextMapMode = mapMode === 'analysis' ? 'view' : 'analysis';

    // console.log({nextMapMode})

    setMapMode(nextMapMode);
    // Toggle filters on mobile so users can access the map
    if (nextMapMode === 'analysis') {
      toggleMobileFilters(false);
    }
  }

  render() {
    const {
      points,
      analysis: { data = [], loading = false } = {},
      filters: { indicator } = {}
    } = this.props;

    const validData = loading || (data.length && data.every(e => 'threshold' in e));
    const validIndicator = isValidIndicator(indicator);
    const showTable = !!(validIndicator && points.length && validData);

    return (
      <Layout
        disableApply={!points.length || !validIndicator}
        onApply={() => this.onApplyAnalysis()}
      >
        {showTable ? (
          <React.Fragment>
            {loading ? (
              <div className="analyzer-content">
                <Spinner
                  isLoading={loading}
                  className="-transparent"
                />
              </div>
            ) : (
              <DataTable />
            )}
          </React.Fragment>
        ) : (
          <div className="analyzer-content">
            <div className="no-data-container">
              {validIndicator ? (
                <span className="no-data">
                  Click on the map to select locations <br /> and then click &lsquo;Apply analysis&rsquo; button
                </span>
              ) : (
                <span className="no-data">
                  Select an indicator to continue
                </span>
              )}
            </div>
          </div>
        )}
      </Layout>
    );
  }
}

BasinAnalyzer.propTypes = {
  points: array.isRequired,
  mapMode: string.isRequired,
  setMapMode: func.isRequired,
  toggleModal: func.isRequired,
  toggleMobileFilters: func.isRequired,
  onApplyBasinAnalysis: func.isRequired,
  analysis: object,
  filters: object
};

export default BasinAnalyzer;
