import axios from '@shared/axios/common';

const MARKET_BUSINESSS_CONFIG_PATH = 'marketBusinessConfig';

export const getMarketBusinessConfigs = async ({ configKeys }) => {
  const response = await axios({
    method: 'POST',
    url: `/${MARKET_BUSINESSS_CONFIG_PATH}/configsByKeys`,
    data: { configKeys },
  });
  return response.data;
};

export const updateBusinessConfigValue = async ({ configBody }) => {
  const response = await axios({
    method: 'POST',
    url: `/${MARKET_BUSINESSS_CONFIG_PATH}/updateBusinessConfigValue`,
    data: configBody,
  });
  return response.data;
};

export const updateBusinessConfigCustomValue = async ({ configCustomBody }) => {
  const response = await axios({
    method: 'POST',
    url: `/${MARKET_BUSINESSS_CONFIG_PATH}/updateBusinessConfigCustomValue`,
    data: configCustomBody,
  });
  return response.data;
};
