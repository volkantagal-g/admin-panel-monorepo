import * as Yup from 'yup';

export const validationSchema = () => {
  return (Yup.object()
    .shape({ segments: Yup.array().of(Yup.string()) })
  );
};

export const getInitialValues = segments => {
  const initialValues = { segments };
  return initialValues;
};
