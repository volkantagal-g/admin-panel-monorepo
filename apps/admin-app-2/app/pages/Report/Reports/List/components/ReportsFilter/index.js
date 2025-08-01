import { Button, Col, DatePicker, Form, Row, Select } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { useTranslation } from 'react-i18next';

import { Creators } from '../../redux/actions';
import useStyles from './styles';
import { getSelectOptions } from './constants';
import { REPORT_DATE_FORMAT } from '../../../constants';
import { getFormattedRequestData, getInitialDateRange } from '../../utils';
import { getFiltersSelector } from '../../redux/selectors';
import { TEST_ID } from '../../../testing';

const { RangePicker } = DatePicker;

export default function ReportsFilter() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { t } = useTranslation('reportsPage');
  const { dateRange } = useSelector(getFiltersSelector);
  const { isOnlyMyReports } = useSelector(getFiltersSelector);

  useEffect(() => {
    // initial request
    const data = getFormattedRequestData(getInitialDateRange(), true);
    dispatch(Creators.getMyReportsRequest({ data }));
  }, [dispatch]);

  const initialValues = { dateRange, isOnlyMyReports };

  const setIsOnlyMyReports = value => {
    dispatch(Creators.setFilters({ filters: { isOnlyMyReports: value } }));
  };

  const setDateRange = value => {
    dispatch(Creators.setFilters({ filters: { dateRange: value } }));
  };

  return (
    <Form initialValues={initialValues}>
      <Row gutter={[4, 4]}>
        <Col sm={8} xs={24}>
          <Form.Item label={t('global:DATE_RANGE')} name="dateRange">
            <RangePicker
              data-testid={TEST_ID.DATE_RANGE_SELECT}
              format={REPORT_DATE_FORMAT}
              value={dateRange}
              onChange={handleDateRangeChange}
              allowClear={false}
              disabledDate={getDisabledDate}
              className={classes.fullWidth}
            />
          </Form.Item>
        </Col>
        <Col sm={8} xs={24}>
          <Form.Item label={t('LISTING_TYPE')} name="isOnlyMyReports">
            <Select value={isOnlyMyReports} onChange={s => setIsOnlyMyReports(s)} options={getSelectOptions(t)} />
          </Form.Item>
        </Col>
        <Col sm={2} xs={24}>
          <Button type="primary" onClick={handleBring}>
            {t('global:APPLY')}
          </Button>
        </Col>
      </Row>
    </Form>
  );

  function handleDateRangeChange(dates) {
    const updatedDates = [dates[0].startOf('day'), dates[1].endOf('day')];
    setDateRange(updatedDates);
  }
  function handleBring() {
    const data = getFormattedRequestData(dateRange, isOnlyMyReports);
    dispatch(Creators.getMyReportsRequest({ data }));
  }

  function getDisabledDate(date) {
    return date && (date.isAfter(moment()) || date.isBefore(moment().subtract(30, 'days')));
  }
}
