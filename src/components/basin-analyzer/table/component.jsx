import React from 'react';
import { object, func, bool } from 'prop-types';
import CustomTable from 'components/ui/Table/Table';
import { ExportToCsv } from 'export-to-csv';
import {
  DownloadableTable
} from 'components/ui/analyzer';
import ExportFileModal from 'components/modal/export';
import { COLUMNS } from './constants';

class BasinAnalyzerTable extends React.PureComponent {
  toggleModal(children, size = '-auto') {
    const { toggleModal } = this.props;

    toggleModal(true, {
      children,
      size
    });
  }

  handleExport() {
    this.toggleModal(ExportFileModal, '-medium');
  }

  render() {
    const {
      analysis,
      filters,
      noExpand,
      buttons
    } = this.props;
    const { data = [] } = analysis;

    const transformed = data.map(row => (
      COLUMNS.reduce((acc, col) => {
        let field = row[col.value];
        if (col.render) field = col.render(filters.indicator, field);
        return { ...acc, [col.value]: field };
      }, {})
    ));

    const transformedColumns = COLUMNS.map(c => ({ ...c, label: typeof c.label === 'function' ? c.label(filters.indicator) : c.label }));

    const downloadCSV = (event) => {
      if (event) event.preventDefault();
      const csvExporter = new ExportToCsv({
        showLabels: true,
        filename: `Prioritize Basins Analyzer - ${filters.indicator.name}`,
        headers: transformedColumns.map(c => c.label)
      });
      csvExporter.generateCsv(transformed);
    };

    return (
      <DownloadableTable
        onExpandTable={() => this.handleExport()}
        hideInstructions
        noExpand={noExpand}
        downloadButtons={buttons}
        downloadOptions={[
          { name: 'CSV', action: () => downloadCSV() }
        ]}
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
            // enabled: data.length > 10,
            enabled: true,
            pageSize: 10,
            page: 0
          }}
        />
      </DownloadableTable>
    );
  }
}

BasinAnalyzerTable.propTypes = {
  filters: object,
  analysis: object,
  toggleModal: func.isRequired,
  noExpand: bool,
  buttons: bool
};

export default BasinAnalyzerTable;
