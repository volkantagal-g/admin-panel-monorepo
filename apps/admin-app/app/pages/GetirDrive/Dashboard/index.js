import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from 'react-error-boundary';
import {
  Select,
  DatePicker,
  Space,
  Slider,
  Row,
  Col,
} from 'antd';
import { map as _map } from 'lodash';
import moment from 'moment-timezone';

import { getLangKey } from '@shared/i18n';
import { useInitAndDestroyPage } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import {
  REDUX_KEY,
  GETIR_DRIVE_EXTERNAL_SOURCE_OPTIONS,
  DATE_TYPE,
  DATE_TYPE_STRING,
  GETIR_DRIVE_EXTERNAL_SOURCE_GETIR,
} from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';
import ErrorFallback from '@shared/components/UI/ErrorFallback';
import AntRadioGroup from '@shared/components/UI/AntRadioGroup';
import { isMobile } from '@shared/utils/common';
import useWindowSize from '@shared/shared/hooks/useWindowSize';
import useDebounce from '@shared/shared/hooks/useDebounce';

import { getCitiesSelector, getSelectedCountryTimezone } from '@shared/redux/selectors/common';
import { Creators as CommonCreators } from '@shared/redux/actions/common';

import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import useStyles from './styles';
import { PREDEFINED_DATES, DATE_FILTER_TYPES } from './constants';
import {
  getPredefinedDateRange,
  getInitialDateRanges,
  getIsoDateString,
  getHours,
} from './utils';

import RentalStatus from './components/Tables/RentalStatus';
import Financial from './components/Tables/Financial';
import VehicleBasedStats from './components/Tables/VehicleBasedStats';
import FinancialDistribution from './components/Tables/FinancialDistribution';
import PromoDistribution from './components/Tables/PromoDistribution';
import RentalTypeDistribution from './components/Tables/RentalTypeDistribution';
import CleaningScoreCounts from './components/Tables/CleaningScoreCounts';
import RateCounts from './components/Tables/RateCounts';
import ExternalSourcesSummary from './components/Tables/ExternalSourcesSummary';
import RentalCountByNetRevenue from './components/Tables/RentalCountByNetRevenue';
import RentalCountByDuration from './components/Tables/RentalCountByDuration';
import RentalCountByDistance from './components/Tables/RentalCountByDistance';
import FleetStatus from './components/Tables/FleetStatus';
import ClientDistribution from './components/Tables/ClientDistribution';
import NewClientDistribution from './components/Tables/NewClientDistribution';
import DailyFrequency from './components/Tables/DailyFrequency';
import RentChart from './components/Charts/Rent';
import RevenueChart from './components/Charts/Revenue';

const { RangePicker } = DatePicker;

const reduxKey = REDUX_KEY.GETIR_DRIVE.DASHBOARD;

const GetirDriveDashboardPage = () => {
  const { t } = useTranslation(['global']);
  const classes = useStyles();
  const { width } = useWindowSize();
  const dispatch = useDispatch();
  const cities = useSelector(getCitiesSelector.getOperationalCities);

  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedExternalSource, setSelectedExternalSource] = useState();
  const [selectedDate, setSelectedDate] = useState(moment.tz(getSelectedCountryTimezone.getData()));
  const [selectedDateRange, setSelectedDateRange] = useState(getInitialDateRanges());
  const [selectedDateButton, setSelectedDateButton] = useState(PREDEFINED_DATES.TODAY);
  const [selectedDateType, setSelectedDateType] = useState(DATE_TYPE.LOG_SUMMARY_DATE_TYPE_1_HOUR);
  const [lastUsedDateFilterType, setLastUsedDateFilterType] = useState(DATE_FILTER_TYPES.PREDEFINED_DATE);
  const [selectedHourRange, setSelectedHourRange] = useState([0, 24]);
  const { startDate, endDate } = selectedDateRange;
  const [dateRangeDayCount, setDateRangeDayCount] = useState(endDate.diff(startDate, 'days') + 1);
  const DEBOUNCE_TIME = 500;
  const debouncedSelectedCities = useDebounce(selectedCities, DEBOUNCE_TIME);

  usePageViewAnalytics({ name: ROUTE.GETIR_DRIVE_DASHBOARD.name, squad: ROUTE.GETIR_DRIVE_DASHBOARD.squad });

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  useEffect(() => {
    dispatch(CommonCreators.getCitiesRequest());
  }, [dispatch]);

  useEffect(() => {
    const { startDate: _startDate, endDate: _endDate } = selectedDateRange;
    const [minHour, maxHour] = selectedHourRange;
    const now = moment.tz(getSelectedCountryTimezone.getData());
    const startDateIsoString = getIsoDateString(_startDate);
    const startDateIsoStringPrevious = getIsoDateString(_startDate.clone().subtract(1, 'week'));
    const endDateIsoString = now.isBefore(_endDate) ? getIsoDateString(now) : getIsoDateString(_endDate);
    const endDateIsoStringPrevious = now.isBefore(_endDate) ?
      getIsoDateString(now.clone().subtract(1, 'week')) :
      getIsoDateString(_endDate.clone().subtract(1, 'week'));
    const hours = getHours(minHour, maxHour);
    const tempCities = debouncedSelectedCities || [];
    const externalSources = selectedExternalSource ? [selectedExternalSource] : [];
    const intervalType = DATE_TYPE_STRING[selectedDateType];
    const params = {
      cities: tempCities,
      external_sources: externalSources,
      start_date: startDateIsoString,
      end_date: endDateIsoString,
      hours,
    };
    const paramsWithoutHours = {
      cities: tempCities,
      external_sources: externalSources,
      start_date: startDateIsoString,
      end_date: endDateIsoString,
    };
    const paramsWithoutCities = {
      external_sources: externalSources,
      start_date: startDateIsoString,
      end_date: endDateIsoString,
      hours,
    };
    const paramsWithoutExternalSources = {
      cities: tempCities,
      start_date: startDateIsoString,
      end_date: endDateIsoString,
      hours,
    };
    const paramsWithoutExternalSourcesPrevious = {
      cities: tempCities,
      start_date: startDateIsoStringPrevious,
      end_date: endDateIsoStringPrevious,
      hours,
    };

    dispatch(Creators.getRentalStatusRequest({ data: params }));
    dispatch(Creators.getFinancialRequest({ data: params }));
    dispatch(Creators.getVehicleBasedStatsRequest({ data: params }));
    dispatch(Creators.getFinancialDistributionRequest({ data: params }));
    dispatch(Creators.getPromoDistributionRequest({ data: params }));
    dispatch(Creators.getRentalTypeDistributionRequest({ data: params }));
    dispatch(Creators.getCleaningScoreCountsRequest({ data: paramsWithoutExternalSources }));
    if (selectedExternalSource === GETIR_DRIVE_EXTERNAL_SOURCE_GETIR) {
      dispatch(Creators.getRateCountsRequest({ data: params }));
    }
    dispatch(Creators.getRentTimeSeriesRequest({ data: { ...params, interval_type: intervalType } }));
    dispatch(Creators.getNetRevenueTimeSeriesRequest({ data: { ...params, interval_type: intervalType } }));
    dispatch(Creators.getInstantVehicleStatusRequest({ data: paramsWithoutExternalSources }));
    dispatch(Creators.getExternalSourcesSummaryCurrentRequest({ data: paramsWithoutExternalSources }));
    dispatch(Creators.getExternalSourcesSummaryPreviousRequest({ data: paramsWithoutExternalSourcesPrevious }));
    dispatch(Creators.getRentalCountByNetRevenueRequest({ data: params }));
    dispatch(Creators.getRentalCountByDurationRequest({ data: params }));
    dispatch(Creators.getRentalCountByDistanceRequest({ data: params }));
    dispatch(Creators.getClientDistributionRequest({ data: {} }));
    dispatch(Creators.getNewClientDistributionRequest({ data: paramsWithoutCities }));
    dispatch(Creators.getDailyFrequencyRequest({ data: paramsWithoutHours }));
  }, [
    debouncedSelectedCities,
    selectedExternalSource,
    selectedDateRange,
    selectedDate,
    selectedHourRange,
    selectedDateType,
    dispatch,
  ]);

  const cityOptions = useMemo(() => _map(cities, city => ({ value: city._id || city.id, label: city.name[getLangKey()] })), [cities]);

  const onDateChange = newSelectedDate => setSelectedDate(newSelectedDate);
  const onDateRangeChange = newDateRange => {
    const [newStartDate, newEndDate] = newDateRange;
    setSelectedDateRange({
      startDate: newStartDate.startOf('day'),
      endDate: newEndDate.endOf('day'),
    });
    setDateRangeDayCount(newEndDate.diff(newStartDate, 'days') + 1);
  };

  const handleCityChange = newSelectedCities => setSelectedCities(newSelectedCities);
  const handleExternalSourceChange = newExternalSource => setSelectedExternalSource(newExternalSource);
  const handlePredefineDateButtonsChange = event => {
    const newSelectedDateButton = event.target.value;
    const { startDate: newStartDate, endDate: newEndDate } = getPredefinedDateRange(newSelectedDateButton);
    setSelectedDateButton(newSelectedDateButton);
    if (newSelectedDateButton === PREDEFINED_DATES.SEVEN_DAYS) {
      setSelectedDateType(DATE_TYPE.LOG_SUMMARY_DATE_TYPE_1_DAY);
    }
    else {
      setSelectedDateType(DATE_TYPE.LOG_SUMMARY_DATE_TYPE_1_HOUR);
    }
    setLastUsedDateFilterType(DATE_FILTER_TYPES.PREDEFINED_DATE);
    onDateRangeChange([newStartDate, newEndDate]);
    onDateChange(newEndDate);
  };
  const handleDateTypeChange = event => {
    const newSelectedDateType = event.target.value;
    if (newSelectedDateType === DATE_TYPE.LOG_SUMMARY_DATE_TYPE_1_WEEK) {
      const tempStartDate = startDate.clone();
      const tempEndDate = endDate.clone();
      const dayOfWeekStart = tempStartDate.day();
      const dayOfWeekEnd = tempEndDate.day();
      // go to week beginning
      if (dayOfWeekStart !== 1) {
        tempStartDate.subtract(dayOfWeekStart - 1, 'day').startOf('day');
      }
      // go to week end
      if (dayOfWeekEnd !== 0) {
        tempEndDate.add(7 - dayOfWeekEnd, 'day').endOf('day');
      }
      // if this is the same week, go to previous week
      if (moment().isoWeek() === tempStartDate.isoWeek()) {
        tempStartDate.subtract(7, 'day').startOf('day');
      }
      // if this is the same week, go to previous week
      if (moment().isoWeek() === tempEndDate.isoWeek()) {
        tempEndDate.subtract(7, 'day').endOf('day');
      }
      setSelectedDateButton(null);
      setLastUsedDateFilterType(DATE_FILTER_TYPES.DATE_RANGE);
      onDateChange(tempStartDate);
      onDateRangeChange([tempStartDate, tempEndDate]);
    }
    setSelectedDateType(newSelectedDateType);
  };
  const handleDateRangeChange = (dates, dateStrings, info) => {
    if (
      (info.range === 'end' && moment.isMoment(dates[0])) ||
      (info.range === 'start' && moment.isMoment(dates[1]) && !moment(endDate).isSame(dates[1]))
    ) {
      setSelectedDateButton(null);
      setLastUsedDateFilterType(DATE_FILTER_TYPES.DATE_RANGE);
      onDateRangeChange([dates[0].startOf('day'), dates[1].endOf('day')]);
    }
  };
  const handleSingleDateChange = newDate => {
    const newStartDate = moment(newDate).startOf('day');
    const newEndDate = moment(newDate).endOf('day');
    setSelectedDateButton(null);
    setLastUsedDateFilterType(DATE_FILTER_TYPES.SINGLE_DATE);
    onDateChange(newStartDate);
    onDateRangeChange([newStartDate, newEndDate]);
  };
  const handleHourRangeSliderChange = newHourRange => {
    setSelectedHourRange(newHourRange);
  };

  const getIsDisabledDate = current => current && current > moment().endOf('day');
  const hourRangeSliderMarks = {
    0: `${selectedHourRange[0] || '00'}:00`,
    24: `${selectedHourRange[1]}:00`,
  };
  const hourRangeSliderTooltipFormatter = value => `${value || '00'}:00`;

  return (
    <>
      <PageTitleHeader title={t('global:PAGE_TITLE.GETIR_DRIVE.DASHBOARD')} />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Space direction={width < 1200 ? 'vertical' : 'horizontal'} className={classes.spaceContainer} size={4}>
          <Select
            mode="multiple"
            value={selectedCities}
            onChange={handleCityChange}
            optionFilterProp="label"
            options={cityOptions}
            placeholder={t('global:CITIES')}
            className={classes.citySelectInput}
            showArrow
            showSearch
          />
          <Select
            mode="single"
            value={selectedExternalSource}
            onChange={handleExternalSourceChange}
            optionFilterProp="label"
            options={GETIR_DRIVE_EXTERNAL_SOURCE_OPTIONS}
            placeholder={t('global:DOMAIN_TYPE')}
            className={classes.domainTypeSelectInput}
            showArrow
            showSearch
            allowClear
          />
          <AntRadioGroup
            options={[
              { label: `7 ${t('global:DAYS')}`, value: PREDEFINED_DATES.SEVEN_DAYS },
              { label: t('global:YESTERDAY'), value: PREDEFINED_DATES.YESTERDAY },
              { label: t('global:TODAY'), value: PREDEFINED_DATES.TODAY },
            ]}
            onChange={handlePredefineDateButtonsChange}
            value={selectedDateButton}
            fullWidth={!!isMobile()}
            optionType="button"
          />
          <RangePicker
            disabledDate={getIsDisabledDate}
            onCalendarChange={handleDateRangeChange}
            value={[startDate, endDate]}
            className={
              lastUsedDateFilterType === DATE_FILTER_TYPES.DATE_RANGE ?
                `${classes.dateRangePicker} ${classes.lastUsedDateFilter}` :
                classes.dateRangePicker
            }
            allowClear={false}
          />
          <DatePicker
            disabledDate={getIsDisabledDate}
            onChange={handleSingleDateChange}
            value={selectedDate}
            className={
              lastUsedDateFilterType === DATE_FILTER_TYPES.SINGLE_DATE ?
                `${classes.datePicker} ${classes.lastUsedDateFilter}` :
                classes.datePicker
            }
            allowClear={false}
          />
          <div className={classes.hourRangeSlider}>
            <Slider
              range
              step={1}
              defaultValue={[0, 24]}
              min={0}
              max={24}
              marks={hourRangeSliderMarks}
              onAfterChange={handleHourRangeSliderChange}
              tipFormatter={hourRangeSliderTooltipFormatter}
            />
          </div>
          <AntRadioGroup
            options={[
              { label: t('global:HOUR'), value: DATE_TYPE.LOG_SUMMARY_DATE_TYPE_1_HOUR },
              { label: t('global:DAY'), value: DATE_TYPE.LOG_SUMMARY_DATE_TYPE_1_DAY },
              { label: t('global:WEEK'), value: DATE_TYPE.LOG_SUMMARY_DATE_TYPE_1_WEEK },
            ]}
            onChange={handleDateTypeChange}
            value={selectedDateType}
            fullWidth={!!isMobile()}
            optionType="button"
          />
        </Space>
      </ErrorBoundary>
      <Row gutter={3} className={classes.tableContainer}>
        <Col xs={{ span: 24 }} lg={{ span: 6 }}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <RentalStatus />
          </ErrorBoundary>
          <Row gutter={4}>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Financial />
              </ErrorBoundary>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <VehicleBasedStats />
              </ErrorBoundary>
            </Col>
          </Row>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <FinancialDistribution />
          </ErrorBoundary>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <PromoDistribution />
          </ErrorBoundary>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <RentalTypeDistribution />
          </ErrorBoundary>
          <Row gutter={4}>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <CleaningScoreCounts />
              </ErrorBoundary>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                {
                  selectedExternalSource === GETIR_DRIVE_EXTERNAL_SOURCE_GETIR ?
                    <RateCounts /> :
                    null
                }
              </ErrorBoundary>
            </Col>
          </Row>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <RentChart
              dateRange={selectedDateRange}
              hourRange={selectedHourRange}
              dateType={selectedDateType}
            />
          </ErrorBoundary>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <RevenueChart
              dateRange={selectedDateRange}
              hourRange={selectedHourRange}
              dateType={selectedDateType}
            />
          </ErrorBoundary>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <ExternalSourcesSummary dateRangeDayCount={dateRangeDayCount} />
          </ErrorBoundary>
          <Row gutter={4}>
            <Col xs={{ span: 24 }} lg={{ span: 8 }}>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <RentalCountByNetRevenue />
              </ErrorBoundary>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 8 }}>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <RentalCountByDuration />
              </ErrorBoundary>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 8 }}>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <RentalCountByDistance />
              </ErrorBoundary>
            </Col>
          </Row>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 6 }}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <FleetStatus />
          </ErrorBoundary>
          <Row gutter={4}>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <ClientDistribution />
              </ErrorBoundary>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <NewClientDistribution />
              </ErrorBoundary>
            </Col>
          </Row>
          <Row gutter={4}>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <DailyFrequency />
              </ErrorBoundary>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default GetirDriveDashboardPage;
