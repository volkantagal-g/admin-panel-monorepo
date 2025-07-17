import * as Yup from 'yup';

export const validationSchema = () => Yup.object().shape({
  picURL: Yup.string(),
  bio: Yup.string().optional(),
  topicsInterested: Yup.array().optional(),
  isMentor: Yup.bool().optional(),
  topicsToTeach: Yup.array().when('isMentor', {
    is: true,
    then: Yup.array().required(),
    otherwise: Yup.array(),
  }),
  languages: Yup.array().optional(),
});
