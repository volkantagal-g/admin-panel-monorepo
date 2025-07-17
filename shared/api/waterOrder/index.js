import axios from '@shared/axios/common';

export const getOrderDetail = async requestBody => {
  const { data = [] } = await axios({
    method: 'POST',
    url: `/waterOrder/getOrderById`,
    data: requestBody,
  });

  return data;
};

export const postOrderCancel = async requestBody => {
  const { data = [] } = await axios({
    method: 'POST',
    url: '/waterOrder/cancelOrder',
    data: requestBody,
  });

  return data;
};

export const postReturnOrder = async requestBody => {
  const { data = [] } = await axios({
    method: 'POST',
    url: '/waterOrder/returnOrder',
    data: requestBody,
  });

  return data;
};

export const postProductReturn = async requestBody => {
  const { data = [] } = await axios({
    method: 'POST',
    url: '/waterOrder/productReturn',
    data: requestBody,
  });

  return data;
};

export const postPayAmountToVendor = async requestBody => {
  const { data = [] } = await axios({
    method: 'POST',
    url: '/waterOrder/payAmountToVendor',
    data: requestBody,
  });

  return data;
};

export const postTakeAmountFromVendor = async requestBody => {
  const { data = [] } = await axios({
    method: 'POST',
    url: '/waterOrder/takeAmountFromVendor',
    data: requestBody,
  });

  return data;
};

export const postOrderNote = async requestBody => {
  const { data = [] } = await axios({
    method: 'POST',
    url: '/waterOrder/addAdminNoteToOrder',
    data: requestBody,
  });

  return data;
};
