import axios from '@shared/axios/common';

export const searchParentProduct = ({ keyword }) => {
  return axios({
    method: 'POST',
    url: '/parentProduct/searchParentProduct',
    data: { keyword },
  }).then(response => {
    return response.data;
  });
};
