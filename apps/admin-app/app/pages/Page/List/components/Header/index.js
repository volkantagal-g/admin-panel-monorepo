import { PageHeader, Col, Row, Button } from 'antd';
import { PlusOutlined, ExportOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ROUTE } from '@app/routes';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import AnalyticsService from '@shared/services/analytics';
import { PANEL_EVENTS } from '@shared/shared/analyticsConstants';
import { Creators } from '../../redux/actions';
import { getAllPagesSelector } from '@shared/redux/selectors/common';

const Header = () => {
  const { t } = useTranslation(['pagePage', 'adminPlatformGlobal']);
  const dispatch = useDispatch();
  const { Can } = usePermission();

  const pagesIsPending = useSelector(getAllPagesSelector.getIsPending);

  const exportPages = () => {
    dispatch(Creators.exportPagesExcel({ t }));
    AnalyticsService.track(PANEL_EVENTS.PAGE_LIST.EVENT_NAME, { button: PANEL_EVENTS.PAGE_LIST.BUTTON.EXPORT_PAGES });
  };

  return (
    <Row gutter={8}>
      <Col flex={1}>
        <PageHeader
          className="p-0 page-title"
          title={t('global:PAGE_TITLE.PAGE.LIST')}
        />
      </Col>
      <Col>
        <Button
          type="secondary"
          icon={<ExportOutlined />}
          disabled={pagesIsPending}
          onClick={exportPages}
        >
          {t('EXPORT_PAGES')}
        </Button>
      </Col>
      <Can permKey={permKey.PAGE_PAGE_NEW}>
        <Col>
          <Link to={ROUTE.PAGE_NEW.path}>
            <Button type="primary" icon={<PlusOutlined />}>
              {t('NEW_PAGE')}
            </Button>
          </Link>
        </Col>
      </Can>
      <Can permKey={permKey.PAGE_COMPONENT_NEW}>
        <Col>
          <Link to={ROUTE.COMPONENT_NEW.path}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => AnalyticsService.track(PANEL_EVENTS.PAGE_LIST.EVENT_NAME, { button: PANEL_EVENTS.PAGE_LIST.BUTTON.NEW_COMPONENT })}
            >
              {t('NEW_COMPONENT')}
            </Button>
          </Link>
        </Col>
      </Can>
    </Row>
  );
};

export default Header;
