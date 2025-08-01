import { PageHeader, Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation('clientTargetingPage');

  return (
    <Row>
      <Col flex={1}>
        <PageHeader
          className="p-0 page-title"
          title={t('CLIENT_TARGETING')}
        />
      </Col>
    </Row>
  );
};

export default Header;
