import { useTranslation } from 'react-i18next';
import { PageHeader, Col, Row } from 'antd';

const PageTitle = () => {
  const { t } = useTranslation();

  return (
    <Row>
      <Col flex={1}>
        <PageHeader
          className="p-0 page-title"
          title={t('global:PAGE_TITLE.MARKET_INTELLIGENCE_PRODUCTS')}
        />
      </Col>
    </Row>
  );
};
export default PageTitle;
