import * as Yup from 'yup';

export const validationSchema = () => {
  return Yup.object().shape({
    name: Yup.string().trim().required(),
    type: Yup.number().required(),
    weight: Yup.number().moreThan(0).required(),
    volume: Yup.number().moreThan(0).required(),
    longestEdge: Yup.number().moreThan(0).required(),
    duration: Yup.number().moreThan(0).required(),
    tags: Yup.array().of(Yup.number()).notRequired(),
  });
};
