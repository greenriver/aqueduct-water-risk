import React, { PureComponent } from 'react';
import { array, bool, func, string } from 'prop-types';
import { Icon } from 'aqueduct-components';

// components
import BtnMenu from 'components/ui/BtnMenu';
import CoordinatesModal from 'components/modal/coordinates';
import ImportFileModal from 'components/modal/import';
import ExportFileModal from 'components/modal/export';

class BasinAnalyzer extends PureComponent {
  handleMapMode() {
    const {
      mapMode,
      setMapMode
    } = this.props;
    const nextMapMode = mapMode === 'analysis' ? 'view' : 'analysis';

    setMapMode(nextMapMode);
  }

  toggleModal(children, size='-auto') {
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
      indicator
    } = this.props;
    return (
      <div className="l-analyzer">
        <div className="c-analyzer-header">
          <div className="actions-container">
            <span className="title">Analyze</span>
            <BtnMenu
              className="-theme-white"
              items={[
                ...(points.length > 0) && [{ label: 'Clear', cb: () => { clearAnalysis(); } }],
                {
                  label: 'Click map',
                  ...mapMode === 'analysis' && { active: true },
                  cb: () => { this.handleMapMode(); }
                },
                { label: 'Enter Address', cb: () => { this.toggleModal(CoordinatesModal); } },
                { label: 'Import file', cb: () => { this.toggleModal(ImportFileModal); } },
                ...(indicator !== null) && [
                  { label: 'Export file', cb: () => { this.toggleModal(ExportFileModal, '-medium'); } }
                ]
              ]}
            />
          </div>
        </div>
      </div>
    );
  }
}

BasinAnalyzer.propTypes = {
  points: array.isRequired,
  mapMode: string.isRequired,
  analyzerOpen: bool.isRequired,
  setMapMode: func.isRequired,
  toggleModal: func.isRequired,
  setAnalyzerOpen: func.isRequired,
  clearAnalysis: func.isRequired,
  indicator: string,
  scope: string
};

export default BasinAnalyzer;
