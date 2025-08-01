import * as Yup from 'yup';

export const validationSchema = () => {
  return Yup.object().shape({
    _id: Yup.string().trim().required(),
    franchise: Yup.object().shape({
      _id: Yup.string().trim().required(),
      name: Yup.string().trim().required(),
    }),
  });
};
