import axios from '@shared/axios/common';

export const getFranchiseConfigType = ({ limit, offset }) => {
  return axios({
    method: 'GET',
    url: '/franchiseDynamicConfig/config-type',
    params: { limit, offset },
  }).then(response => {
    return response.data;
  });
};

export const getFranchiseConfig = ({ filters, configType }) => {
  return axios({
    method: 'GET',
    url: `/franchiseDynamicConfig/config/${configType}`,
    params: { ...filters },
  }).then(response => {
    return response.data;
  });
};

export const createFranchiseConfigType = payload => {
  return axios({
    method: 'POST',
    url: '/franchiseDynamicConfig/config-type',
    data: { ...payload },
  }).then(response => {
    return response.data;
  });
};

export const getFranchiseConfigTypeDetail = ({ id }) => {
  return axios({
    method: 'GET',
    url: `/franchiseDynamicConfig/config-type/${id}`,
  }).then(response => {
    return response.data;
  });
};

export const deleteFranchiseConfigTypeDetail = async ({ id, keys }) => {
  return axios({
    method: 'DELETE',
    url: `/franchiseDynamicConfig/config-type/${id}/deleteField?keys=${keys.join(',')}`,
  }).then(response => {
    return response.data;
  });
};

export const updateFranchiseConfigTypeDetail = async ({ id, keys, ...payload }) => {
  if (keys.length) {
    await deleteFranchiseConfigTypeDetail({ id, keys });
  }

  return axios({
    method: 'PUT',
    url: `/franchiseDynamicConfig/config-type/${id}`,
    data: { ...payload },
  }).then(response => {
    return response.data;
  });
};

export const deleteFranchiseConfigType = ({ id }) => {
  return axios({
    method: 'DELETE',
    url: `/franchiseDynamicConfig/config-type/${id}`,
  }).then(response => {
    return response.data;
  });
};

export const createFranchiseDynamicConfig = ({ configType, values }) => {
  return axios({
    method: 'POST',
    url: `/franchiseDynamicConfig/config/${configType}`,
    data: values,
  }).then(response => {
    return response.data;
  });
};

export const getFranchiseDynamicDetailConfig = async ({ id }) => {
  return axios({
    method: 'GET',
    url: `/franchiseDynamicConfig/config/detail/${id}`,
  }).then(response => {
    return response.data;
  });
};

export const updateFranchiseDynamicConfig = async ({ values }) => {
  return axios({
    method: 'PUT',
    url: `/franchiseDynamicConfig/config/detail/${values._id}`,
    data: values,
  }).then(response => {
    return response.data;
  });
};
