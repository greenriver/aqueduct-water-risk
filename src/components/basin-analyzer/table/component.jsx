import React from 'react';
import { object, func, bool } from 'prop-types';
import CustomTable from 'components/ui/Table/Table';
import {
  DownloadableTable
} from 'components/ui/analyzer';
import ExportFileModal from 'components/modal/export';
import { COLUMNS } from './constants';

const BasinAnalyzerTable = ({ filters = {}, analysis = {}, noExpand, toggleModal = () => {} } = {}) => {
  const { data = [] } = analysis;

  const handleExport = () => {
    toggleModal(ExportFileModal, '-medium');
  };

  const transformed = data.map(row => (
    COLUMNS.reduce((acc, col) => {
      let field = row[col.value];
      if (col.render) field = col.render(filters.indicator, field);
      return { ...acc, [col.value]: field };
    }, {})
  ));

  const transformedColumns = COLUMNS.map(c => ({ ...c, label: typeof c.label === 'function' ? c.label(filters.indicator) : c.label }))

  return (
    <DownloadableTable
      onExpandTable={() => handleExport()}
      hideInstructions
      downloadDisabled
      noExpand={noExpand}
    >
      <CustomTable
        columns={transformedColumns}
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
    </DownloadableTable>
  );
};

BasinAnalyzerTable.propTypes = {
  filters: object,
  analysis: object,
  toggleModal: func.isRequired,
  noExpand: bool
};

export default BasinAnalyzerTable;
