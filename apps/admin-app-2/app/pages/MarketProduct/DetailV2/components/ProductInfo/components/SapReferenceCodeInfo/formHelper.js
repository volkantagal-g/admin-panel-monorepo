import * as Yup from 'yup';

export const validationSchema = () => {
  return Yup.object()
    .shape({ sapReferenceCode: Yup.string() });
};

export const getInitialValues = marketProduct => {
  return { sapReferenceCode: marketProduct?.sapReferenceCode };
};
