import axios from '@shared/axios/common';
import { getUser } from '@shared/redux/selectors/auth';

const MARKETPLACE_FINANCE_LOCALS_BASE_URL = '/marketplaceFinance/locals';

export const createShopExternalTransaction = async body => {
  const { data } = await axios({
    method: 'POST',
    url: `${MARKETPLACE_FINANCE_LOCALS_BASE_URL}/payback-action/manual`,
    data: body,
  });

  return data;
};

export const getLocalsManualTransactionsReport = async ({ params }) => {
  const { email } = getUser();
  const { data } = await axios({
    method: 'POST',
    url: `${MARKETPLACE_FINANCE_LOCALS_BASE_URL}/report/manual-transactions`,
    data: { ...params, email },
  });
  return data;
};

export const getS3SignedUrl = async ({ fileName }) => {
  const { data } = await axios({
    method: 'POST',
    url: `${MARKETPLACE_FINANCE_LOCALS_BASE_URL}/storage/s3/get-signed-url`,
    data: { fileName },
  });
  return data;
};

export const validateBulkExternalTransactionExcel = async ({ fileName, manualType }) => {
  const userId = getUser()?._id;
  const { data } = await axios({
    method: 'POST',
    url: `${MARKETPLACE_FINANCE_LOCALS_BASE_URL}/payback-action/bulk-manual-validation`,
    data: {
      fileName,
      manualType,
      createdBy: userId,
    },
  });
  return data;
};

export const importBulkExternalTransactionExcel = async ({ fileName, manualType, selectedDeferredPaymentDateOption }) => {
  const { _id: createdBy, email } = getUser();
  const { data } = await axios({
    method: 'POST',
    url: `${MARKETPLACE_FINANCE_LOCALS_BASE_URL}/payback-action/bulk-manual`,
    data: {
      fileName,
      manualType,
      createdBy,
      email,
      selectedDeferredPaymentDateOption,
    },
  });
  return data;
};
