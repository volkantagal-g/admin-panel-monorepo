import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.MERCHANTS.NEW;

export const createMerchantSelector = {
  getData: createSelector(
    state => state?.[reducerKey]?.createMerchant?.data?.data,
    data => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => state?.[reducerKey]?.createMerchant.isPending,
    isPending => {
      return isPending;
    },
  ),
};

export const createMerchantPaymentProviderSelector = {
  getData: createSelector(
    state => state?.[reducerKey]?.createMerchantPaymentProvider?.data?.data,
    data => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => state?.[reducerKey]?.createMerchantPaymentProvider.isPending,
    isPending => {
      return isPending;
    },
  ),
};
