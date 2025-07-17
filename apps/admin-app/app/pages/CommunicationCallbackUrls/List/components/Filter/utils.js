export const manipulateValuesBeforeSubmit = values => {
  let tempValues = values;
  const start = tempValues?.dateRange?.[0];
  const end = tempValues?.dateRange?.[1];
  tempValues = {
    ...values,
    page: 0,
    start: start?.toISOString(),
    end: end?.toISOString(),
  };
  delete tempValues.dateRange;
  return ({ ...tempValues });
};
