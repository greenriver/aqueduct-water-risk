import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Dropzone from 'react-dropzone';
import { toastr } from 'react-redux-toastr';
// services
import { fetchGeocoding } from 'services/geocoding';

// components
import { Spinner } from 'aqueduct-components';

const errorMessage = 'Some addresses in your file could not be found, Please copy the addresses directly from Google Maps and make sure the document follows the same structure as the example provided above';


class ImportTabAddresses extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      accepted: [],
      rejected: [],
      dropzoneActive: false,
      loading: false,
      errors: null
    };

    this.triggerOpenDialog = this.triggerOpenDialog.bind(this);
    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  onDragEnter() {
    this.setState({ dropzoneActive: true });
  }

  onDragLeave() {
    this.setState({ dropzoneActive: false });
  }

  onDrop(accepted, rejected) {
    this.setState({
      accepted,
      rejected,
      dropzoneActive: false
    }, () => {
      if (this.state.accepted.length) this.performGeocoding(this.state.accepted[0]);
    });
  }

  getFileName() {
    const { accepted } = this.state;

    if (accepted.length) {
      const current = accepted[0];
      return current.name;
    }

    return 'Select file to import data';
  }

  performGeocoding(addressFile) {
    const {
      setMapMode,
      onAddPoint,
      onSaveGeostore,
      onFetchAnalysis,
      setAnalyzerOpen,
      setGeostoreLocations,
      toggleModal,
      clearPoints
    } = this.props;

    const formData = new FormData();
    formData.append('file', addressFile);

    this.setState({
      loading: true,
      errors: null
    },
      () => {
        toastr.info('Searching for addresses, this might take a few minutes', { title: 'Analysis' });
        fetchGeocoding(formData)
          .then((locatedAddresses) => {
            if (!locatedAddresses) throw Error(errorMessage);
            // checks if there are no errors in the importation
            const errors = locatedAddresses.filter(address => !address.match);

            // after every import, the previous points and locations will be deleted
            clearPoints();

            // error flow
            if (errors.length) {
              this.setState({
                errors: errorMessage,
                loading: false
              });
            } else {
              setMapMode('analysis');
              const points = locatedAddresses.map(({ lat, lon }) => ({ lat, lng: lon }));
              const locations = locatedAddresses.map(_location => ({
                id: _location.id || _location.row,
                location_name: _location['location name'] || _location.location_name || `Location ${_location.row}`,
                input_address: _location.address,
                match_address: _location.matched_address
              }));

              onAddPoint(points);
              setGeostoreLocations(locations);

              onSaveGeostore()
                .then(() => {
                  onFetchAnalysis()
                    .then(() => {
                      this.setState({ loading: false }, () => {
                        toggleModal(false, {});
                        setAnalyzerOpen(true);
                      });
                    });
                });
            }
          })
          .catch((error) => {
            console.error(error);

            if (error.request && error.request.status === 500) {
              this.setState({
                loading: false,
                errors: errorMessage
              });
            } else {
              this.setState({
                loading: false,
                errors: error.message
              });
            }
          });
      }
    );
  }

  triggerOpenDialog() { this.dropzone.open(); }

  goToDocs() {
    const { toggleModal } = this.props;

    toggleModal(false);

    window.open('/applications/aqueduct/water-risk-atlas/#/documentation');
  }

  render() {
    const {
      dropzoneActive,
      loading,
      errors
    } = this.state;

    const fileInputClass = classnames('dropzone-file-input', { '-error': !!errors });

    return (
      <div className="c-import-modal">
        <Spinner isLoading={loading} />
        <Dropzone
          ref={(node) => { this.dropzone = node; }}
          className="c-dropzone"
          activeClassName="-active"
          rejectClassName="-reject"
          multiple={false}
          disableClick
          disablePreview
          onDrop={this.onDrop}
          onDragEnter={this.onDragEnter}
          onDragLeave={this.onDragLeave}
        >
          {dropzoneActive &&
            <div className="dropzone-active">
              <h2>Drop files...</h2>
            </div>
          }

          <header className="dropzone-header">
            <h2>Import multiple addresses</h2>

            <p>This functionality is in beta and under development. Please help us improve and report bugs <a href="https://forms.office.com/Pages/ResponsePage.aspx?id=H6xrR7I22UqGmc2mutH4YhV0dbt-LndBm7Vj2_VMq7tUQUYxTEJYOUVWNkxHRDUzNEI5SlM5NVdPNy4u" target="_blank" rel="noopener noreferrer">here</a>.
              Thank you for your patience.
            </p>

            <p>Please use the templates below to structure your data.</p>
            <p>Replace with your own location names and coordinates.Do not add additional columns.There is a 500 addresses per file limit.</p>
            <p>More <button className="go-to-docs-btn" onClick={() => { this.goToDocs(); }}>info</button>.</p>

            <p>List of supported file formats <i>(click on any format to download the template)</i>:</p>
            <ul>
              <li>
                <a download="example_address.csv" href="https://rawcdn.githack.com/wri/aqueduct_analyze_locations/e8bff4c27435d2dc41b040839d3c9b072c8af9d6/input_templates/example_address.csv">Comma separated file (.csv)</a>
              </li>
              <li>
                <a download="example_address.xlsx" href="https://rawcdn.githack.com/wri/aqueduct_analyze_locations/e8bff4c27435d2dc41b040839d3c9b072c8af9d6/input_templates/example_address.xlsx">Spreadsheet (.xlsx)</a>
              </li>
            </ul>
          </header>

          <div className="dropzone-file">
            <div className={fileInputClass}>
              <div
                className="dropzone-file-name"
                onClick={this.triggerOpenDialog}
              >
                {this.getFileName()}
              </div>
              <button
                className="c-btn -primary -light"
                onClick={this.triggerOpenDialog}
              >
                Select file
              </button>
            </div>

            {errors && typeof errors === 'string' &&
              <div className="dropzone-file-errors">
                <span>{errors}</span>
              </div>
            }

            {errors && !!errors.length && typeof errors === 'object' &&
              <div className="dropzone-file-errors">
                <p>The next errors appeared during the importation:</p>
                <ul>
                  {errors.map(err => (
                    <li key={err.row}>
                      Error in line {err.row} - {err.address}
                    </li>
                  ))}
                </ul>
              </div>}
          </div>
        </Dropzone>
      </div>
    );
  }
}

ImportTabAddresses.propTypes = {
  onAddPoint: PropTypes.func.isRequired,
  onSaveGeostore: PropTypes.func.isRequired,
  onFetchAnalysis: PropTypes.func.isRequired,
  setMapMode: PropTypes.func.isRequired,
  setAnalyzerOpen: PropTypes.func.isRequired,
  setGeostoreLocations: PropTypes.func.isRequired,
  clearPoints: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired
};

export default ImportTabAddresses;
