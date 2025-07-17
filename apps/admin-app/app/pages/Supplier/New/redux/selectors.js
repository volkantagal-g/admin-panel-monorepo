import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.SUPPLIER.NEW;

export const createSupplierSelector = {
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'createSupplier');
    },
    ({ isPending }) => {
      return isPending;
    }
  ),
};
