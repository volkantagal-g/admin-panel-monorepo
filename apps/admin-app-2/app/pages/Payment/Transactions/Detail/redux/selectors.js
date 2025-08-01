import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.TRANSACTIONS.DETAIL;

export const transactionDetailSelector = {
  getData: createSelector(
    state => state?.[reducerKey]?.transactionDetail?.data?.data,
    data => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => state?.[reducerKey]?.transactionDetail.isPending,
    isPending => {
      return isPending;
    },
  ),
  getError: createSelector(
    state => state?.[reducerKey]?.transactionDetail.error,
    error => {
      return error;
    },
  ),
  getTransactionId: createSelector(
    state => state?.[reducerKey]?.transactionDetail?.data?.transactionId,
    data => {
      return data;
    },
  ),
  getMerchantId: state => state[reducerKey]?.transactionDetail?.data?.data?.merchant._id,
};

export const refundTable = { getData: state => state[reducerKey]?.refundTable?.data };
export const refundDetailForm = {
  getData: state => state[reducerKey]?.refundDetailForm,
  getRefundReason: state => state[reducerKey]?.refundDetailForm?.refundReason,
  getIsConfirmed: state => state[reducerKey]?.refundDetailForm?.isConfirmed,
  getOtherRefundReason: state => state[reducerKey]?.refundDetailForm?.otherRefundReason,
};
export const userRefundPending = { getIsPending: state => state[reducerKey]?.userRefund?.isPending };
