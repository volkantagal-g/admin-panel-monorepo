import { useEffect, useState } from 'react';
import { Form, DatePicker, Select, Input, Row, Col, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import useStyles from '../../styles';

import { getLocalDateFormat } from '@shared/utils/localization';
import { MAX_DATE_RANGE_IN_DAYS, typeOptions } from '../../constants';
import { FormItem } from '@shared/components/GUI';

const { RangePicker } = DatePicker;

const Filter = ({ onSubmit, initialValues }) => {
  const classes = useStyles();
  const { t } = useTranslation('foodERPDataTrackingV2Page');
  const [form] = Form.useForm();
  const [dateRange, setDateRange] = useState(() => initialValues.dateRange);

  const disabledDate = current => {
    if (!dateRange || dateRange.length === 0) {
      return false;
    }
    const laterThanToday = current && current > moment().endOf('day');
    const tooLate = dateRange[0] && current.diff(dateRange[0], 'days') > MAX_DATE_RANGE_IN_DAYS;
    const tooEarly = dateRange[1] && dateRange[1].diff(current, 'days') > MAX_DATE_RANGE_IN_DAYS;
    return laterThanToday || tooEarly || tooLate;
  };

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [form, initialValues]);

  return (
    <Form form={form} initialValues={initialValues} layout="vertical" onFinish={onSubmit} className={classes.form}>
      <Row gutter={[8, 8]}>
        <Col>
          <FormItem
            name="dateRange"
            label={t('global:DATE')}
            colon={false}
            rules={[{ required: true }]}
          >
            <RangePicker
              onCalendarChange={setDateRange}
              disabledDate={disabledDate}
              format={getLocalDateFormat()}
            />
          </FormItem>
        </Col>
        <Col xs={24} sm={6}>
          <FormItem
            name="orderTypes"
            label={t('SUCCESSFUL.TABLE.TYPE')}
            colon={false}
          >
            <Select mode="multiple" allowClear options={typeOptions} />
          </FormItem>
        </Col>
        <Col xs={24} sm={6}>
          <FormItem
            name="traceId"
            label={t('SUCCESSFUL.TABLE.TRANSACTION_ID')}
            colon={false}
          >
            <Input />
          </FormItem>
        </Col>
        <Col xs={24} sm={6}>
          <FormItem
            name="orderId"
            label={t('SUCCESSFUL.TABLE.ORDER_ID')}
            colon={false}
          >
            <Input />
          </FormItem>
        </Col>
        <Col xs={24} sm={6}>
          <Button type="primary" htmlType="submit">
            {t('global:FILTER')}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Filter;
