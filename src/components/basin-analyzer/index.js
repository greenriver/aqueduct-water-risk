import { connect } from 'react-redux';

// actions
import { toggleModal } from 'aqueduct-components';
import { setMapMode } from 'modules/app/actions';
import {
  clearAnalysis,
  onApplyBasinAnalysis,
  onFetchBasinAnalysis
} from 'modules/analyze-locations-tab/actions';
import { toggleMobileFilters } from 'modules/settings/actions';

// component
import BasinAnalyzer from './component';

export default connect(
  state => ({
    tabFilters: state.settings.tabFilters.basins,
    filters: state.settings.filters,
    points: state.analyzeLocations.points.list,
    mapMode: state.app.mapMode,
    scope: state.app.scope,
    basinAnalysis: state.analyzeLocations.basinAnalysis
  }),
  {
    toggleModal,
    toggleMobileFilters,
    setMapMode,
    clearAnalysis,
    onApplyBasinAnalysis,
    onFetchBasinAnalysis
  }
)(BasinAnalyzer);
