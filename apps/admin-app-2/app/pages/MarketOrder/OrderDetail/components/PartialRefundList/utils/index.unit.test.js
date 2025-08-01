import { createProductMap, getProductsTotalAmount } from '.';
import { mockedMarketOrderDetail } from '@shared/api/marketOrder/index.mock.data';

describe('Partial refund products util', () => {
  const mockProductMap = { '57075944cde6070300eb5d10': { category: '55bca8484dcda90c00e3aa80' } };
  describe('#createProductMap', () => {
    it('should return formatted products', () => {
      const productMap = createProductMap(mockedMarketOrderDetail);
      expect(productMap).toMatchObject(mockProductMap);
    });
  });

  describe('#getProductsTotalAmount', () => {
    it('should return the corrrent refund amount', () => {
      const refundAmout = getProductsTotalAmount(mockedMarketOrderDetail);
      expect(Number(refundAmout.toFixed(2))).toEqual(15.90);
    });
  });
});
