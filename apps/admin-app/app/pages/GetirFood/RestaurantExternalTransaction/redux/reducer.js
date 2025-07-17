import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  createExternalTransaction: {
    isPending: false,
    error: null,
  },
  validateBulkExternalTransactionExcel: {
    isPending: false,
    error: null,
  },
  importBulkExternalTransactionExcel: {
    isPending: false,
    error: null,
  },
  getExternalTransactionReport: {
    isPending: false,
    error: null,
  },
  getOrderFinancialsByOrderId: {
    data: {},
    isPending: false,
    error: null,
  },
  getRestaurantById: {
    data: null,
    isPending: false,
    error: null,
  },
  getDeferredPaymentDateOptions: {
    data: null,
    isPending: false,
    error: null,
  },
};

export const createExternalTransactionRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    createExternalTransaction: {
      ...state.createExternalTransaction,
      isPending: true,
    },
  };
};

export const createExternalTransactionSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    createExternalTransaction: {
      ...state.createExternalTransaction,
      isPending: false,
    },
  };
};

export const createExternalTransactionFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    createExternalTransaction: {
      ...INITIAL_STATE.createExternalTransaction,
      isPending: false,
      error,
    },
  };
};

export const validateBulkExternalTransactionExcelRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    validateBulkExternalTransactionExcel: {
      ...state.validateBulkExternalTransactionExcel,
      isPending: true,
    },
  };
};

export const validateBulkExternalTransactionExcelSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    validateBulkExternalTransactionExcel: {
      ...state.validateBulkExternalTransactionExcel,
      isPending: false,
    },
  };
};

export const validateBulkExternalTransactionExcelFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    validateBulkExternalTransactionExcel: {
      ...INITIAL_STATE.validateBulkExternalTransactionExcel,
      isPending: false,
      error,
    },
  };
};

export const importBulkExternalTransactionExcelRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    importBulkExternalTransactionExcel: {
      ...state.importBulkExternalTransactionExcel,
      isPending: true,
    },
  };
};

export const importBulkExternalTransactionExcelSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    importBulkExternalTransactionExcel: {
      ...state.importBulkExternalTransactionExcel,
      isPending: false,
    },
  };
};

export const importBulkExternalTransactionExcelFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    importBulkExternalTransactionExcel: {
      ...INITIAL_STATE.importBulkExternalTransactionExcel,
      isPending: false,
      error,
    },
  };
};

export const getExternalTransactionReportRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getExternalTransactionReport: {
      ...state.getExternalTransactionReport,
      isPending: true,
    },
  };
};

export const getExternalTransactionReportSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    getExternalTransactionReport: {
      ...state.getExternalTransactionReport,
      isPending: false,
    },
  };
};

export const getExternalTransactionReportFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getExternalTransactionReport: {
      ...INITIAL_STATE.importBulkEgetExternalTransactionReportxternalTransactionExcel,
      isPending: false,
      error,
    },
  };
};

export const getOrderFinancialsByOrderIdRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getOrderFinancialsByOrderId: {
      ...state.getOrderFinancialsByOrderId,
      isPending: true,
    },
  };
};

export const getOrderFinancialsByOrderIdSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getOrderFinancialsByOrderId: {
      ...state.getOrderFinancialsByOrderId,
      isPending: false,
      data: data.data,
    },
  };
};

export const getOrderFinancialsByOrderIdFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getOrderFinancialsByOrderId: {
      ...INITIAL_STATE.getOrderFinancialsByOrderId,
      isPending: false,
      error,
    },
  };
};

export const destroyOrderFinancialsByOrderIdData = (state = INITIAL_STATE) => {
  return {
    ...state,
    getOrderFinancialsByOrderId: { ...INITIAL_STATE.getOrderFinancialsByOrderId },
  };
};

export const getRestaurantByIdRequest = state => {
  return {
    ...state,
    getRestaurantById: {
      ...state.getRestaurantById,
      isPending: true,
      error: null,
      data: null,
    },
  };
};

export const getRestaurantByIdSuccess = (state, { data }) => {
  return {
    ...state,
    getRestaurantById: {
      ...state.getRestaurantById,
      isPending: false,
      data,
    },
  };
};

export const getRestaurantByIdFailure = (state, { error }) => {
  return {
    ...state,
    getRestaurantById: {
      ...INITIAL_STATE.getRestaurantById,
      isPending: false,
      error,
    },
  };
};

export const getDeferredPaymentDateOptionsRequest = state => {
  return {
    ...state,
    getDeferredPaymentDateOptions: {
      ...state.getDeferredPaymentDateOptions,
      isPending: true,
      error: null,
      data: null,
    },
  };
};

export const getDeferredPaymentDateOptionsSuccess = (state, { data }) => {
  return {
    ...state,
    getDeferredPaymentDateOptions: {
      ...state.getDeferredPaymentDateOptions,
      isPending: false,
      data,
    },
  };
};

export const getDeferredPaymentDateOptionsFailure = (state, { error }) => {
  return {
    ...state,
    getDeferredPaymentDateOptions: {
      ...state.getDeferredPaymentDateOptions,
      isPending: false,
      error,
    },
  };
};

export const destroyDeferredPaymentDateOptions = state => {
  return {
    ...state,
    getDeferredPaymentDateOptions: { ...INITIAL_STATE.getDeferredPaymentDateOptions },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.CREATE_EXTERNAL_TRANSACTION_REQUEST]: createExternalTransactionRequest,
  [Types.CREATE_EXTERNAL_TRANSACTION_SUCCESS]: createExternalTransactionSuccess,
  [Types.CREATE_EXTERNAL_TRANSACTION_FAILURE]: createExternalTransactionFailure,

  [Types.VALIDATE_BULK_EXTERNAL_TRANSACTION_EXCEL_REQUEST]: validateBulkExternalTransactionExcelRequest,
  [Types.VALIDATE_BULK_EXTERNAL_TRANSACTION_EXCEL_SUCCESS]: validateBulkExternalTransactionExcelSuccess,
  [Types.VALIDATE_BULK_EXTERNAL_TRANSACTION_EXCEL_FAILURE]: validateBulkExternalTransactionExcelFailure,

  [Types.IMPORT_BULK_EXTERNAL_TRANSACTION_EXCEL_REQUEST]: importBulkExternalTransactionExcelRequest,
  [Types.IMPORT_BULK_EXTERNAL_TRANSACTION_EXCEL_SUCCESS]: importBulkExternalTransactionExcelSuccess,
  [Types.IMPORT_BULK_EXTERNAL_TRANSACTION_EXCEL_FAILURE]: importBulkExternalTransactionExcelFailure,

  [Types.GET_EXTERNAL_TRANSACTION_REPORT_REQUEST]: getExternalTransactionReportRequest,
  [Types.GET_EXTERNAL_TRANSACTION_REPORT_SUCCESS]: getExternalTransactionReportSuccess,
  [Types.GET_EXTERNAL_TRANSACTION_REPORT_FAILURE]: getExternalTransactionReportFailure,

  [Types.GET_ORDER_FINANCIALS_BY_ORDER_ID_REQUEST]: getOrderFinancialsByOrderIdRequest,
  [Types.GET_ORDER_FINANCIALS_BY_ORDER_ID_SUCCESS]: getOrderFinancialsByOrderIdSuccess,
  [Types.GET_ORDER_FINANCIALS_BY_ORDER_ID_FAILURE]: getOrderFinancialsByOrderIdFailure,

  [Types.DESTROY_ORDER_FINANCIALS_BY_ORDER_ID_DATA]: destroyOrderFinancialsByOrderIdData,

  [Types.GET_RESTAURANT_BY_ID_REQUEST]: getRestaurantByIdRequest,
  [Types.GET_RESTAURANT_BY_ID_SUCCESS]: getRestaurantByIdSuccess,
  [Types.GET_RESTAURANT_BY_ID_FAILURE]: getRestaurantByIdFailure,

  [Types.GET_DEFERRED_PAYMENT_DATE_OPTIONS_REQUEST]: getDeferredPaymentDateOptionsRequest,
  [Types.GET_DEFERRED_PAYMENT_DATE_OPTIONS_SUCCESS]: getDeferredPaymentDateOptionsSuccess,
  [Types.GET_DEFERRED_PAYMENT_DATE_OPTIONS_FAILURE]: getDeferredPaymentDateOptionsFailure,

  [Types.DESTROY_DEFERRED_PAYMENT_DATE_OPTIONS]: destroyDeferredPaymentDateOptions,

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
