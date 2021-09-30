import React, { PureComponent } from 'react';
import { array, func, string, object } from 'prop-types';
import { Spinner } from 'aqueduct-components';

// components
import DataTable from './table';
import {
  Layout
} from 'components/ui/analyzer';

// utils
import { logEvent } from 'utils/analytics';

class BasinAnalyzer extends PureComponent {
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
      analysis: { data = [], loading = false } = {}
    } = this.props;

    return (
      <Layout
        disableApply={!points.length}
        onApply={() => this.onApplyAnalysis()}
      >
        {(!!data.length && !loading) ? (
          <DataTable />
        ) : (
          <div className="analyzer-content">
            <Spinner
              isLoading={loading}
              className="-transparent"
            />
            {(!data.length && !loading) && (
              <div className="no-data-container">
                <span className="no-data">
                  TEST Click on the map to select locations <br /> and then click &lsquo;Apply analysis&rsquo; button
                </span>
              </div>
            )}
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
  analysis: object
};

export default BasinAnalyzer;
