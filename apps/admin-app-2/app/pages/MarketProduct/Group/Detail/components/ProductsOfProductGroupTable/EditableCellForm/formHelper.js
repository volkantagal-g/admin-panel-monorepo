import * as Yup from 'yup';

export const validationSchema = (values, { fieldKey }) => {
  return Yup.object()
    .shape({ [fieldKey]: Yup.number().integer().min(1).required() });
};
