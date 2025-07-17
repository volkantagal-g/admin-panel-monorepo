import { Select, Button, Col, DatePicker, InputNumber, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment-timezone';

import { getLangKey } from '@shared/i18n';
import { getSelectFilterOption } from '@shared/utils/common';
import AntRadioGroup from '@shared/components/UI/AntRadioGroup';

import { DEFAULT_DATE_COUNT, MIN_MAX_DATE_COUNT } from '../../../constants';
import { DAILY_SUMMARY_COUNTRY_CURRENCY_KEY, DATA_FILTERS } from '../../constants';
import { dataFiltersSelector, getIsAnyTableDataPending, lastUsedDateFilterSelector } from '../../redux/selectors';
import { currencySelector, sortTypeSelector, selectedCountriesSelector } from '../../../commonRedux/selectors';
import { DATE_PICKER_OPTIONS, MONTH_PICKER_OPTIONS } from './constants';
import { Creators } from '../../redux/actions';
import useStyles from './styles';
import { useDateTypeOptions } from '../../../hooks/useDateTypeOptions';
import { useSortOptions } from '../../../hooks/useSortOptions';
import { useCurrencyOptions } from '../../../hooks/useCurrencyOptions';
import DivisionCountriesSelect from '../DivisionCountriesSelect';
import { getSelectedCountryDivision } from '@shared/redux/selectors/countrySelection';
import { getCitiesSelector, getDivisionsCitiesSelector } from '@shared/redux/selectors/common';

export default function Filter({ reducerKey, defaultSelectedDivisionCountries }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { t } = useTranslation('dailySummaryPage');

  const dataFilters = useSelector(dataFiltersSelector);
  const sortType = useSelector(state => sortTypeSelector(state, reducerKey));
  const currency = useSelector(state => currencySelector(state, reducerKey));
  const selectedCountries = useSelector(state => selectedCountriesSelector(state, reducerKey));
  const lastUsedDateFilter = useSelector(lastUsedDateFilterSelector);
  const isAnyDataPending = useSelector(getIsAnyTableDataPending);
  const cities = useSelector(getCitiesSelector.getOperationalCities);
  const isCitiesPending = useSelector(getCitiesSelector.getIsPending);
  const divisionCities = useSelector(getDivisionsCitiesSelector.getOperationalCities);
  const isDivisionCitiesPending = useSelector(getDivisionsCitiesSelector.getIsPending);
  const selectedDivision = getSelectedCountryDivision();

  const dateRangeObj = dataFilters[DATA_FILTERS.dateRange];
  const dateRangeArrayValue = useMemo(() => {
    const { startDate, endDate } = dateRangeObj;
    return [startDate, endDate];
  }, [dateRangeObj]);

  const dateTypeOptions = useDateTypeOptions({ t });
  const sortTypeOptions = useSortOptions({ t });
  const { currencyOptions, setCurrency } = useCurrencyOptions({
    currencySetterAction: Creators.setCurrency,
    currencyLocalStorageKey: DAILY_SUMMARY_COUNTRY_CURRENCY_KEY,
  });

  const [dateCount, setDateCount] = useState(DEFAULT_DATE_COUNT);
  const [isCitySelectDisabled, setIsCitySelectDisabled] = useState(true);

  const handleDivisionCountriesChangeCallback = useCallback(value => {
    dispatch(Creators.setDataFilter({ filterKey: DATA_FILTERS.countries, filterValue: value }));
  }, [dispatch]);

  const handleCityChangeCallback = useCallback(value => {
    dispatch(Creators.setDataFilter({ filterKey: DATA_FILTERS.cities, filterValue: value }));
  }, [dispatch]);

  useEffect(() => {
    handleCityChangeCallback([]);
  }, [dispatch, handleCityChangeCallback, selectedCountries]);

  const citiesOptions = useMemo(
    () => {
      let tempCities = cities;
      setIsCitySelectDisabled(false);
      if (selectedDivision) {
        if (Array.isArray(selectedCountries) && selectedCountries.length === 1) {
          tempCities = divisionCities.filter(city => city.countryId === selectedCountries[0]);
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
          label: city.name[getLangKey()],
        });
      });

      return options;
    },
    [cities, divisionCities, selectedCountries, selectedDivision, setIsCitySelectDisabled],
  );

  return (
    <Row gutter={[4, 4]} className={classes.filterRow}>
      {
        selectedDivision && (
          <Col>
            <DivisionCountriesSelect
              defaultSelectedDivisionCountries={defaultSelectedDivisionCountries}
              onCountriesChange={handleDivisionCountriesChangeCallback}
              disabled={isAnyDataPending}
            />
          </Col>
        )
      }
      <Col>
        <Select
          placeholder={t('CITIES')}
          mode="multiple"
          options={citiesOptions}
          optionFilterProp="label"
          filterOption={getSelectFilterOption}
          value={dataFilters[DATA_FILTERS.cities]}
          className={getDataFilterClassName(DATA_FILTERS.cities, classes.selectCity)}
          onChange={handleCityChangeCallback}
          disabled={isAnyDataPending || isCitySelectDisabled}
          loading={isCitiesPending || isDivisionCitiesPending}
          maxTagCount={1}
          allowClear
          showArrow
        />
      </Col>
      <Col>
        <DatePicker.RangePicker
          value={dateRangeArrayValue}
          onChange={handleDateRangeChange}
          className={getDataFilterClassName(DATA_FILTERS.dateRange, classes.dateRangePicker)}
          disabled={isAnyDataPending}
          {...DATE_PICKER_OPTIONS}
        />
      </Col>
      <Col>
        <AntRadioGroup
          options={dateTypeOptions}
          onChange={handleDateTypeChange}
          value={dataFilters[DATA_FILTERS.dateType]}
          customClassNames={[getDataFilterClassName(DATA_FILTERS.dateType), classes.dateType]}
          disabled={isAnyDataPending}
          optionType="button"
        />
      </Col>
      <Col>
        <DatePicker
          value={dataFilters[DATA_FILTERS.singleDay]}
          onChange={handleSingleDayChange}
          className={getDataFilterClassName(DATA_FILTERS.singleDay)}
          disabled={isAnyDataPending}
          {...DATE_PICKER_OPTIONS}
        />
      </Col>
      <Col>
        <DatePicker.MonthPicker
          value={dataFilters[DATA_FILTERS.singleMonth]}
          onChange={handleSingleMonthChange}
          className={getDataFilterClassName(DATA_FILTERS.singleMonth)}
          disabled={isAnyDataPending}
          {...MONTH_PICKER_OPTIONS}
        />
      </Col>
      <Col>
        <InputNumber
          type="number"
          min={MIN_MAX_DATE_COUNT.min}
          max={MIN_MAX_DATE_COUNT.max}
          value={dateCount}
          onChange={handleDateCountChange}
          className={classes.countInput}
          disabled={isAnyDataPending}
        />
      </Col>
      <Col>
        <Button type="primary" onClick={handleBring} disabled={isAnyDataPending}>
          {t('global:APPLY')}
        </Button>
      </Col>
      <Col>
        <AntRadioGroup
          options={sortTypeOptions}
          onChange={handleSortTypeChange}
          value={sortType}
          customClassNames={[classes.radioGroupWrapper]}
          optionType="button"
        />
      </Col>
      <Col>
        <AntRadioGroup
          options={currencyOptions}
          onChange={handleCurrencyChange}
          value={currency}
          customClassNames={[classes.radioGroupWrapper]}
          optionType="button"
        />
      </Col>
    </Row>
  );

  function handleDateRangeChange([startDate, endDate]) {
    const value = { startDate: startDate.startOf('day'), endDate: endDate.endOf('day') };
    const currentTime = moment();
    dispatch(
      Creators.setDataFilter({
        filterKey: DATA_FILTERS.dateRange,
        filterValue: value,
        currentTime,
      }),
    );
  }
  function handleDateTypeChange(event) {
    const { value } = event.target;
    const currentTime = moment();
    // dateType is a string that depends on current day to generate a date-range, so we pass the date info from here
    dispatch(Creators.setDataFilter({ filterKey: DATA_FILTERS.dateType, filterValue: value, currentTime }));
  }
  function handleSingleDayChange(value) {
    const currentTime = moment();
    dispatch(
      Creators.setDataFilter({
        filterKey: DATA_FILTERS.singleDay,
        filterValue: value,
        currentTime,
      }),
    );
  }
  function handleSingleMonthChange(value) {
    const currentTime = moment();
    dispatch(
      Creators.setDataFilter({
        filterKey: DATA_FILTERS.singleMonth,
        filterValue: value,
        currentTime,
      }),
    );
  }
  function handleDateCountChange(value) {
    setDateCount(value);
    const currentTime = moment();
    if (value) {
      dispatch(
        Creators.setDataFilter({
          filterKey: DATA_FILTERS.dateCount,
          filterValue: value,
          currentTime,
        }),
      );
    }
  }
  function handleBring() {
    const currentTime = moment();
    if (!dateCount) {
      setDateCount(DEFAULT_DATE_COUNT);
      dispatch(
        Creators.setDataFilter({
          filterKey: DATA_FILTERS.dateCount,
          filterValue: DEFAULT_DATE_COUNT,
          currentTime,
        }),
      );
    }

    if (dataFilters.singleMonth) {
      dispatch(
        Creators.setDataFilter({
          filterKey: DATA_FILTERS.singleMonth,
          filterValue: dataFilters.singleMonth,
          currentTime,
        }),
      );
    }
    dispatch(Creators.triggerDataRefresh({ currentTime }));
  }
  function handleSortTypeChange(event) {
    const { value } = event.target;
    dispatch(Creators.setSortType({ sortType: value }));
  }

  function handleCurrencyChange(event) {
    const { value } = event.target;
    setCurrency(value);
  }
  function getDataFilterClassName(dateFilterName, existingClassName = '') {
    const isLastUsed = dateFilterName === lastUsedDateFilter;
    return isLastUsed ? `${existingClassName} ${classes.lastUsedDateFilter}` : existingClassName;
  }
}
