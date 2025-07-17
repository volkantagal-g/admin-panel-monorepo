import axios from '@shared/axios/common';
import { getUser } from '@shared/redux/selectors/auth';

export const getMealCardReconciliationSummary = ({ startDateEpoch, endDateEpoch }) => {
  return axios({
    method: 'GET',
    url: '/food/reconciliation/summary',
    params: { startDateEpoch, endDateEpoch },
  }).then(response => {
    return response.data;
  });
};

export const getMealCardReconciliationDetail = ({
  startDateEpoch,
  endDateEpoch,
  currentPage,
  pageSize,
  reconciliationMode,
  orderId,
}) => {
  return axios({
    method: 'GET',
    url: '/food/reconciliation/transaction-detail',
    params: {
      startDateEpoch,
      endDateEpoch,
      currentPage,
      pageSize,
      reconciliationMode,
      orderId,
    },
  }).then(response => {
    return response.data;
  });
};

export const exportExcel = ({
  startDateEpoch,
  endDateEpoch,
  currentPage,
  pageSize,
  reconciliationMode,
  orderId,
}) => {
  const userEmail = getUser()?.email;
  return axios({
    method: 'POST',
    url: '/food/reconciliation/excel',
    data: {
      startDateEpoch,
      endDateEpoch,
      currentPage,
      pageSize,
      reconciliationMode,
      orderId,
      recipients: [userEmail],
    },
  }).then(response => {
    return response.data;
  });
};
