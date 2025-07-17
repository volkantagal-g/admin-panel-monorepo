export const manipulateValuesAfterSubmit = values => {
  let tempValues = values;
  const startDate = tempValues?.dateRange?.[0];
  const endDate = tempValues?.dateRange?.[1];

  tempValues = {
    ...values,
    page: 0,
    start: startDate?.toISOString(),
    end: endDate?.toISOString(),
    domainType: values?.domainType,
  };
  delete tempValues.dateRange;

  return ({ ...tempValues });
};

export const manipulateValuesBeforeExport = values => {
  let tempValues = values;
  const startDate = tempValues?.dateRange?.[0];
  const endDate = tempValues?.dateRange?.[1];
  tempValues = {
    ...values,
    start: startDate?.toISOString(),
    end: endDate?.toISOString(),
  };
  delete tempValues.dateRange;
  return ({ ...tempValues });
};
