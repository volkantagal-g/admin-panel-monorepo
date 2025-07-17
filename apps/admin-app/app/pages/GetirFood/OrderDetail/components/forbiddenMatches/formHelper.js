import * as Yup from 'yup';

export const validationSchema = () => {
  return (Yup.object()
    .shape({
      forbiddenMatch: Yup.string()
        .trim().required(),
    })
  );
};

export const manipulateValuesBeforeSubmit = values => {
  const newValues = { ...values };
  return newValues;
};

export const getInitialValues = () => {
  const initialValues = { forbiddenMatch: '' };
  return manipulateValuesBeforeSubmit(initialValues);
};
