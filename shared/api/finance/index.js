import axios from '@shared/axios/common';

export const getFinanceOrderDetail = async ({ orderId }) => {
  const response = await axios({
    method: 'GET',
    url: `/finance/callCenterFinance/financeOrderByOrderId/${orderId}`,
  });
  return response.data;
};

export const createFinanceOrderNote = async ({
  orderId,
  agentId,
  agentName,
  orderNote,
}) => {
  const response = await axios({
    method: 'POST',
    url: `/finance/callCenterFinance/financeOrder/${orderId}/notes`,
    data: { agentId, orderNote, agentName },
  });
  return response.data;
};

export const getFinanceOrderCancelReasons = async () => {
  const response = await axios({
    method: 'GET',
    url: '/finance/callCenterFinance/cancel-reasons',
  });
  return response.data;
};

export const cancelFinanceOrder = async data => {
  const response = await axios({
    method: 'POST',
    url: '/finance/callCenterFinance/order/cancel',
    data,
  });
  return response.data;
};

export const getFinanceOrderFilter = async data => {
  const { domainTypes, startCheckoutDate, endCheckoutDate, status, orderId, fullName, warehouseId, barcode, phoneNumber } = data;

  let body;

  if (barcode) body = { barcode, status, startCheckoutDate, endCheckoutDate };
  else {
    body = {
      domainTypes,
      startCheckoutDate,
      endCheckoutDate,
      status,
      orderId,
      fullName,
      warehouseId,
      phoneNumber,
    };
  }

  const response = await axios({
    method: 'POST',
    url: `/finance/callCenterFinance/order/filter?size=${data.rowsPerPage}&page=${data.currentPage - 1}`,
    data: body,
  });

  return response.data;
};
