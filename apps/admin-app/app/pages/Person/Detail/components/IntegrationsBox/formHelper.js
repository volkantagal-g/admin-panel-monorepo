import * as Yup from 'yup';

export const validationSchema = () => {
  return Yup.object().shape({ payrollId: Yup.string().nullable() });
};
