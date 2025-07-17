import * as Yup from 'yup';

export const DEFAULT_PASSWORD_VALUES = { password: '' };

export const validationSchema = () => {
  return Yup.object().shape({ password: Yup.string().trim().required() });
};
