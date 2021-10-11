import React, { PureComponent } from 'react';
import { array, bool, func, string } from 'prop-types';

// components
import CoordinatesModal from 'components/modal/coordinates';
import ImportFileModal from 'components/modal/import';
import Header from 'components/ui/analyzer/header';

class AnalyzerHeader extends PureComponent {
  handleMapMode() {
    const {
      mapMode,
      analyzerOpen,
      setMapMode,
      setAnalyzerOpen,
      toggleMobileFilters
    } = this.props;
    const nextMapMode = mapMode === 'analysis' ? 'view' : 'analysis';

    if (!analyzerOpen) setAnalyzerOpen(true);
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

  render() {
    const {
      points,
      mapMode,
      analyzerOpen,
      setAnalyzerOpen,
      clearAnalysis
    } = this.props;
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
          { label: 'Import file', cb: () => { this.toggleModal(ImportFileModal); } }
        ]}
      />
    );
  }
}

AnalyzerHeader.propTypes = {
  points: array.isRequired,
  mapMode: string.isRequired,
  analyzerOpen: bool.isRequired,
  setMapMode: func.isRequired,
  toggleModal: func.isRequired,
  toggleMobileFilters: func.isRequired,
  setAnalyzerOpen: func.isRequired,
  clearAnalysis: func.isRequired
};

export default AnalyzerHeader;
