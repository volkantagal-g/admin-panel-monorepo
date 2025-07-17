import * as Yup from 'yup';

export const validationSchema = () => {
  return Yup.object().shape({
    location: Yup.object().shape({
      type: Yup.string(),
      coordinates: Yup.array().of(Yup.number().required()),
    }),
    description: Yup.string().trim().required(),
  });
};
