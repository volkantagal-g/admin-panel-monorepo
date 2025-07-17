import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.LOTTERY.NEW;

export const createLotterySelector = {
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'createLottery');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const updateLotterySelector = {
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'updateLottery');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const getLotteryByIdSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getLotteryById');
    },
    ({ data }) => {
      return data || {};
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getLotteryById');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const getLotterySegmentsByIdSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getLotterySegmentsById');
    },
    ({ data }) => {
      return data || {};
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getLotterySegmentsById');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const createLotterySegmentsSelector = {
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'createLotterySegments');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
  getError: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'createLotterySegments');
    },
    ({ error }) => {
      return error;
    },
  ),
};
