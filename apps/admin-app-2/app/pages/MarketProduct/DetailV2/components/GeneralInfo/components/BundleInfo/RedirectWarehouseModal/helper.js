const getModifiedValues = values => values?.map(item => item?.product?._id);

export const getDifferenceBetweenArrays = ({ existingBundleProducts, bundleProducts }) => {
  const initialValues = getModifiedValues(existingBundleProducts);
  const values = getModifiedValues(bundleProducts);
  const differenceInitialValuesToValues = initialValues.filter(value => !values.includes(value));
  const differenceValuesToInitialValues = values.filter(value => !initialValues.includes(value));
  const difference = differenceInitialValuesToValues?.length > 0 || differenceValuesToInitialValues?.length > 0;
  return difference;
};
