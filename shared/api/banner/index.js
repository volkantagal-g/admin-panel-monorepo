import axios from '@shared/axios/common';
import { removeEmptyFieldsFromParams } from '@shared/utils/request';

export const getConfigKey = ({ body: { key, type } }) => {
  return axios({
    method: 'POST',
    url: '/marketConfig/getConfigWKey',
    data: { key, type },
  }).then(response => {
    return response.data;
  });
};

export const bannerSave = ({ body }) => {
  return axios({
    method: 'POST',
    url: '/banner/create',
    data: { ...body },
  }).then(response => {
    return response.data;
  });
};

export const getRestaurantsByName = searchString => {
  return axios({
    method: 'GET',
    url: `/food/restaurant/byName?name=${searchString}`,
  }).then(response => {
    return response.data;
  });
};

export const getBanner = ({ id: bannerId }) => {
  return axios({
    method: 'GET',
    url: `/banner/get/${bannerId}`,
  }).then(response => {
    return response.data;
  });
};

export const getLocalsChains = () => {
  return axios({
    method: 'GET',
    url: '/artisan/getLocalsMerchantsAll',
  }).then(response => {
    return response.data;
  });
};

export const bannerUpdate = ({ id, body }) => {
  return axios({
    method: 'PUT',
    url: `/banner/update/${id}`,
    data: { ...body },
  }).then(response => {
    return response.data;
  });
};

export const getLocalsMerchantTypes = () => {
  return axios({
    method: 'GET',
    url: '/artisanShop/getArtisanCuisineTypes',
  }).then(response => {
    return response.data;
  });
};

export const getS3ImageUploadUrl = ({ extension, language, type }) => {
  return axios({
    method: 'GET',
    url: `/banner/getS3ImageUploadUrl/${extension}`,
    params: { language, type },
  }).then(response => response.data);
};

export const searchUserDraftList = ({ body: name }) => {
  return axios({
    method: 'POST',
    url: '/banner/getClientListTemplateFilter',
    data: { name },
  }).then(response => {
    return response.data;
  });
};

export const getClientListTemplateId = ({ clientListTemplateId }) => {
  return axios({
    method: 'POST',
    url: '/banner/getClientListTemplateId',
    data: { clientListTemplateId },
  }).then(response => {
    return response.data;
  });
};

// List Page Requests
export const getResults = filters => {
  const queryParams = removeEmptyFieldsFromParams(filters?.queryParams);
  const params = removeEmptyFieldsFromParams(filters?.params);
  return axios({
    method: 'POST',
    url: '/banner/search',
    data: params,
    params: queryParams,
  }).then(response => {
    return response.data;
  });
};

export const duplicate = id => {
  return axios({
    method: 'POST',
    url: `/banner/duplicate/${id}`,
  }).then(response => {
    return response.data;
  });
};

export const sendTestBanner = ({ id, phoneNumbers }) => {
  return axios({
    method: 'POST',
    url: `/banner/send-test-banner/${id}`,
    data: { phoneNumbers },
  }).then(response => {
    return response.data;
  });
};

export const getSmartSuggestions = ({ body: { merchantTypeId } }) => {
  return axios({
    method: 'POST',
    url: '/artisan/getCuisineTagsByCuisineId',
    data: { merchantTypeId },
  }).then(response => {
    return response.data;
  });
};

export const cancelBanner = id => {
  return axios({
    method: 'POST',
    url: `/banner/cancel/${id}`,
  }).then(response => {
    return response.data;
  });
};
