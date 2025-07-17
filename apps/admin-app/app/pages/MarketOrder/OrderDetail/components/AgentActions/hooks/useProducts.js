import { useMemo } from 'react';

import { useSelector } from 'react-redux';

import { orderDetailSelector } from '@app/pages/MarketOrder/OrderDetail/redux/selectors';

const useProducts = () => {
  const orderDetail = useSelector(orderDetailSelector.getData);

  const basketProducts = useMemo(() => {
    const products = orderDetail.basket?.products || [];
    const bundleProducts = orderDetail.basket?.bundleProducts || [];
    const bundleProductsWithDiscountedAmount = bundleProducts.map(bundle => {
      const children = products.filter(product => product.bundle?.bundle === bundle.product);
      const allProductAmount = children.reduce((acc, child) => child.discountedTotalAmount + acc, 0);
      const discountedBundlePrice = (allProductAmount / bundle.count).toFixed(2);
      const withDiscount = {
        ...bundle,
        discountedTotalAmount: discountedBundlePrice,
      };

      return {
        ...withDiscount,
        isDiscounted: withDiscount.discountedTotalAmount > 0,
      };
    });

    return [...products, ...bundleProductsWithDiscountedAmount].filter(product => !product.bundle);
  }, [orderDetail]);

  const productsPartiallyRefunded = useMemo(() => {
    const partialRefunds = orderDetail.partialRefunds || [];
    return partialRefunds
      .map(partialRefund => partialRefund.products)
      .flat()
      .reduce((orderProducts, { product: productId, count }) => {
        const updatedProductCount = orderProducts[productId] || 0;
        return {
          ...orderProducts,
          [productId]: updatedProductCount + count,
        };
      }, {});
  }, [orderDetail]);

  const products = useMemo(() => basketProducts.map(basketProduct => ({
    ...basketProduct,
    refunded: productsPartiallyRefunded[basketProduct.product] || 0,
  })), [productsPartiallyRefunded, basketProducts]);

  return {
    products,
    productsWithRefunds: productsPartiallyRefunded,
    allProductsRefunded: products.every(product => product.refunded),
  };
};

export default useProducts;
