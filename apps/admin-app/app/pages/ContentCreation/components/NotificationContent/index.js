import { useTranslation } from 'react-i18next';
import { Form, Row, Col } from 'antd';

import { TextInput, TextArea } from '@shared/components/GUI';

const NotificationContent = ({ notif }) => {
  const { t } = useTranslation('contentCreation');
  return (
    <Form layout="vertical">
      <Row gutter={16} className="mb-2">
        <Col sm={24} md={12} lg={10}>
          <TextInput disabled label={t('NOTIF_CONTENT.TYPE')} value={`${notif?.TR?.type} (TR)`} />
        </Col>
        <Col sm={24} md={12} lg={10}>
          <TextInput disabled label={t('NOTIF_CONTENT.TYPE')} value={`${notif?.EN?.type} (EN)`} />
        </Col>
      </Row>
      <Row gutter={16} className="mb-2">
        <Col sm={24} md={12} lg={10}>
          <TextInput disabled label={t('NOTIF_CONTENT.TITLE')} value={`${notif?.TR?.title} (TR)`} />
        </Col>
        <Col sm={24} md={12} lg={10}>
          <TextInput disabled label={t('NOTIF_CONTENT.TITLE')} value={`${notif?.EN?.title} (EN)`} />
        </Col>
      </Row>
      <Row gutter={16} className="mb-2">
        <Col sm={24} md={12} lg={10}>
          <TextArea disabled label={t('NOTIF_CONTENT.BODY')} value={notif?.TR?.body} />
        </Col>
        <Col sm={24} md={12} lg={10}>
          <TextArea disabled label={t('NOTIF_CONTENT.BODY')} value={notif?.EN?.body} />
        </Col>
      </Row>
    </Form>
  );
};

export default NotificationContent;
