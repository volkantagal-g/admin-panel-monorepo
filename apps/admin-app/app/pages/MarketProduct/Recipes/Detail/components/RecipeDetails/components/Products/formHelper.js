import * as Yup from 'yup';

export const validationSchema = () => {
  return (Yup.object()
    .shape({
      products: Yup.array().of(Yup.object(
        {
          _id: Yup.string().required(),
          substituteProductIds: Yup.array().of(Yup.string()),
          isMandatory: Yup.boolean(),
        },
      )).min(0),
    })
  );
};

export const getInitialValues = products => {
  const initialValues = { products: products?.length ? products : [] };
  return initialValues;
};

export const getModifiedValues = values => {
  const modifiedValues = values.map(item => ({
    productId: item?._id,
    substituteProductIds: item?.substituteProductIds?.length ? item.substituteProductIds : undefined,
    isMandatory: item?.isMandatory || false,
  }));

  return { products: modifiedValues };
};
