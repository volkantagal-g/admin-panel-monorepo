import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';

import { getLangKey } from '@shared/i18n';
import { getDivisionsCountriesSelector } from '@shared/redux/selectors/common';
import { Creators } from '../../../redux/actions';
import useStyles from '../styles';
import useDebounce from '@shared/shared/hooks/useDebounce';

const DivisionCountriesSelect = ({ defaultSelectedDivisionCountries }) => {
  const divisionCountries = useSelector(getDivisionsCountriesSelector.getOperationalCountries);
  const isDivisionCountriesPending = useSelector(getDivisionsCountriesSelector.getIsPending);

  const [localSelectedDivisionCountries, setLocalSelectedDivisionCountries] = useState(null);

  const DEBOUNCE_TIME = 500;
  const debouncedSelectedDivisionCountries = useDebounce(localSelectedDivisionCountries, DEBOUNCE_TIME) || defaultSelectedDivisionCountries;

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const classes = useStyles({
    localSelectedDivisionCountries,
    defaultSelectedDivisionCountries,
  });

  const handleDivisionCountriesChange = newSelectedCountries => setLocalSelectedDivisionCountries(newSelectedCountries);

  useEffect(() => {
    dispatch(Creators.setSelectedDivisionCountries({ selectedDivisionCountries: debouncedSelectedDivisionCountries }));
  }, [debouncedSelectedDivisionCountries, dispatch]);

  const divisionOptions = useMemo(
    () => divisionCountries.map(division => {
      return {
        value: division._id || division.id,
        label: division.name[getLangKey()],
        data: division,
      };
    }),
    [divisionCountries],
  );

  return (
    <Select
      value={debouncedSelectedDivisionCountries}
      onChange={handleDivisionCountriesChange}
      options={divisionOptions}
      loading={isDivisionCountriesPending}
      placeholder={t('global:COUNTRIES')}
      className={classes.divisionCountriesSelectInput}
      showArrow
      showSearch
      mode="multiple"
      maxTagCount={1}
      allowClear
    />
  );
};

export default DivisionCountriesSelect;
