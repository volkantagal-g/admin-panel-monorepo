import { PageHeader, Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation();

  return (
    <Row>
      <Col flex={1}>
        <PageHeader className="p-0 page-title" title={t('global:PAGE_TITLE.SERVICE_AVAILABILITY_AREA.EDIT')} />
      </Col>
    </Row>
  );
};

export default Header;
