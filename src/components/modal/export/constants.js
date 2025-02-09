import { LEGENDS, SHORT_NAMES } from '../../map/constants';

const renderStatic = (indicator, value, fixed = 0) => `${value && value.toFixed(fixed)}${(LEGENDS[indicator] && LEGENDS[indicator].unit) || ''}`;
const renderPercent = (indicator, value, fixed = 0) => `${value && (value * 100).toFixed(fixed)}%`;
export const INDICATOR_RAW_VALUE_RENDER_MAP = {
  bws_cat: value => renderPercent('bws_cat', value),
  bwd_cat: value => renderPercent('bwd_cat', value),
  gtd_cat: value => renderStatic('gtd_cat', value, 2),
  cep_cat: value => renderStatic('cep_cat', value, 2),
  udw_cat: value => renderPercent('udw_cat', value),
  usa_cat: value => renderPercent('usa_cat', value)
};

export const COLUMNS = [
  {
    label: 'Watershed ID',
    value: 'watershed_id'
  },
  {
    label: 'Name',
    value: 'location_name'
  },
  {
    label: 'Input Address',
    value: 'input_address'
  },
  {
    label: 'Match Address',
    value: 'match_address'
  },
  {
    label: 'Latitude',
    value: 'lat'
  },
  {
    label: 'Longitude',
    value: 'lng'
  },
  {
    label: 'Major Basin',
    value: 'major_basin'
  },
  {
    label: 'Minor Basin',
    value: 'minor_basin'
  },
  {
    label: 'Country',
    value: 'country'
  },
  {
    label: 'Province',
    value: 'province'
  },
  {
    label: (indicator) => `${(SHORT_NAMES[indicator]) || ''} Score`.trim(),
    value: 'score'
  },
  {
    label: (indicator) => `${(SHORT_NAMES[indicator]) || ''} Raw Value`.trim(),
    value: 'raw_value',
    render: (indicator, value) => INDICATOR_RAW_VALUE_RENDER_MAP[indicator] ? INDICATOR_RAW_VALUE_RENDER_MAP[indicator](value) : value
  },
  {
    label: (indicator) => `${(SHORT_NAMES[indicator]) || ''} Desired Condition`.trim(),
    value: 'threshold',
    render: (indicator, value) => INDICATOR_RAW_VALUE_RENDER_MAP[indicator] ? INDICATOR_RAW_VALUE_RENDER_MAP[indicator](value) : value
  },
  {
    label: (indicator) => `${(SHORT_NAMES[indicator]) || ''} % Change Required`.trim(),
    value: 'desired_change',
    render: (indicator, value) => renderPercent(indicator, value)
  }
];
