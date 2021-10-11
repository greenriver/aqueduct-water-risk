import React, { Fragment } from 'react';
import { OnlyOn } from 'aqueduct-components';

import DesktopMap from './DesktopMap';

const MapPage = (props) => {
  return (
    <Fragment>
      <OnlyOn device="mobile">
        <div className="mobile-map-wrapper">
          <DesktopMap {...props} />
        </div>
      </OnlyOn>
      <OnlyOn device="desktop">
        <DesktopMap {...props} />
      </OnlyOn>
    </Fragment>
  );
};

export default MapPage;
