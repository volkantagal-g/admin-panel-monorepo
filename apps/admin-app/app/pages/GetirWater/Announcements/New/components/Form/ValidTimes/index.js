import { useState } from 'react';
import { Form, Row, Col, DatePicker, Button, Space } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import AntCard from '@shared/components/UI/AntCard';

import { validationSchema } from '../formHelper';

const DateComponent = ({ t, index }) => (
  <Row gutter={[8, 8]}>
    <Col span={12}>
      <Form.Item name={`startDate_${index}`} label={t('FORM.VALID_TIMES.START_DATE.TITLE')} rules={validationSchema.startDate_0}>
        <DatePicker className="w-100" showTime />
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item name={`endDate_${index}`} label={t('FORM.VALID_TIMES.END_DATE.TITLE')} rules={validationSchema.endDate_0}>
        <DatePicker className="w-100" showTime />
      </Form.Item>
    </Col>
  </Row>
);

const ValidTimes = () => {
  const { t } = useTranslation('getirWaterAnnouncementsPage');
  const [count, setCount] = useState(1);

  const cardTitle = (
    <Row justify="space-between" className="w-100">
      <span>{t('FORM.VALID_TIMES.TITLE')}</span>
      <Space size="small">
        <Button type="primary" size="small" onClick={() => setCount(count + 1)}>
          <PlusOutlined />
        </Button>
        <Button disabled={count === 1} size="small" onClick={() => setCount(count - 1)}>
          <DeleteOutlined />
        </Button>
      </Space>
    </Row>
  );

  return (
    <AntCard bordered={false} title={cardTitle}>
      {[...Array(count)].map((_, i) => (
        <DateComponent key={`dates${i + 1}`} t={t} index={i} />
      ))}
    </AntCard>
  );
};

export default ValidTimes;
