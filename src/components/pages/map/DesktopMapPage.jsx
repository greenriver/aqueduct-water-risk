import React from 'react';
import PropTypes from 'prop-types';
import { Spinner, Sidebar } from 'aqueduct-components';
import MapComponent from 'components/map';
import classnames from 'classnames';

import TabbedFilters from '../../tabbed-filters'

const DesktopMapPage = (props) => {
  const {
    loading,
    analyzerOpen,
    scope,
    analysis: { data },
    setSidebarWidth
  } = props;

  const scopeHasAccordionAnalyzer = scope !== 'basins';

  const sidebarClass = classnames({
    'sidebar-with-open-analyzer': scopeHasAccordionAnalyzer && analyzerOpen,
    'sidebar-with-data-analyzer': scopeHasAccordionAnalyzer && analyzerOpen && data.length
  });

  return (
    <div className="c-map-page l-map-page">
      <Sidebar
        setSidebarWidth={(newSidebarWidth) => { setSidebarWidth(newSidebarWidth); }}
        className={sidebarClass}
      >
        <TabbedFilters />
      </Sidebar>
      <MapComponent />
      <Spinner
        isLoading={loading}
        className="-map"
      />
    </div>
  );
};

DesktopMapPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  analyzerOpen: PropTypes.bool.isRequired,
  scope: PropTypes.string.isRequired,
  setSidebarWidth: PropTypes.func.isRequired,
  analysis: PropTypes.object.isRequired
};

DesktopMapPage.defaultProps = { geostore: null };

export default DesktopMapPage;
