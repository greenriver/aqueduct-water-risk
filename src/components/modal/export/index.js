import { connect } from 'react-redux';
import ExportModal from './component';

export default connect(
  state => ({
    filters: state.settings.tabFilters.basins,
    analysis: state.analyzeLocations.analysis,
  }), {}
)(ExportModal);
