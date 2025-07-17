export const transformValuesForApi = (values, langKey) => {
  const { countries, ...queryParams } = values;

  if (values.dateRange) {
    [queryParams.startDate, queryParams.dueDate] = values.dateRange;
  }

  queryParams.page = 0;
  queryParams.size = 10;
  queryParams.clientLanguage = langKey;
  if (countries) queryParams.targetCountries = countries;

  if (!values?.ids?.length) {
    delete queryParams.ids;
  }

  delete queryParams?.dateRange;
  return queryParams;
};
