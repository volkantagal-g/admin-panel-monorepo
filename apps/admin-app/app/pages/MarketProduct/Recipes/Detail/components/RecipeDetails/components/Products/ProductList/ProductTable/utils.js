export const getExcludedProducts = ({ products, selectedSubstituteProducts }) => {
  const idSet = new Set();

  products.forEach(product => {
    if (product?._id) idSet.add(product._id);
    if (Array.isArray(product.substituteProductIds)) {
      product.substituteProductIds.forEach(id => idSet.add(id));
    }
  });

  if (selectedSubstituteProducts?.length) {
    selectedSubstituteProducts.forEach(id => {
      idSet.add(id);
    });
  }

  return Array.from(idSet);
};
