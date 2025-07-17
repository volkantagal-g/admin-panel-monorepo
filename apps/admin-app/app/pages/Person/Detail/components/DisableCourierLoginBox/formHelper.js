import * as Yup from 'yup';

export const DEFAULT_COURIER_LOGIN = {
  isLoginDisabled: undefined,
  explanation: '',
  reason: undefined,
};

export const validationSchema = () => {
  return Yup.object().shape({
    isLoginDisabled: Yup.bool(),
    explanation: Yup.string().when('isLoginDisabled', {
      is: true,
      then: Yup.string().trim().required(),
    }),
    reason: Yup.number().when('isLoginDisabled', {
      is: true,
      then: Yup.number().required(),
    }),
  });
};
