import axios from '@shared/axios/common';

export const getMarketBaskets = async ({
  cityId,
  deviceTypes,
  domainType,
  endDateTime,
  startDateTime,
  statuses,
  clientId,
  limit,
  page,
}) => {
  const response = await axios({
    method: 'POST',
    url: '/marketAdminPanel/getMarketBaskets',
    data: {
      cityId,
      deviceTypes,
      domainType,
      endDateTime,
      startDateTime,
      clientId,
      statuses,
      limit,
      page,
    },
  });
  return response.data;
};
export const getMarketBasketById = async ({ basketId }) => {
  const response = await axios({
    method: 'POST',
    url: '/marketAdminPanel/getMarketBasketById',
    data: { basketId },
  });
  return response.data;
};
export const cancelMarketBasket = async ({ basketId }) => {
  const response = await axios({
    method: 'POST',
    url: '/marketAdminPanel/cancelMarketBasket',
    data: { basketId },
  });
  return response.data;
};

export const getOrderById = async ({ orderId }) => {
  const response = await axios({
    method: 'GET',
    url: `/marketAdminPanel/getOrderById/${orderId}`,
  });
  return response.data;
};
