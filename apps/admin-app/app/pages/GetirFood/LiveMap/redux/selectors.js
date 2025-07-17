import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.FOOD.LIVE_MAP;

export const getOverallStats = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'overallStats', 'data');
    },
    ({ data }) => {
      return data;
    }
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'overallStats', 'isPending');
    },
    ({ isPending }) => {
      return isPending;
    }
  ),
};

export const getCourierPlanAndCounts = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'courierPlanAndCounts', 'data');
    },
    ({ data }) => {
      return data;
    }
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'courierPlanAndCounts', 'isPending');
    },
    ({ isPending }) => {
      return isPending;
    }
  ),
};

export const getActiveOrderStats = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'activeOrderStats', 'data');
    },
    ({ data }) => {
      return data;
    }
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'activeOrderStats', 'isPending');
    },
    ({ isPending }) => {
      return isPending;
    }
  ),
};

export const getActiveOrderCouriersAndWarehouses = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'activeOrderCouriersAndWarehouses', 'data');
    },
    ({ data }) => {
      return data;
    }
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'activeOrderCouriersAndWarehouses', 'isPending');
    },
    ({ isPending }) => {
      return isPending;
    }
  ),
};
