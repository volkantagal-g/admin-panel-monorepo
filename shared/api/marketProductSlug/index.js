import axios from '@shared/axios/common';

export const getMarketProductSlugs = ({  id }) => {
  return axios({
    method: 'POST',
    url: '/marketProductSlug/getMarketProductSlugs',
    data: { id },
  }).then(response => {
    return response.data;
  });
};