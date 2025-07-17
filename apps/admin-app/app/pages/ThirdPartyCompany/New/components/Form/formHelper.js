import * as Yup from 'yup';

export const validationSchema = () => {
  return Yup.object()
    .shape({
      name: Yup.string()
        .min(5)
        .max(50)
        .required(),
      description: Yup.string()
        .min(5)
        .max(200)
        .required(),
      allowedRoutes: Yup.array()
        .min(1)
        .of(Yup.string())
        .required(),
    });
};

export const getInitialValues = () => ({
  name: '',
  description: '',
  allowedRoutes: [],
});
