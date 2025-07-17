import axios from '@shared/axios/common';

export const create = (data = {}) => {
  return axios({
    method: 'POST',
    url: `/saa/create`,
    data,
  }).then(response => {
    return response.data;
  });
};

export const updateGeneral = (data = {}) => {
  return axios({
    method: 'POST',
    url: `/saa/update`,
    data,
  }).then(response => {
    return response.data;
  });
};

export const updateGeoJSON = (data = {}) => {
  return axios({
    method: 'POST',
    url: `/saa/updateGeoJSON`,
    data,
  }).then(response => {
    return response.data;
  });
};

export const getById = (data = {}) => {
  return axios({
    method: 'POST',
    url: `/saa/getById`,
    data,
  }).then(response => {
    return response.data;
  });
};

export const getByFilters = (data = {}) => {
  return axios({
    method: 'POST',
    url: `/saa/getByFilters`,
    data,
  }).then(response => {
    return response.data;
  });
};
