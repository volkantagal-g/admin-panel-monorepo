import axios from '@shared/axios/common';

export const getGisConfigByKey = ({ key, type }) => {
  return axios({
    method: 'POST',
    url: '/gis/config/getGisConfigByKey',
    data: { key, type },
  }).then(response => {
    return response.data;
  });
};
