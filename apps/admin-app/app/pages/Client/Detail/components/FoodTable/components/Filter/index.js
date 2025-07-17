import { Row, Col, DatePicker, Select } from 'antd';
import { useTranslation } from 'react-i18next';

import { useRangePicker, useOrderStatuses, useDeliveryTypes, usePaymentMethods } from './hooks/index';
import useStyles from './styles';

const { RangePicker } = DatePicker;

function Filter() {
  const classes = useStyles();
  const { t } = useTranslation('foodOrderFilterPage');
  const { startDate, endDate, handleDateChange } = useRangePicker();
  const { orderStatusSelect, orderStatusesList } = useOrderStatuses();
  const { deliveryTypeSelect, deliveryTypesList } = useDeliveryTypes();
  const { paymentMethodsList, paymentMethodSelect } = usePaymentMethods();

  return (
    <Row gutter={16} className={classes.wrapper}>
      <Col className="gutter-row" span={6}>
        <RangePicker
          name="startDate"
          value={[startDate, endDate]}
          onCalendarChange={handleDateChange()}
          className={classes.range}
        />
      </Col>
      <Col className="gutter-row" span={6}>
        <Select
          placeholder={t('FILTER.STATUS.DESC')}
          className={classes.filterSelect}
          onChange={orderStatusSelect}
          showArrow
          allowClear
        >
          {orderStatusesList}
        </Select>
      </Col>
      <Col className="gutter-row" span={6}>
        <Select
          mode="tags"
          placeholder={t('FILTER.DELIVERY_TYPE.DESC')}
          className={classes.filterSelect}
          onChange={deliveryTypeSelect}
          showArrow
          allowClear
        >
          {deliveryTypesList}
        </Select>
      </Col>
      <Col className="gutter-row" span={6}>
        <Select
          mode="tags"
          placeholder={t('FILTER.PAYMENT_METHOD.DESC')}
          className={classes.filterSelect}
          onChange={paymentMethodSelect}
          showArrow
          allowClear
        >
          {paymentMethodsList}
        </Select>
      </Col>
    </Row>
  );
}

export default Filter;
