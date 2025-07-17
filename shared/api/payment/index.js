import axios from '@shared/axios/common';

export const getMerchants = () => {
  return axios({
    method: 'GET',
    url: 'paymentBackOffice/getMerchants',
  }).then(response => {
    return response.data;
  });
};
export const getTransactions = ({ pageNumber, pageSize, filter, sort, axiosConfig = {} }) => {
  return axios({
    method: 'POST',
    url: 'paymentBackOffice/getTransactions',
    data: {
      pageNumber,
      pageSize,
      filter,
      sort,
    },
    ...axiosConfig,
  }).then(response => {
    return response.data;
  });
};

export const getMerchantDetail = ({ id }) => {
  return axios({
    method: 'GET',
    url: `paymentBackOffice/getMerchant/${id}`,
  }).then(response => {
    return response.data;
  });
};

export const getTransactionDetail = ({ id }) => {
  return axios({
    method: 'GET',
    url: `paymentBackOffice/getTransaction/${id}`,
  }).then(response => {
    return response.data;
  });
};

export const getEventDetail = ({ id }) => {
  return axios({
    method: 'GET',
    url: `paymentBackOffice/getEvent/${id}`,
  }).then(response => {
    return response.data;
  });
};

export const createMerchant = ({ customIdentifiers, key, settings }) => {
  return axios({
    method: 'POST',
    url: 'paymentBackOffice/createMerchant',
    data: { customIdentifiers, key, settings },
  }).then(response => {
    return response.data;
  });
};
export const createMerchantPaymentProvider = ({
  id,
  key,
  name,
  paymentMethods,
  settings,
  configuration,
  merchantId,
}) => {
  return axios({
    method: 'POST',
    url: `paymentBackOffice/createMerchantPaymentProvider/${merchantId}`,
    data: {
      id,
      key,
      name,
      paymentMethods,
      configuration,
      settings,
    },
  }).then(response => {
    return response.data;
  });
};

export const updateMerchant = ({ key, settings, customIdentifiers, id }) => {
  return axios({
    method: 'PUT',
    url: `paymentBackOffice/updateMerchant/${id}`,
    data: { key, settings, customIdentifiers },
  }).then(response => {
    return response.data;
  });
};

export const updateMerchantWebhook = ({
  merchantId,
  webhookId,
  enabled,
  type,
  url,
}) => {
  return axios({
    method: 'PATCH',
    url: `paymentBackOffice/updateMerchantWebhook/${merchantId}/${webhookId}`,
    data: { enabled, type, url },
  }).then(response => {
    return response.data;
  });
};

export const createMerchantWebhook = ({ enabled, type, url, merchantId }) => {
  return axios({
    method: 'POST',
    url: `paymentBackOffice/createMerchantWebhook/${merchantId}`,
    data: {
      enabled,
      type,
      url,
    },
  }).then(response => {
    return response.data;
  });
};

export const getMerchantWebhooks = ({ id }) => {
  return axios({
    method: 'GET',
    url: `paymentBackOffice/getMerchantWebhooks/${id}`,
  }).then(response => {
    return response.data;
  });
};

export const addPaymentMethod = ({
  merchantId,
  providerKey,
  name,
  key,
  settings,
}) => {
  return axios({
    method: 'POST',
    url: `paymentBackOffice/addPaymentMethod/${merchantId}/${providerKey}`,
    data: { name, key, settings },
  }).then(response => {
    return response.data;
  });
};

export const getCardInstallmentCounts = ({ filters, cardUserType }) => {
  return axios({
    method: 'POST',
    data: { filters, cardUserType },
    url: 'paymentBackOffice/list-installments-options',
  }).then(response => {
    return response.data;
  });
};

export const updateCardInstallmentCounts = ({
  version,
  cardUserType,
  installments,
}) => {
  return axios({
    method: 'POST',
    data: {
      version,
      cardUserType,
      installments,
    },
    url: 'paymentBackOffice/update-installments-options',
  }).then(response => {
    return response.data;
  });
};

export const userRefund = async ({
  merchantId,
  transactionId,
  refundReferenceId,
  description,
  refunds,
}) => {
  const response = await axios({
    method: 'POST',
    data: {
      merchantId,
      transactionId,
      refundReferenceId,
      description,
      refunds,
    },
    url: 'paymentBackOffice/transactions/user-refunds',
  });
  return response.data;
};

export const getAllRules = async ({ enable }) => {
  const response = await axios({
    method: 'GET',
    url: 'paymentBackOffice/fraud/allRules',
    params: { enable },
  });
  return response.data;
};

export const getRuleDetail = async ({ id }) => {
  const response = await axios({
    method: 'GET',
    url: `paymentBackOffice/fraud/ruleDetail/${id}`,
  });
  return response.data;
};

export const createRule = async ({
  name,
  eventKeyField,
  eventType,
  ruleOperator,
  ruleValue,
  ruleValueType,
  score,
  enable,
  force3dEvent,
  blockEvent,
  whiteEvent,
  useRequestEventKeyFieldValue,
}) => {
  const response = await axios({
    json: true,
    method: 'POST',
    url: 'paymentBackOffice/fraud/createRule',
    data: {
      name,
      eventKeyField,
      eventType,
      ruleOperator,
      ruleValue,
      ruleValueType,
      score,
      enable,
      force3dEvent,
      blockEvent,
      whiteEvent,
      useRequestEventKeyFieldValue,
    },
  });
  return response.data;
};

export const updateRule = async ({
  id,
  name,
  eventKeyField,
  eventType,
  ruleOperator,
  ruleValue,
  ruleValueType,
  score,
  enable,
  force3dEvent,
  blockEvent,
  whiteEvent,
  useRequestEventKeyFieldValue,
}) => {
  const response = await axios({
    json: true,
    method: 'put',
    url: `paymentBackOffice/fraud/updateRule/${id}`,
    data: {
      name,
      eventKeyField,
      eventType,
      ruleOperator,
      ruleValue,
      ruleValueType,
      score,
      enable,
      force3dEvent,
      blockEvent,
      whiteEvent,
      useRequestEventKeyFieldValue,
    },
  });
  return response.data;
};
