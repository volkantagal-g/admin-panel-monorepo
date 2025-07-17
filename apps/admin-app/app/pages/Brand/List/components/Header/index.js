import { PageHeader, Col, Row, Button } from 'antd';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import { ROUTE } from '@app/routes';

const Header = () => {
  const { t } = useTranslation('brandPage');

  return (
    <Row>
      <Col flex={1}>
        <PageHeader
          className="p-0 page-title"
          title={t('global:PAGE_TITLE.BRAND.LIST')}
        />
      </Col>
      <Col>
        <Link to={ROUTE.BRAND_NEW.path}>
          <Button type="primary" icon={<PlusOutlined />}>
            {t('NEW')}
          </Button>
        </Link>
      </Col>
    </Row>
  );
};

export default Header;
