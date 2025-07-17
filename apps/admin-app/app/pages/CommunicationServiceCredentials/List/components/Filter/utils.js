export const manipulateValuesBeforeSubmit = values => {
  let tempValues = values;
  const startDate = tempValues?.dateRange?.[0];
  const endDate = tempValues?.dateRange?.[1];
  tempValues = {
    ...values,
    page: 0,
    startDate: startDate?.toISOString(),
    endDate: endDate?.toISOString(),
  };
  delete tempValues.dateRange;
  return ({ ...tempValues });
};
