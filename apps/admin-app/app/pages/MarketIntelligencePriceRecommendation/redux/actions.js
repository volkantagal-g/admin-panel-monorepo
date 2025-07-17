import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions(
  {
    setFilteredTableData: { data: [] },
    setIntegrationType: { integrationType: null },
    setSubcategoryPercentage: { data: null },
    setPriceType: { data: null },
    setFilterList: { filters: null, hasFilter: null },
    setUpdateList: null,
    setExcelData: { data: null, bundleData: null },

    getRecommendationDataRequest: { domainType: null, data: {} },
    getRecommendationDataSuccess: { data: [] },
    getRecommendationDataFailure: { error: null },

    getSimulateIndexRequest: {
      productList: [],
      competitorList: [],
      domainType: null,
      baseCompetitor: null,
      indexType: null,
      priorityList: [],
    },
    getSimulateIndexSuccess: { data: [] },
    getSimulateIndexFailure: { error: null },

    getCompetitorListRequest: { domainType: null },
    getCompetitorListSuccess: { competitorList: [] },
    getCompetitorListFailure: { error: null },

    getPricingRulesDataRequest: { domainType: null },
    getPricingRulesDataSuccess: { data: [] },
    getPricingRulesDataFailure: { error: null },

    exportPriceRecommendationRequest: {
      rows: null,
      fileName: null,
      columns: null,
    },
    exportPriceRecommendationSuccess: null,
    exportPriceRecommendationFailure: { error: null },

    setClearFilteredData: null,
    initPage: null,
    destroyPage: null,
  },
  { prefix: `${REDUX_KEY.MARKET_INTELLIGENCE_PRICE_RECOMMENDATION}_` },
);
