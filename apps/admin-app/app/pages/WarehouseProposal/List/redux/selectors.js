import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.WAREHOUSE_PROPOSAL.LIST;

export const warehouseProposalsSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouseProposals');
    },
    ({ data }) => {
      return data;
    },
  ),
  getTotal: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouseProposals');
    },
    ({ total }) => {
      return total;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouseProposals');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const warehouseProposalsReportSelector = {
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouseProposalsReport');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const citiesSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'cities');
    },
    ({ data }) => {
      return data || [];
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'cities');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const districtSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'districts');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'districts');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const filtersSelector = {
  getFilters: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'filters');
    },
    (filters = {}) => {
      return filters;
    },
  ),
};
