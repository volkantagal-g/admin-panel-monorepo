import * as Yup from 'yup';

export const defaultValues = { name: '', sapCode: '' };

export const validationSchema = () => {
  return Yup.object()
    .shape({
      name: Yup.string()
        .trim()
        .min(2)
        .max(64)
        .required(),
    });
};
