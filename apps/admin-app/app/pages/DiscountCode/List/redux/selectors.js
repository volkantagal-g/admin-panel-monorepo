import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.DISCOUNT_CODE.LIST;

export const getDiscountCodeSelector = {
  getData: createSelector(
    state => state[reducerKey]?.discountCode,
    ({ data }) => (data?.discountCode ? [data.discountCode] : []),
  ),
  getIsPending: createSelector(
    state => state[reducerKey]?.discountCode,
    ({ isPending }) => isPending,
  ),
};

export const getDiscountCodeUsageClients = {
  getData: createSelector(
    state => state[reducerKey]?.discountCodeUsedClients,
    ({ data }) => data?.clients || [],
  ),
  getIsPending: createSelector(
    state => state[reducerKey]?.discountCodeUsedClients,
    ({ isPending }) => isPending,
  ),
};
