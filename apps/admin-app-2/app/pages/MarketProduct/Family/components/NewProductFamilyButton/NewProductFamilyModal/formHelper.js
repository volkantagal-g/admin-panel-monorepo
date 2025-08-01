import * as Yup from 'yup';

export const defaultValues = { name: '' };

export const validationSchema = () => {
  return Yup.object()
    .shape({ name: Yup.string().required() });
};
