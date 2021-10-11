import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'aqueduct-components';
import MapComponent from 'components/map';
import MobileFilters from '../../mobile-filters';
import TabbedFilters from '../../tabbed-filters';


const MobileMapPage = ({ loading }) => {
  return (
    <div className="c-map-page l-map-page">
      <MobileFilters>
        <TabbedFilters />
      </MobileFilters>
      <MapComponent />
      <Spinner
        isLoading={loading}
        className="-map"
      />
    </div>
  );
};

MobileMapPage.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default MobileMapPage;
