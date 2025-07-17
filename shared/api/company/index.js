import axios from '@shared/axios/common';

export const getCompanies = () => {
  return axios({
    method: 'POST',
    url: '/company/getCompanies',
  }).then(response => {
    return response.data;
  });
};
