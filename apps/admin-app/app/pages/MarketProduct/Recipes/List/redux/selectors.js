import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.MARKET_PRODUCT.RECIPES.LIST;

export const recipesSelector = {
  getData: createSelector(
    state => state[reducerKey],
    state => state.recipes.data,
  ),
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.recipes.isPending,
  ),
  getTotalCount: createSelector(
    state => state[reducerKey],
    state => state.recipes.totalCount,
  ),
  getCurrentPage: createSelector(
    state => state[reducerKey],
    state => state.recipes.currentPage,
  ),
  getCurrentPageSize: createSelector(
    state => state[reducerKey],
    state => state.recipes.currentPageSize,
  ),
};

export const filtersSelector = {
  getSelectedDomains: createSelector(
    state => state[reducerKey],
    state => state?.filters.selectedDomains,
  ),
  getSelectedStatus: createSelector(
    state => state[reducerKey],
    state => state?.filters.selectedStatus,
  ),
  getQueryText: createSelector(
    state => state[reducerKey],
    state => state?.filters.queryText,
  ),
};

export const createRecipeSelector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state?.createRecipe.isPending,
  ),
};

export const isNewRecipeModalOpenSelector = createSelector(
  state => state?.[reducerKey],
  state => state?.isNewRecipeModalOpen,
);

export const countryCodeSelector = createSelector(
  state => state?.[reducerKey],
  state => state?.countryCode,
);
