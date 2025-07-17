import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';

import { getLangKey } from '@shared/i18n';
import { getSelectFilterOption } from '@shared/utils/common';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { getCitiesSelector, getDivisionsCitiesSelector } from '@shared/redux/selectors/common';
import { getSelectedCountryDivision } from '@shared/redux/selectors/countrySelection';
import { filtersSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';

import useStyles from './styles';

function CitySelect() {
  const { t } = useTranslation(['global']);
  const dispatch = useDispatch();
  const classes = useStyles();

  const cities = useSelector(getCitiesSelector.getOperationalCities);
  const isCitiesPending = useSelector(getCitiesSelector.getIsPending);
  const divisionCities = useSelector(getDivisionsCitiesSelector.getOperationalCities);
  const isDivisionCitiesPending = useSelector(getDivisionsCitiesSelector.getIsPending);
  const selectedCountryDivision = getSelectedCountryDivision();
  const filters = useSelector(filtersSelector.getFilters);

  const citySelectOptions = useMemo(() => {
    let tempCities = cities;
    if (selectedCountryDivision) {
      if (filters?.country) {
        tempCities = divisionCities.filter(city => city.countryId === filters?.country);
      }
      else {
        tempCities = [];
      }
    }

    const options = [];
    tempCities.forEach(city => {
      options.push({
        value: (city.id || city._id),
        label: city.name?.[getLangKey()],
      });
    });
    return options;
  }, [cities, divisionCities, selectedCountryDivision, filters?.country]);

  useEffect(() => {
    if (!selectedCountryDivision) {
      dispatch(CommonCreators.getCitiesRequest());
    }
    else {
      dispatch(CommonCreators.getDivisionsCitiesRequest({ division: selectedCountryDivision }));
    }
  }, [dispatch, selectedCountryDivision]);

  return (
    <Select
      className={classes.citySelectInput}
      value={filters?.city}
      options={citySelectOptions}
      placeholder={t('global:CITY')}
      onChange={handleOnCitySelectChange}
      loading={isCitiesPending || isDivisionCitiesPending}
      disabled={isCitiesPending || isDivisionCitiesPending}
      filterOption={getSelectFilterOption}
      showSearch
      allowClear
    />
  );

  function handleOnCitySelectChange(city) {
    if (city !== filters?.city) {
      dispatch(Creators.setFilters({ params: { city, warehouse: undefined } }));
    }
  }
}

export default CitySelect;
