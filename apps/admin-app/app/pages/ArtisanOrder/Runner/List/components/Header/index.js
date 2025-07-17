import { useTranslation } from 'react-i18next';
import { Button, Col, PageHeader, Row } from 'antd';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';

import permKey from '@shared/shared/permKey.json';
import { ROUTE } from '@app/routes';
import { usePermission } from '@shared/hooks';

function Header() {
  const { t } = useTranslation('runnerListPage');
  const { canAccess } = usePermission();
  return (
    <Row gutter={8}>
      <Col flex={1}>
        <PageHeader
          className="p-0"
          title={t('global:PAGE_TITLE.RUNNER.LIST')}
        />
      </Col>
      {canAccess(permKey.PAGE_GL_RUNNER_NEW) && (
      <Col>
        <Link to={ROUTE.GL_RUNNER_NEW.path}>
          <Button type="primary" icon={<PlusOutlined />}>
            {t('NEW_RUNNER')}
          </Button>
        </Link>
      </Col>
      )}

    </Row>
  );
}

export default Header;
