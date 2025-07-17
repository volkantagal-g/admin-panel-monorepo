import { OptionProps } from 'antd/lib/select';

import { convertSelectOptions as convertCountrySelectOptions } from '@shared/containers/Select/Country';
import { convertSelectOptions, createMap } from '@shared/utils/common';

export type PageSelectOption = {
  value: string;
  label: string;
  data: Record<string, string>;
}

export const getInitialSelectedPages = (defaultSelectedPermission: PageType): PageSelectOption[] => {
  if (!defaultSelectedPermission) return [] as PageSelectOption[];
  return convertSelectOptions([defaultSelectedPermission], {
    labelKey: 'name',
    isTranslation: true,
    isData: true,
  });
};

export type CountrySelectOption = {
  value: string;
  label: string;
  'aria-label': string;
  keyword: string;
  data: ICountry;
};

export const getInitialCountries = (defaultSelectedPermission: PageType, countries: ICountry[]): ICountry[] | CountrySelectOption[] => {
  const filteredCountries = [] as ICountry[];
  if (!defaultSelectedPermission) return filteredCountries;
  const countriesMap = createMap(countries) as Record<string, ICountry>;

  defaultSelectedPermission?.countries?.forEach(country => {
    filteredCountries.push(countriesMap[country]);
  });

  const convertedCountries = convertCountrySelectOptions({ countries: filteredCountries }) as CountrySelectOption[];
  return convertedCountries;
};
