import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getMarketProductCategoryAvailableTimesRequest: { warehouses: undefined, categories: undefined, subCategories: undefined, domainTypes: undefined },
  getMarketProductCategoryAvailableTimesSuccess: { data: [] },
  getMarketProductCategoryAvailableTimesFailure: { error: null },
  getMarketProductCategoryAvailableTimesByCitiesRequest: {
    cities: undefined,
    warehouses: undefined,
    categories: undefined,
    subCategories: undefined,
    domainTypes: undefined,
    shouldFetchWarehouses: false,
  },
  getMarketProductCategoryAvailableTimesByCitiesSuccess: { data: [] },
  getMarketProductCategoryAvailableTimesByCitiesFailure: { error: null },
  clearMarketProductCategoryAvailableTimes: {},
  deleteMarketProductCategoryAvailableTimesRequest: { ids: undefined },
  deleteMarketProductCategoryAvailableTimesSuccess: {},
  deleteMarketProductCategoryAvailableTimesFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.MARKET_PRODUCT.CATEGORY.VISIBILITY.LIST}_` });
