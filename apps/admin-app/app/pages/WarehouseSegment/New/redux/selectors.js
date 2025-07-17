import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.WAREHOUSE_SEGMENT.NEW;

export const warehouseSegmentSelector = {
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouseSegment');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};
