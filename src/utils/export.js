import { INDICATOR_THRESHOLD_TRANSFORMERS } from 'constants/indicators';

export const getExportSql = (indicator, thresholdParam, points = []) => {
  const threshold = INDICATOR_THRESHOLD_TRANSFORMERS[indicator](thresholdParam) || 0;
  const rawField = indicator.replace('cat', 'raw');
  const labelField = indicator.replace('cat', 'label');
  const pointsSql = points.map(({ lat, lng }) => `st_within(CDB_LatLng(${lat}, ${lng}), r.the_geom)`).join(' or ');
  const sql = `SELECT s.aq30_id as cartodb_id, s.name_0 as country, s.name_1 as province, s.pfaf_id as watershed_id, b.maj_name as major_basin, b.sub_names as minor_basin, coalesce(NULLIF(${labelField},''), 'No Data') as score, ${rawField} as raw_value, ${threshold} - ${rawField} as desired_change FROM water_risk_indicators_annual s LEFT JOIN y2018m12d06_rh_master_shape_v01 r on s.aq30_id=r.aq30_id LEFT JOIN basin_names b on s.pfaf_id = b.pfaf_id WHERE s.pfaf_id != -9999 and s.gid_1 != '-9999' and r.aqid != -9999 and ${rawField} < ${threshold} and (${pointsSql})`;
  return sql;
};
