import * as Yup from 'yup';

export const validationSchema = () => {
  return (Yup.object()
    .shape({
      amount: Yup
        .number()
        .min(1)
        .required(),
      note: Yup
        .string()
        .required(),
    })
  );
};

export const manipulateValuesBeforeSubmit = values => {
  const newValues = { ...values };
  return newValues;
};

export const getInitialValues = () => {
  const initialValues = {
    amount: null,
    note: null,
  };
  return manipulateValuesBeforeSubmit(initialValues);
};
