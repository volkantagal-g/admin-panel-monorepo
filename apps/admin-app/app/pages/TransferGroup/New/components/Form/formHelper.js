import * as Yup from 'yup';

export const defaultValues = { name: { en: '', tr: '' } };

export const validationSchema = () => {
  return Yup.object()
    .shape({
      name: Yup.object().shape({
        tr: Yup.string()
          .trim()
          .min(2)
          .max(64)
          .required(),
        en: Yup.string()
          .trim()
          .min(2)
          .max(64)
          .required(),
      }),
    });
};
