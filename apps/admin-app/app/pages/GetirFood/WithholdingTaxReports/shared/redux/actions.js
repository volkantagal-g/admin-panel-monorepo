import { createActions } from 'reduxsauce';

export const createVerticalActions = prefix => createActions({
  getWithholdingTaxReportsRequest: {
    companyType: null,
    period: null,
    page: null,
    size: null,
    partnerId: null,
  },
  getWithholdingTaxReportsSuccess: { data: {} },
  getWithholdingTaxReportsFailure: { error: null },
  getWithholdingTaxReportsSummaryRequest: { period: null },
  getWithholdingTaxReportsSummarySuccess: { data: {} },
  getWithholdingTaxReportsSummaryFailure: { error: null },
  exportWithholdingTaxReportsSummaryExcelRequest: { period: null },
  exportWithholdingTaxReportsSummaryExcelSuccess: { data: {} },
  exportWithholdingTaxReportsSummaryExcelFailure: { error: null },
  exportWithholdingTaxReportsExcelRequest: { partnerId: null, period: null },
  exportWithholdingTaxReportsExcelSuccess: { data: {} },
  exportWithholdingTaxReportsExcelFailure: { error: null },
  exportWithholdingTaxReportsByFilterTypeRequest: { fileType: null, filterType: null, period: null },
  exportWithholdingTaxReportsByFilterTypeSuccess: { data: {} },
  exportWithholdingTaxReportsByFilterTypeFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
