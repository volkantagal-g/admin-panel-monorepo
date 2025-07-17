import { Form, Row, Col, Input } from 'antd';
import { useTranslation } from 'react-i18next';

import Card from '@shared/components/UI/AntCard';

function FranchiseSAPInfo(props) {
  const { referenceCode } = props;
  const { t } = useTranslation('marketFranchisePage');

  return (
    <Form layout="vertical">
      <Card title={t('SAP_INFO')}>
        <Row gutter={[16]} align="bottom">
          <Col span={12}>
            <Form.Item label={t('SAP_REFERENCE_CODE')}>
              <Input
                value={referenceCode}
                disabled
              />
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </Form>
  );
}

export default FranchiseSAPInfo;
