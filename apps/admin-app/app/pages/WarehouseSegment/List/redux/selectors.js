import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.WAREHOUSE_SEGMENT.LIST;

export const warehouseSegmentsSelector = {
  getData: createSelector(
    state => getStateObject(state, reducerKey, 'warehouseSegments'),
    ({ data = [] }) => data
  ),
  getTotal: createSelector(
    state => getStateObject(state, reducerKey, 'warehouseSegments'),
    ({ total }) => total
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouseSegments');
    },
    ({ isPending }) => {
      return isPending;
    }
  ),
};

export const warehouseSegmentReportSelector = {
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouseSegmentReport');
    },
    ({ isPending }) => {
      return isPending;
    }
  ),
};
