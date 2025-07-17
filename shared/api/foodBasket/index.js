import axios from '@shared/axios/common';

export const getBasketOrderDetail = ({ basketOrderId }) => {
  return axios({
    method: 'POST',
    url: '/foodBaskets/getBasketOrderDetail',
    data: { basketOrderId },
  }).then(response => response.data);
};
