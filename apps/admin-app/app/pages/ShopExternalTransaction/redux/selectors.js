import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.GL_SHOP_EXTERNAL_TRANSACTION;

export const createShopExternalTransaction = { getIsPending: state => state?.[reducerKey]?.createExternalTransaction.isPending };

export const bulkExternalTransactionExcel = {
  getIsPending:
    state => state?.[reducerKey]?.validateBulkExternalTransactionExcel.isPending ||
      state?.[reducerKey]?.importBulkExternalTransactionExcel.isPending,
};

export const getExternalTransactionReport = { getIsPending: state => state?.[reducerKey]?.getExternalTransactionReport.isPending };

export const getShopById = {
  getData: state => state?.[reducerKey]?.getShopById?.data,
  getIsPending: state => state?.[reducerKey]?.getShopById?.isPending,
  getError: state => state?.[reducerKey]?.getShopById?.error,
};

export const getDeferredPaymentDateOptions = {
  getData: state => state?.[reducerKey]?.getDeferredPaymentDateOptions?.data,
  getIsPending: state => state?.[reducerKey]?.getDeferredPaymentDateOptions?.isPending,
  getError: state => state?.[reducerKey]?.getDeferredPaymentDateOptions?.error,
};
