import * as Yup from 'yup';

export const validationSchema = () => Yup.object().shape({
  picURL: Yup.string(),
  detailsOfExperience: Yup.string(),
  languages: Yup.string(),
  topic: Yup.array().optional(),
});

export const INITIAL_VALUES = {
  picURL: undefined,
  detailsOfExperience: undefined,
  languages: undefined,
  topic: undefined,
};
