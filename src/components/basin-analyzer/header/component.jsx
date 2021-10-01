import React, { PureComponent } from 'react';
import { array, func, string, bool } from 'prop-types';

// components
import CoordinatesModal from 'components/modal/coordinates';
import ImportFileModal from 'components/modal/import';
import Header from 'components/ui/analyzer/header';

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

  render() {
    const {
      points,
      mapMode,
      clearAnalysis,
      setAnalyzerOpen,
      analyzerOpen
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

BasinAnalyzerHeader.propTypes = {
  points: array.isRequired,
  mapMode: string.isRequired,
  analyzerOpen: bool.isRequired,
  setAnalyzerOpen: func.isRequired,
  setMapMode: func.isRequired,
  toggleModal: func.isRequired,
  toggleMobileFilters: func.isRequired,
  clearAnalysis: func.isRequired
};

export default BasinAnalyzerHeader;
