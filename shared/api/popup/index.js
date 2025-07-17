import axios from '@shared/axios/common';
import { removeEmptyFieldsFromParams } from '@shared/utils/request';

// List
export const getResults = body => axios({
  method: 'GET',
  url: '/popup/filter',
  params: removeEmptyFieldsFromParams(body),
}).then(response => response.data);

// Get
export const getPopup = ({ popupId }) => axios({
  method: 'GET',
  url: `/popup/get/${popupId}`,
}).then(response => response.data);

// Create
export const createPopup = data => axios({
  method: 'POST',
  url: '/popup/create',
  json: true,
  data,
}).then(response => response.data);

// Update
export const updatePopup = ({ data, id }) => axios({
  method: 'PATCH',
  url: `/popup/update/${id}`,
  json: true,
  data,
}).then(response => response.data);

// Duplicate
export const duplicate = id => axios({
  method: 'GET',
  url: `/popup/duplicate/${id}`,
}).then(response => response.data);

// Configs
export const getGlobalRuleSet = () => axios({
  method: 'GET',
  url: '/popup/config/global-rule',
}).then(response => response.data);

export const setGlobalRuleSet = data => axios({
  method: 'POST',
  url: '/popup/config/global-rule',
  json: true,
  data,
}).then(response => response.data);

// Get S3 Image Url
export const getS3SignedUrl = ({ fileExtension }) => axios({
  method: 'GET',
  url: '/popup/getS3ImageUploadUrl',
  params: { ext: fileExtension },
}).then(response => response.data);

// Get Pages
export const getConfigKey = ({ body: { key, type } }) => {
  return axios({
    method: 'POST',
    url: '/marketConfig/getConfigWKey',
    data: { key, type },
  }).then(response => {
    return response.data;
  });
};
