import { PageHeader, Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation('waterOrderActivePage');
  const pageTitle = t('TITLE');

  return (
    <Row>
      <Col flex={1}>
        <PageHeader
          className="p-0 page-title"
          title={pageTitle}
        />
      </Col>
    </Row>
  );
};

export default Header;
