import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.TRANSFER_GROUP.NEW;

export const createTransferGroupSelector = {
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'createTransferGroup');
    },
    ({ isPending }) => {
      return isPending;
    }
  ),
};
