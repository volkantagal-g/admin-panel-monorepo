import { isDiscountedPrice, calculatePercentage, calculateSales } from './utils/calculate';
import { priceColor } from './utils/common';
import { MOCKED_RETURN_DISCOUNTED_PRICE, MOCKED_RETURN_PRICE, MOCKED_RECORD, MOCKED_DISCOUNTED_RECORD } from './util.mock.data';

describe('PricingTool util tests', () => {
  describe('#isDiscountedPrice', () => {
    it('should return discounted price', () => {
      expect(isDiscountedPrice(MOCKED_RETURN_DISCOUNTED_PRICE)).toEqual(10);
    });
    it('should return price', () => {
      expect(isDiscountedPrice(MOCKED_RETURN_PRICE)).toEqual(15);
    });
  });

  describe('#calculatePercentage', () => {
    it('should return discounted price', () => {
      expect(calculatePercentage(0, 3)).toEqual(0);
    });
    it('should return price', () => {
      expect(calculatePercentage(0, 1)).toEqual(0);
    });
  });

  describe('#calculateSales', () => {
    it('should return calculate sales', () => {
      expect(calculateSales(MOCKED_RECORD, 'price', false)).toEqual(NaN);
    });
    it('should return discounted calculate sales', () => {
      expect(calculateSales(MOCKED_DISCOUNTED_RECORD, 'price', true)).toEqual(NaN);
    });
  });

  describe('#priceColor', () => {
    it('should return green ', () => {
      expect(priceColor(10)).toEqual('green');
    });
    it('should return green ', () => {
      expect(priceColor(1000)).toEqual('green');
    });

    it('should return red ', () => {
      expect(priceColor(-5)).toEqual('red');
    });
  });
});
