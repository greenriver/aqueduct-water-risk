import { connect } from 'react-redux';

// actions
import { setSidebarWidth } from 'modules/app/actions';

// component
import MapPage from './component';

export default connect(
  state => ({
    loading: state.layers.loading || state.map.loading,
    analysis: state.analyzeLocations.analysis,
    analyzerOpen: state.settings.analyzer.open,
    scope: state.app.scope
  }),
  { setSidebarWidth }
)(MapPage);
