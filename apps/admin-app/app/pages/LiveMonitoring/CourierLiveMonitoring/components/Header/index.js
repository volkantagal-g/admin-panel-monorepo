import { PageHeader, Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import PageTitleHeader from '@shared/components/UI/PageTitleHeader';

const Header = ({ url, selectedCityName }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Row>
      <PageTitleHeader title={t('global:PAGE_TITLE.COURIER_LIVE_MONITORING')} />
      <Col flex={1}>
        <PageHeader
          className="p-0 page-title"
          title={t('global:PAGE_TITLE.COURIER_LIVE_MONITORING')}
          onBack={selectedCityName ? () => navigate(url) : null}
        />
      </Col>
    </Row>
  );
};

export default Header;
