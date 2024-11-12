import React, { PureComponent } from 'react';

// components
import { SegmentedUi } from 'aqueduct-components';
import ImportTabCoordinates from './tabs/coordinates';
import ImportTabAddresses from './tabs/addresses';
import ImportTabLink from './tabs/link';

// constants
import { TAB_OPTIONS } from './constants';

class ImportModal extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { tab: 'addresses' };
  }

  render() {
    const { tab } = this.state;

    return (
      <div className="c-coordinates-modal">
        <SegmentedUi
          className="-tabs-light"
          items={TAB_OPTIONS}
          selected={tab}
          onChange={({ value }) => { this.setState({ tab: value }); }}
        />
        {tab === 'link' && (<ImportTabLink />)}
        {tab === 'coordinates' && (<ImportTabCoordinates />)}
        {tab === 'addresses' && (<ImportTabAddresses />)}
      </div>
    );
  }
}

export default ImportModal;
