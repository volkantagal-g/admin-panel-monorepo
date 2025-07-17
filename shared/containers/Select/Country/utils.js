import { get } from 'lodash';

import { GlobalOutlined } from '@ant-design/icons';

import { getLangKey, t } from '@shared/i18n';
import { getFilteredOperationalAndOldOperationalCountries } from '@shared/utils/common';

export const defaultLabelOption = `name.${getLangKey()}`;
export const globalOptionId = 'hasGlobalAccess';

export const customLabelFormatter = ({ item, labelOption }) => ({
  label: `${item?.flag} - ${get(item, labelOption, '')}`,
  'aria-label': get(item, labelOption, ''),
});

export const convertSelectOptions = ({
  countries = [],
  labelOption = defaultLabelOption,
  showOldCountries = false,
  isOldCountriesSelectable = false,
}) => {
  const generateOptions = (countriesData, disabled) => {
    return countriesData.map(country => ({
      value: country._id,
      ...customLabelFormatter({ item: country, labelOption }),
      keyword: get(country, labelOption),
      data: country,
      disabled,
    }));
  };

  if (!showOldCountries) {
    return generateOptions(countries);
  }

  const options = [];
  const globalCountries = countries.filter(country => country._id === globalOptionId);
  const otherCountries = countries.filter(country => country._id !== globalOptionId);
  if (globalCountries?.length) {
    options.push(...generateOptions(globalCountries));
  }
  const { operationalCountries, oldOperationalCountries } = getFilteredOperationalAndOldOperationalCountries(otherCountries);
  options.push(...generateOptions(operationalCountries));
  if (oldOperationalCountries?.length) {
    options.push({
      label: t('OLD_COUNTRIES'),
      options: generateOptions(oldOperationalCountries, !isOldCountriesSelectable),
    });
  }

  return options;
};

export const getGlobalOptionAsCountry = () => {
  return {
    _id: globalOptionId,
    name: { [getLangKey()]: t('global:HAS_GLOBAL_ACCESS_VALUE') },
    flag: <GlobalOutlined />,
  };
};
