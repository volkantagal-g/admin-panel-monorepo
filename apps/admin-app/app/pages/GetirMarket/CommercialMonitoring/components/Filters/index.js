import { useEffect, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Collapse, DatePicker, Divider, Space } from 'antd';
import { isEqual as _isEqual } from 'lodash';
import moment from 'moment';

import { getLangKey } from '@shared/i18n';
import HourRangeSelect from '@shared/components/UI/HourRangeSelect';
import AntSelect from '@shared/components/UI/AntSelect';
import AntRadioGroup from '@shared/components/UI/AntRadioGroup';
import { getSelectedCountryDivision } from '@shared/redux/selectors/countrySelection';
import { availableDomainTypesForCountrySelector, getCitiesSelector, getDivisionsCitiesSelector } from '@shared/redux/selectors/common';
import { GETIR_MARKET_DOMAIN_TYPES, MINUTES_IN_A_DAY, MINUTES_IN_A_HOUR } from '@shared/shared/constants';
import { getSelectFilterOption, isMobile } from '@shared/utils/common';
import DivisionCountriesSelect from '@shared/containers/Select/DivisionCountries';
import useStyles from './styles';
import { Creators } from '../../redux/actions';
import { filtersSelector } from '../../redux/selectors';
import { PREDEFINED_DATES } from './constants';
import { getPredefinedDateRange } from './utils';
import { Creators as CommonCreators } from '@shared/redux/actions/common';

const { RangePicker } = DatePicker;
const { Panel } = Collapse;

const GetirMarketCommercialMonitoringFilter = ({ defaultSelectedDivisionCountries }) => {
  const { t } = useTranslation(['global']);
  const dispatch = useDispatch();
  const classes = useStyles();

  const [isCitySelectDisabled, setIsCitySelectDisabled] = useState(true);

  const isMobileDevice = !!isMobile();
  const selectedDivision = getSelectedCountryDivision();
  const filters = useSelector(filtersSelector.getAllFilters);
  const cities = useSelector(getCitiesSelector.getOperationalCities);
  const isCitiesPending = useSelector(getCitiesSelector.getIsPending);
  const divisionCities = useSelector(getDivisionsCitiesSelector.getOperationalCities);
  const isDivisionCitiesPending = useSelector(getDivisionsCitiesSelector.getIsPending);
  const availableDomainTypes = useSelector(state => availableDomainTypesForCountrySelector.getDomainTypes(state, GETIR_MARKET_DOMAIN_TYPES));
  const isAvailableDomainTypesPending = useSelector(availableDomainTypesForCountrySelector.getIsPending);

  const domainTypesSelectOptions = availableDomainTypes.map(tag => {
    const tagText = t(`GETIR_MARKET_DOMAIN_TYPES.${tag}`);
    return { value: tag, label: tagText };
  });

  const citiesOptions = useMemo(
    () => {
      let tempCities = cities;
      setIsCitySelectDisabled(false);
      if (selectedDivision) {
        if (Array.isArray(filters.countries) && filters.countries.length === 1) {
          tempCities = divisionCities.filter(city => city.countryId === filters.countries[0]);
        }
        else {
          tempCities = [];
          setIsCitySelectDisabled(true);
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
    },
    [cities, divisionCities, filters.countries, selectedDivision, setIsCitySelectDisabled],
  );

  const fetchAllData = useCallback(
    () => {
      dispatch(Creators.getProductSaleStatsRequest());
      dispatch(Creators.getAvailabilityRequest());
      dispatch(Creators.getInstantAvailabilityRequest());
    },
    [dispatch],
  );

  useEffect(() => {
    if (!isAvailableDomainTypesPending) {
      fetchAllData();
    }
  }, [fetchAllData, filters.domainType, isAvailableDomainTypesPending]);

  const handleCountriesSelectChangeCallback = useCallback(countries => {
    if (!_isEqual(countries, filters.countries)) {
      dispatch(Creators.setFilterParams({ filterParams: { countries, cities: [] } }));
      fetchAllData();
    }
  }, [dispatch, fetchAllData, filters.countries]);

  const handleGenericSelectChangeAndTriggerDataFetchAction = (fieldName, value) => {
    if (fieldName === 'domainType') {
      dispatch(CommonCreators.setSelectedDomainType({ data: value }));
    }
    dispatch(Creators.setFilterParams({ filterParams: { [fieldName]: value } }));
    fetchAllData();
  };

  const handleHourRangeSelectChange = hoursRange => {
    dispatch(Creators.setFilterParams({ filterParams: { hoursRange } }));
  };

  const handlePredefineDateButtonsChange = event => {
    const { value } = event.target;

    const { startDate, endDate } = getPredefinedDateRange(value);
    if (startDate && endDate) {
      dispatch(Creators.setFilterParams({ filterParams: { dateRange: [startDate, endDate], selectedDateButton: value } }));
      fetchAllData();
    }
  };

  const handleDateRangeCalendarChange = (dates, dateStrings, info) => {
    if (
      (info.range === 'end' && moment.isMoment(dates[0])) ||
      (info.range === 'start' && moment.isMoment(dates[1]) && !moment(filters.dateRange[1]).isSame(dates[1]))
    ) {
      dispatch(Creators.setFilterParams({ filterParams: { dateRange: dates, selectedDateButton: null } }));
      fetchAllData();
    }
  };

  const handleSingleDateChange = selectedDate => {
    dispatch(Creators.setFilterParams({
      filterParams: {
        dateRange: [selectedDate.startOf('day'), selectedDate.endOf('day')],
        singleDate: selectedDate,
        selectedDateButton: null,
      },
    }));
    fetchAllData();
  };

  return (
    <WrapperComponent isMobileDevice={isMobileDevice} t={t} classes={classes}>
      <Space direction={isMobileDevice ? 'vertical' : 'horizontal'} size={4} className={classes.spaceContainer}>
        {
          selectedDivision && (
            <DivisionCountriesSelect
              onCountriesChange={handleCountriesSelectChangeCallback}
              defaultSelectedDivisionCountries={defaultSelectedDivisionCountries}
              isShowOnlyOperationalCountries
            />
          )
        }
        <AntSelect
          value={filters.cities}
          mode="multiple"
          options={citiesOptions}
          onChange={_cities => handleGenericSelectChangeAndTriggerDataFetchAction('cities', _cities)}
          placeholder={t('global:CITY')}
          disabled={isCitiesPending || isDivisionCitiesPending || isCitySelectDisabled}
          filterOption={getSelectFilterOption}
          showArrow={false}
          className={classes.citySelectInput}
          maxTagCount={1}
        />
        <AntSelect
          value={filters.domainType}
          options={domainTypesSelectOptions}
          placeholder={t('global:DOMAIN_TYPE')}
          mode="single"
          onChange={_domainType => handleGenericSelectChangeAndTriggerDataFetchAction('domainType', _domainType)}
          className={classes.domainTypeSelect}
          allowClear={false}
        />
        <RangePicker
          value={filters.dateRange}
          onCalendarChange={handleDateRangeCalendarChange}
          allowClear={false}
          className={classes.dateRangePicker}
        />
        <DatePicker
          value={filters.singleDate}
          onChange={handleSingleDateChange}
          allowClear={false}
          className={classes.datePicker}
        />
        <AntRadioGroup
          options={[
            { label: `7 ${t('global:DAYS')}`, value: PREDEFINED_DATES.SEVEN_DAYS },
            { label: t('global:YESTERDAY'), value: PREDEFINED_DATES.YESTERDAY },
            { label: t('global:TODAY'), value: PREDEFINED_DATES.TODAY },
          ]}
          onChange={handlePredefineDateButtonsChange}
          value={filters.selectedDateButton}
          fullWidth={isMobileDevice}
          optionType="button"
          className={classes.radioButtonGroupContainer}
        />
        <HourRangeSelect
          value={filters.hoursRange}
          min={0}
          max={MINUTES_IN_A_DAY}
          step={MINUTES_IN_A_HOUR}
          defaultValue={[0, MINUTES_IN_A_DAY]}
          onAfterChange={handleHourRangeSelectChange}
          className={classes.rangeSliderWrapper}
        />
      </Space>
    </WrapperComponent>
  );
};

function WrapperComponent({ isMobileDevice, t, classes, children }) {
  return isMobileDevice ? (
    <Collapse defaultActiveKey={['filters']}>
      <Panel key="filters" header={t('global:FILTER')}>
        {children}
      </Panel>
    </Collapse>
  ) : (
    <>
      {children}
      <Divider className={classes.divider} />
    </>
  );
}

export default GetirMarketCommercialMonitoringFilter;
