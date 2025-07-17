import { PageHeader, Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation('localsShopExternalTransaction');

  return (
    <Row>
      <Col flex={1}>
        <PageHeader
          className="p-0 page-title"
          title={t('PAGE_TITLE')}
        />
      </Col>
    </Row>
  );
};

export default Header;
