import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.SELECT.LOCALS_MERCHANT_TYPE;

export const getLocalsMerchantTypeSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getLocalsMerchantTypes');
    },
    ({ data }) => data || [],
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getLocalsMerchantTypes');
    },
    ({ isPending }) => isPending,
  ),
};
