import axios from '@shared/axios/common';

export const getBasketAmounts = async ({ warehouseId }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/basketConfig/getBasketAmounts',
    data: { warehouseId },
  });
  return data;
};

export const bulkUpdateBasketAmounts = async ({ basketAmounts }) => {
  const { data } = await axios({
    method: 'POST',
    url: '/basketConfig/bulkUpdateBasketAmounts',
    data: { basketAmounts },
  });
  return data;
};

export const updateBasketAmounts = async ({
  warehouseId,
  domainType,
  minDiscountedAmount,
  maxDiscountedAmount,
}) => {
  const { data } = await axios({
    method: 'POST',
    url: '/basketConfig/updateBasketAmounts',
    data: { warehouseId, domainType, minDiscountedAmount, maxDiscountedAmount },
  });
  return data;
};
