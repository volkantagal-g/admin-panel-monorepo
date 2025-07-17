import * as Yup from 'yup';

export const defaultValues = {
  name: undefined,
  reference: undefined,
  weight: undefined,
  volume: undefined,
  longestEdge: undefined,
  duration: undefined,
  tags: undefined,
};

export const validationSchema = () => {
  return Yup.object().shape({
    name: Yup.string().trim().required(),
    reference: Yup.object().required(),
    weight: Yup.number().moreThan(0).required(),
    volume: Yup.number().moreThan(0).required(),
    longestEdge: Yup.number().moreThan(0).required(),
    duration: Yup.number().moreThan(0).required(),
    tags: Yup.array().of(Yup.number()).notRequired(),
  });
};
