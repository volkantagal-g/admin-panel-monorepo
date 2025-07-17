import { PageHeader, Col, Row, Button } from 'antd';

import { Link } from 'react-router-dom';

import { PlusOutlined } from '@ant-design/icons';

import { useTranslation } from 'react-i18next';

import { usePermission } from '@shared/hooks';

import permKey from '@shared/shared/permKey.json';
import { ROUTE } from '@app/routes';

const Header = () => {
  const { t } = useTranslation('franchiseDynamicConfig');
  const { Can } = usePermission();

  return (
    <Row>
      <Col flex={1}>
        <PageHeader
          className="p-0 page-title"
          title={t('PAGE_TITLE.FRANCHISE_DYNAMIC_CONFIG.LIST')}
        />
      </Col>
      <Can permKey={permKey.PAGE_FRANCHISE_CONFIG_NEW}>
        <Col>
          <Link to={ROUTE.FRANCHISE_CONFIG_NEW.path}>
            <Button type="primary" icon={<PlusOutlined />}>
              {t('franchiseDynamicConfig:NEW.CONFIG')}
            </Button>
          </Link>
        </Col>
      </Can>
    </Row>
  );
};

export default Header;
