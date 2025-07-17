export const createVerticalSelectors = reduxKey => ({
  withholdingTaxReports: {
    getData: state => state[reduxKey]?.withholdingTaxReports?.data,
    getIsPending: state => state[reduxKey]?.withholdingTaxReports?.isPending,
    getError: state => state[reduxKey]?.withholdingTaxReports?.error,
  },
  withholdingTaxReportsSummary: {
    getData: state => state[reduxKey]?.withholdingTaxReportsSummary?.data,
    getIsPending: state => state[reduxKey]?.withholdingTaxReportsSummary?.isPending,
    getError: state => state[reduxKey]?.withholdingTaxReportsSummary?.error,
  },
  excelPending: {
    getExportTableExcelPending: state => state[reduxKey]?.exportWithholdingTaxReportsExcel?.isPending,
    getExportSummaryExcelPending: state => state[reduxKey]?.exportWithholdingTaxReportsSummaryExcel?.isPending,
    getExportSectionPending: state => state[reduxKey]?.exportWithholdingTaxReportsByFilterType?.isPending,
  },
});
