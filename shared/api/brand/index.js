import axios from '@shared/axios/common';

export const getBrands = ({ limit, offset, name = '', status, fields }) => {
  return axios({
    method: 'POST',
    url: '/brand/getBrands',
    data: { limit, offset, name, status, fields },
  }).then(response => {
    return response.data;
  });
};

export const getBrand = ({ id }) => {
  return axios({
    method: 'POST',
    url: '/brand/getBrand',
    data: { id },
  }).then(response => {
    return response.data;
  });
};

export const createBrand = ({ body: data }) => {
  return axios({
    method: 'POST',
    url: '/brand/createBrand',
    data,
  }).then(response => {
    return response.data;
  });
};

export const updateBrand = ({ id, updateData }) => {
  return axios({
    method: 'POST',
    url: '/brand/updateBrand',
    data: { id, updateData },
  }).then(response => {
    return response.data;
  });
};

export const activateBrand = ({ id }) => {
  return axios({
    method: 'POST',
    url: '/brand/activateBrand',
    data: { id },
  }).then(response => {
    return response.data;
  });
};

export const deactivateBrand = ({ id }) => {
  return axios({
    method: 'POST',
    url: '/brand/deactivateBrand',
    data: { id },
  }).then(response => {
    return response.data;
  });
};
