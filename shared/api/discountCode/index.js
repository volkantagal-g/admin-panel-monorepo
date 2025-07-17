import axios from '@shared/axios/common';

export const createSegmentedCodeByBulk = async data => {
  const { data: responseData } = await axios({
    method: 'POST',
    url: '/discountCode/segmentedCodeGenerator',
    data,
  });
  return responseData;
};

export const getDiscountCode = async ({ limit, offset, discountCode }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/discountCode/getDiscountCode',
    params: {
      limit,
      offset,
    },
    data: { discountCode },
  });

  return data;
};

export const getClientByIds = async ({ clientIds }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/marketClient/getClientByIds',
    data: { clientIds },
  });

  return data;
};
