import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.MARKET_PRODUCT.GROUP.LIST;

export const getMarketProductGroupsSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getMarketProductGroups');
    },
    ({ data }) => {
      return data?.productGroupings || [];
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getMarketProductGroups');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};
