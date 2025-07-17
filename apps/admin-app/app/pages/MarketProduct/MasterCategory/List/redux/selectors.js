import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.MARKET_PRODUCT.CATEGORY.LIST;

export const getMasterMainCategoriesSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getMasterMainCategories');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getMasterMainCategories');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const getMasterCategoriesSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getMasterCategories');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getMasterCategories');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const getMasterClassesSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getMasterClasses');
    },
    ({ data }) => {
      return data || [];
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getMasterClasses');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const getMasterSubClassesSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getMasterSubClasses');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getMasterSubClasses');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const bulkUpdateMarketProductMasterCategoriesSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'bulkUpdateMarketProductMasterCategories');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'bulkUpdateMarketProductMasterCategories');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
  getError: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'bulkUpdateMarketProductMasterCategories');
    },
    ({ error }) => {
      return error;
    },
  ),
};

export const importCreateMasterCategorySelector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.importCreateMasterCategory.isPending,
  ),
};

export const importUpdateMasterCategorySelector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.importUpdateMasterCategory.isPending,
  ),
};

export const exportMasterCategorySelector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.exportMasterCategory.isPending,
  ),
};
