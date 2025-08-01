import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({

  getCategoriesRequest: { data: {} },
  getCategoriesSuccess: { data: [] },
  getCategoriesFailure: { error: null },

  getSubCategoriesRequest: { data: {} },
  getSubCategoriesSuccess: { data: [] },
  getSubCategoriesFailure: { error: null },

  fetchCompetitorListRequest: { afterSuccess: null },
  fetchCompetitorListSuccess: { competitorList: [] },
  fetchCompetitorListFailure: { error: null },

  postIndexByDataRequest: { fetchData: {}, indexBy: '' },
  postIndexByDataSuccess: { data: [] },
  postIndexByDataFailure: { error: null },

  exportPriceIndexRequest: { data: {} },
  exportPriceIndexSuccess: {},
  exportPriceIndexFailure: { error: null },

  setInitialTable: null,
  setCompetitorList: null,
  setIndexBy: { data: null },
  setSelectedProduct: { selectedProduct: {} },
  setFilterList: { filters: null, hasFilter: null },
  setClearFilter: null,

  initPage: null,
  destroyPage: null,

}, { prefix: `${REDUX_KEY.MARKET_INTELLIGENCE_PRICE_INDEX}_` });
