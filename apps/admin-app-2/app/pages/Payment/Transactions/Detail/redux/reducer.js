import { createReducer } from 'reduxsauce';

import { Types } from './actions';
import { REFUND_REASONS } from '@app/pages/Payment/constants';

export const INITIAL_STATE = {
  transactionDetail: {
    data: null,
    error: null,
  },
  refundTable: { data: [] },
  refundDetailForm: { isConfirmed: false, refundReason: REFUND_REASONS[0].value, otherRefundReason: null },
  userRefund: {
    data: [],
    error: null,
    isPending: false,
  },
};

export const getTransactionDetailRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    transactionDetail: {
      ...state.transactionDetail,
      isPending: true,
      error: null,
    },
  };
};

export const getTransactionDetailSuccess = (state = INITIAL_STATE, { data = null }) => {
  return {
    ...state,
    transactionDetail: {
      ...state.transactionDetail,
      data,
      isPending: false,
      error: null,
    },
  };
};

export const getTransactionDetailFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    transactionDetail: {
      ...state.transactionDetail,
      isPending: false,
      error,
    },
  };
};

export const setRefundTableData = (state = INITIAL_STATE, { data = [] }) => {
  return {
    ...state,
    refundTable: {
      ...state.refundTable,
      data,
    },
  };
};

export const setRefundDetailForm = (state = INITIAL_STATE, { isConfirmed, refundReason, otherRefundReason }) => {
  return {
    ...state,
    refundDetailForm: {
      ...state.refundDetailForm,
      isConfirmed,
      refundReason,
      otherRefundReason,
    },
  };
};

const userRefundRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    userRefund: { ...state.userRefun, isPending: true },
  };
};

const userRefundSuccess = (state = INITIAL_STATE, { data = [] }) => {
  return {
    ...state,
    userRefund: {
      ...state.userRefund,
      data,
      isPending: false,
    },
  };
};

const userRefundFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    userRefund: {
      ...state.userRefund,
      isPending: false,
      error,
    },
  };
};

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_TRANSACTION_DETAIL_REQUEST]: getTransactionDetailRequest,
  [Types.GET_TRANSACTION_DETAIL_SUCCESS]: getTransactionDetailSuccess,
  [Types.GET_TRANSACTION_DETAIL_FAILURE]: getTransactionDetailFailure,

  [Types.USER_REFUND_REQUEST]: userRefundRequest,
  [Types.USER_REFUND_SUCCESS]: userRefundSuccess,
  [Types.USER_REFUND_FAILURE]: userRefundFailure,

  [Types.REFUND_TABLE]: setRefundTableData,
  [Types.REFUND_DETAIL_FORM]: setRefundDetailForm,

  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
