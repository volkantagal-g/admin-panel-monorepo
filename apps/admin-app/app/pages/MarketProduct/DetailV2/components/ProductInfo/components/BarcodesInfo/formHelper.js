import * as Yup from 'yup';

export const validationSchema = (values, { isProductActive } = {}) => {
  return (Yup.object()
    .shape({
      barcodes: Yup.array()
        .when('a', (a, schema) => {
          if (isProductActive) {
            return schema
              .of(Yup.string().trim().required())
              .min(1)
              .required();
          }
          return schema;
        }),
    })
  );
};

export const getInitialValues = marketProduct => {
  return { barcodes: marketProduct?.barcodes };
};
