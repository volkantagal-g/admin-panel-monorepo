import { memo } from 'react';
import { PageHeader, Col, Row, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';

import { ROUTE } from '@app/routes';
import permKey from '@shared/shared/permKey.json';
import { usePermission } from '@shared/hooks';

const Header = () => {
  const { Can } = usePermission();
  const { t } = useTranslation('marketing');
  return (
    <Row>
      <Col flex={1}>
        <PageHeader
          className="p-0 page-title"
          title={t('POPUP_LIST')}
        />
      </Col>
      <Col>
        <Can permKey={permKey.PAGE_POPUP_NEW}>
          <Link to={ROUTE.POPUP_NEW.path}>
            <Button type="primary" icon={<PlusOutlined />}>
              {t('NEW_POPUP')}
            </Button>
          </Link>
        </Can>
      </Col>
    </Row>
  );
};

export default memo(Header);
