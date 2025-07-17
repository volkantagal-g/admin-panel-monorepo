import * as Yup from 'yup';

export const defaultValues = { report: '' };

export const validationSchema = () => {
  return Yup.object().shape({ report: Yup.string().required() });
};
