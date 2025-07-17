import { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Select, Tooltip } from 'antd';
import { isEmpty } from 'lodash';

import AnalyticsService from '@shared/services/analytics';

import { getLangKey } from '@shared/i18n';
import { getCitiesSelector, getDivisionsCitiesSelector } from '@shared/redux/selectors/common';
import { Creators } from '../../../redux/actions';
import { filtersSelector } from '../../../redux/selectors';
import useStyles from '../styles';
import { getSelectedCountryDivision } from '@shared/redux/selectors/countrySelection';
import { isMobile } from '@shared/utils/common';
import useDebounce from '@shared/shared/hooks/useDebounce';
import { MARKET_DASHBOARD_EVENTS } from '../../../mixPanelEvents';

const CitySelect = ({ defaultSelectedDivisionCountries }) => {
  const cities = useSelector(getCitiesSelector.getOperationalCities);
  const selectedCities = useSelector(filtersSelector.getSelectedCities);
  const isCitiesPending = useSelector(getCitiesSelector.getIsPending);
  const selectedDivisionCountries = useSelector(filtersSelector.getSelectedDivisionCountries) || defaultSelectedDivisionCountries;
  const divisionsCities = useSelector(getDivisionsCitiesSelector.getOperationalCities);
  const isDivisionsCitiesPending = useSelector(getDivisionsCitiesSelector.getIsPending);
  const selectedDivision = getSelectedCountryDivision();

  const [localSelectedCities, setLocalSelectedCities] = useState(() => selectedCities);

  const DEBOUNCE_TIME = 500;
  const debouncedSelectedCities = useDebounce(localSelectedCities, DEBOUNCE_TIME);

  const SELECTABLE_DIVISION_COUNTRY_LIMIT = 1;
  const isAnyDivisionCountrySelected = selectedDivisionCountries.length;
  const isSelectedDivisionCountryCountMoreThanLimit = selectedDivisionCountries.length > SELECTABLE_DIVISION_COUNTRY_LIMIT;
  const isInputDisabled = selectedDivision && (!isAnyDivisionCountrySelected || isSelectedDivisionCountryCountMoreThanLimit);

  const dispatch = useDispatch();
  const { t } = useTranslation('getirMarketDashboardPage');
  const classes = useStyles();
  useEffect(() => {
    if (selectedDivisionCountries.length !== 1) setLocalSelectedCities([]);
  }, [selectedDivisionCountries.length]);

  useEffect(() => {
    dispatch(Creators.setSelectedCities({ selectedCities: debouncedSelectedCities }));
  }, [debouncedSelectedCities, dispatch]);

  const cityOptions = useMemo(() => {
    let citiesData = cities;
    if (selectedDivision && isAnyDivisionCountrySelected) {
      citiesData = divisionsCities.filter(city => selectedDivisionCountries.includes(city.countryId));
    }
    return citiesData.map(city => {
      return { value: city._id || city.id, label: city.name[getLangKey()] };
    });
  }, [cities, selectedDivision, isAnyDivisionCountrySelected, divisionsCities, selectedDivisionCountries]);

  const handleCityChange = newSelectedCities => {
    const selectedCityNames = [];
    newSelectedCities.forEach(cityId => {
      const cityData = cities.find(city => city?._id === cityId) ?? {};
      selectedCityNames.push(cityData?.name?.en);
    });
    if (!isEmpty(selectedCityNames)) {
      AnalyticsService.track(MARKET_DASHBOARD_EVENTS.FILTERED.EVENT_NAME, { selected_city: selectedCityNames });
    }
    return setLocalSelectedCities(newSelectedCities);
  };

  const getIsPending = () => {
    if (selectedDivision) {
      return (isAnyDivisionCountrySelected && isDivisionsCitiesPending) || isCitiesPending;
    }
    return isCitiesPending;
  };

  return (
    <Tooltip
      trigger={isMobile() ? 'click' : 'hover'}
      title={isSelectedDivisionCountryCountMoreThanLimit && t('getirMarketDashboardPage:SELECTED_DIVISION_COUNTRY_LIMIT_TOOLTIP')}
    >
      <Select
        mode="multiple"
        value={localSelectedCities}
        onChange={handleCityChange}
        optionFilterProp="label"
        options={cityOptions}
        loading={getIsPending()}
        placeholder={t('global:CITIES')}
        className={classes.citySelectInput}
        disabled={isInputDisabled}
        maxTagCount={1}
        showArrow
        showSearch
      />
    </Tooltip>
  );
};

export default CitySelect;
