import axios from '@shared/axios/common';

const baseURL = '/marketConfig';
export const getMarketConfig = async ({ key, type }) => {
  const response = await axios({
    method: 'POST',
    url: `${baseURL}/getConfigWKey`,
    data: { key, type },
  });
  return response.data;
};

export const createConfig = async ({ type, key, value, description, responsibleSquad }) => {
  const { data = {} } = await axios({
    method: 'POST',
    url: `${baseURL}/createConfig`,
    data: { type, key, value, description, responsibleSquad },
  });

  return data;
};

export const filterConfigs = async ({
  searchText,
  cursor,
  limit,
}) => {
  const { data = {} } = await axios({
    method: 'POST',
    url: `${baseURL}/configs`,
    data: {
      searchText,
      cursor,
      limit,
    },
  });

  return data;
};

export const updateConfigByKey = async ({ key, type, value, isCustomEnabled, description, responsibleSquad, __v }) => {
  const { data = {} } = await axios({
    method: 'POST',
    url: `${baseURL}/updateConfigByKey`,
    data: { key, type, value, isCustomEnabled, description, responsibleSquad, __v },
  });

  return data;
};

export const updateMobileAnimationConfig = async ({ __v, key, type, value, isCustomEnabled }) => {
  const { data = {} } = await axios({
    method: 'POST',
    url: `${baseURL}/updateMobileAnimationConfig`,
    data: { __v, key, type, value, isCustomEnabled },
  });

  return data;
};

export const updateCustomConfigByKeyAndCountry = async ({ key, type, value, countryCode, __v }) => {
  const { data = {} } = await axios({
    method: 'POST',
    url: `${baseURL}/updateCustomConfigByKeyAndCountry`,
    data: { key, type, value, countryCode, __v },
  });

  return data;
};

export const getConfigKey = ({ useApiGwCache, body: { key, type } }) => {
  return axios({
    method: 'POST',
    url: '/marketConfig/getConfigWKey',
    data: { key, type },
    ...(useApiGwCache ? { headers: { 'x-use-api-gw-cache': true } } : {}),
  }).then(response => {
    return response.data;
  });
};

export const getUploadSignedUrl = ({ fileName, contentType, folderPath, bucketName }) => {
  return axios({
    method: 'POST',
    url: '/marketConfig/getUploadSignedUrl',
    data: { fileName, contentType, folderPath, bucketName },
  }).then(response => {
    return response.data;
  });
};

export const getConfigLog = ({ key, startDate, endDate, limit, offset }) => {
  return axios({
    method: 'POST',
    url: '/marketConfig/getConfigLog',
    data: { key, startDate, endDate, limit, offset },
  }).then(response => {
    return response.data;
  });
};

export const deleteConfigByKey = async ({ key, type }) => {
  const { data } = await axios({
    method: 'POST',
    url: `${baseURL}/deleteConfigByKey`,
    data: { key, type },
  });

  return data;
};
