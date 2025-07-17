import { PageHeader, Col, Row, Button } from 'antd';
import { PlusOutlined, ExportOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { ROUTE } from '@app/routes';
import AnalyticsService from '@shared/services/analytics';
import { PANEL_EVENTS } from '@shared/shared/analyticsConstants';
import { usePermission } from '@shared/hooks';
import { Creators } from '../../redux/actions';
import permKey from '@shared/shared/permKey.json';

const Header = () => {
  const { t } = useTranslation('rolePage');
  const { Can } = usePermission();
  const dispatch = useDispatch();

  const exportRoles = () => {
    dispatch(Creators.exportRolesExcel());
    AnalyticsService.track(PANEL_EVENTS.ROLE_LIST.EVENT_NAME.BUTTON, { button: PANEL_EVENTS.ROLE_LIST.BUTTON.EXPORT_ROLES });
  };

  return (
    <Row gutter={8}>
      <Col flex={1}>
        <PageHeader
          className="p-0 role-title"
          title={t('global:PAGE_TITLE.ROLE.LIST')}
        />
      </Col>
      <Col>
        <Can permKey={permKey.PAGE_ROLE_HIERARCHY}>
          <Link to={ROUTE.ROLE_HIERARCHY.path}>
            <Button>
              {t('ROLE_HIERARCHY')}
            </Button>
          </Link>
        </Can>
      </Col>
      <Col>
        <Button
          icon={<ExportOutlined />}
          onClick={exportRoles}
        >
          {t('EXPORT_ROLES')}
        </Button>
      </Col>
      <Col>
        <Can permKey={permKey.PAGE_ROLE_NEW}>
          <Link to={ROUTE.ROLE_NEW.path}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
            >
              {t('NEW_ROLE')}
            </Button>
          </Link>
        </Can>
      </Col>
    </Row>
  );
};

export default Header;
