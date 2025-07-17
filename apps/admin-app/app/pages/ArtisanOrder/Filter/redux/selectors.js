import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.ARTISAN_ORDER.FILTER;

export const resultsSelector = {
  getResults: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'results');
    },
    ({ data }) => {
      return data;
    }
  ),
  isPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'results');
    },
    ({ isPending }) => {
      return isPending;
    }
  ),
};

export const filtersSelector = {
  getFilters: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'filters');
    },
    filters => {
      return filters;
    }
  ),
};

export const artisanOrderRootSelector = {
  getCities: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'cities');
    },
    cities => {
      return cities;
    }
  ),
  getPaymentMethods: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'paymentMethods');
    },
    paymentMethods => {
      return paymentMethods;
    }
  ),
};
