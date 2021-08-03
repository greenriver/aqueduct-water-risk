import React, { PureComponent } from 'react';
import { LEGENDS } from '../../map/constants'

// components
// constants

class ExportModal extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { filters=null } = this.props
    if (filters) {
      const indicator = LEGENDS[filters.indicator]
      return (
        <div className="c-info">
          <div className="info-header">
            <div className="info-titles">
              <span className="info-title">Prioritize Action Analyzer</span>
              <span className="info-description">
                <strong>{indicator.name}</strong> with desired condition set to >{filters.threshold}{indicator.unit}
              </span>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default ExportModal;
