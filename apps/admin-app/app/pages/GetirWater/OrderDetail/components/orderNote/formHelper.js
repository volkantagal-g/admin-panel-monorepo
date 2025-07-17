import * as Yup from 'yup';

export const validationSchema = () => {
  return Yup.object().shape({ message: Yup.string().trim() });
};

export const getInitialValues = () => {
  return { message: '' };
};
