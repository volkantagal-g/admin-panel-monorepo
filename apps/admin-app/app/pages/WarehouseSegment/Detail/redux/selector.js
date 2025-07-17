import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';
import { getStateObject } from '@shared/utils/common';

const reducerKey = REDUX_KEY.WAREHOUSE_SEGMENT.DETAIL;

export const warehouseSegmentSelector = {
  getData: createSelector(
    state => getStateObject(state, reducerKey, 'warehouseSegment'),
    ({ data }) => data
  ),
  getIsPending: createSelector(
    state => getStateObject(state, reducerKey, 'warehouseSegment'),
    ({ isPending }) => isPending
  ),
};
export const warehousesBySegmentIdSelector = {
  getData: createSelector(
    state => getStateObject(state, reducerKey, 'warehouses'),
    ({ data }) => data
  ),
  getTotal: createSelector(
    state => getStateObject(state, reducerKey, 'warehouses'),
    ({ total }) => total
  ),
  getIsPending: createSelector(
    state => getStateObject(state, reducerKey, 'warehouses'),
    ({ isPending }) => isPending
  ),
};
