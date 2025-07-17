import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.RETURNS;

export const returnsSelector = {
  getReturns: createSelector(
    state => {
      return state[reducerKey]?.returns;
    },
    ({ data }) => {
      return data;
    },
  ),
  getReturnsCount: createSelector(
    state => {
      return state[reducerKey]?.returns;
    },
    ({ totalCount }) => {
      return totalCount;
    },
  ),
  getReturnsPending: createSelector(
    state => {
      return state[reducerKey]?.returns;
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const returnDetailSelector = {
  getReturnDetail: createSelector(
    state => {
      return state[reducerKey]?.returnDetail;
    },
    ({ data }) => {
      return data.products;
    },
  ),
  getReturnDetailPending: createSelector(
    state => {
      return state[reducerKey]?.returnDetail;
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
  getReturnDetailError: createSelector(
    state => {
      return state[reducerKey]?.returnDetail;
    },
    ({ error }) => {
      return error;
    },
  ),
};

export const filtersSelector = {
  getFilters: state => {
    return state?.[reducerKey]?.filters;
  },
};
