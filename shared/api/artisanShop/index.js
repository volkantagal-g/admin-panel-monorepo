import axios from '@shared/axios/common';

export const searchArtisanShops = ({ name, artisanType, chainId }) => {
  const requestBody = { name };
  if (artisanType) {
    requestBody.artisanType = artisanType;
  }

  if (chainId) {
    requestBody.chainId = chainId;
  }

  return axios({
    method: 'POST',
    url: '/artisanShop/searchShops',
    data: requestBody,
  }).then(response => {
    return response.data;
  });
};

export const getArtisanStoresByName = searchString => {
  return axios({
    method: 'GET',
    url: `/artisanShop/getArtisanStoresByName?name=${searchString}`,
  }).then(response => {
    return response.data;
  });
};

export const getLocalsMerchantByName = searchString => {
  return axios({
    method: 'GET',
    url: `/artisanShop/getLocalsMerchantByName?name=${searchString}`,
  }).then(response => {
    return response.data;
  });
};

export const getArtisanChainShops = () => {
  return axios({
    method: 'POST',
    url: '/artisanShop/getChainShops',
    data: {},
  }).then(response => {
    return response.data;
  });
};

export const getShopById = async ({ shopId }) => {
  const { data } = await axios({
    method: 'GET',
    url: `/artisanShop/shops/${shopId}`,
  });

  return data;
};
