import { PageHeader, Col, Row, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { isCurrentCountryTurkey } from '@shared/utils/common';

import { ROUTE } from '@app/routes';

const Header = () => {
  const { t } = useTranslation('supplierPage');

  return (
    <Row>
      <Col flex={1}>
        <PageHeader
          className="p-0 page-title"
          title={t('global:PAGE_TITLE.SUPPLIER.LIST')}
        />
      </Col>
      {!isCurrentCountryTurkey() ? (
        <Col>
          <Link to={ROUTE.SUPPLIER_NEW.path}>
            <Button type="primary" icon={<PlusOutlined />}>
              {t('NEW')}
            </Button>
          </Link>
        </Col>
      ) : null}
    </Row>
  );
};

export default Header;
