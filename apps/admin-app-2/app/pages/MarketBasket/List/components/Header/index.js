import { Col, Row, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;
export default function Header() {
  const { t } = useTranslation('marketBasketListPage');
  return (
    <div>
      <Row className="mb-1">
        <Col flex={1}>
          <Title level={4}>{t('PAGE_TITLE')}</Title>
        </Col>
      </Row>
    </div>
  );
}
