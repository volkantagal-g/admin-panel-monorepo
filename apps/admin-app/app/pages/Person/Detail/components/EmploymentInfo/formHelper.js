import * as Yup from 'yup';

export const validationSchema = () => {
  return Yup.object().shape({ employmentType: Yup.number().required() });
};
