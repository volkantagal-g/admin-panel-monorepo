export const initialValues = {};

export const manipulateValuesAfterSubmit = values => {
  let tempValues = values;
  const startDate = tempValues?.dateRange?.[0];
  const endDate = tempValues?.dateRange?.[1];

  tempValues = {
    ...values,
    page: 0,
    startDate: startDate?.toISOString(),
    endDate: endDate?.toISOString(),
    targetDomain: values?.targetDomain,
    customTag: values?.customTag,
    status: values?.status,
    bannerType: values?.bannerType,
  };
  delete tempValues.dateRange;

  return ({ ...tempValues });
};
