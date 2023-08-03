// export const proyectedChangeWaterStress = 'ff7f5739-b2ef-4930-a7ab-7205a72a7dc3';
// export const proyectedChangeSeasonalVariability = '870edc4d-8112-4e3f-a823-3f6d0f02bf79';
// export const proyectedChangeWaterSupply = '9a59e767-c50a-4f05-9b71-6104acaa4108';
// export const proyectedChangeWaterDemand = 'c7c4d3b7-b6f6-46dc-bb03-311cc2a5557d';

// export const absoluteWaterStress = 'a7c3ffe1-aa0e-46ed-b947-d3cbafa2a5d1';
// export const absoluteSeasonalVariability = '3ad0a9aa-36e7-476b-9f78-113f1d76144a';
// export const absoluteWaterSupply = '4bbc7f03-c5fd-46d6-8212-318f3f3d85a3';
// export const absoluteWaterDemand = '0157ee28-48a2-43e7-8d68-b0f1d4a39bb1';


export const proyectedChangeWaterStress = '24211811-25fb-4e02-915d-b96f9a1aa43f';
export const proyectedChangeSeasonalVariability = '78fd9889-3514-4113-82d1-f5534e70b80d';
export const proyectedChangeWaterSupply = 'f8009540-f1a8-49a9-8950-b8cff9f0bb9c';
export const proyectedChangeWaterDemand = 'e50bb8a3-237b-44cf-ba5b-5cc0943ae141';
export const proyectedChangeInterannualVariability = '5000786e-35f4-401a-9304-595c374441ea';
export const proyectedChangeWaterDepletion = '446fd374-c94b-4db1-af5a-3e5b38a34587';

export const absoluteWaterStress = '1b4f2592-09fd-4ac4-afcd-5a0a9a63617b';
export const absoluteSeasonalVariability = '70198f5e-3967-4bf9-b8a5-24d3b7e20561';
export const absoluteWaterSupply = '13a99bb7-34f1-4aab-bd86-f6b7b4ffd30b';
export const absoluteWaterDemand = '2c41af51-4ea0-4e00-a7ab-30d7268c39ad';
export const absoluteInterannualVariability = 'b7e4a4d3-7a9a-4683-ba01-9a806877e072';
export const absoluteWaterDepletion = 'beca58ab-f8a3-4f46-b790-75951d24456e';

export const INDICATORS = [
  {
    id: 'w_awr_def_tot_cat',
    name: 'Overall Water Risk',
    overall: true,
    children: [
      {
        id: 'w_awr_def_qan_cat',
        name: 'Physical Risks Quantity',
        children: [
          {
            id: 'bws_cat',
            name: 'Water Stress',
            ponderation: true
          },
          {
            id: 'bwd_cat',
            name: 'Water Depletion',
            ponderation: true
          },
          {
            id: 'iav_cat',
            name: 'Interannual Variability',
            ponderation: true
          },
          {
            id: 'sev_cat',
            name: 'Seasonal Variability',
            ponderation: true
          },
          {
            id: 'gtd_cat',
            name: 'Groundwater Table Decline',
            ponderation: true
          },
          {
            id: 'rfr_cat',
            name: 'Riverine flood risk',
            ponderation: true
          },
          {
            id: 'cfr_cat',
            name: 'Coastal flood risk',
            ponderation: true
          },
          {
            id: 'drr_cat',
            name: 'Drought Risk',
            ponderation: true
          }
        ]
      },
      {
        id: 'w_awr_def_qal_cat',
        name: 'Physical Risks Quality',
        children: [
          {
            id: 'ucw_cat',
            name: 'Untreated Connected Wastewater',
            ponderation: true
          },
          {
            id: 'cep_cat',
            name: 'Coastal Eutrophication Potential',
            ponderation: true
          }
        ]
      },
      {
        id: 'w_awr_def_rrr_cat',
        name: 'Regulatory and Reputational Risk',
        children: [
          {
            id: 'udw_cat',
            name: 'Unimproved/No Drinking Water ',
            ponderation: true
          },
          {
            id: 'usa_cat',
            name: 'Unimproved/No Sanitation',
            ponderation: true
          },
          {
            id: 'rri_cat',
            name: 'Peak RepRisk Country ESG Risk Index',
            ponderation: true
          }
        ]
      }
    ]
  }
];

export const FUTURE_INDICATORS = {
  bs: [
    // projected change in water stress
    {
      id: proyectedChangeWaterStress,
      name: 'Water Stress'
    },
    // projected change in seasonal variability
    {
      id: proyectedChangeSeasonalVariability,
      name: 'Seasonal Variability'
    },
    // projected change in water supply
    {
      id: proyectedChangeWaterSupply,
      name: 'Water Supply'
    },
    // projected change in water demand
    {
      id: proyectedChangeWaterDemand,
      name: 'Water Demand'
    },
    // projected change Interannual Variability
    {
      id: proyectedChangeInterannualVariability,
      name: 'Interannual variability'
    },
    // projected change Water Depletion
    {
      id: proyectedChangeWaterDepletion,
      name: 'Water Depletion'
    }
  ],
  absolute: [
    // projected water stress
    {
      id: absoluteWaterStress,
      name: 'Water Stress'
    },
    // projected seasonal variability
    {
      id: absoluteSeasonalVariability,
      name: 'Seasonal Variability'
    },
    // projected water supply
    {
      id: absoluteWaterSupply,
      name: 'Water Supply'
    },
    // projected water demand
    {
      id: absoluteWaterDemand,
      name: 'Water Demand'
    },
    // proyected Interannual Variability
    {
      id: absoluteInterannualVariability,
      name: 'Interannual variability'
    },
    // projected change Water Depletion
    {
      id: absoluteWaterDepletion,
      name: 'Water Depletion'
    }
  ]
};

export const SCENARIO_DESCRIPTIONS = {
  pessimistic: 'The "pessimistic" scenario (SSP3 RCP8.5) represents a fragmented world with uneven economic development and steadily rising global carbon emissions.',
  business_as_usual: 'The "business as usual" scenario (SSP2 RCP8.5) represents a world with stable economic development and steadily rising global carbon emissions.',
  optimistic: 'The "optimistic" scenario (SSP2 RCP4.5) represents a world with stable economic development and carbon emissions peaking and declining by 2040.'
};

// "equivalence" of future indicators through their projection
export const FUTURE_INDICATORS_SWAP = {
  bs: {
    [absoluteWaterStress]: proyectedChangeWaterStress,
    [absoluteSeasonalVariability]: proyectedChangeSeasonalVariability,
    [absoluteWaterSupply]: proyectedChangeWaterSupply,
    [absoluteWaterDemand]: proyectedChangeWaterDemand,
    [absoluteInterannualVariability]: proyectedChangeInterannualVariability,
    [absoluteWaterDepletion]: proyectedChangeWaterDepletion
  },
  absolute: {
    [proyectedChangeWaterStress]: absoluteWaterStress,
    [proyectedChangeSeasonalVariability]: absoluteSeasonalVariability,
    [proyectedChangeWaterSupply]: absoluteWaterSupply,
    [proyectedChangeWaterDemand]: absoluteWaterDemand,
    [proyectedChangeInterannualVariability]: absoluteInterannualVariability,
    [proyectedChangeWaterDepletion]: absoluteWaterDepletion
  }
};

export const INDICATOR_NAMES_RELATION = {
  w_awr_def_tot_cat: 'Overall Water Risk',
  w_awr_def_qan_cat: 'Physical Risks Quantity',
  w_awr_def_qal_cat: 'Physical Risks Quality',
  w_awr_def_rrr_cat: 'Regulatory and Reputational Risk',
  // Physical Risks Quantity
  bws_cat: 'Water Stress',
  bwd_cat: 'Water Depletion',
  gtd_cat: 'Groundwater Table Decline',
  iav_cat: 'Interannual Variability',
  sev_cat: 'Seasonal Variability',
  drr_cat: 'Drought Risk',
  rfr_cat: 'Riverine flood risk',
  cfr_cat: 'Coastal flood risk',
  // Water Quality Risk
  ucw_cat: 'Untreated Connected Wastewater',
  cep_cat: 'Coastal Eutrophication Potential',
  // Regulatory and Reputational
  udw_cat: 'Unimproved/No Drinking Water',
  usa_cat: 'Unimproved/No Sanitation',
  rri_cat: 'Peak RepRisk Country ESG Risk Index',
  // future
  [proyectedChangeWaterStress]: 'Water Stress',
  [proyectedChangeSeasonalVariability]: 'Seasonal Variability',
  [proyectedChangeWaterSupply]: 'Water Supply',
  [proyectedChangeWaterDemand]: 'Water Demand',
  [proyectedChangeInterannualVariability]: 'Interannual Variability',
  [proyectedChangeWaterDepletion]: 'Water Depletion',
  [absoluteWaterStress]: 'Water Stress',
  [absoluteSeasonalVariability]: 'Seasonal Variability',
  [absoluteWaterSupply]: 'Water Supply',
  [absoluteWaterDemand]: 'Water Demand',
  [absoluteInterannualVariability]: 'Interannual Variability',
  [absoluteWaterDepletion]: 'Water Depletion'
};

export const INDICATOR_DESCRIPTIONS = {
  w_awr_def_tot_cat: {
    name: INDICATOR_NAMES_RELATION.w_awr_def_tot_cat,
    description: `Overall water risk measures all water-related risks, by aggregating all selected indicators
    from the Physical Quantity, Quality and Regulatory & Reputational Risk categories. Higher values
    indicate higher water risk.`,
    sources: [{
      name: 'WRI Aqueduct 2019',
      link: 'https://doi.org/10.46830/writn.23.00061'
    }]
  },
  w_awr_def_qan_cat: {
    name: INDICATOR_NAMES_RELATION.w_awr_def_qan_cat,
    description: `Physical risks quantity measures risk related to too little or too much water,
    by aggregating all selected indicators from the Physical Risk Quantity category. Higher values indicate higher water quantity risks.`,
    sources: [{
      name: 'WRI Aqueduct 2019',
      link: 'https://doi.org/10.46830/writn.23.00061'
    }]
  },
  w_awr_def_qal_cat: {
    name: INDICATOR_NAMES_RELATION.w_awr_def_qal_cat,
    description: `Physical risks quality measures risk related to water that is unfit for use,
    by aggregating all selected indicators from the Physical Risk Quality category. Higher values indicate higher water quality risks.`,
    sources: [{
      name: 'WRI Aqueduct 2019',
      link: 'https://doi.org/10.46830/writn.23.00061'
    }]
  },
  w_awr_def_rrr_cat: {
    name: INDICATOR_NAMES_RELATION.w_awr_def_rrr_cat,
    description: `Regulatory and reputational risks measures risk related to uncertainty in regulatory change,
    as well as conflicts with the public regarding water issues. Higher values indicate higher regulatory and
    reputational water risks.`,
    sources: [{
      name: 'WRI Aqueduct 2019',
      link: 'https://doi.org/10.46830/writn.23.00061'
    }]
  },
  // Water Quantity Risk
  bws_cat: {
    name: INDICATOR_NAMES_RELATION.bws_cat,
    description: `Baseline water stress measures the ratio of total water demand to available renewable surface
     and groundwater supplies. Water demand include domestic, industrial, irrigation, and livestock uses. 
     Available renewable water supplies include the impact of upstream consumptive water users and large dams
     on downstream water availability. Higher values indicate more competition among users.`,
    sources: [{
      name: 'WRI Aqueduct 2019',
      link: 'https://doi.org/10.46830/writn.23.00061'
    }]
  },
  bwd_cat: {
    name: INDICATOR_NAMES_RELATION.bwd_cat,
    description: `Baseline water depletion measures the ratio of total water consumption to available renewable 
    water supplies. Total water consumption includes domestic, industrial, irrigation, and livestock 
    consumptive uses. Available renewable water supplies include the impact of upstream consumptive water 
    users and large dams on downstream water availability. Higher values indicate larger impact on the local 
    water supply and decreased water availability for downstream users. Baseline water depletion is similar to 
    baseline water stress; however, instead of looking at total water demand (consumptive plus nonconsumptive), 
    baseline water depletion is calculated using consumptive withdrawal only`,
    sources: [{
      name: 'WRI Aqueduct 2019',
      link: 'https://doi.org/10.46830/writn.23.00061'
    }]
  },
  gtd_cat: {
    name: INDICATOR_NAMES_RELATION.gtd_cat,
    description: `Groundwater table decline measures the average decline
    of the groundwater table as the average change for the
    period of study (1990–2014). The result is expressed in
    centimeters per year (cm/yr). Higher values indicate
    higher levels of unsustainable groundwater
    withdrawals.`,
    sources: [{
      name: 'WRI Aqueduct 2019',
      link: 'https://doi.org/10.46830/writn.23.00061'
    }]
  },
  iav_cat: {
    name: INDICATOR_NAMES_RELATION.iav_cat,
    description: `Interannual variability measures the average betweenyear variability of available water supply, including both
    renewable surface and groundwater supplies. Higher values indicate wider variations in available supply from year to year. `,
    sources: [{
      name: 'WRI Aqueduct 2019',
      link: 'https://doi.org/10.46830/writn.23.00061'
    }]
  },
  sev_cat: {
    name: INDICATOR_NAMES_RELATION.sev_cat,
    description: `Seasonal variability measures the average within-year
    variability of available water supply, including both
    renewable surface and groundwater supplies. Higher
    values indicate wider variations of available supply within a year.`,
    sources: [{
      name: 'WRI Aqueduct 2019',
      link: 'https://doi.org/10.46830/writn.23.00061'
    }]
  },
  drr_cat: {
    name: INDICATOR_NAMES_RELATION.drr_cat,
    description: `Drought risk measures where droughts are likely to
    occur, the population and assets exposed, and the vulnerability of the population and assets to adverse effects.
    Higher values indicate higher risk of drought.`,
    sources: [{
      name: 'WRI Aqueduct 2019',
      link: 'https://doi.org/10.46830/writn.23.00061'
    }]
  },
  rfr_cat: {
    name: INDICATOR_NAMES_RELATION.rfr_cat,
    description: `Riverine flood risk measures the percentage of population
    expected to be affected by Riverine flooding in an average
    year, accounting for existing flood-protection standards.
    Flood risk is assessed using hazard (inundation caused by
    river overflow), exposure (population in flood zone), and
    vulnerability.16 The existing level of flood protection is also
    incorporated into the risk calculation. It is important to
    note that this indicator represents flood risk not in terms
    of maximum possible impact but rather as average annual
    impact. The impacts from infrequent, extreme flood years
    are averaged with more common, less newsworthy flood
    years to produce the “expected annual affected population.” Higher values indicate that a greater proportion of the population is expected to be impacted
    by Riverine floods on average.`,
    sources: [{
      name: 'WRI Aqueduct 2019',
      link: 'https://doi.org/10.46830/writn.23.00061'
    }]
  },
  cfr_cat: {
    name: INDICATOR_NAMES_RELATION.cfr_cat,
    description: `Coastal flood risk measures the percentage of the population expected to be affected by coastal flooding in an
    average year, accounting for existing flood protection
    standards. Flood risk is assessed using hazard (inundation caused by storm surge), exposure (population in
    flood zone), and vulnerability.17 The existing level of flood
    protection is also incorporated into the risk calculation.
    It is important to note that this indicator represents flood
    risk not in terms of maximum possible impact but rather
    as average annual impact. The impacts from infrequent,
    extreme flood years are averaged with more common, less
    newsworthy flood years to produce the “expected annual
    affected population.” Higher values indicate that a
    greater proportion of the population is expected
    to be impacted by coastal floods on average.`,
    sources: [{
      name: 'WRI Aqueduct 2019',
      link: 'https://doi.org/10.46830/writn.23.00061'
    }]
  },
  // Water Quality Risk
  ucw_cat: {
    name: INDICATOR_NAMES_RELATION.ucw_cat,
    description: `Untreated connected wastewater measures the percentage of domestic wastewater that is connected through
    a sewerage system and not treated to at least a primary
    treatment level. Wastewater discharge without adequate
    treatment could expose water bodies, the general public,
    and ecosystems to pollutants such as pathogens and
    nutrients. The indicator compounds two crucial elements
    of wastewater management: connection and treatment.
    Low connection rates reflect households’ lack of access to
    public sewerage systems; the absence of at least primary
    treatment reflects a country’s lack of capacity (infrastructure, institutional knowledge) to treat wastewater.
    Together these factors can indicate the level of a country’s
    current capacity to manage its domestic wastewater
    through two main pathways: extremely low connection
    rates (below 1 percent), and high connection rates with
    little treatment. Higher values indicate higher percentages of point source wastewater discharged
    without treatment.`,
    sources: [{
      name: 'WRI Aqueduct 2019',
      link: 'https://doi.org/10.46830/writn.23.00061'
    }]
  },
  cep_cat: {
    name: INDICATOR_NAMES_RELATION.cep_cat,
    description: `Coastal eutrophication potential (CEP) measures the
    potential for riverine loadings of nitrogen (N), phosphorus (P), and silica (Si) to stimulate harmful algal blooms
    in coastal waters. The CEP indicator is a useful metric
    to map where anthropogenic activities produce enough
    point-source and nonpoint-source pollution to potentially
    degrade the environment. When N and P are discharged
    in excess over Si with respect to diatoms, a major type
    of algae, undesirable algal species often develop. The
    stimulation of algae leading to large blooms may in turn
    result in eutrophication and hypoxia (excessive biological
    growth and decomposition that reduces oxygen available
    to other organisms). It is therefore possible to assess the
    potential for coastal eutrophication from a river’s N, P,
    and Si loading. Higher values indicate higher levels
    of excess nutrients with respect to silica, creating more favorable conditions for harmful algal
    growth and eutrophication in coastal waters
    downstream.`,
    sources: [{
      name: 'WRI Aqueduct 2019',
      link: 'https://doi.org/10.46830/writn.23.00061'
    }]
  },
  // Regulatory and Reputational
  udw_cat: {
    name: INDICATOR_NAMES_RELATION.udw_cat,
    description: `Unimproved/no drinking water reflects the percentage of the population collecting drinking water from an
    unprotected dug well or spring, or directly from a river,
    dam, lake, pond, stream, canal, or irrigation canal (WHO
    and UNICEF 2017). Specifically, the indicator aligns with
    the unimproved and surface water categories of the Joint
    Monitoring Programme (JMP)—the lowest tiers of drinking water services. Higher values indicate areas
    where people have less access to safe drinking
    water supplies.`,
    sources: [{
      name: 'WRI Aqueduct 2019',
      link: 'https://doi.org/10.46830/writn.23.00061'
    }]
  },
  usa_cat: {
    name: INDICATOR_NAMES_RELATION.usa_cat,
    description: `Unimproved/no sanitation reflects the percentage of the
    population using pit latrines without a slab or platform,
    hanging/bucket latrines, or directly disposing human
    waste in fields, forests, bushes, open bodies of water,
    beaches, other open spaces, or with solid waste (WHO
    and UNICEF 2017). Specifically, the indicator aligns with
    JMP’s unimproved and open defecation categories—
    the lowest tier of sanitation services. Higher values
    indicate areas where people have less access to
    improved sanitation services.`,
    sources: [{
      name: 'WRI Aqueduct 2019',
      link: 'https://doi.org/10.46830/writn.23.00061'
    }]
  },
  rri_cat: {
    name: INDICATOR_NAMES_RELATION.rri_cat,
    description: `The Peak RepRisk country ESG risk index quantifies
    business conduct risk exposure related to environmental,
    social, and governance (ESG) issues in the corresponding
    country. The index provides insights into potential financial, reputational, and compliance risks, such as human
    rights violations and environmental destruction. RepRisk
    is a leading business intelligence provider that specializes
    in ESG and business conduct risk research for companies,
    projects, sectors, countries, ESG issues, NGOs, and more,
    by leveraging artificial intelligence and human analysis
    in 20 languages. WRI has elected to include the Peak
    RepRisk country ESG risk index in Aqueduct to reflect
    the broader regulatory and reputational risks that may
    threaten water quantity, quality, and access. While the
    underlying algorithm is proprietary, we believe that our
    inclusion of the Peak RepRisk country ESG risk index,
    normally unavailable to the public, is a value-add to the
    Aqueduct community. The peak value equals the highest level of the index in a given country over the last two
    years. The higher the value, the higher the risk
    exposure.`,
    sources: [{
      name: 'WRI Aqueduct 2019',
      link: 'https://doi.org/10.46830/writn.23.00061'
    }]
  },
  // future
  [proyectedChangeWaterStress]: () => ({
    name: INDICATOR_NAMES_RELATION[proyectedChangeWaterStress],
    description: 'Water stress is an indicator of competition for water resources and is defined informally as the ratio of demand for water by human society divided by available water.',
    sources: [{
      name: 'Aqueduct 4.0',
      link: 'https://doi.org/10.46830/writn.23.00061'
    }]
  }),
  [proyectedChangeSeasonalVariability]: () => ({
    name: INDICATOR_NAMES_RELATION[proyectedChangeSeasonalVariability],
    description: 'Seasonal variability measures the average within-year variability of available water supply, including both renewable surface and groundwater supplies. Higher values indicate wider variations of available supply within a year.',
    sources: [{
      name: 'Aqueduct 4.0',
      link: 'https://doi.org/10.46830/writn.23.00061'
    }]
  }),
  [proyectedChangeWaterSupply]: () => ({
    name: INDICATOR_NAMES_RELATION[proyectedChangeWaterSupply],
    description: 'Available blue water—the total amount of renewable freshwater available to a sub-basin with upstream consumption removed—includes surface flow, interflow, and groundwater recharge. Available blue water is displayed as a flux (cm/year).',
    sources: [{
      name: 'Aqueduct 4.0',
      link: 'https://doi.org/10.46830/writn.23.00061'
    }]
  }),
  [proyectedChangeWaterDemand]: () => ({
    name: INDICATOR_NAMES_RELATION[proyectedChangeWaterDemand],
    description: 'Gross demand is the maximum potential water required to meet sectoral demands. Sectoral water demand includes: domestic, industrial, irrigation, and livestock. Demand is displayed as a flux (cm/year).',
    sources: [{
      name: 'Aqueduct 4.0',
      link: 'https://doi.org/10.46830/writn.23.00061'
    }]
  }),
  [proyectedChangeInterannualVariability]: () => ({
    name: INDICATOR_NAMES_RELATION[proyectedChangeInterannualVariability],
    description: 'Interannual variability measures the average between-year variability of available water supply, including both renewable surface and groundwater supplies. Higher values indicate wider variations in available supply from year to year.',
    sources: [{
      name: 'Aqueduct 4.0',
      link: 'https://doi.org/10.46830/writn.23.00061'
    }]
  }),
  [proyectedChangeWaterDepletion]: () => ({
    name: INDICATOR_NAMES_RELATION[proyectedChangeWaterDepletion],
    description: 'Water depletion measures the ratio of total water consumption to available renewable water supplies. Total water consumption includes domestic, industrial, irrigation, and livestock consumptive uses. Available renewable water supplies include the impact of upstream consumptive water users and large dams on downstream water availability. Higher values indicate larger impact on the local water supply and decreased water availability for downstream users. Water depletion is similar to water stress; however, instead of looking at total water demand, water depletion is calculated using consumptive withdrawal only.',
    sources: [{
      name: 'Aqueduct 4.0',
      link: 'https://doi.org/10.46830/writn.23.00061'
    }]
  }),
  [absoluteWaterStress]: () => ({
    name: INDICATOR_NAMES_RELATION[absoluteWaterStress],
    description: 'Water stress is an indicator of competition for water resources and is defined informally as the ratio of demand for water by human society divided by available water.',
    sources: [{
      name: 'Aqueduct 4.0',
      link: 'https://doi.org/10.46830/writn.23.00061'
    }]
  }),
  [absoluteSeasonalVariability]: () => ({
    name: INDICATOR_NAMES_RELATION[absoluteSeasonalVariability],
    description: 'Seasonal variability measures the average within-year variability of available water supply, including both renewable surface and groundwater supplies. Higher values indicate wider variations of available supply within a year.',
    sources: [{
      name: 'Aqueduct 4.0',
      link: 'https://doi.org/10.46830/writn.23.00061'
    }]
  }),
  [absoluteWaterSupply]: () => ({
    name: INDICATOR_NAMES_RELATION[absoluteWaterSupply],
    description: 'Available blue water—the total amount of renewable freshwater available to a sub-basin with upstream consumption removed—includes surface flow, interflow, and groundwater recharge. Available blue water is displayed as a flux (cm/year).',
    sources: [{
      name: 'Aqueduct 4.0',
      link: 'https://doi.org/10.46830/writn.23.00061'
    }]
  }),
  [absoluteWaterDemand]: () => ({
    name: INDICATOR_NAMES_RELATION[absoluteWaterDemand],
    description: 'Gross demand is the maximum potential water required to meet sectoral demands. Sectoral water demand includes: domestic, industrial, irrigation, and livestock. Demand is displayed as a flux (cm/year).',
    sources: [{
      name: 'Aqueduct 4.0',
      link: 'https://doi.org/10.46830/writn.23.00061'
    }]
  }),
  [absoluteInterannualVariability]: () => ({
    name: INDICATOR_NAMES_RELATION[absoluteInterannualVariability],
    description: 'Interannual variability measures the average between-year variability of available water supply, including both renewable surface and groundwater supplies. Higher values indicate wider variations in available supply from year to year.',
    sources: [{
      name: 'Aqueduct 4.0',
      link: 'https://doi.org/10.46830/writn.23.00061'
    }]
  }),
  [absoluteWaterDepletion]: () => ({
    name: INDICATOR_NAMES_RELATION[absoluteWaterDepletion],
    description: 'Water depletion measures the ratio of total water consumption to available renewable water supplies. Total water consumption includes domestic, industrial, irrigation, and livestock consumptive uses. Available renewable water supplies include the impact of upstream consumptive water users and large dams on downstream water availability. Higher values indicate larger impact on the local water supply and decreased water availability for downstream users. Water depletion is similar to water stress; however, instead of looking at total water demand, water depletion is calculated using consumptive withdrawal only.',
    sources: [{
      name: 'Aqueduct 4.0',
      link: 'https://doi.org/10.46830/writn.23.00061'
    }]
  })
};

// relates children layers with its parent in a straight way
export const PARENT_CHILDREN_LAYER_RELATION = {
  // Water Quantity Risk
  bws_cat: 'w_awr_def_qan_cat',
  bwd_cat: 'w_awr_def_qan_cat',
  gtd_cat: 'w_awr_def_qan_cat',
  iav_cat: 'w_awr_def_qan_cat',
  sev_cat: 'w_awr_def_qan_cat',
  drr_cat: 'w_awr_def_qan_cat',
  rfr_cat: 'w_awr_def_qan_cat',
  cfr_cat: 'w_awr_def_qan_cat',
  // Water Quality Risk
  ucw_cat: 'w_awr_def_qal_cat',
  cep_cat: 'w_awr_def_qal_cat',
  // Regulatory and Reputational
  udw_cat: 'w_awr_def_rrr_cat',
  usa_cat: 'w_awr_def_rrr_cat',
  rri_cat: 'w_awr_def_rrr_cat'
};

export const INDICATOR_COLUMNS = {
  // common columns for all indicators
  common: [
    { label: 'Name', value: 'location_name' },
    { label: 'Input address', value: 'input_address' },
    { label: 'Match address', value: 'match_address' },
    { label: 'Latitude', value: 'latitude' },
    { label: 'Longitude', value: 'longitude' },
    { label: 'Major Basin', value: 'major_basin_name' },
    { label: 'Minor Basin', value: 'minor_basin_name' },
    { label: 'Aquifer', value: 'aquifer_name' },
    { label: 'Country', value: 'name_0' },
    { label: 'Province', value: 'name_1' }
  ],
  // Overall Water Risk
  w_awr_def_tot_cat: [{ label: 'Overall Water Risk', value: 'w_awr_def_tot_label' }],
  // Water Quantity Risk
  w_awr_def_qan_cat: [
    { label: 'Physical Risks Quantity', value: 'w_awr_def_qan_label' },
    { label: 'Water Stress', value: 'bws_label' },
    { label: 'Groundwater Table Decline', value: 'gtd_label' },
    { label: 'Interannual Variability', value: 'iav_label' },
    { label: 'Seasonal Variability', value: 'sev_label' },
    { label: 'Drought Risk', value: 'drr_label' },
    { label: 'Riverine flood risk Stress', value: 'rfr_label' },
    { label: 'Coastal flood risk', value: 'cfr_label' }
  ],
  bws_cat: [{ label: 'Stress', value: 'bws_label' }],
  bwd_cat: [{ label: 'Depletion', value: 'bwd_label' }],
  iav_cat: [{ label: 'Interannual Variability', value: 'iav_label' }],
  gtd_cat: [{ label: 'Groundwater Table Decline', value: 'gtd_label' }],
  sev_cat: [{ label: 'Seasonal Variability', value: 'sev_label' }],
  drr_cat: [{ label: 'Drought Risk', value: 'drr_label' }],
  rfr_cat: [{ label: 'Riverine flood risk Stress', value: 'rfr_label' }],
  cfr_cat: [{ label: 'Coastal flood risk', value: 'cfr_label' }],
  // Water Quality Risk
  w_awr_def_qal_cat: [
    { label: 'Physical Risks Quality', value: 'w_awr_def_qal_label' },
    { label: 'Untreated Connected Water', value: 'ucw_label' },
    { label: 'Coastal Eutrophication Potential', value: 'cep_label' }
  ],
  ucw_cat: [{ label: 'Drought Risk', value: 'ucw_label' }],
  cep_cat: [{ label: 'Riverine flood risk Stress', value: 'cep_label' }],
  // Regulatory and Reputational
  w_awr_def_rrr_cat: [
    { label: 'Regulatory and Reputational Risk', value: 'w_awr_def_rrr_label' },
    { label: 'Unimproved/no drinking water', value: 'udw_label' },
    { label: 'Unimproved/no sanitation', value: 'usa_label' },
    { label: 'Peak RepRisk country ESG risk index', value: 'rri_label' }
  ],
  udw_cat: [{ label: 'Unimproved/no drinking water', value: 'udw_label' }],
  usa_cat: [{ label: 'Unimproved/no sanitation', value: 'usa_label' }],
  rri_cat: [{ label: 'Peak RepRisk country ESG risk index', value: 'rri_label' }],
  projected_change: [
    { label: 'Projected Change In {{indicator}} ({{projection}} To {{year}} {{scenario}} )', value: 'label' }
  ],
  // monthly exclusive
  monthly: {
    bws_cat: [{ label: 'Water Stress', value: 'bws_label' }],
    bwd_cat: [{ label: 'Water Depletion', value: 'bwd_label' }],
    iav_cat: [{ label: 'Interannual Variability', value: 'iav_label' }]
  },
  preset: {
    w_awr_def_tot_cat: [{ label: 'Overall Water Risk', value: 'w_awr_def_tot_label' }],
    w_awr_def_qan_cat: [{ label: 'Water Quantity Risk', value: 'w_awr_def_qan_label' }],
    w_awr_def_qal_cat: [{ label: 'Water Quality Risk', value: 'w_awr_def_qal_label' }],
    w_awr_def_rrr_cat: [{ label: 'Regulatory and Reputational', value: 'w_awr_def_rrr_label' }]
  }
};

export const INDICATOR_SCHEME_ORDER = [
  'bws_cat', 'bwd_cat', 'iav_cat', 'sev_cat',
  'gtd_cat', 'rfr_cat', 'cfr_cat', 'drr_cat',
  'ucw_cat', 'cep_cat', 'udw_cat', 'usa_cat', 'rri_cat'
];

export const INDICATOR_THRESHOLD_TRANSFORMERS = {
  bws_cat: threshold => parseFloat(threshold) ? parseFloat(threshold) / 100 : 0,
  bwd_cat: threshold => parseFloat(threshold) ? parseFloat(threshold) / 100 : 0,
  gtd_cat: threshold => parseFloat(threshold) || 0,
  cep_cat: threshold => parseFloat(threshold) || 0,
  udw_cat: threshold => parseFloat(threshold) ? parseFloat(threshold) / 100 : 0,
  usa_cat: threshold => parseFloat(threshold) ? parseFloat(threshold) / 100 : 0
};

export const EXCLUSIVE_MONTHLY_INDICATORS = ['bws_cat', 'bwd_cat', 'iav_cat'];

export const DEFAULT_FUTURE_INDICATOR = {
  bs: proyectedChangeWaterStress,
  absolute: absoluteWaterStress
};

export const DEFAULT_FUTURE_YEAR = '2030';

export const FUTURE_INDICATORS_IDS = [...FUTURE_INDICATORS.bs, ...FUTURE_INDICATORS.absolute].map(_indicator => _indicator.id);

export const ANALYZER_LOCATION_INDICATORS = [
  INDICATORS[0],
  ...INDICATORS[0].children,
  {
    name: 'Projected change',
    isFuture: true,
    // this id will change based on user's selection
    id: DEFAULT_FUTURE_INDICATOR.bs
  }
];

export const INDICATORS_MODAL_DEFINITION = {
  title: 'Relevance to Industry',
  description: `
  <ul>
    <li>No weight 0 Not relevant</li>
    <li>Very Low 0.25 Represents very low relevance to the industry</li>
    <li>Low 0.5 Represents low relevance to the industry</li>
    <li>Medium 1 Represents medium relevance to the industry</li>
    <li>High 2 Represents high relevance to the industry</li>
    <li>Very High 4 Represents very high relevance to the industry</li>
  </ul>`
};

export default {
  INDICATORS,
  FUTURE_INDICATORS,
  FUTURE_INDICATORS_SWAP,
  PARENT_CHILDREN_LAYER_RELATION,
  INDICATOR_COLUMNS,
  INDICATOR_NAMES_RELATION,
  INDICATOR_DESCRIPTIONS,
  INDICATOR_SCHEME_ORDER,
  EXCLUSIVE_MONTHLY_INDICATORS,
  DEFAULT_FUTURE_INDICATOR,
  DEFAULT_FUTURE_YEAR,
  FUTURE_INDICATORS_IDS,
  ANALYZER_LOCATION_INDICATORS,
  INDICATORS_MODAL_DEFINITION
};
