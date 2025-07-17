import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.ARTISAN.LIVE_MAP;

export const getOverallStats = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'overallStats', 'data');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'overallStats', 'isPending');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const getCourierPlanAndCounts = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'courierPlanAndCounts', 'data');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'courierPlanAndCounts', 'isPending');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const getActiveOrderStats = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'activeOrderStats', 'data');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'activeOrderStats', 'isPending');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const getCouriers = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'couriers', 'data');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'couriers', 'isPending');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const redBasketDataSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'redBasketData');
    },
    data => {
      return data || [];
    },
  ),
};

export const getArtisanActiveOrders = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'artisanActiveOrders', 'data');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'artisanActiveOrders', 'isPending');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const getWarehouseSearchTerm = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouseSearchTerm');
    },
    data => {
      return data || '';
    },
  ),
};

export const getFoodCourierPlanAndCounts = {
  getData: state => state?.[reducerKey]?.foodCourierPlanAndCounts?.data,
  getIsPending: state => state?.[reducerKey]?.foodCourierPlanAndCounts?.isPending,
};
