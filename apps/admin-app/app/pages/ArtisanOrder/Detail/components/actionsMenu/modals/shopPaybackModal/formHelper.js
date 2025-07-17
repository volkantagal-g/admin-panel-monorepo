import * as Yup from 'yup';

export const validationSchema = () => {
  return (Yup.object()
    .shape({
      supplierNetRevenue: Yup
        .number()
        .min(1)
        .required(),
      noteToShop: Yup
        .string()
        .max(1000)
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
    supplierNetRevenue: null,
    noteToShop: null,
  };
  return manipulateValuesBeforeSubmit(initialValues);
};
