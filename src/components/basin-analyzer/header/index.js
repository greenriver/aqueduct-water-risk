import { connect } from 'react-redux';

// actions
import { toggleModal } from 'aqueduct-components';
import { setMapMode } from 'modules/app/actions';
import {
  clearAnalysis,
  onApplyBasinAnalysis,
  onFetchBasinAnalysis
} from 'modules/analyze-locations-tab/actions';
import { setAnalyzerOpen, toggleMobileFilters } from 'modules/settings/actions';

// component
import BasinAnalyzer from './component';

export default connect(
  state => ({
    points: state.analyzeLocations.points.list,
    mapMode: state.app.mapMode,
    scope: state.app.scope,
    analyzerOpen: state.settings.analyzer.open
  }),
  {
    toggleModal,
    toggleMobileFilters,
    setMapMode,
    clearAnalysis,
    onApplyBasinAnalysis,
    setAnalyzerOpen,
    onFetchBasinAnalysis
  }
)(BasinAnalyzer);
