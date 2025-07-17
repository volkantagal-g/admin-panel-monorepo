import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  setFilteredTableData: { data: [] },
  setSubcategoryPercentage: { data: null },
  setPriceType: { data: null },
  setShowAandM: { data: null },
  setFilterList: { filters: null, hasFilter: null },
  setExcelData: { data: [] },
  setUpdateList: null,

  getElasticityDataRequest: { data: {} },
  getElasticityDataSuccess: { data: [], showAandM: null },
  getElasticityDataFailure: { error: null },

  getSimulateIndexRequest: { productList: [] },
  getSimulateIndexSuccess: { data: [] },
  getSimulateIndexFailure: { error: null },

  exportPricingToolRequest: { data: {} },
  exportPricingToolSuccess: { },
  exportPricingToolFailure: { error: null },

  setClearFilteredData: null,
  initPage: null,
  destroyPage: null,

}, { prefix: `${REDUX_KEY.PRICING_TOOL}_` });
