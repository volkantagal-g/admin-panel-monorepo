import { createSelector } from 'reselect';
import _ from 'lodash';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.MARKET_PRODUCT.CATEGORY.DETAIL;

export const getMarketProductCategoryByIdSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getMarketProductCategoryById');
    },
    ({ data }) => {
      return data || {};
    }
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getMarketProductCategoryById');
    },
    ({ isPending }) => {
      return isPending || false;
    }
  ),
};

export const updateMarketProductCategorySelector = {
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'updateMarketProductCategory');
    },
    ({ isPending }) => {
      return isPending || false;
    }
  ),
};

export const updateMarketProductCategoryAdditionalInfoSelector = {
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'updateMarketProductCategoryAdditionalInfo');
    },
    ({ isPending }) => {
      return isPending || false;
    }
  ),
  getError: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'updateMarketProductCategoryAdditionalInfo');
    },
    ({ error }) => {
      return error;
    }
  ),
};

export const updateMarketProductCategoryImageUrlSelector = {
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'updateMarketProductCategoryImageUrl');
    },
    ({ isPending }) => {
      return isPending || false;
    }
  ),
};

export const activateMarketProductCategorySelector = {
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'activateMarketProductCategory');
    },
    ({ isPending }) => {
      return isPending || false;
    }
  ),
};

export const deactivateMarketProductCategorySelector = {
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'deactivateMarketProductCategory');
    },
    ({ isPending }) => {
      return isPending || false;
    }
  ),
};

export const getMarketProductCategorySlugsSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getMarketProductCategorySlugs');
    },
    ({ data }) => {
      return _.get(data, 'categorySlugs', {}) || {};
    }
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getMarketProductCategorySlugs');
    },
    ({ isPending }) => {
      return isPending || false;
    }
  ),
};
