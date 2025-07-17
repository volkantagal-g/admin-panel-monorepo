import { Col, Row, PageHeader } from 'antd';
import { useTranslation } from 'react-i18next';

const PageTitle = () => {
  const { t } = useTranslation('marketAutoGrowthOperations');

  return (
    <Row>
      <Col flex={1}>
        <PageHeader
          className="p-0 page-title"
          title={t('global:PAGE_TITLE.MARKET_AUTO_GROWTH_OPERATIONS')}
        />
      </Col>
    </Row>
  );
};

export default PageTitle;
