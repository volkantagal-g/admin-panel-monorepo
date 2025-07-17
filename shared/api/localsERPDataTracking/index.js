import axios from '@shared/axios/common';

export const getLocalsERPDataTrackingSummary = ({ startDate, endDate }) => {
  return axios({
    method: 'POST',
    url: '/marketplaceFinance/v1/locals/sap-dashboard',
    data: { startDate, endDate },
  }).then(response => {
    return response.data;
  });
};

export const getLocalsERPDataTrackingSummaryExcelExport = ({ startDate, endDate }) => {
  return axios({
    method: 'POST',
    url: '/marketplaceFinance/v1/locals/sap-dashboard/summary/report-excel',
    data: { startDate, endDate },
  }).then(response => {
    return response.data;
  });
};

export const getLocalsERPDataTrackingFailed = ({ startDate, endDate, skip, limit, orderTypes, traceId, orderId }) => {
  return axios({
    method: 'POST',
    url: '/marketplaceFinance/v1/locals/sap-dashboard/failed-details',
    data: { startDate, endDate, skip, limit, orderTypes, traceId, orderId },
  }).then(response => {
    return response.data;
  });
};

export const getLocalsERPDataTrackingSuccess = ({ startDate, endDate, skip, limit, orderTypes, traceId, orderId }) => {
  return axios({
    method: 'POST',
    url: '/marketplaceFinance/v1/locals/sap-dashboard/success-details',
    data: { startDate, endDate, skip, limit, orderTypes, traceId, orderId },
  }).then(response => {
    return response.data;
  });
};
