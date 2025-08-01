import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';
import { classifyValidationErrors } from '@app/pages/MarketProduct/utils';

const reducerKey = REDUX_KEY.MARKET_PRODUCT.RECIPES.DETAIL;

export const getRecipeByIdSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getRecipeById');
    },
    ({ data }) => {
      return data || {};
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getRecipeById');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
  getError: createSelector(
    state => state[reducerKey],
    state => state?.getRecipeById?.error,
  ),
};

export const updateRecipeSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'updateRecipe');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'updateRecipe');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
  getError: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'updateRecipe');
    },
    ({ error }) => {
      return error;
    },
  ),
  getValidationErrors: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'updateRecipe');
    },
    state => {
      return classifyValidationErrors(state?.data?.details?.errors || []);
    },
  ),
};

export const marketProductSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'marketProducts');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'marketProducts');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
  getError: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'marketProducts');
    },
    ({ error }) => {
      return error;
    },
  ),
};

export const tableMarketProductsSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'tableMarketProducts');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'tableMarketProducts');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
  getError: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'tableMarketProducts');
    },
    ({ error }) => {
      return error;
    },
  ),
};

export const modalMarketProductsSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'modalMarketProducts');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'modalMarketProducts');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
  getError: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'modalMarketProducts');
    },
    ({ error }) => {
      return error;
    },
  ),
};

export const segmentsSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'segments');
    },
    ({ data }) => {
      return data.segments;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'segments');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
  getError: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'segments');
    },
    ({ error }) => {
      return error;
    },
  ),
};

export const createRecipeImageUrlSelector = {
  getUploadedImages: createSelector(
    state => state[reducerKey],
    state => state?.createRecipeImageUrl?.uploadedImages,
  ),
  getErroredImages: createSelector(
    state => state[reducerKey],
    state => state?.createRecipeImageUrl?.erroredImages,
  ),
};

export const isSubstituteProductsModalOpenSelector = createSelector(
  state => state?.[reducerKey],
  state => state?.isSubstituteProductsModalOpen,
);
