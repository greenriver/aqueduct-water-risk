import { connect } from 'react-redux';
import BasinAnalyzerTable from './component';
import { toggleModal } from 'aqueduct-components';

export default connect(
  state => ({
    filters: state.settings.tabFilters.basins,
    analysis: state.analyzeLocations.basinAnalysis
  }), {
    toggleModal
  }
)(BasinAnalyzerTable);
