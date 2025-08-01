import { MARKET_ORDER_STATUS } from '@shared/shared/constants';

export const getStatusColor = status => {
  if (status <= MARKET_ORDER_STATUS.BROWSING) {
    return '#5D3EBD';
  }
  if (status > MARKET_ORDER_STATUS.BROWSING && status <= MARKET_ORDER_STATUS.RATED) {
    return '#87d068';
  }
  if (status >= MARKET_ORDER_STATUS.CANCELED_COURIER) {
    return '#f50f50';
  }
  return '#5D3EBD';
};
