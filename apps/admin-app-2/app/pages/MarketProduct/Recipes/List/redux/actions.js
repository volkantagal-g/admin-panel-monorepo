import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getRecipesRequest: { limit: 10, offset: 0, queryText: null, domainTypes: [], status: null, countryCode: null },
  getRecipesSuccess: { data: [] },
  getRecipesFailure: { error: null },
  initPage: null,
  destroyPage: null,
  setSelectedDomains: { selectedDomains: [] },
  setSelectedStatus: { selectedStatus: null },
  setQueryText: { queryText: null },
  openNewRecipeModal: null,
  closeNewRecipeModal: null,
  setCountryCode: { countryCode: null },
  setCurrentPage: { currentPage: 1 },
  setCurrentPageSize: { currentPageSize: 10 },
  createRecipeRequest: { body: null, onSuccess: null },
  createRecipeSuccess: { data: [] },
  createRecipeFailure: { error: null },
}, { prefix: `${REDUX_KEY.MARKET_PRODUCT.RECIPES.LIST}_` });
