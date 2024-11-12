import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// components
import { Spinner, post } from 'aqueduct-components';
import Axios from 'axios';
import { setGeostoreLocations } from '../../../../../modules/analyze-locations-tab/actions';

class ImportTabLink extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      accepted: [],
      rejected: [],
      dropzoneActive: false,
      loading: false,
      errors: [],
      link: ''
    };

    this.triggerOpenDialog = this.triggerOpenDialog.bind(this);
    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.setLink = this.setLink.bind(this);
    this.processLink = this.processLink.bind(this);
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
      if (this.state.accepted.length) {
        this.convertFile(this.state.accepted[0]);
      }
    });
  }

  setLink(linkStr) {
    this.setState({ link: linkStr });
  }

  getFileName() {
    const { accepted } = this.state;

    if (accepted.length) {
      const current = accepted[0];
      return current.name;
    }

    return 'Select file to import data';
  }

  processLink() {
    const {
      onAddPoint,
      onSaveGeostore,
      onFetchAnalysis,
      setAnalyzerOpen,
      toggleModal
    } = this.props;
    this.setState({ loading: true, errors: [] });

    Axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    Axios.get(this.state.link).then((res) => {
      // console.log(res.data);
      Axios.post('https://61pcps7lgi.execute-api.us-east-1.amazonaws.com/geoJsonToPoints', res.data).then((d) => {
        const points = d.data.map(p => ({ lat: p[1], lng: p[0] }));
        console.log(points);

        const locations = d.data.map(_feature => ({
          id: _feature.properties.id,
          location_name: _feature.properties.location_name || _feature.properties['location name'],
          input_address: '_',
          match_address: '-'
        }));
        onAddPoint(points);
        setGeostoreLocations(locations);

        onSaveGeostore()
              .then(() => {
                onFetchAnalysis()
                  .then(() => {
                    this.setState({ loading: false }, () => {
                      setAnalyzerOpen(true);
                      toggleModal(false, {});
                    });
                  });
              });
      });

      this.setState({ loading: false });
    });
  }

  convertFile(file) {
    this.setState({ loading: true, errors: [] });

    post({
      type: 'POST',
      url: `${config.API_URL}/ogr/convert`,
      body: formData,
      multipart: true,
      onSuccess: (response) => {
        setMapMode('analysis');

        clearPoints();

        // Be sure that user upload points
        const features = response.data.attributes.features;

        // Check that features exists and they have some elements inside
        if (features && Array.isArray(features) && features.length) {
          // Check that every geometry exists and it's a point
          const allPoints = features.every(p => p.geometry && p.geometry.type === 'Point');

          if (allPoints) {
            const points = features.map(p => ({ lat: p.geometry.coordinates[1], lng: p.geometry.coordinates[0] }));
            const locations = features.map(_feature => ({
              id: _feature.properties.id,
              location_name: _feature.properties.location_name || _feature.properties['location name'],
              input_address: '_',
              match_address: '-'
            }));

            onAddPoint(points);
            setGeostoreLocations(locations);

            onSaveGeostore()
              .then(() => {
                onFetchAnalysis()
                  .then(() => {
                    this.setState({ loading: false }, () => {
                      setAnalyzerOpen(true);
                      toggleModal(false, {});
                    });
                  });
              });
          } else {
            this.setState({
              errors: [{
                detail: 'Only points are allowed to be analyzed. Please check your file to be sure that you didn\'t add lines, polygons or null geometries.'
              }],
              loading: false
            });
          }
        } else {
          this.setState({
            errors: [{
              detail: 'Only points are allowed to be analyzed. Please check your file to be sure that you didn\'t add lines, polygons or null geometries.'
            }],
            loading: false
          });
        }
      },
      onError: (err) => {
        console.error(err);
        this.setState({
          errors: [{
            detail: 'File corrupt or incorrect file. Please check the list of supported file formats above. You can also download the different templates by clicking on them.'
          }],
          loading: false
        });
      }
    });
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

    return (
      <div className="c-import-modal">
        <Spinner isLoading={loading} />
        <header className="dropzone-header">
          <h2>Import Geo Json from link</h2>
        </header>

        <div className="dropzone-file">
          <div >
            <input type="text" onChange={e => this.setLink(e.target.value)} value={this.link} />
            <button
              className="c-btn -primary -light"
              onClick={() => this.processLink()}
            >
                Process link
              </button>
          </div>
        </div>
      </div>
    );
  }
}

ImportTabLink.propTypes = {
  onAddPoint: PropTypes.func.isRequired,
  onSaveGeostore: PropTypes.func.isRequired,
  onFetchAnalysis: PropTypes.func.isRequired,
  setMapMode: PropTypes.func.isRequired,
  setAnalyzerOpen: PropTypes.func.isRequired,
  clearPoints: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  setGeostoreLocations: PropTypes.func.isRequired
};

export default ImportTabLink;
