import React, { Fragment } from 'react';
import { object } from 'prop-types';
import { ExportToCsv } from 'export-to-csv';

import { Spinner } from 'aqueduct-components';
import CustomTable from 'components/ui/Table/Table';
import { LEGENDS } from '../../map/constants';
import { COLUMNS } from './constants';

const ExportModal = ({ filters = {}, analysis = {} } = {}) => {
  const { data = [], loading = true } = analysis;
  const indicator = filters.indicator && LEGENDS[filters.indicator];

  const transformed = data.map(row => (
    Object.entries(row)
    .map(([k, v]) => {
      const column = COLUMNS.find(c => c.value === k);
      return [k, (column && column.render && column.render(filters.indicator, v)) || v];
    })
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {})
  ));

  const downloadCSV = (event) => {
    event.preventDefault();
    const csvExporter = new ExportToCsv({
      showLabels: true,
      filename: `Prioritize Basins Analyzer - ${indicator.name}`,
      headers: COLUMNS.map(c => c.label)
    });
    csvExporter.generateCsv(transformed);
  };

  if (indicator) {
    return (
      <div className="c-info">
        <div className="info-header">
          <div className="info-titles">
            <span className="info-title">Prioritize Basins Analyzer</span>
            <span className="info-description">
              <strong>{indicator.name}</strong> with desired condition set to > {filters.threshold}{indicator.unit}
            </span>
          </div>
        </div>
        <div className="info-content" style={{minHeight: 100, position: 'relative'}}>
          <Spinner
            isLoading={loading}
            className="-transparent"
          />
          {(data.length > 0 && !loading) &&
            <Fragment>
              <CustomTable
                columns={COLUMNS}
                data={transformed}
                selected={[]}
                actions={{
                  showable: false,
                  editable: false,
                  removable: false
                }}
                pagination={{
                  enabled: data.length > 10,
                  pageSize: 10,
                  page: 0
                }}
              />
              <div>
                <span className='download-container'>Download result as </span>
                <button onClick={downloadCSV}>CSV</button>
              </div>
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
