import { PageHeader, Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation();

  return (
    <Row>
      <Col>
        <PageHeader
          className="p-0 page-title"
          title={t('PAGE_TITLE.SLOT_PLAN_MANAGEMENT')}
        />
      </Col>
    </Row>
  );
};

export default Header;
