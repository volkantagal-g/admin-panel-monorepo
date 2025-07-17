export const initialValues = {};

export const manipulateValuesAfterSubmit = values => {
  let tempValues = values;
  const validFrom = tempValues?.dateRange?.[0];
  const validUntil = tempValues?.dateRange?.[1];

  tempValues = {
    ...values,
    page: 0,
    validFrom: validFrom?.toISOString(),
    validUntil: validUntil?.toISOString(),
    domainType: values?.domainType,
    status: values?.status,
  };
  delete tempValues.dateRange;

  return ({ ...tempValues });
};
