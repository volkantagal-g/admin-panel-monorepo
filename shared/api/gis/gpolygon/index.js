import axios from '@shared/axios/common';

export const getGPolygons = async ({ requestBody }) => {
  const response = await axios({
    method: 'POST',
    url: '/gis/gpolygon/getGPolygons',
    data: requestBody,
  });
  return response.data;
};

export const createCourierBan = async ({ requestBody }) => {
  const response = await axios({
    method: 'POST',
    url: '/gis/gpolygon/createCourierBan',
    data: requestBody,
  });
  return response.data;
};

export const createForbiddenRoutes = async ({ requestBody }) => {
  const response = await axios({
    method: 'POST',
    url: '/gis/gpolygon/createForbiddenRoutes',
    data: requestBody,
  });
  return response.data;
};

export const deleteCourierBan = async ({ requestBody }) => {
  const response = await axios({
    method: 'POST',
    url: '/gis/gpolygon/deleteCourierBan',
    data: requestBody,
  });
  return response.data;
};
