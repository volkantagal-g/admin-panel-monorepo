import * as Yup from 'yup';

export const defaultValues = { algorithmConfig: "" };

export const validationSchema = () => {
  return Yup.object()
    .shape({ algorithmConfig: Yup.string() });
};
