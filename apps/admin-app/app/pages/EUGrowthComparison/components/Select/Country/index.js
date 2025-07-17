import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import AntSelect from '@shared/components/UI/AntSelect';
import { COUNTRIES } from '@shared/shared/countryList';
import { getLangKey } from '@shared/i18n';
import { convertSelectOptions } from '@shared/utils/common';
import { countriesSelector } from '../../../redux/selectors';

import useStyles from './styles';

const SelectCountry = ({
  isDisabled = false,
  isClearable = false,
  onChange,
  value,
  ...otherProps
}) => {
  const classes = useStyles();
  const [selectedCountry, setSelectedCountry] = useState();
  const { t } = useTranslation('euGrowthComparison');

  const countries = useSelector(countriesSelector.getCountries);
  const countryOptionsIsPending = useSelector(countriesSelector.getCountriesIsPending);

  const countryOptions = convertSelectOptions(countries, ({ valueKey: 'countryCode', labelKey: 'countryCode' })).map(option => ({
    ...option,
    label: COUNTRIES[option.label.toLowerCase()][getLangKey()],
  }));

  const handleChange = val => {
    setSelectedCountry(val);
    const country = countries.filter(option => option.countryCode === val)[0];
    localStorage.setItem('euGrowthCountry', JSON.stringify(country));
    onChange(country);
  };

  useEffect(() => {
    setSelectedCountry(value);
  }, [value]);

  return (
    <AntSelect
      className={classes.fullWidth}
      value={selectedCountry}
      options={countryOptions}
      onChange={handleChange}
      disabled={isDisabled || countryOptionsIsPending}
      allowClear={isClearable}
      placeholder={t('SELECT_COUNTRY')}
      {...otherProps}
    />
  );
};

export default SelectCountry;
