import { PageHeader, Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import PageTitleHeader from '@shared/components/UI/PageTitleHeader';

const Header = ({ selectedCity, url }) => {
  const { t } = useTranslation('global');
  const navigate = useNavigate();

  return (
    <Row>
      <PageTitleHeader title={t('PAGE_TITLE.LIVE_MONITORING.OPERATIONS')} />
      <Col flex={1}>
        <PageHeader
          className="p-0 page-title"
          onBack={selectedCity ? () => navigate(url) : null}
          title={t('PAGE_TITLE.LIVE_MONITORING.OPERATIONS')}
          subTitle={selectedCity}
        />
      </Col>
    </Row>
  );
};

export default Header;
