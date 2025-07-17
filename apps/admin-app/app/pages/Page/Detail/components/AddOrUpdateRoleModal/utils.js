import { createMap } from '@shared/utils/common';
import { convertSelectOptions as convertCountrySelectOptions } from '@shared/containers/Select/Country';

export const getInitialCountryOptions = ({ countries, defaultSelectedRole }) => {
  const filteredCountries = [];
  if (defaultSelectedRole) {
    const countriesMap = createMap(countries);
    defaultSelectedRole?.permittedCountries?.forEach(country => {
      filteredCountries.push(countriesMap[country]);
    });
  }
  const convertedCountries = convertCountrySelectOptions({ countries: filteredCountries });
  return convertedCountries;
};
