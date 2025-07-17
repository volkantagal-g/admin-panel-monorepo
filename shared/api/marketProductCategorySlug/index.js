import axios from '@shared/axios/common';

export const getMarketProductCategorySlugs = ({  id }) => {
  return axios({
    method: 'POST',
    url: '/marketProductCategorySlug/getMarketProductCategorySlugs',
    data: { id },
  }).then(response => {
    return response.data;
  });
};