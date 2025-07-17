import { mockedMissingProductOrders } from '@shared/api/marketOrder/index.mock.data';
import { calculateDiscountAmount, getFeedbackPayload, getInitialValues } from './formHelper';

describe('Feedback Modal form helpers', () => {
  let order = mockedMissingProductOrders[0];
  describe('#calculateDiscountAmount', () => {
    it('should calculate discount amount', () => {
      const discountAmount = calculateDiscountAmount(order);
      expect(discountAmount).toEqual(12);
    });
    it('should return zero if discount amount is zero', () => {
      order = { ...order, missingProductAmount: 0 };
      const discountAmount = calculateDiscountAmount(order);
      expect(discountAmount).toEqual(5);
    });
    it('should return five if discount amount is between 0 and 5', () => {
      order = { ...order, missingProductAmount: 4 };
      const discountAmount = calculateDiscountAmount(order);
      expect(discountAmount).toEqual(5);
    });
    it('should return ten if discount amount is between 5 and 10', () => {
      order = { ...order, missingProductAmount: 8 };
      const discountAmount = calculateDiscountAmount(order);
      expect(discountAmount).toEqual(10);
    });
  });
  describe('#getInitialValues', () => {
    it('should get initial values', () => {
      const initialValues = getInitialValues(order);
      expect(initialValues).toHaveProperty('validDayAmount');
    });
  });
  describe('#getFeedbackPayload', () => {
    it('should get initial values', () => {
      const values = getInitialValues(order);
      const feedbackPayload = getFeedbackPayload(order, values);
      expect(feedbackPayload).toHaveProperty('client');
    });
  });
});
