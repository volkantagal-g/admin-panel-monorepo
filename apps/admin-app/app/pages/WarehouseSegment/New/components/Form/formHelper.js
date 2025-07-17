import * as Yup from 'yup';

export const defaultValues = {
  name: '',
  isDefault: false,
};

export const validationSchema = () => {
  return Yup.object()
    .shape({
      name: Yup.string()
        .trim()
        .required(),
      isDefault: Yup.boolean(),
    });
};
