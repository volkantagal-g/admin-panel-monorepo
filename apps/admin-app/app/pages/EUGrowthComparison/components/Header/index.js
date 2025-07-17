import { PageHeader, Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';

import PageTitleHeader from '@shared/components/UI/PageTitleHeader';

const Header = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitleHeader title={t('global:PAGE_TITLE.EU_GROWTH_COMPARISON')} />
      <Row>
        <Col flex={1}>
          <PageHeader
            className="p-0 page-title"
            title={t('global:PAGE_TITLE.EU_GROWTH_COMPARISON')}
          />
        </Col>
      </Row>
    </>
  );
};

export default Header;
