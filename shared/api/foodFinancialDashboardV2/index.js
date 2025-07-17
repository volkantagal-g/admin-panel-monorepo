import axios from '@shared/axios/common';
import { removeEmptyFieldsFromParams } from '@shared/utils/request';

export const getFinancialDashboardPayoutDetail = async ({ payoutDate }) => {
  const { data } = await axios({
    method: 'GET',
    url: '/food/dashboard/payout-detail',
    params: { payoutDate },
  });
  return data;
};

export const getFinancialDashboardBankBalances = async () => {
  const { data } = await axios({
    method: 'GET',
    url: '/food/dashboard/bank-balances',
  });
  return data;
};

export const exportFailedPaybacksToExcel = async ({ reportDate }) => {
  const { data } = await axios({
    method: 'GET',
    url: '/food/export-failed-paybacks',
    params: { reportDate },
  });
  return data;
};

export const getPaymentDetailsSummary = async ({ startDate, skip, limit }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/marketplaceFinance/food/payment-details/summary',
    data: removeEmptyFieldsFromParams({ startDate, skip, limit }),
  });
  return data;
};

export const getPaymentDetails = async ({ deferredPaymentDate, skip, limit, id, isChain }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/marketplaceFinance/food/payment-details/details',
    data: removeEmptyFieldsFromParams({ deferredPaymentDate, skip, limit, id, isChain }),
  });
  return data;
};

export const exportPaymentDetailExcel = async ({ deferredPaymentDate, isChain, id }) => {
  const { data } = await axios({
    method: 'GET',
    url: '/marketplaceFinance/food/report/payment-details',
    params: { deferredPaymentDate, isChain, id },
  });
  return data;
};
