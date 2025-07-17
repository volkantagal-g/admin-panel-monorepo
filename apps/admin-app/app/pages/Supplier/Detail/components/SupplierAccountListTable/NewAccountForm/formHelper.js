import * as Yup from 'yup';

export const defaultValues = {
  dcBonus: null,
  code: null,
  name: null,
};

export const validationSchema = () => {
  return Yup.object().shape({
    dcBonus: Yup.number(),
    code: Yup.string(),
    name: Yup.string(),
  });
};