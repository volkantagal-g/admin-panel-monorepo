import { isBoolean, set } from 'lodash';

export const getAutoColProps = countryLanguages => {
  if (countryLanguages.length < 3) return { xs: 24, md: 12, lg: 12 };
  return { cs: 24, md: 8, lg: 8 };
};

export const getFormattedCSVExample = exampleCsv => {
  const keysString = Object.keys(exampleCsv || {});
  const columns = keysString.map(key => {
    return {
      title: key,
      dataIndex: key,
      key,
    };
  }) || [];

  Object.entries(exampleCsv)?.forEach(([key, value]) => {
    if (isBoolean(value)) {
      set(exampleCsv, key, JSON.stringify(value));
    }
  });

  const data = [exampleCsv] || [];

  return { data, columns };
};
