import { Form, Row, Col, DatePicker } from 'antd';
import { useTranslation } from 'react-i18next';

import AntCard from '@shared/components/UI/AntCard';
import { CreateCardActionButtons } from '@app/pages/GetirWater/Announcements/utils/createCardButtonActions';

import { validationSchema } from '../formHelper';

const DateInformation = () => {
  const { t } = useTranslation('getirWaterAnnouncementsPage');

  const { cardFooter, cardTitle, isEditable } = CreateCardActionButtons('FORM.DATE_INFO.TITLE', 'date-info', true);

  return (
    <AntCard footer={cardFooter} bordered={false} title={cardTitle}>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Form.Item name="startDate" label={t('FORM.DATE_INFO.START_DATE.TITLE')} rules={validationSchema.startDate}>
            <DatePicker className="w-100" disabled={!isEditable} showTime />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Form.Item name="endDate" label={t('FORM.DATE_INFO.END_DATE.TITLE')} rules={validationSchema.endDate}>
            <DatePicker className="w-100" disabled={!isEditable} showTime />
          </Form.Item>
        </Col>
      </Row>
    </AntCard>
  );
};

export default DateInformation;
