import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { saveAs } from 'file-saver';
import { toastr } from 'react-redux-toastr';
import {
  DownloadableTable
} from 'components/ui/analyzer';

// components
import DataTable from 'components/analyze-locations-tab/data-table';

// helpers
import { getFileName } from 'components/analyzer/helpers';

// services
import { fetchCARTOQuery } from 'services/query';

// utils
import { logEvent } from 'utils/analytics';

class AnalysisModal extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { fileLoading: false };
  }

  handleDownload(format) {
    const { analysis: { downloadUrl } } = this.props;
    const fileName = getFileName();

    this.setState({ fileLoading: true }, () => {
      fetchCARTOQuery({ q: downloadUrl, format })
      .then((data) => { saveAs(data, `${fileName}.${format}`); })
      .catch((err) => {
        console.error(err.message);
        toastr.error('Ops, something went wrong');
      })
        .finally(() => {
          logEvent('Download', 'User Downloads from Analysis Location', format);
          this.setState({ fileLoading: false });
        });
    });
  }

  render() {
    const {
      analysis: { loading },
      downloadUrl
    } = this.props;
    const { fileLoading } = this.state;

    return (
      <div className="c-analysis-modal">
        <div className="c-info">
          <DownloadableTable
            noExpand
            contentWrapper={node => <React.Fragment>{node}</React.Fragment>}
            downloadButtons
            downloading={fileLoading}
            downloadDisabled={!(downloadUrl && !loading)}
            downloadOptions={[
              { name: 'CSV', action: () => { this.handleDownload('csv'); } },
              { name: 'GPKG', action: () => { this.handleDownload('gpkg'); } }
            ]}
          >
            <DataTable />
          </DownloadableTable>
        </div>
      </div>
    );
  }
}

AnalysisModal.propTypes = {
  analysis: PropTypes.object.isRequired,
  downloadUrl: PropTypes.string
};

AnalysisModal.defaultProps = { downloadUrl: null };

export default AnalysisModal;
