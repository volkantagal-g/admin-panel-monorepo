import { createReducer } from 'reduxsauce';

export const SHARED_INITIAL_STATE = {
  withholdingTaxReports: {
    data: {},
    isPending: false,
    error: null,
  },
  withholdingTaxReportsSummary: {
    data: {},
    isPending: false,
    error: null,
  },
  exportWithholdingTaxReportsSummaryExcel: {
    data: {},
    isPending: false,
    error: null,
  },
  exportWithholdingTaxReportsExcel: {
    data: {},
    isPending: false,
    error: null,
  },
  exportWithholdingTaxReportsByFilterType: {
    data: {},
    isPending: false,
    error: null,
  },
};

export const createVerticalReducer = Types => {
  const getWithholdingTaxReportsRequest = state => ({
    ...state,
    withholdingTaxReports: {
      ...state.withholdingTaxReports,
      isPending: true,
      error: null,
    },
  });

  const getWithholdingTaxReportsSuccess = (state, { data }) => ({
    ...state,
    withholdingTaxReports: {
      ...state.withholdingTaxReports,
      data,
      isPending: false,
      error: null,
    },
  });

  const getWithholdingTaxReportsFailure = (state, { error }) => ({
    ...state,
    withholdingTaxReports: {
      ...state.withholdingTaxReports,
      isPending: false,
      error,
    },
  });

  const getWithholdingTaxReportsSummaryRequest = state => ({
    ...state,
    withholdingTaxReportsSummary: {
      ...state.withholdingTaxReportsSummary,
      isPending: true,
      error: null,
    },
  });

  const getWithholdingTaxReportsSummarySuccess = (state, { data }) => ({
    ...state,
    withholdingTaxReportsSummary: {
      ...state.withholdingTaxReportsSummary,
      data,
      isPending: false,
      error: null,
    },
  });

  const getWithholdingTaxReportsSummaryFailure = (state, { error }) => ({
    ...state,
    withholdingTaxReportsSummary: {
      ...state.withholdingTaxReportsSummary,
      isPending: false,
      error,
    },
  });

  const exportWithholdingTaxReportsSummaryExcelRequest = state => ({
    ...state,
    exportWithholdingTaxReportsSummaryExcel: {
      ...state.exportWithholdingTaxReportsSummaryExcel,
      isPending: true,
    },
  });

  const exportWithholdingTaxReportsSummaryExcelSuccess = (state, { data }) => ({
    ...state,
    exportWithholdingTaxReportsSummaryExcel: {
      ...state.exportWithholdingTaxReportsSummaryExcel,
      data,
      isPending: false,
    },
  });

  const exportWithholdingTaxReportsSummaryExcelFailure = (state, { error }) => ({
    ...state,
    exportWithholdingTaxReportsSummaryExcel: {
      ...state.exportWithholdingTaxReportsSummaryExcel,
      isPending: false,
      error,
    },
  });

  const exportWithholdingTaxReportsExcelRequest = state => ({
    ...state,
    exportWithholdingTaxReportsExcel: {
      ...state.exportWithholdingTaxReportsExcel,
      isPending: true,
    },
  });

  const exportWithholdingTaxReportsExcelSuccess = (state, { data }) => ({
    ...state,
    exportWithholdingTaxReportsExcel: {
      ...state.exportWithholdingTaxReportsExcel,
      data,
      isPending: false,
    },
  });

  const exportWithholdingTaxReportsExcelFailure = (state, { error }) => ({
    ...state,
    exportWithholdingTaxReportsExcel: {
      ...state.exportWithholdingTaxReportsExcel,
      isPending: false,
      error,
    },
  });

  const exportWithholdingTaxReportsByFilterTypeRequest = state => ({
    ...state,
    exportWithholdingTaxReportsByFilterType: {
      ...state.exportWithholdingTaxReportsByFilterType,
      isPending: true,
    },
  });

  const exportWithholdingTaxReportsByFilterTypeSuccess = (state, { data }) => ({
    ...state,
    exportWithholdingTaxReportsByFilterType: {
      ...state.exportWithholdingTaxReportsByFilterType,
      data,
      isPending: false,
    },
  });

  const exportWithholdingTaxReportsByFilterTypeFailure = (state, { error }) => ({
    ...state,
    exportWithholdingTaxReportsByFilterType: {
      ...state.exportWithholdingTaxReportsByFilterType,
      isPending: false,
      error,
    },
  });

  const initPage = () => SHARED_INITIAL_STATE;
  const destroyPage = () => SHARED_INITIAL_STATE;

  const HANDLERS = {
    [Types.GET_WITHHOLDING_TAX_REPORTS_REQUEST]: getWithholdingTaxReportsRequest,
    [Types.GET_WITHHOLDING_TAX_REPORTS_SUCCESS]: getWithholdingTaxReportsSuccess,
    [Types.GET_WITHHOLDING_TAX_REPORTS_FAILURE]: getWithholdingTaxReportsFailure,
    [Types.GET_WITHHOLDING_TAX_REPORTS_SUMMARY_REQUEST]: getWithholdingTaxReportsSummaryRequest,
    [Types.GET_WITHHOLDING_TAX_REPORTS_SUMMARY_SUCCESS]: getWithholdingTaxReportsSummarySuccess,
    [Types.GET_WITHHOLDING_TAX_REPORTS_SUMMARY_FAILURE]: getWithholdingTaxReportsSummaryFailure,
    [Types.EXPORT_WITHHOLDING_TAX_REPORTS_SUMMARY_EXCEL_REQUEST]: exportWithholdingTaxReportsSummaryExcelRequest,
    [Types.EXPORT_WITHHOLDING_TAX_REPORTS_SUMMARY_EXCEL_SUCCESS]: exportWithholdingTaxReportsSummaryExcelSuccess,
    [Types.EXPORT_WITHHOLDING_TAX_REPORTS_SUMMARY_EXCEL_FAILURE]: exportWithholdingTaxReportsSummaryExcelFailure,
    [Types.EXPORT_WITHHOLDING_TAX_REPORTS_EXCEL_REQUEST]: exportWithholdingTaxReportsExcelRequest,
    [Types.EXPORT_WITHHOLDING_TAX_REPORTS_EXCEL_SUCCESS]: exportWithholdingTaxReportsExcelSuccess,
    [Types.EXPORT_WITHHOLDING_TAX_REPORTS_EXCEL_FAILURE]: exportWithholdingTaxReportsExcelFailure,
    [Types.EXPORT_WITHHOLDING_TAX_REPORTS_BY_FILTER_TYPE_REQUEST]: exportWithholdingTaxReportsByFilterTypeRequest,
    [Types.EXPORT_WITHHOLDING_TAX_REPORTS_BY_FILTER_TYPE_SUCCESS]: exportWithholdingTaxReportsByFilterTypeSuccess,
    [Types.EXPORT_WITHHOLDING_TAX_REPORTS_BY_FILTER_TYPE_FAILURE]: exportWithholdingTaxReportsByFilterTypeFailure,
    [Types.INIT_PAGE]: initPage,
    [Types.DESTROY_PAGE]: destroyPage,
  };

  return createReducer(SHARED_INITIAL_STATE, HANDLERS);
};
