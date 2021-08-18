import React, { Fragment } from 'react';
import { OnlyOn } from 'aqueduct-components';

import MobileMap from './MobileMap';
import DesktopMap from './DesktopMap';

const MapPage = (props) => {
  return (
    <Fragment>
      <OnlyOn device="mobile">
        <MobileMap >
          <DesktopMap {...props} />
        </MobileMap>
      </OnlyOn>
      <OnlyOn device="desktop">
        <DesktopMap {...props} />
      </OnlyOn>
    </Fragment>
  );
};

export default MapPage;
