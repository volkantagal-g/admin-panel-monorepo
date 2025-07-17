import { createReducer } from 'reduxsauce';

import { Types } from './actions';
import { getInitialPaymentSummaryFilters } from '../utils';

export const INITIAL_STATE = {
  financialDashboardPayoutDetail: {
    data: {},
    isPending: false,
    error: null,
  },
  financialDashboardBankBalances: {
    data: {},
    isPending: false,
    error: null,
  },
  paymentDetailsSummary: {
    data: {},
    isPending: false,
    error: null,
  },
  paymentDetailsSummaryFilters: { ...getInitialPaymentSummaryFilters() },
  exportFailedPaybacksToExcel: {
    data: {},
    isPending: false,
    error: null,
  },
};

export const setPaymentDetailsSummaryFilters = (
  state = INITIAL_STATE,
  { startDate, currentPage, rowsPerPage },
) => {
  return {
    ...state,
    paymentDetailsSummaryFilters: {
      ...state.paymentDetailsSummaryFilters,
      startDate,
      currentPage,
      rowsPerPage,
    },
  };
};

export const getFinancialDashboardPayoutDetailRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    financialDashboardPayoutDetail: {
      ...state.financialDashboardPayoutDetail,
      isPending: true,
    },
  };
};

export const getFinancialDashboardPayoutDetailSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    financialDashboardPayoutDetail: {
      ...state.financialDashboardPayoutDetail,
      data,
      isPending: false,
    },
  };
};

export const getFinancialDashboardPayoutDetailFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    financialDashboardPayoutDetail: {
      ...state.financialDashboardPayoutDetail,
      isPending: false,
      error,
    },
  };
};

export const getFinancialDashboardBankBalancesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    financialDashboardBankBalances: {
      ...state.financialDashboardBankBalances,
      isPending: true,
    },
  };
};

export const getFinancialDashboardBankBalancesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    financialDashboardBankBalances: {
      ...state.financialDashboardBankBalances,
      data,
      isPending: false,
    },
  };
};

export const getFinancialDashboardBankBalancesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    financialDashboardBankBalances: {
      ...state.financialDashboardBankBalances,
      isPending: false,
      error,
    },
  };
};

export const getPaymentDetailsSummaryRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    paymentDetailsSummary: {
      ...state.paymentDetailsSummary,
      isPending: true,
    },
  };
};

export const getPaymentDetailsSummarySuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    paymentDetailsSummary: {
      ...state.paymentDetailsSummary,
      data,
      isPending: false,
    },
  };
};

export const getPaymentDetailsSummaryFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    paymentDetailsSummary: {
      ...state.paymentDetailsSummary,
      isPending: false,
      error,
    },
  };
};

export const exportFailedPaybacksToExcelRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    exportFailedPaybacksToExcel: {
      ...state.exportFailedPaybacksToExcel,
      isPending: true,
    },
  };
};

export const exportFailedPaybacksToExcelSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    exportFailedPaybacksToExcel: {
      ...state.exportFailedPaybacksToExcel,
      data,
      isPending: false,
    },
  };
};

export const exportFailedPaybacksToExcelFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    exportFailedPaybacksToExcel: {
      ...state.exportFailedPaybacksToExcel,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_FINANCIAL_DASHBOARD_PAYOUT_DETAIL_REQUEST]: getFinancialDashboardPayoutDetailRequest,
  [Types.GET_FINANCIAL_DASHBOARD_PAYOUT_DETAIL_SUCCESS]: getFinancialDashboardPayoutDetailSuccess,
  [Types.GET_FINANCIAL_DASHBOARD_PAYOUT_DETAIL_FAILURE]: getFinancialDashboardPayoutDetailFailure,

  [Types.GET_FINANCIAL_DASHBOARD_BANK_BALANCES_REQUEST]: getFinancialDashboardBankBalancesRequest,
  [Types.GET_FINANCIAL_DASHBOARD_BANK_BALANCES_SUCCESS]: getFinancialDashboardBankBalancesSuccess,
  [Types.GET_FINANCIAL_DASHBOARD_BANK_BALANCES_FAILURE]: getFinancialDashboardBankBalancesFailure,

  [Types.GET_PAYMENT_DETAILS_SUMMARY_REQUEST]: getPaymentDetailsSummaryRequest,
  [Types.GET_PAYMENT_DETAILS_SUMMARY_SUCCESS]: getPaymentDetailsSummarySuccess,
  [Types.GET_PAYMENT_DETAILS_SUMMARY_FAILURE]: getPaymentDetailsSummaryFailure,
  [Types.SET_PAYMENT_DETAILS_SUMMARY_FILTERS]: setPaymentDetailsSummaryFilters,

  [Types.EXPORT_FAILED_PAYBACKS_TO_EXCEL_REQUEST]: exportFailedPaybacksToExcelRequest,
  [Types.EXPORT_FAILED_PAYBACKS_TO_EXCEL_SUCCESS]: exportFailedPaybacksToExcelSuccess,
  [Types.EXPORT_FAILED_PAYBACKS_TO_EXCEL_FAILURE]: exportFailedPaybacksToExcelFailure,

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
