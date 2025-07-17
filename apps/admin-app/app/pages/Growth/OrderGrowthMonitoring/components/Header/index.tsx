import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { PageHeader, Col, Row } from 'antd';

import PageTitleHeader from '@shared/components/UI/PageTitleHeader';

const Header = () => {
  const { t } = useTranslation('orderGrowthMonitoring');
  const navigate = useNavigate();

  return (
    <Row>
      <PageTitleHeader title={t('PAGE_TITLE')} />
      <Col>
        <PageHeader
          className="p-0 page-title"
          title={t('PAGE_TITLE')}
        />
      </Col>
    </Row>
  );
};

export default Header;
