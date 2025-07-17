import axios from '@shared/axios/common';

export const getMarketProductBundles = ({ id, fields }) => {
  return axios({
    method: 'POST',
    url: '/marketProduct/getBundleProductsBySubProductId',
    data: {
      productId: id,
      fields,
    },
  }).then(response => {
    return response.data;
  });
};
