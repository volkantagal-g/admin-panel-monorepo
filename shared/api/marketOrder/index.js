import axios from '@shared/axios/common';
import { GETIR_DOMAIN_TYPES } from '@shared/shared/constants';

export const getOrderDetail = ({ id, domainType }) => {
  return axios({
    method: 'POST',
    url: '/marketOrder/getOrderDetail',
    data: { id, domainType },
  }).then(response => {
    return response.data;
  });
};

export const getFraudOrderDetail = ({ id, domainType }) => {
  return axios({
    method: 'POST',
    url: '/marketOrder/getFraudOrderDetail',
    data: { id, domainType },
  }).then(response => {
    return response.data?.order;
  });
};

export const getInvoiceUrl = ({ orderId, domainType, clientId }) => {
  return axios({
    method: 'POST',
    url: '/marketOrder/getInvoiceUrl',
    data: { orderId, domainType, clientId },
  }).then(response => {
    return response.data;
  });
};

export const updateFraudOrder = ({ id, domainType, status }) => {
  return axios({
    method: 'POST',
    url: '/marketOrder/updateFraudOrder',
    data: { id, domainType, status },
  }).then(response => {
    return response.data;
  });
};

export const cancelOrder = ({ domainType, id, callerType, reasonId, note, source }) => {
  return axios({
    method: 'POST',
    url: '/marketOrder/cancelOrder',
    data: {
      domainType,
      id,
      callerType,
      reasonId,
      note,
      ...(Number(domainType) === GETIR_DOMAIN_TYPES.VOYAGER ? {} : { source }),
    },
  }).then(response => {
    return response.data;
  });
};

export const createForbiddenMatch = ({ body: updateData }) => {
  return axios({
    method: 'POST',
    url: '/marketOrder/createForbiddenMatch',
    data: updateData,
  }).then(response => {
    return response.data;
  });
};

export const createMarketOrderFeedback = async ({ data }) => {
  const response = await axios({
    method: 'POST',
    url: '/orderFeedback/createOrderFeedback',
    data,
  });

  return response.data;
};

export const getMissingProductOrders = ({ domainType, limit, offset, city }) => {
  return axios({
    method: 'POST',
    url: '/marketOrder/getMissingProducts',
    data: { domainType, limit, offset, cityId: city },
  }).then(response => {
    return response.data || {};
  });
};

export const orderPartialRefund = async data => {
  const response = await axios({
    method: 'POST',
    url: '/marketOrder/partialRefund',
    data,
  });
  return response.data;
};
export const updateMissingProductStatus = async ({ status, orderId, domainType }) => {
  const response = await axios({
    method: 'POST',
    url: '/marketOrder/updateMissingProductStatus',
    data: { status, orderId, domainType },
  });
  return response.data;
};
export const addMhProblem = async data => {
  const response = await axios({
    method: 'POST',
    url: '/marketOrder/addMhProblem',
    data,
  });
  return response.data;
};
export const getOrderCancelReasons = async ({ id, domainType }) => {
  const response = await axios({
    method: 'POST',
    url: '/marketOrder/getCancelReasons',
    data: { id, domainType },
  });
  return response.data;
};

export const getSlottedDeliveryOptions = async data => {
  const response = await axios({
    method: 'POST',
    url: '/marketOrder/getSlottedDeliveryOptions',
    data,
  });
  return response.data;
};

export const getSlottedDeliveryOptionsForVoyager = async data => {
  const response = await axios({
    method: 'POST',
    url: '/water/getSlottedDeliveryOptionsForKuzeyden',
    data,
  });
  return response.data;
};

export const changeDeliveryTimeSlot = async data => {
  const response = await axios({
    method: 'POST',
    url: '/marketOrder/changeDeliveryTimeSlot',
    data,
  });
  return response.data;
};

export const getPartialRefundReasons = async ({ domainType }) => {
  const response = await axios({
    method: 'POST',
    url: '/marketOrder/getPartialRefundReasons',
    data: { domainType },
  });
  return response.data;
};
