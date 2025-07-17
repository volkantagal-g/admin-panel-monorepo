import * as Yup from 'yup';

export const validationSchema = () => {
  return (Yup.object()
    .shape({
      name: Yup.string()
        .trim()
        .required(),
    })
  );
};

export const manipulateValuesAfterSubmit = values => {
  const { name } = values;
  return { name };
};

export const getInitialValues = transferGroup => {
  return transferGroup;
};
