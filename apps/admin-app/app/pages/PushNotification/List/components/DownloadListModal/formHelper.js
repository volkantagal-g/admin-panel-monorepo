import * as Yup from 'yup';

export const validationSchema = () => {
  return (Yup.object()
    .shape({
      email: Yup.string().email().required(),
      notificationId: Yup.string().required(),
    })
  );
};

export const manipulateValuesBeforeSubmit = values => {
  return { ...values };
};

export const getInitialValues = extInitValues => {
  const initialValues = { email: '', ...extInitValues };
  return manipulateValuesBeforeSubmit(initialValues);
};
