import * as Yup from 'yup';

export const defaultValues = {
  permissions: [],
  role: '',
};

export const validationSchema = () => {
  return Yup.object().shape({
    permissions: Yup.array().of(Yup.string()).required(),
    role: Yup.string().required(),
  });
};
