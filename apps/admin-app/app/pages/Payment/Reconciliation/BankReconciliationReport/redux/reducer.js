import { createReducer } from 'reduxsauce';

import { Types } from './actions';
import { INIT_FILTERS_ORDER, INIT_FILTERS_TRANSACTION } from '../constants';

export const INITIAL_STATE = {
  reconciliations: {
    data: [],
    isPending: false,
    error: null,
  },
  refunds: {
    data: [],
    isPending: false,
    error: [],
  },
  manualRefunds: {
    data: [],
    isPending: false,
    error: [],
  },
  status: {
    data: null,
    isPending: false,
    error: [],
  },
  detail: {
    data: null,
    isPending: false,
    error: [],
  },
  exportCsv: {
    data: null,
    isPending: false,
    error: [],
  },
  transactionReconciliations: {
    data: [],
    isPending: false,
    error: null,
  },
  driveExportCsv: {
    data: null,
    isPending: false,
    error: [],
  },
  selectedRows: [],
  orderPagination: {
    page: INIT_FILTERS_ORDER.page,
    pageSize: INIT_FILTERS_ORDER.pageSize,
  },
  orderFilters: { filters: INIT_FILTERS_ORDER },
  transactionPagination: {
    page: INIT_FILTERS_TRANSACTION.page,
    pageSize: INIT_FILTERS_TRANSACTION.pageSize,
  },
  transactionFilters: { filters: INIT_FILTERS_TRANSACTION },

};

export const getReconciliationsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    reconciliations: {
      ...state.reconciliations,
      isPending: true,
    },
  };
};

export const getReconciliationsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    reconciliations: {
      ...state.reconciliations,
      isPending: false,
      data,
    },
  };
};

export const getReconciliationsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    reconciliations: {
      ...state.reconciliations,
      isPending: false,
      error,
    },
  };
};

export const refundsTransactionRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    refunds: {
      ...state.refunds,
      isPending: true,
    },
  };
};

export const refundsTransactionSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    refunds: {
      ...state.refunds,
      isPending: false,
      data,
    },
  };
};

export const refundsTransactionFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    refunds: {
      ...state.refunds,
      isPending: false,
      error,
    },
  };
};

export const manualRefundRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    manualRefunds: {
      ...state.manualRefunds,
      isPending: true,
    },
  };
};

export const manualRefundSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    manualRefunds: {
      ...state.manualRefunds,
      isPending: false,
      data,
    },
  };
};

export const manualRefundFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    manualRefunds: {
      ...state.manualRefunds,
      isPending: false,
      error,
    },
  };
};

export const exportCsvRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    exportCsv: {
      ...state.exportCsv,
      isPending: true,
    },
  };
};

export const exportCsvSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    exportCsv: {
      ...state.exportCsv,
      isPending: false,
      data,
    },
  };
};

export const exportCsvFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    exportCsv: {
      ...state.exportCsv,
      isPending: false,
      error,
    },
  };
};

export const getTransactionReconciliationsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    transactionReconciliations: {
      ...state.transactionReconciliations,
      isPending: true,
    },
  };
};

export const getTransactionReconciliationsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    transactionReconciliations: {
      ...state.transactionReconciliations,
      isPending: false,
      data,
    },
  };
};

export const getTransactionReconciliationsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    transactionReconciliations: {
      ...state.transactionReconciliations,
      isPending: false,
      error,
    },
  };
};

export const driveExportCsvRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    driveExportCsv: {
      ...state.driveExportCsv,
      isPending: true,
    },
  };
};

export const driveExportCsvSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    driveExportCsv: {
      ...state.driveExportCsv,
      isPending: false,
      data,
    },
  };
};

export const driveExportCsvFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    driveExportCsv: {
      ...state.driveExportCsv,
      isPending: false,
      error,
    },
  };
};

const setSelectedRows = (state, { selectedRows }) => ({
  ...state,
  selectedRows,
});

const setOrderPagination = (state = INITIAL_STATE, { page, pageSize }) => {
  return {
    ...state,
    orderPagination: {
      page,
      pageSize,
    },
  };
};

const submitOrderFilters = (state = INITIAL_STATE, { filters }) => {
  return {
    ...state,
    orderFilters: filters,
  };
};

const setTransactionPagination = (state = INITIAL_STATE, { page, pageSize }) => {
  return {
    ...state,
    transactionPagination: {
      page,
      pageSize,
    },
  };
};

const submitTransactionFilters = (state = INITIAL_STATE, { filters }) => {
  return {
    ...state,
    transactionFilters: filters,
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_RECONCILIATIONS_REQUEST]: getReconciliationsRequest,
  [Types.GET_RECONCILIATIONS_SUCCESS]: getReconciliationsSuccess,
  [Types.GET_RECONCILIATIONS_FAILURE]: getReconciliationsFailure,

  [Types.REFUNDS_TRANSACTION_REQUEST]: refundsTransactionRequest,
  [Types.REFUNDS_TRANSACTION_SUCCESS]: refundsTransactionSuccess,
  [Types.REFUNDS_TRANSACTION_FAILURE]: refundsTransactionFailure,

  [Types.MANUAL_REFUND_REQUEST]: manualRefundRequest,
  [Types.MANUAL_REFUND_SUCCESS]: manualRefundSuccess,
  [Types.MANUAL_REFUND_FAILURE]: manualRefundFailure,

  [Types.EXPORT_CSV_REQUEST]: exportCsvRequest,
  [Types.EXPORT_CSV_SUCCESS]: exportCsvSuccess,
  [Types.EXPORT_CSV_FAILURE]: exportCsvFailure,

  [Types.GET_TRANSACTION_RECONCILIATIONS_REQUEST]: getTransactionReconciliationsRequest,
  [Types.GET_TRANSACTION_RECONCILIATIONS_SUCCESS]: getTransactionReconciliationsSuccess,
  [Types.GET_TRANSACTION_RECONCILIATIONS_FAILURE]: getTransactionReconciliationsFailure,

  [Types.DRIVE_EXPORT_CSV_REQUEST]: driveExportCsvRequest,
  [Types.DRIVE_EXPORT_CSV_SUCCESS]: driveExportCsvSuccess,
  [Types.DRIVE_EXPORT_CSV_FAILURE]: driveExportCsvFailure,

  [Types.SET_SELECTED_ROWS]: setSelectedRows,
  [Types.SET_ORDER_PAGINATION]: setOrderPagination,
  [Types.SUBMIT_ORDER_FILTERS]: submitOrderFilters,

  [Types.SET_TRANSACTION_PAGINATION]: setTransactionPagination,
  [Types.SUBMIT_TRANSACTION_FILTERS]: submitTransactionFilters,

  [Types.DESTROY_PAGE]: destroy,
};
export default createReducer(INITIAL_STATE, HANDLERS);
