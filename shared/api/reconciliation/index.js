import axios from '@shared/axios/common';

export const getReconciliations = ({
  page,
  pageSize,
  orderIds,
  transactionIds,
  externalPaymentTokens,
  checkoutStartDate,
  checkoutEndDate,
  reconciliationCheckStartDate,
  reconciliationCheckEndDate,
  domainTypes,
  sourceOfStatements,
  isRefundable,
  refundStatus,
  orderStatus,
  basketIds,
}) => {
  return axios({
    method: 'POST',
    url: 'reconciliationDashboard/reconciliations',
    data: {
      page,
      pageSize,
      orderIds,
      transactionIds,
      externalPaymentTokens,
      checkoutStartDate,
      checkoutEndDate,
      reconciliationCheckStartDate,
      reconciliationCheckEndDate,
      domainTypes,
      sourceOfStatements,
      isRefundable,
      refundStatus,
      orderStatus,
      basketIds,
    },
  }).then(response => {
    return response.data;
  });
};

export const getReconciliationsExport = ({
  orderIds,
  transactionIds,
  checkoutStartDate,
  checkoutEndDate,
  reconciliationCheckStartDate,
  reconciliationCheckEndDate,
  domainTypes,
  sourceOfStatements,
  externalPaymentTokens,
  isRefundable,
  refundStatus,
  orderStatus,
  basketIds,
}) => {
  return axios({
    method: 'POST',
    url: 'reconciliationDashboard/reconciliations/export',
    data: {
      orderIds,
      transactionIds,
      checkoutStartDate,
      checkoutEndDate,
      reconciliationCheckStartDate,
      reconciliationCheckEndDate,
      domainTypes,
      sourceOfStatements,
      externalPaymentTokens,
      isRefundable,
      refundStatus,
      orderStatus,
      basketIds,
    },
  }).then(response => {
    return response.data;
  });
};

export const refundsTransactionV2 = ({ orderIds, basketIds }) => {
  return axios({
    method: 'POST',
    url: 'reconciliationDashboard/reconciliations/refund',
    data: { orderIds, basketIds },
  }).then(response => {
    return response.data;
  });
};

export const getTransactionReconciliations = ({
  page,
  pageSize,
  rentId,
  originalTransactionId,
  checkStartDate,
  checkEndDate,
  transactionStartDate,
  transactionEndDate,
  isReconciled,
}) => {
  return axios({
    method: 'POST',
    url: 'reconciliationDashboard/reconciliations/drive',
    data: {
      page,
      pageSize,
      rentId,
      originalTransactionId,
      checkStartDate,
      checkEndDate,
      transactionStartDate,
      transactionEndDate,
      isReconciled,
    },
  }).then(response => {
    return response.data;
  });
};

export const getDriveExport = ({
  page,
  pageSize,
  rentId,
  originalTransactionId,
  checkStartDate,
  checkEndDate,
  transactionStartDate,
  transactionEndDate,
  isReconciled,
}) => {
  return axios({
    method: 'POST',
    url: 'reconciliationDashboard/reconciliations/drive-export',
    data: {
      page,
      pageSize,
      rentId,
      originalTransactionId,
      checkStartDate,
      checkEndDate,
      transactionStartDate,
      transactionEndDate,
      isReconciled,
    },
  }).then(response => {
    return response.data;
  });
};

export const getDailyReport = ({
  page,
  pageSize,
  domainTypes,
  sourceOfStatements,
  reportCheckStartDate,
  reportCheckEndDate,
  reportRequestStartDate,
  reportRequestEndDate,
}) => {
  return axios({
    method: 'GET',
    url: 'reconciliationDashboard/daily-report',
    params: {
      page,
      pageSize,
      domainTypes,
      sourceOfStatements,
      reportCheckStartDate,
      reportCheckEndDate,
      reportRequestStartDate,
      reportRequestEndDate,
    },
  }).then(response => {
    return response;
  });
};

export const getBankReconciliationSummary = async params => {
  const { data } = await axios({
    method: 'GET',
    url: 'reconciliationDashboard/reconciliations/summary',
    params: { ...params },
  });
  return data;
};

export const manualRefund = async ({ eventDetail }) => {
  const { orderId, basketId, amount, eventId } = eventDetail;

  const { data } = await axios({
    method: 'POST',
    url: 'reconciliationDashboard/reconciliations/manual-refund',
    data: {
      ...(orderId ? { orderId } : {}),
      ...(basketId ? { basketId } : {}),
      refundAmount: amount,
      eventId,
      refundStatus: 2,
      refundDate: new Date().toISOString(),
      source: 'RECONCILIATION-ADMIN-PANEL',
    },
  });
  return data;
};
