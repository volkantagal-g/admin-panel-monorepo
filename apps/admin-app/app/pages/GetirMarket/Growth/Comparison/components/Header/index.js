import { useTranslation } from 'react-i18next';
import { Col, PageHeader, Row } from 'antd';

import PageTitleHeader from '@shared/components/UI/PageTitleHeader';

function Header() {
  const { t } = useTranslation('getirMarketGrowthComparisonPage');

  return (
    <>
      <PageTitleHeader title={t('TITLE')} />
      <Row>
        <Col flex={1}>
          <PageHeader
            className="p-0 page-title"
            title={t('TITLE')}
          />
        </Col>
      </Row>
    </>
  );
}

export default Header;
