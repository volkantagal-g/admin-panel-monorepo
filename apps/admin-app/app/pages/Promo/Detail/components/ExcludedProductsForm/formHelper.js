export const getOnlyModifiedValuesBeforeSubmit = ({ values }) => {
  const excludedProductCategories = values?.excludedProductCategories?.map(productCategory => {
    return productCategory.value ? productCategory.value : productCategory;
  });
  return { ...values, excludedProductCategories };
};
