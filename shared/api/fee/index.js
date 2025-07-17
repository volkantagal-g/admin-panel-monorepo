import axios from '@shared/axios/common';

export const bulkFeeUpdate = async fees => {
  const { data } = await axios({
    method: 'POST',
    url: '/marketFees/bulkUpdate',
    data: fees,
  });
  return data;
};

export const getFeeDetails = async ({ warehouseId }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/marketFees/getFeeDetails',
    data: { warehouseId },
  });
  return data;
};

export const getDynamicLevels = async ({ warehouseId }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/marketFees/getDynamicLevels',
    data: { warehouseId },
  });
  return data;
};
