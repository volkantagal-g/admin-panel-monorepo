import * as Yup from 'yup';

export const validationSchema = () => {
  return Yup.object().shape({
    name: Yup.string().trim().required(),
    username: Yup.string().trim().required(),
    gsm: Yup.number().required(),
    email: Yup.string().email().trim().required(),
    isOwner: Yup.bool().required(),
    isGetirEmployee: Yup.bool().required(),
    groupType: Yup.number().required(),
  });
};
