import { isNumber, get } from 'lodash';

export const priceFormatter = price => {
  const tempPrice = isNumber(price) ? Number.parseFloat(price) : undefined;
  return tempPrice?.toFixed(2);
};

export const formatEstimatedDeliveryDuration = ({ basketOrderDetail }) => {
  const estimatedDeliveryDuration = get(basketOrderDetail, 'estimatedDeliveryDuration', 0);
  return parseFloat(estimatedDeliveryDuration).toFixed(0);
};
