import axios from '@shared/axios/common';

export const getCuisines = data => {
  return axios({
    method: 'GET',
    url: '/food/getCuisines',
    data,
  }).then(response => {
    return response.data;
  });
};

export const getFoodPromosBySearchCode = ({ params }) => {
  return axios({
    method: 'GET',
    url: '/promo/getFoodPromosBySearchCode/',
    params,
  }).then(response => {
    return response.data;
  });
};

export const getRestaurantsByName = ({ searchString, includeDeletedRestaurants }) => {
  return axios({
    method: 'GET',
    url: '/food/restaurant/byName',
    params: {
      name: searchString,
      includeDeletedRestaurants,
    },
  }).then(response => {
    return response.data;
  });
};

export const searchChainRestaurants = searchString => {
  return axios({
    method: 'GET',
    url: `/food/chainRestaurants/search?name=${searchString}`,
  }).then(response => {
    return response.data;
  });
};

export const getChainRestaurantBranches = chainRestaurantId => {
  return axios({
    method: 'GET',
    url: `/food/chainRestaurants/${chainRestaurantId}/restaurants`,
  }).then(response => {
    return response.data;
  });
};

export const getChainRestaurantProducts = chainRestaurantId => {
  return axios({
    method: 'GET',
    url: `/food/chainRestaurants/${chainRestaurantId}/chainProducts`,
  }).then(response => {
    return response.data;
  });
};

export const getRestaurantProducts = restaurantId => {
  return axios({
    method: 'GET',
    url: `/food/restaurant/${restaurantId}/products`,
  }).then(response => {
    return response.data;
  });
};

export const createClientListTemplate = data => {
  return axios({
    method: 'POST',
    url: '/clientTargeting/createClientListTemplate',
    data,
  }).then(response => {
    return response.data;
  });
};

export const getClientListTemplates = data => {
  return axios({
    method: 'POST',
    url: '/clientTargeting/getClientListTemplates',
    data,
  }).then(response => {
    return response.data;
  });
};

export const getClientListTemplate = async ({ clientListTemplateId }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/clientTargeting/getClientListTemplateId',
    data: { clientListTemplateId },
  });
  return data;
};

export const getClientListTemplateFilter = data => {
  return axios({
    method: 'POST',
    url: '/clientTargeting/getClientListTemplateFilter',
    data,
  }).then(response => {
    return response.data;
  });
};

export const createClientList = data => {
  return axios({
    method: 'POST',
    url: '/clientTargeting/createClientList',
    data,
  }).then(response => {
    return response.data;
  });
};

export const getPersonaClientFlags = data => {
  return axios({
    method: 'POST',
    url: '/clientTargeting/getPersonaClientFlags',
    data,
  }).then(response => {
    return response.data;
  });
};

export const getRFMSegments = () => {
  return axios({
    method: 'POST',
    url: '/clientTargeting/getGetirFoodRFMSegments',
  }).then(response => {
    return response.data;
  });
};

export const getPersonaDomainTypes = data => {
  return axios({
    method: 'POST',
    url: '/clientTargeting/getPersonaDomainTypes',
    data,
  }).then(({ data: responseData }) => responseData);
};

export const getGetirDriveVouchers = data => {
  return axios({
    method: 'POST',
    url: '/getirDrive/voucher/getVouchers',
    data,
  }).then(({ data: responseData }) => responseData);
};

export const getDataScienceModels = data => {
  return axios({
    method: 'POST',
    url: '/clientTargeting/getDataScienceModels',
    data,
  }).then(({ data: responseData }) => responseData);
};
