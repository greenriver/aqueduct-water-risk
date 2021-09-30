import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Spinner, Icon } from 'aqueduct-components';


class AnalyzerDownloadableTable extends PureComponent {
  render() {
    const {
      onExpandTable = () => {},
      children,
      noExpand = false,
      downloadDisabled = false,
      downloading = false,
      downloadOptions = [],
      hideInstructions = false,
      instructionUrl = 'https://github.com/wri/aqueduct30_data_download/blob/master/metadata.md'
    } = this.props;

    return (
      <React.Fragment>
        {!noExpand && (
          <div className="analyzer-header">
            <button
              type="button"
              onClick={onExpandTable}
            >
              <Icon
                name="icon-expand-window"
                className="expand-table-icon"
              />
            </button>
          </div>
        )}
        <div className="analyzer-content">
          <div className="table-container">
            {children}
          </div>
          {!downloadDisabled && (
            <div className="download-container">
            Download as
              <ul>
                {downloadOptions.map((o, i, arr) => (
                  <li key={i}>
                    <button type="button" onClick={o.action}>{o.name}</button>{i < arr.length - 1 ? ',' : ''}
                  </li>
                ))}
                <li className="download-spinner">
                  <Spinner
                    isLoading={downloading}
                    className="-transparent -tiny"
                  />
                </li>
              </ul>
              {!hideInstructions && (
                <p className="download-instructions">
                  <a
                    href={instructionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instructions
                  </a>
                </p>
              )}
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

AnalyzerDownloadableTable.propTypes = {
  onExpandTable: PropTypes.func,
  noExpand: PropTypes.bool,
  children: PropTypes.node.isRequired,
  downloadDisabled: PropTypes.bool,
  downloadOptions: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.shape({
      name: PropTypes.node.isRequired,
      action: PropTypes.func.isRequired
    })
  ])),
  downloading: PropTypes.bool,
  hideInstructions: PropTypes.bool,
  instructionUrl: PropTypes.string
};

export default AnalyzerDownloadableTable;
