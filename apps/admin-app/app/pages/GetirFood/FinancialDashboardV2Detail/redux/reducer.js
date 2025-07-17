import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  isFirstRequestCompleted: false,
  paymentDetails: {
    data: {},
    isPending: false,
    error: null,
  },
  exportPaymentDetailExcel: {
    data: {},
    isPending: false,
    error: null,
  },
};

export const getPaymentDetailsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    paymentDetails: {
      ...state.paymentDetails,
      isPending: true,
    },
  };
};

export const getPaymentDetailsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    isFirstRequestCompleted: true,
    paymentDetails: {
      ...state.paymentDetails,
      data,
      isPending: false,
    },
  };
};

export const getPaymentDetailsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    paymentDetails: {
      ...state.paymentDetails,
      isPending: false,
      error,
    },
  };
};

export const exportPaymentDetailExcelRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    exportPaymentDetailExcel: {
      ...state.exportPaymentDetailExcel,
      isPending: true,
    },
  };
};

export const exportPaymentDetailExcelSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    exportPaymentDetailExcel: {
      ...state.exportPaymentDetailExcel,
      data,
      isPending: false,
    },
  };
};

export const exportPaymentDetailExcelFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    exportPaymentDetailExcel: {
      ...state.exportPaymentDetailExcel,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_PAYMENT_DETAILS_REQUEST]: getPaymentDetailsRequest,
  [Types.GET_PAYMENT_DETAILS_SUCCESS]: getPaymentDetailsSuccess,
  [Types.GET_PAYMENT_DETAILS_FAILURE]: getPaymentDetailsFailure,

  [Types.EXPORT_PAYMENT_DETAIL_EXCEL_REQUEST]: exportPaymentDetailExcelRequest,
  [Types.EXPORT_PAYMENT_DETAIL_EXCEL_SUCCESS]: exportPaymentDetailExcelSuccess,
  [Types.EXPORT_PAYMENT_DETAIL_EXCEL_FAILURE]: exportPaymentDetailExcelFailure,

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
