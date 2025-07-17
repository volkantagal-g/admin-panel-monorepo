import * as Yup from 'yup';

export const defaultValues = { requestReason: undefined };

export const validationSchema = () => {
  return Yup.object()
    .shape({ requestReason: Yup.string().required() });
};
