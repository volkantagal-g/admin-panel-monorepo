import { useMemo } from 'react';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { sortBy } from 'lodash';

import { COUNTRIES } from '@shared/shared/constants';
import { getLangKey } from '@shared/i18n';
import { getSelectFilterOption } from '@shared/utils/common';

const SelectCountry = ({
  mode,
  value,
  defaultValue,
  onChange,
  disabled,
  allowClear = true,
  showArrow = true,
  countries,
  className,
  showTurkeyFirst = false,
  ...otherProps
}) => {
  const { t } = useTranslation(['global']);
  const options = useMemo(() => {
    const langKey = getLangKey();
    const countryConstants = countries || COUNTRIES;
    const tempOptions = sortBy(Object.keys(countryConstants).map(key => ({ label: countryConstants[key][langKey], value: key })), 'label');
    if (showTurkeyFirst && countryConstants.tr) {
      const index = tempOptions.findIndex(item => item.label === countryConstants.tr[langKey]);

      if (index > -1) {
        const [item] = tempOptions.splice(index, 1);
        tempOptions.unshift(item);
      }
    }
    if (countryConstants.global) {
      const index = tempOptions.findIndex(item => item.label === countryConstants.global[langKey]);
      if (index > -1) {
        const [item] = tempOptions.splice(index, 1);
        tempOptions.unshift(item);
      }
    }

    return tempOptions;
  }, [countries, showTurkeyFirst]);

  return (
    <Select
      {...(mode ? { mode } : undefined)}
      {...(defaultValue ? { defaultValue } : undefined)}
      value={value}
      options={options}
      onChange={onChange}
      allowClear={allowClear}
      disabled={disabled}
      placeholder={t('global:COUNTRY')}
      showArrow={showArrow}
      showSearch
      filterOption={getSelectFilterOption}
      className={className}
      {...otherProps}
    />
  );
};

export default SelectCountry;
