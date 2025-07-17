import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Form, DatePicker, Select, Button } from 'antd';

import moment from 'moment';

import SelectLocalsMerchant from '@shared/containers/Select/LocalsMerchant';
import AntCard from '@shared/components/UI/AntCard';
import { getExternalTransactionReport } from '@app/pages/ShopExternalTransaction/redux/selectors';
import { getLocalDateFormat } from '@shared/utils/localization';
import { convertConstantValuesToSelectOptions } from '@shared/utils/common';

import { Creators } from '../../redux/actions';
import { MAX_DATE_RANGE_IN_DAYS, MANUAL_TYPES_VALUES, getInitialValues } from './constants';
import { MANUAL_TYPES } from '@app/pages/GetirFood/RestaurantExternalTransaction/constants';
import useStyles from './styles';

const { RangePicker } = DatePicker;

const SingleTransaction = () => {
  const { t } = useTranslation('localsShopExternalTransaction');
  const classes = useStyles();
  const dispatch = useDispatch();
  const isPending = useSelector(getExternalTransactionReport.getIsPending);

  const initialValues = getInitialValues();

  const [dates, setDates] = useState(initialValues.dateRange);

  const handleCalendarChange = value => {
    setDates(value);
  };

  const disabledDate = current => {
    if (!dates || dates.length === 0) {
      return false;
    }
    const laterThanToday = current && current > moment().endOf('day');
    const tooLate = dates[0] && current.diff(dates[0], 'days') > MAX_DATE_RANGE_IN_DAYS;
    const tooEarly = dates[1] && dates[1].diff(current, 'days') > MAX_DATE_RANGE_IN_DAYS;
    return laterThanToday || tooEarly || tooLate;
  };

  const handleSubmit = values => {
    const params = {
      startDate: moment(values?.dateRange[0]).format('YYYY-MM-DD'),
      endDate: moment(values?.dateRange[1]).format('YYYY-MM-DD'),
      shopId: values.shopId,
      manualType: values.manualType === MANUAL_TYPES.ALL ? undefined : values.manualType,
    };
    dispatch(Creators.getExternalTransactionReportRequest({ params }));
  };

  return (
    <AntCard title={t('TRANSACTION_REPORT.TITLE')}>
      <Form onFinish={handleSubmit} initialValues={initialValues} requiredMark={false}>
        <Row gutter={[32]}>
          <Col xs={24} sm={12} md={6}>
            <Form.Item name="dateRange" rules={[{ required: true, message: t('error:REQUIRED') }]}>
              <RangePicker
                onCalendarChange={handleCalendarChange}
                disabledDate={disabledDate}
                format={getLocalDateFormat()}
                className={classes.datePicker}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Form.Item name="manualType" rules={[{ required: true }]}>
              <Select options={convertConstantValuesToSelectOptions(MANUAL_TYPES_VALUES)} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Form.Item name="shopId">
              <SelectLocalsMerchant placeholder={t('SHOPS')} allowIdSearch />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Form.Item>
              <Button loading={isPending} type="primary" htmlType="submit">{t('TRANSACTION_REPORT.GET_REPORT')}</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </AntCard>
  );
};

export default SingleTransaction;
