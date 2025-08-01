import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.MERCHANTS.DETAIL;

export const merchantDetailSelector = {
  getData: state => state?.[reducerKey]?.merchantDetail?.data?.data,
  getIsPending: state => state?.[reducerKey]?.merchantDetail.isPending,
  getError: state => state?.[reducerKey]?.merchantDetail.error,
};

export const updateMerchantSelector = { getIsPending: state => state?.[reducerKey]?.updateMerchant.isPending };

export const updateMerchantWebhooksSelector = { getIsPending: state => state?.[reducerKey]?.updateMerchantWebhooks.isPending };

export const addPaymentMethodToPaymentProviderSelector = { getIsPending: state => state?.[reducerKey]?.addPaymentMethod.isPending };

export const createMerchantWebhooksSelector = { getIsPending: state => state?.[reducerKey]?.createMerchantWebhooks.isPending };

export const createMerchantPaymentProviderSelector = {
  getData: state => state?.[reducerKey]?.createMerchantPaymentProvider?.data?.data,
  getIsPending: state => state?.[reducerKey]?.createMerchantPaymentProvider.isPending,
};
