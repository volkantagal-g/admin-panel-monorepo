import { useTranslation } from 'react-i18next';
import { DatePicker, Form, Row, Col } from 'antd';
import moment from 'moment';

import AntCard from '@shared/components/UI/AntCard';
import { rules } from '@app/pages/CourierCommunication/NotificationList/Detail/components/Form/helpers';

const NotificationDate = ({ handleOnChange, value, isDisabled }) => {
  const { t } = useTranslation('courierCommunication');

  const handleDateChange = newDate => {
    const dateTimeValue = moment(newDate).format('YYYY-MM-DD HH:mm:ss');
    handleOnChange('scheduledAt', dateTimeValue);
  };

  return (
    <AntCard title={t('NOTIFICATION_DATE')}>
      <Form.Item name="scheduledAt" required rules={rules.requiredWithoutType}>
        <Row style={{ marginBottom: 0 }}>
          <Col lg={12}>
            <DatePicker
              showTime
              placeholder="Select Time"
              value={moment(value)}
              onOk={handleDateChange}
              disabled={isDisabled}
              allowClear={false}
            />
          </Col>
        </Row>
      </Form.Item>
    </AntCard>
  );
};

export default NotificationDate;
