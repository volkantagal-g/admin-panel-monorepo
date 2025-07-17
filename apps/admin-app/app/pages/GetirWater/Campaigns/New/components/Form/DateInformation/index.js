import { Form, Row, Col, DatePicker } from 'antd';
import { useTranslation } from 'react-i18next';

import AntCard from '@shared/components/UI/AntCard';

import { validationSchema } from '../formHelper';

const DateInformation = () => {
  const { t } = useTranslation('getirWaterCampaignsPage');

  return (
    <AntCard bordered={false} title={t('FORM.DATE_INFO.TITLE')}>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Form.Item name="startDate" rules={validationSchema.startDate} label={t('FORM.DATE_INFO.START_DATE.TITLE')}>
            <DatePicker className="w-100" showTime />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Form.Item name="endDate" rules={validationSchema.endDate} label={t('FORM.DATE_INFO.END_DATE.TITLE')}>
            <DatePicker className="w-100" showTime />
          </Form.Item>
        </Col>
      </Row>
    </AntCard>
  );
};

export default DateInformation;
