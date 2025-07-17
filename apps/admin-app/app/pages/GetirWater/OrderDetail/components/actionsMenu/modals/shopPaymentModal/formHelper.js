import * as Yup from 'yup';

export const validationSchema = () => {
  return (Yup.object()
    .shape({
      paymentRevenue: Yup
        .number()
        .min(1)
        .required(),
      paymentNote: Yup
        .string()
        .required(),
    })
  );
};

export const manipulateValuesBeforeSubmit = values => {
  const newValues = { ...values };
  return newValues;
};

export const manipulateValuesAfterSubmit = values => {
  const newValues = { ...values };
  return newValues;
};

export const getInitialValues = () => {
  const initialValues = {
    paymentRevenue: null,
    paymentNote: null,
  };
  return manipulateValuesBeforeSubmit(initialValues);
};
