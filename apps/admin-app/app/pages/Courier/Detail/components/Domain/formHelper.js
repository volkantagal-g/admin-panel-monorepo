import * as Yup from 'yup';

export const validationSchema = () => {
  return Yup.object().shape({
    _id: Yup.string().trim().required(),
    domainTypes: Yup.array().of(Yup.number()).required(),
  });
};
