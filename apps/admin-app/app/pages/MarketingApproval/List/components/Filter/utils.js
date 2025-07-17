export const initialValues = {};

export const manipulateValuesAfterSubmit = values => {
  const tempValues = {
    ...values,
    page: 1,
    promoCode: values?.promoCode,
    statuses: values?.statuses,
    types: values?.types,
  };

  return ({ ...tempValues });
};
