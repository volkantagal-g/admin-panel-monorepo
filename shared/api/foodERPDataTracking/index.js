import axios from '@shared/axios/common';

export const getERPDataTrackingSummary = ({ startDate, endDate }) => {
  return axios({
    method: 'GET',
    url: '/food/erp-data-tracking/summary',
    params: { startDate, endDate },
  }).then(response => {
    return response.data;
  });
};

export const getERPDataTrackingFailed = ({ startDate, endDate, skip, limit, orderTypes, traceId, orderId }) => {
  return axios({
    method: 'POST',
    url: '/food/erp-data-tracking/failed',
    data: { startDate, endDate, skip, limit, orderTypes, traceId, orderId },
  }).then(response => {
    return response.data;
  });
};

export const getERPDataTrackingSuccessful = ({ startDate, endDate, skip, limit, orderTypes, traceId, orderId }) => {
  return axios({
    method: 'POST',
    url: '/food/erp-data-tracking/successful',
    data: { startDate, endDate, skip, limit, orderTypes, traceId, orderId },
  }).then(response => {
    return response.data;
  });
};

export const getERPDataTrackingSummaryExcelExport = ({ startDate, endDate }) => {
  return axios({
    method: 'POST',
    url: '/food/erp-data-tracking/summary/report-excel',
    data: { startDate, endDate },
  }).then(response => {
    return response.data;
  });
};
