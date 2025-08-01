import { mockedMarketOrderDetailWithAllUniqueTypesOfOrders } from '@shared/api/marketOrder/index.mock.data';
import { formatBasketProducts } from '.';

describe('[MarketOrder Detail] ProductList Utils', () => {
  describe('#formatBasketProducts', () => {
    it('should return basket products formatted', () => {
      const products = formatBasketProducts(mockedMarketOrderDetailWithAllUniqueTypesOfOrders.basket);
      expect(products).toHaveLength(5);
      const singleProduct = products[0];
      expect(singleProduct).not.toHaveProperty('children');
      expect(singleProduct).toHaveProperty('weight');
      expect(singleProduct?.weight).toEqual('1kg');

      const bundleProduct = products[4];
      expect(bundleProduct).toHaveProperty('children');
      expect(bundleProduct.children).toHaveLength(1);
      expect(bundleProduct).not.toHaveProperty('weight');
    });
  });
});
