import axios from '@shared/axios/common';

export const searchFoodRestaurants = name => {
  return axios({
    method: 'POST',
    url: '/foodRestaurants/searchRestaurants',
    data: { name },
  }).then(response => {
    return response.data;
  });
};

export const getRestaurantsByName = ({ name, cityIds, includeDeletedRestaurants }) => {
  let queryCityIds;

  if (cityIds?.length) {
    if (Array.isArray(cityIds)) queryCityIds = cityIds.join(',');
    else queryCityIds = cityIds;
  }

  return axios({
    method: 'GET',
    url: '/food/restaurant/byName',
    params: { name, cityIds: queryCityIds, includeDeletedRestaurants },
  }).then(response => {
    return response.data;
  });
};

export const searchChainRestaurants = ({ searchString }) => {
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

export const getRestaurantById = async ({ restaurantId }) => {
  const { data } = await axios({
    method: 'GET',
    url: `/food/restaurants/${restaurantId}`,
  });
  return data;
};
