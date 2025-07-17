import * as Yup from 'yup';

export const DEFAULT_TRAINING_FORM = {
  franchise: undefined,
  trainer: undefined,
  certificateNumber: undefined,
  trainingType: undefined,
  trainingDate: undefined,
};

export const validationSchema = () => {
  return Yup.object().shape({
    franchise: Yup.string().required(),
    trainer: Yup.string().required(),
    certificateNumber: Yup.string().required(),
    trainingType: Yup.number().required(),
    trainingDate: Yup.date().required(),
  });
};
