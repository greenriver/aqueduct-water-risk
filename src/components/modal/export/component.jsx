import React from 'react';
import { LEGENDS } from '../../map/constants'
import CustomTable from 'components/ui/Table/Table';

// components
// constants

const ExportModal = ({ filters={} }) => {
  const tableData = Array.from(Array(20)).map((i) => ({
    watershed_id: '9044',
    major_basin: 'Major Basin',
    minor_basin: 'Minor Basin',
    country: 'USA',
    province: 'State',
    bws_score: 'High',
    bws_desired_change: '25%',
  }));
  const tableColumns = [
    { label: 'Watershed ID', value: 'watershed_id' },
    { label: 'Major Basin', value: 'major_basin' },
    { label: 'Minor Basin', value: 'minor_basin' },
    { label: 'Country', value: 'country' },
    { label: 'Province', value: 'province' },
    { label: 'BWS Score', value: 'bws_score' },
    { label: 'BWS Desired Change', value: 'bws_desired_change' }
  ];
  const indicator = filters.indicator && LEGENDS[filters.indicator];

  if (indicator) {
    return (
      <div className="c-info">
        <div className="info-header">
          <div className="info-titles">
            <span className="info-title">Prioritize Action Analyzer</span>
            <span className="info-description">
              <strong>{indicator.name}</strong> with desired condition set to > {filters.threshold}{indicator.unit}
            </span>
          </div>
        </div>
        <CustomTable
          columns={tableColumns}
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
      </div>
    );
  }
};

export default ExportModal;
