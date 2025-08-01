import { mockedMissingProductOrders } from '@shared/api/marketOrder/index.mock.data';
import { formatMissingProductOrders, getFilteredOrders } from '.';

describe('Missing products util', () => {
  describe('#formatMissingProductOrders', () => {
    it('should return formatted orders', () => {
      const formattedOrders = formatMissingProductOrders(mockedMissingProductOrders);
      expect(formattedOrders[0]).toHaveProperty('waitTime');
      expect(formattedOrders[0]).toHaveProperty('gsm');
    });
  });
  describe('#getFilteredOrders', () => {
    it('should return filtered orders', () => {
      const orders = getFilteredOrders(mockedMissingProductOrders, 'Burn Energy');
      expect(orders).toHaveLength(1);
    });
    it('should return empty orders if search term do no match', () => {
      const orders = getFilteredOrders(mockedMissingProductOrders, '123');
      expect(orders).toHaveLength(0);
    });
  });
});
