import { absoluteSeasonalVariability, absoluteWaterDemand, absoluteWaterStress, absoluteWaterSupply, proyectedChangeSeasonalVariability, proyectedChangeWaterDemand, proyectedChangeWaterStress, proyectedChangeWaterSupply } from './indicators';

export const TABLE_INDICATOR_VALUES = {
  w_awr_def_tot_cat: 'w_awr_def_tot_label',
  w_awr_def_qan_cat: 'w_awr_def_qan_label',
  w_awr_def_qal_cat: 'w_awr_def_qal_label',
  w_awr_def_rrr_cat: 'w_awr_def_rrr_label'
};

export const FUTURE_LAYERS_GROUPS = {
  [proyectedChangeWaterStress]: 'water_stress',
  [absoluteWaterStress]: 'water_stress',
  [proyectedChangeSeasonalVariability]: 'seasonal_variability',
  [absoluteSeasonalVariability]: 'seasonal_variability',
  [proyectedChangeWaterSupply]: 'water_supply',
  [absoluteWaterSupply]: 'water_supply',
  [proyectedChangeWaterDemand]: 'water_demand',
  [absoluteWaterDemand]: 'water_demand'
};

export default {
  TABLE_INDICATOR_VALUES,
  FUTURE_LAYERS_GROUPS
};
