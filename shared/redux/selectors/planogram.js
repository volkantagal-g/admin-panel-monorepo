import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.PLANOGRAM.PLANOGRAM_COMMON;

export const sizeListSelector = {
  getData: createSelector(
    state => state?.[reducerKey]?.sizeList,
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => state?.[reducerKey]?.sizeList,
    ({ isPending }) => {
      return isPending;
    },
  ),
};
export const demographyListSelector = {
  getData: createSelector(
    state => state?.[reducerKey]?.demographyList,
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => state?.[reducerKey]?.demographyList,
    ({ isPending }) => {
      return isPending;
    },
  ),
};
