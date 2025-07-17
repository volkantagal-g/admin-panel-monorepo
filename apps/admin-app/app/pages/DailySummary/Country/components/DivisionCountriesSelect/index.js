import { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';

import { getDivisionsCountriesSelector } from '@shared/redux/selectors/common';
import useDebounce from '@shared/shared/hooks/useDebounce';
import { convertSelectOptions } from '@shared/utils/common';
import { getSelectedCountryDivision } from '@shared/redux/selectors/countrySelection';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import useStyles from './styles';

const DivisionCountriesSelect = ({ onCountriesChange, disabled, defaultSelectedDivisionCountries }) => {
  const dispatch = useDispatch();
  const divisionCountries = useSelector(getDivisionsCountriesSelector.getOperationalCountries);
  const isDivisionCountriesPending = useSelector(getDivisionsCountriesSelector.getIsPending);
  const selectedDivision = getSelectedCountryDivision();

  const [localSelectedDivisionCountries, setLocalSelectedDivisionCountries] = useState(null);

  const DEBOUNCE_TIME = 200;
  const debouncedSelectedDivisionCountries = useDebounce(localSelectedDivisionCountries, DEBOUNCE_TIME) || defaultSelectedDivisionCountries;

  const { t } = useTranslation();
  const classes = useStyles({
    localSelectedDivisionCountries,
    defaultSelectedDivisionCountries,
  });

  const handleDivisionCountriesChange = newSelectedCountries => setLocalSelectedDivisionCountries(newSelectedCountries);

  useEffect(() => {
    if (selectedDivision) {
      dispatch(CommonCreators.getDivisionsCountriesRequest({ division: selectedDivision }));
      dispatch(CommonCreators.getDivisionsCitiesRequest({ division: selectedDivision }));
    }
  }, [dispatch, selectedDivision]);

  useEffect(() => {
    onCountriesChange(debouncedSelectedDivisionCountries);
  }, [onCountriesChange, debouncedSelectedDivisionCountries]);

  const divisionOptions = useMemo(
    () => convertSelectOptions(divisionCountries, { labelKey: 'name', isTranslation: true, isData: true }),
    [divisionCountries],
  );

  return (
    <Select
      value={debouncedSelectedDivisionCountries}
      onChange={handleDivisionCountriesChange}
      options={divisionOptions}
      loading={isDivisionCountriesPending}
      placeholder={t('global:COUNTRIES')}
      className={classes.selectInputWrapper}
      disabled={disabled}
      mode="multiple"
      maxTagCount={1}
      allowClear
      showArrow
      showSearch
    />
  );
};

export default DivisionCountriesSelect;
