import { useEffect, useState } from 'react';
import { Form, Row, Col, DatePicker, Button, Space } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import AntCard from '@shared/components/UI/AntCard';
import { updateAnnouncementSelector } from '@app/pages/GetirWater/Announcements/Detail/redux/selectors';

import { validationSchema } from '../formHelper';

const DateComponent = ({ t, index, isEditable }) => (
  <Row gutter={[8, 8]}>
    <Col span={12}>
      <Form.Item name={`startDate_${index}`} label={t('FORM.VALID_TIMES.START_DATE.TITLE')} rules={validationSchema.startDate_0}>
        <DatePicker disabled={!isEditable} className="w-100" showTime />
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item name={`endDate_${index}`} label={t('FORM.VALID_TIMES.END_DATE.TITLE')} rules={validationSchema.startDate_0}>
        <DatePicker disabled={!isEditable} className="w-100" showTime />
      </Form.Item>
    </Col>
  </Row>
);

const ValidTimes = ({ data }) => {
  const { t } = useTranslation('getirWaterAnnouncementsPage');
  const [count, setCount] = useState(0);

  const [isEditable, setIsEditable] = useState(false);

  const updateData = useSelector(updateAnnouncementSelector.getData);

  const toggleEditable = value => {
    setIsEditable(value);
  };

  useEffect(() => {
    if (Object.keys(data).length) {
      setCount(data.validTimeList.length);
    }
  }, [data]);

  useEffect(() => {
    if (updateData && updateData.status === 200) {
      setIsEditable(false);
    }
  }, [updateData]);

  const cardTitle = (
    <Row justify="space-between" className="w-100">
      <span>{t('FORM.VALID_TIMES.TITLE')}</span>
      {!isEditable && (
        <Button size="small" type="default" onClick={() => toggleEditable(true)}>
          {t('button:EDIT')}
        </Button>
      )}
      {isEditable && (
        <Space size="small">
          <Button type="primary" size="small" onClick={() => setCount(count + 1)}>
            <PlusOutlined />
          </Button>
          <Button disabled={count === 1} size="small" onClick={() => setCount(count - 1)}>
            <DeleteOutlined />
          </Button>
        </Space>
      )}
    </Row>
  );

  const cardFooter = (
    <Row justify="end">
      {isEditable && (
        <Space size="small">
          <Form.Item className="m-0">
            <Button size="small" form="announcement-cancel" type="default" onClick={() => toggleEditable(false)}>
              {t('button:CANCEL')}
            </Button>
          </Form.Item>
          <Form.Item className="m-0">
            <Button size="small" form="valid-times" type="primary" htmlType="submit">
              {t('button:SAVE')}
            </Button>
          </Form.Item>
        </Space>
      )}
    </Row>
  );

  return (
    <AntCard footer={cardFooter} bordered={false} title={cardTitle}>
      {[...Array(count)].map((_, i) => (

        <DateComponent key={`date${i + 1}`} t={t} index={i} isEditable={isEditable} />
      ))}
    </AntCard>
  );
};

export default ValidTimes;
