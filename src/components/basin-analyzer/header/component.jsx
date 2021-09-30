import React, { PureComponent } from 'react';
import { array, func, string, bool } from 'prop-types';

// components
import CoordinatesModal from 'components/modal/coordinates';
import ImportFileModal from 'components/modal/import';
import ExportFileModal from 'components/modal/export';
import Header from 'components/ui/analyzer/header';

// utils
import { logEvent } from 'utils/analytics';

class BasinAnalyzerHeader extends PureComponent {
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

  toggleModal(children, size = '-auto') {
    const { toggleModal } = this.props;

    toggleModal(true, {
      children,
      size
    });
  }

  handleExport() {
    const { onApplyBasinAnalysis } = this.props;

    logEvent('Analysis', 'Analyze Basins', 'Start Analysis');
    onApplyBasinAnalysis();
    this.toggleModal(ExportFileModal, '-medium');
  }

  render() {
    const {
      points,
      mapMode,
      clearAnalysis,
      indicator,
      setAnalyzerOpen,
      analyzerOpen
    } = this.props;
    const exportAction = () => {
      if (indicator !== null && points.length) {
        this.handleExport();
      }
    };
    return (
      <Header
        onToggleOpen={() => { setAnalyzerOpen(!analyzerOpen); }}
        actions={[
          ...(points.length > 0) && [{ label: 'Clear', cb: () => { clearAnalysis(); } }],
          {
            label: 'Click map',
            ...mapMode === 'analysis' && { active: true },
            cb: () => { this.handleMapMode(); }
          },
          { label: 'Enter Address', cb: () => { this.toggleModal(CoordinatesModal); } },
          { label: 'Import file', cb: () => { this.toggleModal(ImportFileModal); } },
          { label: 'Export file', cb: () => { exportAction(); }, disabled: !(indicator !== null && points.length) }
        ]}
      />
    );
  }
}

BasinAnalyzerHeader.propTypes = {
  points: array.isRequired,
  mapMode: string.isRequired,
  analyzerOpen: bool.isRequired,
  setAnalyzerOpen: func.isRequired,
  setMapMode: func.isRequired,
  toggleModal: func.isRequired,
  toggleMobileFilters: func.isRequired,
  clearAnalysis: func.isRequired,
  onApplyBasinAnalysis: func.isRequired,
  indicator: string
};

export default BasinAnalyzerHeader;
