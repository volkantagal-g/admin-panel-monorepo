import * as Yup from 'yup';

export const validationSchema = () => {
  return (Yup.object()
    .shape({
      product: Yup.string().required(),
      count: Yup.number()
        .min(1)
        .required(),
      sort: Yup.number()
        .min(1)
        .required(),
    })
  );
};

const getSortValue = (oldSortValue, newSortValue) => {
  let modifiedSortValue;
  if (!oldSortValue) {
    // NOTE: oldSortValue comes as undefeined Whenever new bundle product added
    modifiedSortValue = newSortValue - 0.1;
  }
  else if (newSortValue === 1) {
    modifiedSortValue = 0.9;
  }
  else if (oldSortValue > newSortValue) {
    modifiedSortValue = newSortValue - 0.1;
  }
  else if (oldSortValue < newSortValue) {
    modifiedSortValue = newSortValue + 0.1;
  }
  return modifiedSortValue;
};

export const getModifiedInitialValues = values => {
  const newValues = { ...values };
  return newValues;
};

export const getModifiedValues = (values, product, oldSort) => {
  const sort = getSortValue(oldSort, values.sort);
  const newValues = {
    product,
    count: values.count,
    sort,
  };
  return newValues;
};

export const getInitialValues = (currentBundleProduct, bundleProducts) => {
  let initialValues = {
    product: null,
    count: 1,
    sort: bundleProducts.length + 1,
  };

  if (currentBundleProduct) {
    initialValues = {
      product: currentBundleProduct?.product?._id,
      count: currentBundleProduct.count,
      sort: currentBundleProduct.sort,
    };
  }

  return getModifiedInitialValues(initialValues);
};
