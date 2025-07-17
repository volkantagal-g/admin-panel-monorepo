import { PageHeader, Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';

const PageTitle = () => {
  const { t } = useTranslation();

  return (
    <Row>
      <Col flex={1}>
        <PageHeader
          className="p-0 page-title"
          title={t('global:PAGE_TITLE.ON_OFF_PROMO_CONFIG')}
        />
      </Col>
    </Row>
  );
};
export default PageTitle;
