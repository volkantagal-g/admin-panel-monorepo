import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Select, Spin } from 'antd';

import { t } from '@shared/i18n';
import { getSelectFilterOption } from '@shared/utils/common';
import { operationalCountriesSelector, countriesSelector } from '@shared/redux/selectors/common';
import { defaultLabelOption, convertSelectOptions, customLabelFormatter, getGlobalOptionAsCountry } from './utils';
import useStyles from './styles';

const SelectCountry = ({
  value,
  onChange,
  disabled = false,
  allowClear = true,
  showArrow = true,
  labelOption = defaultLabelOption,
  showGlobalOption = false,
  showOldCountries = false,
  isOldCountriesSelectable = false,
  className,
  ...otherProps
}) => {
  const classes = useStyles();

  const allCountries = useSelector(countriesSelector.getData);
  const allCountriesIsPending = useSelector(countriesSelector.getIsPending);

  const operationalCountries = useSelector(operationalCountriesSelector.getData);
  const operationalCountriesIsPending = useSelector(operationalCountriesSelector.getIsPending);
  const isPending = allCountriesIsPending || operationalCountriesIsPending;

  const countries = showOldCountries ? allCountries : operationalCountries;
  const countrySelectOptions = useMemo(() => {
    const countriesExtra = showGlobalOption ? [...countries, getGlobalOptionAsCountry()] : countries;
    const selectOptions = convertSelectOptions({ countries: countriesExtra, labelOption, showOldCountries, isOldCountriesSelectable });
    return selectOptions;
  }, [countries, labelOption, showGlobalOption, showOldCountries, isOldCountriesSelectable]);

  // cannot to use debounce because all options are processed one by one
  const handleFilterOption = (inputValue, option) => (
    getSelectFilterOption(inputValue, option, true, 'keyword')
  );

  return (
    <Select
      value={value}
      options={countrySelectOptions}
      filterOption={handleFilterOption}
      onChange={onChange}
      allowClear={allowClear}
      disabled={disabled}
      loading={isPending}
      placeholder={!disabled && t('global:COUNTRY')}
      notFoundContent={isPending ? <Spin size="small" /> : undefined}
      showArrow={showArrow && !disabled}
      showSearch
      className={className ? `${classes.wrapper} ${className}` : classes.wrapper}
      {...otherProps}
    />
  );
};

export {
  convertSelectOptions,
  customLabelFormatter,
};

export default SelectCountry;
