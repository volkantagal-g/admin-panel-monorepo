import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.FOOD.RESTAURANT_EXTERNAL_TRANSACTION;

export const createRestaurantExternalTransaction = {
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'createExternalTransaction', 'isPending');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const bulkExternalTransactionExcel = {
  getIsPending:
    state => state?.[reducerKey]?.validateBulkExternalTransactionExcel.isPending ||
      state?.[reducerKey]?.importBulkExternalTransactionExcel.isPending,
};

export const getExternalTransactionReport = { getIsPending: state => state?.[reducerKey]?.getExternalTransactionReport.isPending };

export const getOrderFinancialsByOrderId = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getOrderFinancialsByOrderId', 'data');
    },
    ({ data }) => data,
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getOrderFinancialsByOrderId', 'isPending');
    },
    ({ isPending }) => isPending,
  ),
};

export const getRestaurantById = {
  getData: state => state?.[reducerKey]?.getRestaurantById?.data,
  getIsPending: state => state?.[reducerKey]?.getRestaurantById?.isPending,
  getError: state => state?.[reducerKey]?.getRestaurantById?.error,
};

export const getDeferredPaymentDateOptions = {
  getData: state => state?.[reducerKey]?.getDeferredPaymentDateOptions?.data,
  getIsPending: state => state?.[reducerKey]?.getDeferredPaymentDateOptions?.isPending,
  getError: state => state?.[reducerKey]?.getDeferredPaymentDateOptions?.error,
};
