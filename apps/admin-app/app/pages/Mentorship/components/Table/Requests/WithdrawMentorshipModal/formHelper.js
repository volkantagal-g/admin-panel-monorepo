import * as Yup from 'yup';

export const defaultValues = { withdrawReason: undefined };

export const validationSchema = () => {
  return Yup.object()
    .shape({ withdrawReason: Yup.string().required() });
};
