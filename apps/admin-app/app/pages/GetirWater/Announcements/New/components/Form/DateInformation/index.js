import { Form, Row, Col, DatePicker } from 'antd';
import { useTranslation } from 'react-i18next';

import AntCard from '@shared/components/UI/AntCard';

import { validationSchema } from '../formHelper';

const DateInformation = () => {
  const { t } = useTranslation('getirWaterAnnouncementsPage');

  return (
    <AntCard bordered={false} title={t('FORM.DATE_INFO.TITLE')}>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Form.Item name="startDate" label={t('FORM.DATE_INFO.START_DATE.TITLE')} rules={validationSchema.startDate}>
            <DatePicker className="w-100" showTime />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Form.Item name="endDate" label={t('FORM.DATE_INFO.END_DATE.TITLE')} rules={validationSchema.startDate}>
            <DatePicker className="w-100" showTime />
          </Form.Item>
        </Col>
      </Row>
    </AntCard>
  );
};

export default DateInformation;
