import axios from '@shared/axios/common';

const ODER_COUNTER_BASE_URL = '/orderCounter';

export const getOrderCountsForCountry = async () => {
  const response = await axios({
    method: 'POST',
    url: `${ODER_COUNTER_BASE_URL}/getOrderCountsForCountry`,
    data: {},
  });

  return response.data;
};

export const getOrderCountsForGlobal = async () => {
  const response = await axios({
    method: 'POST',
    url: `${ODER_COUNTER_BASE_URL}/getOrderCountsForGlobal`,
    data: {},
  });

  return response.data;
};
