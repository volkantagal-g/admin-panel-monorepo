import * as Yup from 'yup';

export const validationSchema = () => {
  return (Yup.object()
    .shape({
      message: Yup.string()
        .trim().required(),
    })
  );
};

export const manipulateValuesBeforeSubmit = values => {
  const newValues = { ...values };
  return newValues;
};

export const manipulateValuesAfterSubmit = (values, user, filter) => {
  return {
    from: {
      _id: user._id,
      name: user.name,
    },
    message: values.message,
    ...filter,
  };
};

export const getInitialValues = () => {
  const initialValues = { message: '' };
  return manipulateValuesBeforeSubmit(initialValues);
};
