import React, { Fragment } from 'react';
import { object } from 'prop-types';
import { ExportToCsv } from 'export-to-csv';

import { Spinner } from 'aqueduct-components';
import DataTable from 'components/basin-analyzer/table';
import BtnMenu from 'components/ui/BtnMenu';
import { LEGENDS } from '../../map/constants';
import { COLUMNS } from './constants';

const ExportModal = ({ filters = {}, analysis = {} } = {}) => {
  const { data = [], loading = true } = analysis;
  const indicator = filters.indicator && LEGENDS[filters.indicator];

  const transformed = data.map(row => (
    COLUMNS.reduce((acc, col) => {
      let field = row[col.value];
      if (col.render) field = col.render(filters.indicator, field);
      return { ...acc, [col.value]: field };
    }, {})
  ));

  const transformedColumns = COLUMNS.map(c => ({ ...c, label: typeof c.label === 'function' ? c.label(filters.indicator) : c.label }))

  const downloadCSV = (event) => {
    if (event) event.preventDefault();
    const csvExporter = new ExportToCsv({
      showLabels: true,
      filename: `Prioritize Basins Analyzer - ${indicator.name}`,
      headers: transformedColumns.map(c => c.label)
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
              <strong>{indicator.name}</strong> with desired condition set to &lt; {filters.threshold}{indicator.unit}
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
              <DataTable noExpand />
              <div>
                <span style={{marginRight: 5}}>Download result as: </span>
                <BtnMenu
                  className="-theme-white -flex-inline"
                  items={[{ label: 'CSV', cb: () => { downloadCSV(); } }]}
                />
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
