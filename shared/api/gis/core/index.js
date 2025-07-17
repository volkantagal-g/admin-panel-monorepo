import axios from '@shared/axios/common';

export const getAvailableStats = geoBoundaryType => {
  return axios({
    method: 'GET',
    url: `/gis/core/getAvailableStats/${geoBoundaryType}`,
  }).then(response => {
    return response.data;
  });
};

export const getPolygonStats = body => {
  return axios({
    method: 'POST',
    url: '/gis/core/getPolygonStats',
    data: body,
  }).then(response => {
    return response.data;
  });
};
