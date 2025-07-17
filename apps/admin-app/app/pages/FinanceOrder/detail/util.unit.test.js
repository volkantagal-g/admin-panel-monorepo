import { calcUpdatedBasketAmount, priceFormatter } from './util';

const MOCKED_PARTIAL_PRODUCT_UPDATE_HISTORY = [
  {
    price: {
      old: 45.9,
      new: 45.9,
    },
  },
  {
    price: {
      old: 55,
      new: 55,
    },
  },
];

describe('FinanceOrder Detail utils', () => {
  describe('#priceFormatter', () => {
    it('should return formatted price (with number parameter)', () => {
      expect(priceFormatter(10)).toEqual('10.00');
    });
    it('should return formatted price (with numeric string parameter)', () => {
      expect(priceFormatter('12')).toEqual('12.00');
    });
    it('should return value if input is isNaN', () => {
      expect(priceFormatter('12.99 tl')).toEqual('12.99 tl');
    });
  });

  describe('#calcUpdatedBasketAmount', () => {
    it('should return updated total basket amount', () => {
      expect(calcUpdatedBasketAmount(MOCKED_PARTIAL_PRODUCT_UPDATE_HISTORY)).toEqual(100.9);
    });
    it('should return undefined with undefined input', () => {
      expect(calcUpdatedBasketAmount(undefined)).toEqual(undefined);
    });
  });
});
