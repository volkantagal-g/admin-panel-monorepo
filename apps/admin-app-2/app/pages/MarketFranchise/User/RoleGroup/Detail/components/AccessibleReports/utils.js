export const getReportTableData = (reports, reportList) => {
  const reportObj = reportList.reduce((newReportObj, currentReport) => ({ ...newReportObj, [currentReport._id]: currentReport }), {});
  return reports?.map(reportId => {
    const reportDetail = reportObj[reportId];
    return reportDetail;
  }).filter(report => report);
};

export const getFilteredReportList = (reports, reportList) => {
  return reportList.filter(report => reports?.findIndex(rep => rep === report._id) === -1);
};
