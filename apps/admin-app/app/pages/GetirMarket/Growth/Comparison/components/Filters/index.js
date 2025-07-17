import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { Button, Col, Collapse, DatePicker, Row } from 'antd';
import { isEmpty as _isEmpty } from 'lodash';

import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { INTEGRATION_TYPES, MINUTES_IN_A_DAY, MINUTES_IN_A_HOUR } from '@shared/shared/constants';
import { availableDomainTypesForCountrySelector, getSelectedCountryTimezone } from '@shared/redux/selectors/common';
import { getSelectedCountryDivision } from '@shared/redux/selectors/countrySelection';
import { filtersSelector, getActiveIntegrationTypesSetSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import { START_DATE_RANGE, END_DATE_RANGE } from '../../constants';
import theme from '@shared/jssTheme';
import useStyles from './styles';

import HourRangeSelect from '@shared/components/UI/HourRangeSelect';
import DivisionCountriesSelect from '@shared/containers/Select/DivisionCountries';
import { getUTCHoursFromMinutesOfDay } from '@shared/utils/common';
import { getStartMinOfCurrentHour, getMinutes } from '../../utils';
import CitySelect from '../CitySelect';
import DomainTypeSelect from '../DomainTypeSelect';
import IntegrationTypeSelect from '../IntegrationTypeSelect';
import WarehouseSelect from '../WarehouseSelect';

function Filters({ defaultSelectedDivisionCountry }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = useStyles();

  const selectedCountryDivision = getSelectedCountryDivision();
  const filters = useSelector(filtersSelector.getFilters);
  const selectedCountryTimezone = useSelector(getSelectedCountryTimezone.getData);
  const getActiveIntegrationTypesSet = useSelector(getActiveIntegrationTypesSetSelector);
  const startMinOfCurrentHour = getStartMinOfCurrentHour();
  const isIntegrationTypeSelectVisible = getActiveIntegrationTypesSet.size > 1;
  const isAvailableDomainTypesPending = useSelector(availableDomainTypesForCountrySelector.getIsPending);
  const domainTypes = useSelector(filtersSelector.getDomainTypes);

  const handleOnCountriesChange = useCallback(country => {
    if (country !== filters?.country) {
      dispatch(Creators.setFilters({ params: { country, city: undefined, warehouse: undefined } }));
    }
  }, [dispatch, filters?.country]);

  const fetchData = useCallback(() => {
    if (filters) {
      let hours = [];
      if (filters.timeRange[0] !== 0 || filters.timeRange[1] !== MINUTES_IN_A_DAY) {
        hours = getUTCHoursFromMinutesOfDay({
          startMin: filters.timeRange[0],
          endMin: filters.timeRange[1],
          isExcludeEndHour: true,
        });
      }

      if (!filters?.integrationType || filters?.integrationType === INTEGRATION_TYPES.GETIR) {
        dispatch(Creators.getClientDownloadSignupStatsRequest({
          payload: {
            startDateRange: filters?.startDateRange,
            endDateRange: filters?.endDateRange,
            cities: filters?.city ? [filters?.city] : [],
          },
        }));
      }
      else {
        dispatch(Creators.clearStateData({ stateKey: 'newClientStats' }));
      }

      dispatch(Creators.getOrderPromoDistributionBetweenDatesRequest({
        payload: {
          startDateRange: filters?.startDateRange,
          endDateRange: filters?.endDateRange,
          cities: filters?.city ? [filters?.city] : [],
          warehouses: filters?.warehouse ? [filters?.warehouse] : [],
          integrationTypes: filters?.integrationType ? [filters.integrationType] : undefined,
          ...(!_isEmpty(hours) ? { hours } : undefined),
        },
      }));
      dispatch(Creators.getClientOrderCountsRequest({
        payload: {
          startDateRange: filters?.startDateRange,
          endDateRange: filters?.endDateRange,
          cities: filters?.city ? [filters?.city] : [],
          minutes: getMinutes(filters?.timeRange?.[0], filters?.timeRange?.[1], selectedCountryTimezone),
          warehouses: filters?.warehouse ? [filters?.warehouse] : [],
          integrationTypes: filters?.integrationType ? [filters.integrationType] : undefined,
          hours,
        },
      }));
      dispatch(Creators.getWarehouseStatsRequest({
        payload: {
          startDateRange: filters?.startDateRange,
          endDateRange: filters?.endDateRange,
          cities: filters?.city ? [filters?.city] : [],
          domainType: [filters?.domainType],
          hours,
          warehouses: filters?.warehouse ? [filters?.warehouse] : [],
          integrationTypes: filters?.integrationType ? [filters.integrationType] : undefined,
        },
      }));
    }
  }, [filters, dispatch, selectedCountryTimezone]);

  useEffect(() => {
    if (!isAvailableDomainTypesPending) {
      dispatch(CommonCreators.getFilteredWarehousesForDivisionRequest({
        cities: filters?.city ? [filters.city] : undefined,
        domainTypes: [domainTypes],
        fields: 'city _id name',
      }));
    }
  }, [dispatch, filters?.city, domainTypes, isAvailableDomainTypesPending]);

  useEffect(() => {
    if (!isAvailableDomainTypesPending) {
      fetchData();
    }
  }, [dispatch, fetchData, filters?.city, isAvailableDomainTypesPending]);

  return (
    <Row gutter={[theme.spacing(2), theme.spacing(2)]}>
      <Col span={24}>
        <Collapse defaultActiveKey={['gmGrowthComparisonPage']}>
          <Collapse.Panel header={t('FILTER')} key="gmGrowthComparisonPage">
            <Row gutter={[8, 8]}>
              {selectedCountryDivision && (
                <Col xs={24} md={4} lg={3}>
                  <DivisionCountriesSelect
                    onCountriesChange={handleOnCountriesChange}
                    mode="single"
                    width="100%"
                    defaultSelectedDivisionCountry={defaultSelectedDivisionCountry}
                    isShowOnlyOperationalCountries
                  />
                </Col>
              )}
              <Col xs={24} md={4} lg={3}>
                <CitySelect />
              </Col>
              <Col xs={24} md={4} lg={3}>
                <DomainTypeSelect />
              </Col>
              {isIntegrationTypeSelectVisible && (
                <Col xs={24} md={4} lg={3}>
                  <IntegrationTypeSelect />
                </Col>
              )}
              <Col xs={24} md={4} lg={3}>
                <WarehouseSelect />
              </Col>
              <Col xs={24} md={3} lg={2}>
                <Button className={classes.fullWidth} onClick={handleTodayButtonClick}>{t('button:TODAY')}</Button>
              </Col>
              <Col xs={24} md={5} lg={4}>
                <DatePicker.RangePicker
                  className={classes.fullWidth}
                  value={filters?.[START_DATE_RANGE]}
                  onChange={dates => handleDateRangePickerChange(dates, START_DATE_RANGE)}
                />
              </Col>
              <Col xs={24} md={5} lg={4}>
                <DatePicker.RangePicker
                  className={classes.fullWidth}
                  value={filters?.[END_DATE_RANGE]}
                  onChange={dates => handleDateRangePickerChange(dates, END_DATE_RANGE)}
                />
              </Col>
              <Col xs={24} md={4} lg={3}>
                <HourRangeSelect
                  className={classes.rangeSliderWrapper}
                  value={filters?.timeRange}
                  min={0}
                  max={MINUTES_IN_A_DAY}
                  step={MINUTES_IN_A_HOUR}
                  defaultValue={[0, startMinOfCurrentHour]}
                  onAfterChange={handleTimeRangePickerChange}
                />
              </Col>
            </Row>
          </Collapse.Panel>
        </Collapse>
      </Col>
    </Row>
  );

  function handleDateRangePickerChange(dates, key) {
    dispatch(Creators.setFilters({ params: { [key]: dates } }));
  }

  function handleTimeRangePickerChange(times) {
    dispatch(Creators.setFilters({ params: { timeRange: times } }));
  }

  function handleTodayButtonClick() {
    dispatch(Creators.setFilters({
      params: {
        [START_DATE_RANGE]: [moment().subtract(1, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day')],
        [END_DATE_RANGE]: [moment().startOf('day'), moment().endOf('day')],
        timeRange: [0, getStartMinOfCurrentHour()],
      },
    }));
  }
}

export default Filters;
