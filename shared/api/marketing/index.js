import axios from '@shared/axios/common';

// Get Config
export const getConfigKey = ({ body: { key, type } }) => {
  return axios({
    method: 'POST',
    url: '/marketConfig/getConfigWKey',
    data: { key, type },
  }).then(response => {
    return response.data;
  });
};

// Get Announcements
export const getAnnouncements = () => {
  // /notification/getAnnouncements is deprecated since it still depends on getir-admin which is deprecated
  // use @shared/api/promo -> getAnnouncementsByText
  return Promise.resolve({ data: [] }); // old response format
  // return axios({
  //   method: 'POST',
  //   url: '/notification/getAnnouncements',
  // }).then(response => {
  //   return response.data;
  // });
};

// TODO: Replace with promo/getPromos before end of july currently it's depends outdated be service
export const getPromoData = data => {
  return axios({
    method: 'GET',
    url: '/promo/getPromoData',
    data,
  }).then(response => response.data);
};

// Get Food Promos By Search Code
export const getFoodPromosBySearchCode = ({ params }) => {
  return axios({
    method: 'GET',
    url: '/promo/getFoodPromosBySearchCode/',
    params,
  }).then(response => {
    return response.data;
  });
};

// Get Local Promos By Search Code
export const getLocalPromosBySearchCode = ({ params }) => {
  return axios({
    method: 'GET',
    url: '/promo/getLocalPromosBySearchCode/',
    params,
  }).then(response => {
    return response.data;
  });
};

// Get Food Promo By ID
export const getFoodPromoById = ({ promoId }) => {
  return axios({
    method: 'POST',
    url: '/promo/getFoodPromoById/',
    data: { promoId },
  }).then(response => {
    return response.data;
  });
};

// Get Local Promo By ID
export const getLocalPromoById = ({ promoId }) => {
  return axios({
    method: 'POST',
    url: '/promo/getLocalPromoById/',
    data: { promoId },
  }).then(response => {
    return response.data;
  });
};

// Get Market Products
export const getMarketProducts = ({ filters }) => {
  return axios({
    method: 'POST',
    url: '/marketProduct/getMarketProducts',
    data: { ...filters },
  }).then(response => {
    return response.data;
  });
};

// Get Market Product Categories
export const getMarketProductCategories = ({ isSubCategory, status }) => {
  return axios({
    method: 'POST',
    url: '/marketProductCategory/getMarketProductCategories',
    data: { isSubCategory, status },
  }).then(response => {
    return response.data;
  });
};

// Get Restaurants By Name
export const getRestaurantsByName = searchString => {
  return axios({
    method: 'GET',
    url: `/food/restaurant/byName?name=${searchString}`,
  }).then(response => {
    return response.data;
  });
};

// Get Restaurants By ID
export const getRestaurantsById = ({ body }) => {
  return axios({
    method: 'POST',
    url: '/food/getRestaurantAllByIds',
    data: { body },
  }).then(response => {
    return response.data;
  });
};

// Get Locals Shops By Name
export const getLocalsShopsByName = ({ name }) => {
  return axios({
    method: 'GET',
    url: `/artisan/getLocalsShopsByName?name=${name}`,
    data: { name },
  }).then(response => {
    return response.data;
  });
};

// Get Artisan Cuisine Types
export const getArtisanCuisineTypes = () => {
  return axios({
    method: 'GET',
    url: '/artisanShop/getArtisanCuisineTypes',
  }).then(response => {
    return response.data;
  });
};

// Get Locals Chains
export const getLocalsChains = () => {
  return axios({
    method: 'GET',
    url: '/artisan/getLocalsMerchantsAll',
  }).then(response => {
    return response.data;
  });
};

// Get Client List Templates / detail
export const getClientDrafts = searchString => {
  return axios({
    method: 'POST',
    url: '/clientTargeting/getClientListTemplateFilter',
    data: { name: searchString },
  }).then(response => {
    return response.data;
  });
};

export const getClientDraftDetail = ({ clientListTemplateId }) => {
  return axios({
    method: 'POST',
    url: '/clientTargeting/getClientListTemplateId',
    data: { clientListTemplateId },
  }).then(response => {
    return response.data;
  });
};

// Get food chains with search string
export const getChains = searchString => {
  return axios({
    method: 'GET',
    url: `/food/chainRestaurants/search?name=${searchString}`,
  }).then(response => {
    return response.data;
  });
};

export const getChainBranches = chainId => {
  return axios({
    method: 'GET',
    url: `/food/chainRestaurants/${chainId}/restaurants`,
  }).then(response => {
    return response.data;
  });
};

export const getArtisanVerticals = () => {
  return axios({
    method: 'GET',
    url: '/artisan/verticals',
  }).then(response => {
    return response.data;
  });
};

export const getJobPostDetail = ({ id }) => {
  return axios({
    method: 'GET',
    url: `/getirJobs/post/postDetail/${id}`,
  }).then(response => {
    return response.data;
  });
};

// Food Deeplink
export const searchFoodDeepLink = ({ keyword }) => {
  return axios({
    method: 'post',
    url: '/getirFood/deepLink/search',
    data: { keyword },
  }).then(response => {
    return response.data;
  });
};

export const getFoodDeepLinkDetail = ({ id }) => {
  return axios({
    method: 'GET',
    url: `/getirFood/deepLink/getDetail/${id}`,
  }).then(response => {
    return response.data;
  });
};

// Braze Integration
export const createConnectedContent = ({ formBody }) => {
  return axios({
    method: 'POST',
    url: '/marketing/brazeIntegration/create-connected-content',
    data: formBody,
  }).then(response => {
    return response.data;
  });
};

export const getChainsShops = ({ chainId }) => {
  return axios({
    method: 'GET',
    url: `/artisanShop/getChainsShops/${chainId}`,
  }).then(response => {
    return response.data;
  });
};

export const getArtisanShopDetailsByIdArray = ({ shopIds }) => {
  return axios({
    method: 'POST',
    url: '/artisanShop/getShopNames',
    data: { shopIds },
  }).then(response => {
    return response.data;
  });
};
