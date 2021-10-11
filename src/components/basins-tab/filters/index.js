import { connect } from 'react-redux';

// actions
import { setFilters, setTabFilters, toggleMobileFilters } from 'modules/settings/actions';
import { toggleModal } from 'aqueduct-components';
import { toggleAside } from 'modules/aside/reducers';

// component
import ActionFilters from './component';

export default connect(
  state => ({ filters: state.settings.filters, tabFilters: state.settings.tabFilters }),
  {
    setFilters,
    setTabFilters,
    toggleMobileFilters,
    toggleModal,
    toggleAside
  }
)(ActionFilters);
