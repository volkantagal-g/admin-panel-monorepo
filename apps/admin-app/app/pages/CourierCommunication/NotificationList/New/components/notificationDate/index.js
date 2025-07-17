import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row, Space, DatePicker } from 'antd';
import moment from 'moment';

import AntCard from '@shared/components/UI/AntCard';

const CardHeader = () => {
  const { t } = useTranslation('courierCommunication');

  return (
    <Col md={16} xs={16}>{t('DATE_AND_TIME')}</Col>
  );
};

const NotificationDate = ({ handleDateData }) => {
  const onOk = value => {
    const dateTimeValue = moment(value).toString();
    handleDateData(dateTimeValue);
  };

  return (
    <AntCard bordered={false} title={<CardHeader />}>
      <Space direction="vertical" className="w-100">
        <Row gutter={24}>
          <Col md={12} xs={24}>
            <DatePicker
              showTime
              placeholder="Select Time"
              onOk={onOk}
            />
          </Col>
        </Row>
      </Space>
    </AntCard>
  );
};

export default memo(NotificationDate);
