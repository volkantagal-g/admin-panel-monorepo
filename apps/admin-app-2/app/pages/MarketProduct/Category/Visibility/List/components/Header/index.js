import { PageHeader, Col, Row, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { ROUTE } from '@app/routes';

const Header = () => {
  const { t } = useTranslation('marketProductCategoryVisibilityPage');

  return (
    <Row>
      <Col flex={1}>
        <PageHeader
          className="p-0 user-title"
          title={t('global:PAGE_TITLE.MARKET_PRODUCT_CATEGORY.VISIBILITY.LIST')}
        />
      </Col>
      <Col>
        <Link to={ROUTE.MARKET_PRODUCT_CATEGORY_VISIBILITY_NEW.path}>
          <Button type="primary" icon={<PlusOutlined />}>
            {t('NEW_CATEGORY_VISIBILITY')}
          </Button>
        </Link>
      </Col>
    </Row>
  );
};

export default Header;
