import { BASKET_ORDER_STATUS } from '@shared/shared/constants';
import { getOrderStatusStyle } from './util';

describe('BasketDetail/components/timelineOrder/util', () => {
  describe('#getOrderStatusStyle', () => {
    it('should properly work with given values', () => {
      expect(getOrderStatusStyle(BASKET_ORDER_STATUS.BROWSING)).toEqual({ background: 'default', color: '#000' });

      expect(getOrderStatusStyle(BASKET_ORDER_STATUS.SCHEDULED)).toEqual({ background: '#5cb85c', color: '#fff' });

      expect(getOrderStatusStyle(BASKET_ORDER_STATUS.COMPLETED)).toEqual({ background: '#FF4D44', color: '#fff' });
    });
  });
});
