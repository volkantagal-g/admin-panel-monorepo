import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';

import Card from '../Card';
import { Alert } from '@shared/components/GUI';

const InitialSteps = () => {
  const { t } = useTranslation(['mentorshipPage']);

  return (
    <Card title="Initial Steps">
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <Alert className="" message={t('INITIAL_STEPS_INFO.1')} type="success" />
        </Col>
        <Col span={24}>
          <Alert message={t('INITIAL_STEPS_INFO.2')} type="success" />
        </Col>
      </Row>
    </Card>
  );
};

export default InitialSteps;
