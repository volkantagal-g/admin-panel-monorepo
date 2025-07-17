import * as MOCKS from './index.mock.data';

const getReconciliationsUrl = '/reconciliationDashboard/reconciliations';
const refundReconciliation = '/reconciliationDashboard/reconciliations/refund';
const refundReconciliationExportCSV =
  '/reconciliationDashboard/reconciliations/export';
const getDriveReconciliationsUrl =
  '/reconciliationDashboard/reconciliations/drive';
const getDailyReportUrl = '/reconciliationDashboard/daily-report';
const getBankReconciliationSummary = '/reconciliationDashboard/reconciliations/summary';

const getReconciliationMockOptions = {
  url: getReconciliationsUrl,
  method: 'post',
  successData: MOCKS.mockedReconciliationReport,
};

const refundReconciliationMockOptions = {
  url: refundReconciliation,
  method: 'post',
  successData: MOCKS.mockedRefundReconciliation,
};

const refundReconciliationExportCSVMockOptions = {
  url: refundReconciliationExportCSV,
  method: 'post',
  successData: MOCKS.mockedRefundReconciliationExportCSV,
};

const getDailyReportMockOptions = {
  url: getDailyReportUrl,
  method: 'get',
  successData: MOCKS.mockedDailyReport,
};

const getDriveReconciliationMockOptions = {
  url: getDriveReconciliationsUrl,
  method: 'post',
  successData: MOCKS.mockedTransactionReconciliationReport,
};

const getBankReconciliationSummaryOptions = {
  url: getBankReconciliationSummary,
  method: 'get',
  successData: MOCKS.mockedReconciliationSummaryReport,
};

export default [
  getReconciliationMockOptions,
  refundReconciliationExportCSVMockOptions,
  refundReconciliationMockOptions,
  getDriveReconciliationMockOptions,
  getDailyReportMockOptions,
  getBankReconciliationSummaryOptions,
];
