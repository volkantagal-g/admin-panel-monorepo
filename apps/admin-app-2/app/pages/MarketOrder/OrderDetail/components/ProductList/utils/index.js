export const formatBasketProducts = basket => {
  const products = basket?.products || [];
  const bundleProducts = basket?.bundleProducts || [];

  const bundleProductsWithChildren = bundleProducts.map(bundleProduct => {
    const children = products.filter(product => product.bundle?.bundle === bundleProduct.product);
    return {
      ...bundleProduct,
      totalAmount: children.reduce((acc, child) => child.totalAmount + acc, 0),
      discountedTotalAmount: children.reduce((acc, child) => child.discountedTotalAmount + acc, 0),
      children,
    };
  });

  const singleProducts = products.filter(product => !product.bundle);

  const formattedBasketProducts = [
    ...singleProducts,
    ...bundleProductsWithChildren,
  ];
  return formattedBasketProducts.map(product => {
    if (product?.weightInfo && product?.count) {
      Object.assign(product, { weight: `${(product.count / 1000)}kg` });
    }
    return product;
  });
};
