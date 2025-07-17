export const mergeSelectedProductData = ({ prevState, recipeProducts, marketProducts, selectedProducts }) => {
  if (!marketProducts?.length) return [];

  const mergedProductArray = [];

  marketProducts.forEach(item => {
    const prevStateIndex = prevState.findIndex(prevStateItem => prevStateItem?._id === item._id);
    const recipeProductsIndex = recipeProducts.findIndex(recipeProductItem => recipeProductItem?.productId === item._id);
    const indexToPut = selectedProducts?.findIndex(selectedProductId => selectedProductId === item._id);

    if (indexToPut === -1) return;

    mergedProductArray[indexToPut] = {
      ...item,
      ...(recipeProductsIndex !== -1 ? {
        _id: recipeProducts[recipeProductsIndex].productId,
        substituteProductIds: recipeProducts[recipeProductsIndex].substituteProductIds,
        isMandatory: recipeProducts[recipeProductsIndex].isMandatory || false,
      } : {}),
      ...(prevStateIndex !== -1 ? {
        ...prevState[prevStateIndex],
        ...(prevState[prevStateIndex].substituteProductIds?.length ? { substituteProductIds: prevState[prevStateIndex].substituteProductIds } : {}),
        ...(prevState[prevStateIndex].isMandatory !== undefined ? { isMandatory: prevState[prevStateIndex].isMandatory } : {}),
      } : {}),
    };
  });

  return mergedProductArray;
};

export const mergeSelectedModalProductData = ({ substituteProductIds, marketProducts }) => {
  if (!marketProducts?.length) return [];
  const marketProductMap = new Map(marketProducts.map(item => [item._id, item]));

  const mergedProductArray = substituteProductIds
    .map(id => marketProductMap.get(id))
    .filter(Boolean);

  return mergedProductArray;
};
