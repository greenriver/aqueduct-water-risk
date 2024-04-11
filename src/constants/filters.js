import { APP_DEFINITIONS } from 'aqueduct-components';

export const TIMEFRAME_OPTIONS = [
  { value: '2030', label: '2030' },
  { value: '2050', label: '2050' },
  { value: '2080', label: '2080' }
];

export const timeScaleOptions = [
  { value: 'annual', label: 'Annual' },
  { value: 'monthly', label: 'Monthly' }
];

export const MONTH_OPTIONS = [
  { value: '1', label: 'January' },
  { value: '2', label: 'February' },
  { value: '3', label: 'March' },
  { value: '4', label: 'April' },
  { value: '5', label: 'May' },
  { value: '6', label: 'June' },
  { value: '7', label: 'July' },
  { value: '8', label: 'August' },
  { value: '9', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' }
];

export const projectionOptions = [
  { value: 'absolute', label: 'Absolute value' },
  { value: 'bs', label: 'Change from baseline' }
];

export const TIMEFRAME_MODAL_DESCRIPTION = {
  title: 'Timeframe',
  instructions: 'Each year represents the long-term trend over a 30 year period.',
  description: `
  <p>2030: 2015-2045</p>
  
  <p>2050: 2035-2065</p>
  
  <p>2080: 2065-2095</p>`,
  source: '<a href="https://doi.org/10.46830/writn.23.00061" target="_blank" rel="noopener noreferrer">Aqueduct 4.0</a>'
};

export const SCENARIO_MODAL_DESCRIPTION = {
  title: 'Scenarios',
  instructions: 'Select the scenario you want to check for each year and indicator',
  description: `<p>Optimistic:</p>
  <p>The "optimistic" scenario (SSP1 RCP2.6) represents a future that limits the rise in average global surface temperatures by 2100 to 1.3°C to 2.4°C compared to preindustrial levels (1850-1900). SSP1 is characterized by sustainable socioeconomic growth: stringent environmental regulations and effective institutions, rapid technological change and improved water use efficiencies, and low population growth.</p>

  <p>Business as usual</p>
  </p>The "business as usual" scenario (SSP3 RCP7.0) represents a middle-of-the-road future where temperatures increase by 2.8°C to 4.6°C by 2100. SSP3 is a socioeconomic scenario characterized by regional competition and inequality, including slow economic growth, weak governance and institutions, low investment in the environment and technology, and high population growth, especially in developing countries.</p>

  <p>Pessimistic</p>
  <p>The "pessimistic" scenario (SSP5 RCP8.5) represents a future where temperatures increase up to 3.3°C to 5.7°C by 2100. SSP5 describes fossil-fueled development: rapid economic growth and globalization powered by carbon-intensive energy, strong institutions with high investment in education and technology but a lack of global environmental concern, and the population peaking and declining in the 21st century.</p>  
  
  <p>GLOBAL CIRCULATION MODELS</p>
  <p>For each scenario, we ran five GCMs to account for the uncertainty in climate models: GFDL-ESM4, IPSL-CM6A-LR, MPI-ESM1-2-HR, MRI-ESM2-0, and UKESM1-0-LL. They were chosen because they represent a span of temperature-precipitation variations (e.g., wet-cold). We display the median of the 5 GCMs for each scenario.</p>`,
  source: '<a href="https://doi.org/10.46830/writn.23.00061" target="_blank" rel="noopener noreferrer">Aqueduct 4.0</a>'
};

export const SELECT_WATER_RISK_INDICATOR = {
  title: 'Select Water Risk Indicator',
  description: `
  <p>WATER STRESS</p>
  <p>Baseline water stress measures the ratio of total water demand to available renewable surface and groundwater supplies. Water demand include domestic, industrial, irrigation, and livestock uses. Available renewable water supplies include the impact of upstream consumptive water users and large dams on downstream water availability. Higher values indicate more competition among users.</p>
  
  <p>WATER DEPLETION</p>
  <p>Baseline water depletion measures the ratio of total water consumption to available renewable water supplies. Total water consumption includes domestic, industrial, irrigation, and livestock consumptive uses. Available renewable water supplies include the impact of upstream consumptive water users and large dams on downstream water availability. Higher values indicate larger impact on the local water supply and decreased water availability for downstream users. Baseline water depletion is similar to baseline water stress; however, instead of looking at total water demand (consumptive plus nonconsumptive), baseline water depletion is calculated using consumptive withdrawal only.</p>
  
  <p>GROWNWATER TABLE DECLINE</p>
  <p>Groundwater table decline measures the average decline of the groundwater table as the average change for the period of study (1990–2014). The result is expressed in centimeters per year (cm/yr). Higher values indicate higher levels of unsustainable groundwater withdrawals.</p>

  <p>COASTAL EUTROPHICATION POTENTIAL </p>
  <p>Coastal eutrophication potential (CEP) measures the potential for riverine loadings of nitrogen (N), phosphorus (P), and silica (Si) to stimulate harmful algal blooms in coastal waters. The CEP indicator is a useful metric to map where anthropogenic activities produce enough point-source and nonpoint-source pollution to potentially degrade the environment. When N and P are discharged in excess over Si with respect to diatoms, a major type of algae, undesirable algal species often develop. The stimulation of algae leading to large blooms may in turn result in eutrophication and hypoxia (excessive biological growth and decomposition that reduces oxygen available to other organisms). It is therefore possible to assess the potential for coastal eutrophication from a river’s N, P, and Si loading. Higher values indicate higher levels of excess nutrients with respect to silica, creating more favorable conditions for harmful algal growth and eutrophication in coastal waters downstream.</p>

  <p>UNIMPROVED / NO DRINKING WATER</p>
  <p>Unimproved/no drinking water reflects the percentage of the population collecting drinking water from an unprotected dug well or spring, or directly from a river, dam, lake, pond, stream, canal, or irrigation canal (WHO and UNICEF 2017). Specifically, the indicator aligns with the unimproved and surface water categories of the Joint Monitoring Programme (JMP)—the lowest tiers of drinking water services. Higher values indicate areas where people have less access to safe drinking water supplies.</p>

  <p>UNIMPROVED / NO SANITATION</p>
  <p>Unimproved/no sanitation reflects the percentage of the population using pit latrines without a slab or platform, hanging/bucket latrines, or directly disposing human waste in fields, forests, bushes, open bodies of water, beaches, other open spaces, or with solid waste (WHO and UNICEF 2017). Specifically, the indicator aligns with JMP’s unimproved and open defecation categories— the lowest tier of sanitation services. Higher values indicate areas where people have less access to improved sanitation services.</p>
  `,
  source: '<a href="https://doi.org/10.46830/writn.23.00061" target="_blank" rel="noopener noreferrer">Aqueduct 4.0</a>'
};

export const UNITOFMESUREMENT_MODAL_DESCRIPTION = {
  title: 'Unit of mesurement',
  instructions: 'Review the details that are associated with this measurement.',
  description: `
  <p>ABSOLUTE VALUE</p>
  <p>The Absolute value shows the projected score or volume at the selected timeframe. It represents the median of the 5 global climate models run under the scenario of choice.</p>
  
  <p>GLOBAL CIRCULATION MODELS</p>
  <p>For each scenario, we ran five GCMs to account for the uncertainty in climate models: GFDL-ESM4, IPSL-CM6A-LR, MPI-ESM1-2-HR, MRI-ESM2-0, and UKESM1-0-LL. They were chosen because they represent a span of temperature-precipitation variations (e.g., wet-cold).</p>
  
  <p>COMING SOON:</p>
  <p>Aqueduct will soon include “Change from baseline” and “Uncertainty” terms. Change from baseline will show the relative change expected in the future year compared to the 2019 baseline. Uncertainty will show the level of alignment among the 5 global climate models.</p>
  `,
  source: '<a href="https://doi.org/10.46830/writn.23.00061" target="_blank" rel="noopener noreferrer">Aqueduct 4.0</a>'
};

export const TEMPORAL_RESOLUTION_MODAL_DESCRIPTION = {
  title: 'Temporal resolution',
  instructions: 'Click on the Annual or Monthly button to change the temporal resolution. If you select Monthly, you can change the Month using the drop-down list.',
  description: 'View water risk data annually or by individual month.  Note: depending on the temporal resolution selected, different indicators will be available.'
};

export const BASIN_MODAL_PROPS = {
  name: 'Desired Conditions Threshold',
  description: 'A Desired condition threshold refers to your strategic goal for reducing or eliminating a specific water challenge (e.g., water stress, scarcity). Adjust the slider based on your ambition or the specific needs of each basin. The provided default values represent examples of thresholds that the private sector has adopted for setting contextual water targets. The map will then highlight areas that exceed your desired thresholds, indicating potential water challenges.'
};

export default {
  TIMEFRAME_OPTIONS,
  timeScaleOptions,
  MONTH_OPTIONS,
  projectionOptions,
  SCENARIO_MODAL_DESCRIPTION,
  TEMPORAL_RESOLUTION_MODAL_DESCRIPTION,
  TIMEFRAME_MODAL_DESCRIPTION,
  UNITOFMESUREMENT_MODAL_DESCRIPTION,
  BASIN_MODAL_PROPS
};
