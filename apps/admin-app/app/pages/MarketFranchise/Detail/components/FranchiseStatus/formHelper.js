import * as Yup from 'yup';

export const defaultValues = { isActivated: false };

export const validationSchema = () => {
  return Yup.object()
    .shape({ isActivated: Yup.bool() });
};
