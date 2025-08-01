import * as Yup from 'yup';

export const defaultValues = {
  permissions: [],
  role: '',
};

export const validationSchema = () => {
  return Yup.object().shape({
    _id: Yup.string().trim().required(),
    roles: Yup.array().of(Yup.object().shape({
      permissions: Yup.array().of(Yup.string()).required(),
      role: Yup.object().required(),
    })),
  });
};
