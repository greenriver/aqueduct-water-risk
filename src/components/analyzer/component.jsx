import React, { PureComponent } from 'react';
import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';
import { Spinner } from 'aqueduct-components';
import { saveAs } from 'file-saver';

// components
import DataTable from 'components/analyze-locations-tab/data-table';
import AnalysisModal from 'components/modal/analysis';
import {
  DownloadableTable,
  Layout
} from 'components/ui/analyzer';

// services
import { fetchCARTOQuery } from 'services/query';

// utils
import { logEvent } from 'utils/analytics';

// helpers
import { getFileName } from './helpers';


class Analyzer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { fileLoading: false };
  }

  componentDidMount() {
    this.props.onFetchAnalysis();
  }

  componentWillReceiveProps(nextProps) {
    const { filters, onFetchAnalysis } = this.props;
    const {
      filters: nextFilters,
      geoStore
    } = nextProps;
    const filtersChanged = !isEqual(filters, nextFilters);

    if (filtersChanged && geoStore) onFetchAnalysis();
  }

  onApplyAnalysis() {
    const { onApplyAnalysis } = this.props;

    logEvent('Analysis', 'Analyze Locations', 'Start Analysis');
    onApplyAnalysis();
  }

  triggerExpandedTableModal() {
    const { toggleModal } = this.props;

    toggleModal(true, {
      children: AnalysisModal,
      size: '-medium'
    });
  }

  handleDownload(e, format) {
    const { analysis: { downloadUrl } } = this.props;
    const fileName = getFileName();

    e.preventDefault();
    e.stopPropagation();

    this.setState({ fileLoading: true }, () => {
      fetchCARTOQuery({ q: downloadUrl, format })
      .then((data) => {
        saveAs(data, `${fileName}.${format}`);
      })
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
      points,
      analysis: { data, loading, downloadUrl }
    } = this.props;
    const { fileLoading } = this.state;

    return (
      <Layout
        disableApply={!points.length}
        onApply={() => this.onApplyAnalysis()}
      >
        {(!!data.length && !loading) ? (
          <DownloadableTable
            onExpandTable={() => this.triggerExpandedTableModal()}
            downloading={fileLoading}
            downloadDisabled={!(downloadUrl && !loading)}
            downloadOptions={[
              { name: 'CSV', action: (e) => { this.handleDownload(e, 'csv'); } },
              { name: 'GPKG', action: (e) => { this.handleDownload(e, 'gpkg'); } }
            ]}
          >
            <DataTable />
          </DownloadableTable>
        ) : (
          <div className="analyzer-content">
            <Spinner
              isLoading={loading}
              className="-transparent"
            />
            {(!data.length && !loading) && (
              <div className="no-data-container">
                <span className="no-data">
                  Click on the map to select locations <br /> and then click &lsquo;Apply analysis&rsquo; button
                </span>
              </div>
            )}
          </div>
        )}
      </Layout>
    );
  }
}

Analyzer.propTypes = {
  filters: PropTypes.object.isRequired,
  geoStore: PropTypes.string,
  points: PropTypes.array.isRequired,
  analysis: PropTypes.object.isRequired,
  onFetchAnalysis: PropTypes.func.isRequired,
  onApplyAnalysis: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired
};

Analyzer.defaultProps = {
  geoStore: null,
  downloadUrl: null
};

export default Analyzer;
