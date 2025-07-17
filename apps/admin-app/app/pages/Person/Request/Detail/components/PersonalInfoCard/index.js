import { Row, Col, Card, Typography, Tag } from 'antd';
import { useTranslation } from 'react-i18next';

import { Title } from '@app/pages/Person/Request/Detail/components';

const { Text } = Typography;

const PersonalInfoCard = ({ franchiseName, isWorkerCourier, isWorkerPicker }) => {
  const { t } = useTranslation('personRequestPage');
  return (
    <Card>
      <Row>
        <Col span={24}>
          <Title>{t("FRANCHISE")}:</Title>
          <Text>{franchiseName}</Text>
        </Col>
        <Col span={24}>
          <Title>{t('WORKER_TYPE')}:</Title>
          {
            isWorkerCourier && <Tag color="green">{t('global:WORKER_TYPES.COURIER')}</Tag>
          }
          {
            isWorkerPicker && <Tag color="purple">{t('global:WORKER_TYPES.PICKER')}</Tag>
          }
        </Col>
      </Row>
    </Card>
  );
};

export default PersonalInfoCard;