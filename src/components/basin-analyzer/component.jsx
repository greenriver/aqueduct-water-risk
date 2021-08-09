import React, { PureComponent } from 'react';
import { array, bool, func, string } from 'prop-types';
import { Icon } from 'aqueduct-components';

// components
import BtnMenu from 'components/ui/BtnMenu';
import CoordinatesModal from 'components/modal/coordinates';
import ImportFileModal from 'components/modal/import';
import ExportFileModal from 'components/modal/export';

// utils
import { logEvent } from 'utils/analytics';

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
      indicator
    } = this.props;
    return (
      <div className="l-analyzer">
        <div className="c-analyzer-header">
          <div className="actions-container">
            <span className="title">Analyze</span>
            { points.length > 0 &&
              <span className="">
                Location: [{points[0].lat}, {points[0].lng}]
              </span>
            }
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
                ...(indicator !== null && points.length) && [
                  { label: 'Export file', cb: () => { this.handleExport() } }
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
  setMapMode: func.isRequired,
  toggleModal: func.isRequired,
  clearAnalysis: func.isRequired,
  onApplyBasinAnalysis: func.isRequired,
  indicator: string
};

export default BasinAnalyzer;
