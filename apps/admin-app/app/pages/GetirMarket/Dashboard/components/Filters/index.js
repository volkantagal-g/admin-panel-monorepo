import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import moment from 'moment-timezone';
import { Collapse, Space, Divider, Button, Dropdown, Menu } from 'antd';
import { ErrorBoundary } from 'react-error-boundary';
import { DownloadOutlined } from '@ant-design/icons';

import AnalyticsService from '@shared/services/analytics';

import useWindowSize from '@shared/shared/hooks/useWindowSize';
import { DATE_TYPE } from '@shared/shared/constants';
import ErrorFallback from '@shared/components/UI/ErrorFallback';
import AntRadioGroup from '@shared/components/UI/AntRadioGroup';
import { isMobile } from '@shared/utils/common';

import CitySelect from './CitySelect';
import DomainTypeSelect from './DomainTypeSelect';
import DateRangePicker from './DateRangePicker';
import SingleDatePicker from './SingleDatePicker';
import HourRangeSelect from './HourRangeSelect';
import { Creators } from '../../redux/actions';
import { filtersSelector } from '../../redux/selectors';
import useStyles from './styles';
import DivisionCountriesSelect from './DivisionCountriesSelect';
import { getSelectedCountryDivision } from '@shared/redux/selectors/countrySelection';
import { getPredefinedDateRange } from './utils';
import { getIsoDateString } from '../../utils';
import { MARKET_DASHBOARD_EVENTS } from '../../mixPanelEvents';
import { PREDEFINED_DATES, DATE_FILTER_TYPES } from './constants';

const { Panel } = Collapse;

const Filters = ({ defaultSelectedDivisionCountries }) => {
  const selectedDate = useSelector(filtersSelector.getSelectedDate);
  const selectedDateRange = useSelector(filtersSelector.getSelectedDateRange);
  const dateType = useSelector(filtersSelector.getDateType);
  const { startDate, endDate } = selectedDateRange;
  const [selectedDateButton, setSelectedDateButton] = useState(PREDEFINED_DATES.TODAY);
  const [lastUsedDateFilterType, setLastUsedDateFilterType] = useState(DATE_FILTER_TYPES.PREDEFINED_DATE);
  const selectedDivision = getSelectedCountryDivision();

  const dispatch = useDispatch();
  const { t } = useTranslation(['global', 'getirMarketDashboardPage']);
  const classes = useStyles();
  const { width } = useWindowSize();

  const onDateChange = tempSelectedDate => {
    dispatch(Creators.setSelectedDate({ selectedDate: tempSelectedDate }));
  };

  const onDateRangeChange = dates => {
    const [tempStartDate, tempEndDate] = dates;
    dispatch(
      Creators.setSelectedDateRange({
        selectedDateRange: {
          startDate: tempStartDate,
          endDate: tempEndDate,
        },
      }),
    );
  };

  const handleSingleDateChange = date => {
    setSelectedDateButton(null);
    const tempStartDate = moment(date).startOf('day');
    const tempEndDate = moment(date).endOf('day');
    setLastUsedDateFilterType(DATE_FILTER_TYPES.SINGLE_DATE);
    onDateChange(tempStartDate);
    onDateRangeChange([tempStartDate, tempEndDate]);
    dispatch(Creators.setDateType({ dateType: DATE_TYPE.LOG_SUMMARY_DATE_TYPE_1_HOUR }));
    AnalyticsService.track(MARKET_DASHBOARD_EVENTS.FILTERED.EVENT_NAME, { startDate: getIsoDateString(tempStartDate), endDate: getIsoDateString(tempEndDate) });
  };

  const handleDateRangeChange = (dates, dateStrings, info) => {
    if (
      (info.range === 'end' && moment.isMoment(dates[0])) ||
      (info.range === 'start' && moment.isMoment(dates[1]) && !moment(endDate).isSame(dates[1]))
    ) {
      const isSingleDaySelected = moment.isMoment(dates[0]) &&
        moment.isMoment(dates[1]) &&
        moment(dates[0]).isSame(dates[1]);

      if (isSingleDaySelected) {
        onDateChange(dates[0]);
      }

      AnalyticsService.track(
        MARKET_DASHBOARD_EVENTS.FILTERED.EVENT_NAME,
        { date: MARKET_DASHBOARD_EVENTS.BUTTON_CLICKED.SPECIAL_DATE_RANGE, startDate: getIsoDateString(dates[0]), endDate: getIsoDateString(dates[1]) },
      );
      setSelectedDateButton(null);
      setLastUsedDateFilterType(DATE_FILTER_TYPES.DATE_RANGE);
      onDateRangeChange([dates[0].startOf('day'), dates[1].endOf('day')]);
    }
  };

  const handleDateTypeChange = event => {
    const selectedDateType = event.target.value;
    if (selectedDateType === DATE_TYPE.LOG_SUMMARY_DATE_TYPE_1_WEEK) {
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
    dispatch(Creators.setDateType({ dateType: selectedDateType }));
    AnalyticsService.track(
      MARKET_DASHBOARD_EVENTS.BUTTON_CLICKED.EVENT_NAME,
      { frequency: MARKET_DASHBOARD_EVENTS.BUTTON_CLICKED.DATE_TYPE_BY_ENUM[selectedDateType] },
    );
  };

  const handlePredefineDateButtonsChange = event => {
    const tempSelectedDateButton = event.target.value;
    setSelectedDateButton(tempSelectedDateButton);
    if (tempSelectedDateButton === PREDEFINED_DATES.SEVEN_DAYS) {
      dispatch(Creators.setDateType({ dateType: DATE_TYPE.LOG_SUMMARY_DATE_TYPE_1_DAY }));
    }
    else {
      dispatch(Creators.setDateType({ dateType: DATE_TYPE.LOG_SUMMARY_DATE_TYPE_1_HOUR }));
    }

    const { startDate: tempStartDate, endDate: tempEndDate } = getPredefinedDateRange(tempSelectedDateButton);
    if (tempStartDate && tempEndDate) {
      setLastUsedDateFilterType(DATE_FILTER_TYPES.PREDEFINED_DATE);
      onDateRangeChange([tempStartDate, tempEndDate]);
      onDateChange(tempEndDate);
    }
    AnalyticsService.track(MARKET_DASHBOARD_EVENTS.FILTERED.EVENT_NAME, { date: tempSelectedDateButton });
  };

  const getIsDisabledDate = current => (
    current &&
    (
      current <= moment().subtract(1, 'months').subtract(1, 'day').endOf('day') ||
      current > moment().endOf('day')
    )
  );

  const getFilters = () => (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className={`d-flex justify-content-between ${width < 1200 ? 'flex-column' : 'flex-row'}`}>
        <Space direction={width < 1200 ? 'vertical' : 'horizontal'} className={classes.spaceContainer} size={4}>
          {
            selectedDivision ? (
              <DivisionCountriesSelect
                defaultSelectedDivisionCountries={defaultSelectedDivisionCountries}
                isShowOnlyOperationalCountries
              />
            ) :
              null
          }
          <CitySelect defaultSelectedDivisionCountries={defaultSelectedDivisionCountries} />
          <DomainTypeSelect />
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
            className={classes.radioButtonGroupContainer}
          />
          <DateRangePicker
            disabledDate={getIsDisabledDate}
            onDateRangeChange={handleDateRangeChange}
            selectedMonthDateRange={[startDate, endDate]}
            className={
              lastUsedDateFilterType === DATE_FILTER_TYPES.DATE_RANGE ?
                `${classes.dateRangePicker} ${classes.lastUsedDateFilter}` :
                classes.dateRangePicker
            }
          />
          <SingleDatePicker
            disabledDate={getIsDisabledDate}
            onDateRangeChange={handleSingleDateChange}
            selectedDate={selectedDate}
            className={
              lastUsedDateFilterType === DATE_FILTER_TYPES.SINGLE_DATE ?
                `${classes.datePicker} ${classes.lastUsedDateFilter}` :
                classes.datePicker
            }
          />
          <HourRangeSelect />
          <AntRadioGroup
            options={[
              { label: t('global:HOUR'), value: DATE_TYPE.LOG_SUMMARY_DATE_TYPE_1_HOUR },
              { label: t('global:DAY'), value: DATE_TYPE.LOG_SUMMARY_DATE_TYPE_1_DAY },
              { label: t('global:WEEK'), value: DATE_TYPE.LOG_SUMMARY_DATE_TYPE_1_WEEK },
            ]}
            onChange={handleDateTypeChange}
            value={dateType}
            fullWidth={!!isMobile()}
            optionType="button"
            className={classes.radioButtonGroupContainer}
          />
        </Space>
        <div className="d-flex align-items-center justify-content-end">
          <Dropdown
            overlay={(
              <Menu>
                <Menu.Item key="warehouseTableDownload">
                  <Button
                    type="link"
                    onClick={() => dispatch(Creators.exportWarehouseTableRequest())}
                  >
                    {t('getirMarketDashboardPage:EXCEL_EXPORT.WAREHOUSE_DETAIL_TABLE')}
                  </Button>
                </Menu.Item>
              </Menu>
            )}
            trigger={['click']}
          >
            <Button
              className={classes.ml4}
              icon={<DownloadOutlined />}
            >
              {t('global:EXPORT_EXCEL')}
            </Button>
          </Dropdown>
        </div>
      </div>
    </ErrorBoundary>
  );

  return (
    isMobile() ? (
      <Collapse defaultActiveKey={['getirMarketDashboard']} className={classes.collapse}>
        <Panel header={t('global:FILTER')} key="getirMarketDashboard" className={classes.panel}>
          {getFilters()}
        </Panel>
      </Collapse>
    ) : (
      <>
        {getFilters()}
        <Divider className={classes.divider} />
      </>
    )
  );
};

export default Filters;
