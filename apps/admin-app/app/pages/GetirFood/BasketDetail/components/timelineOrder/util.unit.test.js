import { priceFormatter, formatEstimatedDeliveryDuration } from './util';
import basketOrderDetail from '@shared/api/foodBasket/index.mock.data';

describe('BasketDetail/components/timelineOrder/util', () => {
  describe('#priceFormatter', () => {
    it('should properly format the prices', () => {
      expect(priceFormatter(238.2)).toBe('238.20');
      expect(priceFormatter(15)).toBe('15.00');
    });
  });

  describe('#formatEstimatedDeliveryDuration', () => {
    it('should return estimated time', () => {
      expect(formatEstimatedDeliveryDuration({ basketOrderDetail })).toBe('35');
    });
  });
});
