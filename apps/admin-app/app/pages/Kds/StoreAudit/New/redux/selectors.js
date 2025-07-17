import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.KDS.STORE_AUDIT.NEW;

export const createStoreAuditSelector = {
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'storeAudit');
    },
    ({ isPending }) => {
      return isPending;
    }),
};
