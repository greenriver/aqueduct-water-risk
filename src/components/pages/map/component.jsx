import React, { Fragment } from 'react';
import { OnlyOn } from 'aqueduct-components';

import DesktopMapPage from './DesktopMapPage';
import MobileMapPage from './MobileMapPage';

const MapPage = (props) => {
  return (
    <Fragment>
      <OnlyOn device="mobile">
        <MobileMapPage {...props} />
      </OnlyOn>
      <OnlyOn device="desktop">
        <DesktopMapPage {...props} />
      </OnlyOn>
    </Fragment>
  );
};

export default MapPage;
