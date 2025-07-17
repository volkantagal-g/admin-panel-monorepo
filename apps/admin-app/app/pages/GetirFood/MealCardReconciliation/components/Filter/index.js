import { useState } from 'react';
import { Form, Row, Col, DatePicker, Select, Button, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import { getLocalDateFormat } from '@shared/utils/localization';

import { MAX_DATE_RANGE_IN_DAYS, matchedOptions, mealCardOptions, initialValues } from './formHelper';
import useStyles from './styles';

const { RangePicker } = DatePicker;

const Filter = ({ onFilter }) => {
  const { t } = useTranslation('foodMealCardReconciliation');
  const classes = useStyles();
  const [dates, setDates] = useState(initialValues.dateRange);

  const disabledDate = current => {
    if (!dates || dates.length === 0) {
      return false;
    }
    const laterThanToday = current && current > moment().endOf('day');
    const tooLate = dates[0] && current.diff(dates[0], 'days') > MAX_DATE_RANGE_IN_DAYS;
    const tooEarly = dates[1] && dates[1].diff(current, 'days') > MAX_DATE_RANGE_IN_DAYS;
    return laterThanToday || tooEarly || tooLate;
  };

  const handleCalendarChange = value => {
    setDates(value);
  };

  return (
    <Form
      onFinish={onFilter}
      labelAlign="left"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      initialValues={initialValues}
      className={classes.form}
    >
      <Row gutter={[24]}>
        <Col span={12}>
          <Form.Item
            name="mealCard"
            label={t('LABELS.MEAL_CARD_SELECT')}
            colon={false}
          >
            <Select
              className={classes.maxWidth}
              options={mealCardOptions}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="isMatched"
            label={t('LABELS.MATCHED_SELECT')}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 19 }}
            colon={false}
          >
            <Select className={classes.maxWidth} options={matchedOptions}/>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[24]}>
        <Col span={12}>
          <Form.Item
            name="dateRange"
            label={t('LABELS.DATE_PICKER')}
            colon={false}
          >
            <RangePicker
              className={classes.maxWidth}
              onCalendarChange={handleCalendarChange}
              disabledDate={disabledDate} 
              format={getLocalDateFormat()}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="orderId"
            label={t('LABELS.ORDER_ID')}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 19 }}
            colon={false}
          >
            <Input className={classes.maxWidth}/>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[24]}>
        <Col offset={12} span={12}>
          <Row>
            <Col offset={5} span={19} className={classes.buttonCol}>
              <Button type="primary" htmlType="submit" >{t('FILTER')}</Button>
            </Col>
          </Row>    
        </Col>
      </Row>
    </Form>
  );
};

export default Filter;
