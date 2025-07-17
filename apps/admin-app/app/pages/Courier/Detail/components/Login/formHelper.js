import * as Yup from 'yup';

export const validationSchema = () => {
  return Yup.object().shape({
    _id: Yup.string().trim().required(),
    isLoginDisabled: Yup.boolean().required(),
  });
};
