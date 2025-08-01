import { mockedMissingProductOrders } from '@shared/api/marketOrder/index.mock.data';
import { getFormattedCountries, getInitialValues } from './formHelper';

describe('Agent Actions form helpers', () => {
  const order = mockedMissingProductOrders[0];
  describe('#getFormattedCountries', () => {
    it('should return formatted countries', () => {
      const countries = getFormattedCountries(order);
      expect(countries?.[0]).toHaveProperty('value');
    });
  });
  describe('#getInitialValues', () => {
    it('should get initial values', () => {
      const initialValues = getInitialValues({ orderDetail: order });
      expect(initialValues).toHaveProperty('deliveryFee');
    });
  });
});
