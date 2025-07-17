import { BASKET_ORDER_STATUS } from '@shared/shared/constants';

export const getOrderStatusStyle = status => {
  if (status <= BASKET_ORDER_STATUS.BROWSING) {
    return { background: 'default', color: '#000' };
  }

  if ((status > BASKET_ORDER_STATUS.BROWSING) && (status <= BASKET_ORDER_STATUS.SCHEDULED)) {
    return { background: '#5cb85c', color: '#fff' };
  }

  if (status >= BASKET_ORDER_STATUS.COMPLETED) {
    return { background: '#FF4D44', color: '#fff' };
  }

  return {};
};
