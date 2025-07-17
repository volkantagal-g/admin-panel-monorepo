import { PageHeader, Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';

import RedirectButton from '@shared/components/UI/RedirectButton';
import { usePermission } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import permKey from '@shared/shared/permKey.json';

const Header = () => {
  const { t } = useTranslation(['global', 'configPage']);
  const { Can } = usePermission();

  return (
    <Row>
      <Col flex={1}>
        <PageHeader className="p-0 page-title" title={t('global:PAGE_TITLE.CONFIG.LIST')} />
      </Col>
      <Can permKey={permKey.PAGE_CONFIG_NEW}>
        <Col>
          <RedirectButton
            title={t('configPage:NEW_CONFIG')}
            to={ROUTE.CONFIG_NEW.path}
          />
        </Col>
      </Can>
    </Row>
  );
};

export default Header;
