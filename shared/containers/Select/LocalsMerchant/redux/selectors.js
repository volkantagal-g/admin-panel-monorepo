import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.SELECT.LOCALS_MERCHANT;

export const getLocalsMerchantByNameSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getLocalsMerchantByName');
    },
    ({ data }) => data || [],
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getLocalsMerchantByName');
    },
    ({ isPending }) => isPending,
  ),
};
