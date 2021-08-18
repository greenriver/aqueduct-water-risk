import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { SegmentedUi } from 'aqueduct-components';

export const PAGE_CONTEXT_OPTIONS = [
  { label: 'Data', value: 'data' },
  { label: 'Map', value: 'map' }
];

class MobileMap extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { context: 'data' };
  }

  render() {
    const { context } = this.state;
    const {
      children
    } = this.props;

    return (
      <div className="mobile-map-wrapper">
        { children }
      </div>
    );
  }
}

export default MobileMap;
