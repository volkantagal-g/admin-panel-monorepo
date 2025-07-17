import { forEach, get, sumBy } from 'lodash';

export const createProductMap = marketOrder => {
  const productMap = {};
  const basketProducts = get(marketOrder, 'basket.products') || [];
  const basketBundleProducts = get(marketOrder, 'basket.bundleProducts') || [];
  forEach(basketProducts, product => {
    if (!product.bundle) {
      const { product: productId } = product;
      productMap[productId] = product;
    }
  });
  forEach(basketBundleProducts, bundle => {
    const { product: bundleId } = bundle;
    productMap[bundleId] = bundle;
  });

  return productMap;
};

export const getProductsTotalAmount = marketOrder => {
  let partialRefundProducts = [];
  forEach(marketOrder.partialRefunds, product => {
    partialRefundProducts = [...partialRefundProducts, ...product.products];
  });
  return sumBy(partialRefundProducts, 'refundAmount');
};
