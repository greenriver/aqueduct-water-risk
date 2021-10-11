import { connect } from 'react-redux';

// actions
import { toggleMobileFilters } from 'modules/settings/actions';

// component
import MobileFilters from './component';

export default connect(
  state => ({ mobileFilters: state.settings.mobileFilters }),
  { toggleMobileFilters }
)(MobileFilters);
