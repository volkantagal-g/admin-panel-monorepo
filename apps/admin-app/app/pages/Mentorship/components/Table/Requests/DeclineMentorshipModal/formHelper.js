import * as Yup from 'yup';

export const defaultValues = { declineReason: undefined };

export const validationSchema = () => {
  return Yup.object()
    .shape({ declineReason: Yup.string().required() });
};
