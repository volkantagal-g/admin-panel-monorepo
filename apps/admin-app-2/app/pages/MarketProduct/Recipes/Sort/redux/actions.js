import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  updateRecipeOrderBulkRequest: { body: null, domainType: null, showInactives: null, countryCode: null },
  updateRecipeOrderBulkSuccess: { data: [] },
  updateRecipeOrderBulkFailure: { error: null },
  toggleRecipeActivenessSwitch: { data: null },
  getRecipeOrdersRequest: { domainType: null, showInactives: null, countryCode: null },
  getRecipeOrdersSuccess: { data: [] },
  getRecipeOrdersFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.MARKET_PRODUCT.RECIPES.SORT}_` });
