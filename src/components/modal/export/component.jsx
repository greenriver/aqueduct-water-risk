import React, { Fragment } from 'react';
import { object } from 'prop-types';

import { Spinner } from 'aqueduct-components';
import DataTable from 'components/basin-analyzer/table';
import { LEGENDS } from '../../map/constants';

const ExportModal = ({ filters = {}, analysis = {} } = {}) => {
  const { data = [], loading = true } = analysis;
  const indicator = filters.indicator && LEGENDS[filters.indicator];

  if (indicator) {
    return (
      <div className="c-info">
        <div className="info-header">
          <div className="info-titles">
            <span className="info-title">Prioritize Basins Analyzer</span>
            <span className="info-description">
              <strong>{indicator.name}</strong> with desired condition set to &lt; {filters.threshold}{indicator.unit}
            </span>
          </div>
        </div>
        <div className="info-content" style={{ minHeight: 100, position: 'relative' }}>
          <Spinner
            isLoading={loading}
            className="-transparent"
          />
          {(data.length > 0 && !loading) &&
            <Fragment>
              <DataTable noExpand buttons />
            </Fragment>
          }
        </div>
      </div>
    );
  }

  return null;
};

ExportModal.propTypes = {
  filters: object,
  analysis: object
};

export default ExportModal;
