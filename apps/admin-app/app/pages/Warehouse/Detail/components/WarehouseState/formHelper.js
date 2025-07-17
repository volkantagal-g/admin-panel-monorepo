import * as Yup from 'yup';

export const defaultValues = {
  state: 100,
  status: 100,
};

export const validationSchema = () => {
  return Yup.object()
    .shape({
      state: Yup.number().min(100),
      status: Yup.number().min(100),
    });
};
