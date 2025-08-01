import { PageHeader, Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';

import PageTitleHeader from '@shared/components/UI/PageTitleHeader';

const Header = () => {
  const { t } = useTranslation('dailyTracking');

  return (
    <Row>
      <PageTitleHeader title={t('PAGE_TITLE.DAILY_TRACKING.INSTANT')} />
      <Col flex={1}>
        <PageHeader
          className="p-0 page-title"
          title={t('global:PAGE_TITLE.DAILY_TRACKING.INSTANT')}
        />
      </Col>
    </Row>
  );
};

export default Header;
