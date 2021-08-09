import React from 'react';
import { object } from 'prop-types';
import { ExportToCsv } from 'export-to-csv';

import CustomTable from 'components/ui/Table/Table';
import { LEGENDS } from '../../map/constants';
import { COLUMNS } from './constants';

// components
// constants

const ExportModal = ({ filters={} }) => {
  const indicator = filters.indicator && LEGENDS[filters.indicator];
  const tableData = Array.from(Array(20)).map((a, b) => ({
    watershed_id: b,
    major_basin: 'Major Basin',
    minor_basin: 'Minor Basin',
    country: 'USA',
    province: 'State',
    score: 'High',
    desired_change: '25%'
  }));

  const downloadCSV = (event) => {
    event.preventDefault();
    const csvExporter = new ExportToCsv({
      showLabels: true,
      filename: `Prioritize Basins Analyzer - ${indicator.name}`,
      headers: COLUMNS.map(c => c.label)
    });
    csvExporter.generateCsv(tableData);
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
        <CustomTable
          columns={COLUMNS}
          data={tableData}
          selected={[]}
          actions={{
            showable: false,
            editable: false,
            removable: false
          }}
          pagination={{
            enabled: tableData.length > 10,
            pageSize: 10,
            page: 0
          }}
        />
        <div>
          <span className='download-container'>Download result as </span>
          <button onClick={downloadCSV}>CSV</button>
        </div>
      </div>
    );
  }
};

ExportModal.propTypes = {
  filters: object
};

export default ExportModal;
