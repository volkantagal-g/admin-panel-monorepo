import axios from '@shared/axios/common';

export const filterCourier = async ({ limit, offset, reqParams }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/courierHandler/couriers/filter',
    data: {
      limit,
      offset,
      ...reqParams,
    },
  });

  return data;
};

export const getCourierWithPersonDetails = async ({ id, fields }) => {
  return axios({
    method: 'POST',
    url: '/courierHandler/couriers/getCourierWithPersonDetails',
    data: { id, fields },
  }).then(res => res.data);
};
