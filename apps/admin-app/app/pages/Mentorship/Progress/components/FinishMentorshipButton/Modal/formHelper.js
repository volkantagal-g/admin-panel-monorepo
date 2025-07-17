import * as Yup from 'yup';

export const defaultValues = { finishedReason: undefined, finishedDetails: undefined };

export const validationSchema = () => {
  return Yup.object()
    .shape({
      finishedReason: Yup.string().required(),
      finishedDetails: Yup.string().required(),
    });
};
