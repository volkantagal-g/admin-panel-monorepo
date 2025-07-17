import { useMemo } from 'react';
import { Select, Collapse, DatePicker, TimePicker, Button, Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getLangKey } from '@shared/i18n';
import { getCitiesSelector } from '@shared/redux/selectors/common';
import { selectedDateSelector, selectedTimeRangeSelector, selectedCitySelector } from '../../redux/selectors';
import { getDisabledDate, getEndDate1, getEndDate2, getStartDate1, getStartDate2 } from '../../utils';
import { Creators } from '../../redux/actions';

import useStyles from './styles';
import { getSelectFilterOption } from '@shared/utils/common';

const { Panel } = Collapse;
const { RangePicker: DateRangePicker } = DatePicker;
const { RangePicker: TimeRangePicker } = TimePicker;

const dateTimeFormat = 'YYYY-MM-DD';

const Filter = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const cities = useSelector(getCitiesSelector.getData);
  const selectedCity = useSelector(selectedCitySelector);
  const selectedDate1 = useSelector(selectedDateSelector.getSelectedDate1);
  const selectedDate2 = useSelector(selectedDateSelector.getSelectedDate2);

  const selectedTimeRange = useSelector(selectedTimeRangeSelector);

  const handleCityChange = city => {
    dispatch(Creators.setSelectedCity({ data: city || null }));
  };

  const onTodayClick = () => {
    dispatch(Creators.setSelectedDate1({ startDate: getStartDate1(), endDate: getEndDate1() }));
    dispatch(Creators.setSelectedDate2({ startDate: getStartDate2(), endDate: getEndDate2() }));
  };

  const handleDate1Change = ([startDate, endDate]) => {
    dispatch(Creators.setSelectedDate1({ startDate: startDate.startOf('day'), endDate: endDate.endOf('day') }));
  };

  const handleDate2Change = ([startDate, endDate]) => {
    dispatch(Creators.setSelectedDate2({ startDate: startDate.startOf('day'), endDate: endDate.endOf('day') }));
  };

  const handleTimeRangeChange = ([startTime, endTime]) => {
    dispatch(Creators.setSelectedTimeRange({ startTime, endTime }));
  };

  const handleBringClick = () => {
    dispatch(Creators.getComparisonDataRequest({ data: { selectedDate1, selectedDate2, selectedTimeRange, selectedCity } }));
    dispatch(Creators.setRequestedDates({ data: { selectedDate1, selectedDate2 } }));
  };

  const cityOptions = useMemo(
    () =>
      cities.map(city => {
        return { value: city._id, label: city.name[getLangKey()] };
      }),
    [cities],
  );

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Collapse defaultActiveKey={['glGrowthComparisonPage']}>
          <Panel header={t('FILTER')} key="glGrowthComparisonPage">
            <Row gutter={8} className={classes.customRow}>
              <Col md={5} className={classes.fullWidth}>
                <Select
                  value={selectedCity}
                  options={cityOptions}
                  placeholder={t('global:FILTER')}
                  onChange={handleCityChange}
                  className={classes.fullWidth}
                  optionFilterProp="label"
                  filterOption={getSelectFilterOption}
                  showSearch
                  allowClear
                />
              </Col>
              <Col>
                <Button onClick={onTodayClick}>{t('global:TODAY')}</Button>
              </Col>

              <Col md={4} className={classes.fullWidth}>
                <DateRangePicker
                  allowClear={false}
                  onChange={handleDate1Change}
                  disabledDate={getDisabledDate}
                  value={[selectedDate1.startDate, selectedDate1.endDate]}
                  format={dateTimeFormat}
                />
              </Col>
              <Col md={4} className={classes.fullWidth}>
                <DateRangePicker
                  allowClear={false}
                  onChange={handleDate2Change}
                  disabledDate={getDisabledDate}
                  value={[selectedDate2.startDate, selectedDate2.endDate]}
                  format={dateTimeFormat}
                />
              </Col>
              <Col md={4} className={classes.fullWidth}>
                <TimeRangePicker
                  allowClear={false}
                  onChange={handleTimeRangeChange}
                  format="HH:mm"
                  value={[selectedTimeRange.startTime, selectedTimeRange.endTime]}
                />
              </Col>
              <Col md={1} className={classes.fullWidth}>
                <Button onClick={handleBringClick} className={classes.buttonWrapper}>
                  {t('global:BRING')}
                </Button>
              </Col>
            </Row>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
};

export default Filter;
