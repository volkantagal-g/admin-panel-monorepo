import axios from '@shared/axios/common';
import { getUser } from '@shared/redux/selectors/auth';

const MARKETPLACE_FINANCE_LOCALS_BASE_URL = '/marketplaceFinance/v1/locals';

export const getShopCurrentPaybackStatus = async ({ partnerId }) => {
  const { data } = await axios({
    method: 'GET',
    url: `${MARKETPLACE_FINANCE_LOCALS_BASE_URL}/partner-financials/${partnerId}/payback-status`,
  });
  return data;
};

export const updateShopPaybackStatus = async ({ partnerId, data: updatedPaybackData }) => {
  const userId = getUser()?._id;
  const { data } = await axios({
    method: 'POST',
    url: `${MARKETPLACE_FINANCE_LOCALS_BASE_URL}/partner-financials/${partnerId}/payback-status`,
    data: { ...updatedPaybackData, userId },
  });
  return data;
};

export const updateAllShopsPaybackStatus = async ({ data: updatedPaybackData }) => {
  const userId = getUser()?._id;
  const { data } = await axios({
    method: 'POST',
    url: `${MARKETPLACE_FINANCE_LOCALS_BASE_URL}/partner-financials/payback-status/update-all`,
    data: { ...updatedPaybackData, userId },
  });
  return data;
};

export const validatePartialShopsPaybackStatus = async ({ fileName }) => {
  const { data } = await axios({
    method: 'POST',
    url: `${MARKETPLACE_FINANCE_LOCALS_BASE_URL}/partner-financials/bulk-status-validation`,
    data: { fileName },
  });
  return data;
};

export const updatePartialShopsPaybackStatus = async ({ data: updatedPaybackData }) => {
  const userId = getUser()?._id;
  const { data } = await axios({
    method: 'POST',
    url: `${MARKETPLACE_FINANCE_LOCALS_BASE_URL}/partner-financials/bulk-status-update`,
    data: { ...updatedPaybackData, userId },
  });
  return data;
};
