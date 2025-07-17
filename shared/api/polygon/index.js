import axios from '@shared/axios/common';

export const getPolygonsByPolygonTypes = ({ requestBody }) => {
  return axios({
    method: 'POST',
    url: '/polygon/getPolygonsByPolygonTypes',
    data: requestBody,
  }).then(response => {
    return response.data;
  });
};

export const updatePolygonsByPolygonType = ({ polygonType, updateData }) => {
  return axios({
    method: 'POST',
    url: '/polygon/updatePolygonsByPolygonType',
    data: {
      polygonType,
      updateData,
    },
  }).then(response => {
    return response.data;
  });
};

export const deactivatePolygon = ({ id }) => {
  return axios({
    method: 'POST',
    url: '/polygon/deactivatePolygon',
    data: { id },
  }).then(response => {
    return response.data;
  });
};

export const createBannedPolygon = ({ requestBody }) => {
  return axios({
    method: 'POST',
    url: '/polygon/createBannedPolygon',
    data: requestBody,
  }).then(response => {
    return response.data;
  });
};

export const createMultiBannedPolygon = ({ features }) => {
  const data = { features };
  return axios({
    method: 'POST',
    url: '/polygon/createMultipleBannedPolygon',
    data,
  }).then(response => {
    return response.data;
  });
};
