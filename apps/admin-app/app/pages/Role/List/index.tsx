import { useState, useLayoutEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';
import { Tabs } from 'antd';
import { useTranslation } from 'react-i18next';

import {
  Header,
  RoleRequests,
  RoleTable,
  RoleSearch,
  TeammateRoles,
} from './components';
import { PANEL_EVENTS } from '@shared/shared/analyticsConstants';
import { REDUX_KEY, ROLE_LIST_TAB_PANE_KEY } from '@shared/shared/constants';
import AntCard from '@shared/components/UI/AntCard';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics } from '@shared/hooks';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import { ROUTE } from '@app/routes';
import AnalyticsService from '@shared/services/analytics';
import { Creators as AuthCreators } from '@shared/redux/actions/auth';

const { TabPane } = Tabs;

type ROLE_LIST_BUTTON_EVENTS_TYPE = keyof typeof PANEL_EVENTS.ROLE_LIST.TAB;

const RoleListPage = () => {
  usePageViewAnalytics({ name: ROUTE.ROLE_LIST.name, squad: ROUTE.ROLE_LIST.squad });
  const { tabId } = useParams() as { tabId: string };
  const { t } = useTranslation('rolePage');

  const [searchText, setSearchText] = useState<string | undefined>(undefined);

  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(Creators.initPage());
    dispatch(AuthCreators.refreshLoggedInUserRequest());

    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  const trackClickEvent = (eventName : ROLE_LIST_BUTTON_EVENTS_TYPE) => () => {
    AnalyticsService.track(PANEL_EVENTS.ROLE_LIST.EVENT_NAME.TAB_CHANGED, { tab: PANEL_EVENTS.ROLE_LIST.TAB[eventName] });
  };

  const handleSearch = (searchInput : ROLE_LIST_BUTTON_EVENTS_TYPE) => {
    setSearchText(searchInput);
    AnalyticsService.track(PANEL_EVENTS.ROLE_LIST.EVENT_NAME.SEARCH, { button: searchInput });
  };

  return (
    <>
      <Header />
      <RoleSearch onSearch={handleSearch} />
      <AntCard>
        <Tabs activeKey={tabId} destroyInactiveTabPane>
          <TabPane
            tab={(
              <Link
                onClick={trackClickEvent('ROLES')}
                to={ROUTE.ROLE_LIST.path.replace(':tabId', ROLE_LIST_TAB_PANE_KEY.ALL_ROLES)}
              >
                {t('ROLES')}
              </Link>
            )}
            key={ROLE_LIST_TAB_PANE_KEY.ALL_ROLES}
          >
            <RoleTable searchText={searchText} tabKey={ROLE_LIST_TAB_PANE_KEY.ALL_ROLES} />
          </TabPane>
          <TabPane
            tab={(
              <Link
                onClick={trackClickEvent('MY_ROLES')}
                to={ROUTE.ROLE_LIST.path.replace(':tabId', ROLE_LIST_TAB_PANE_KEY.MY_ROLES)}
              >
                {t('MY_ROLES')}
              </Link>
            )}
            key={ROLE_LIST_TAB_PANE_KEY.MY_ROLES}
          >
            <RoleTable searchText={searchText} tabKey={ROLE_LIST_TAB_PANE_KEY.MY_ROLES} />
          </TabPane>
          <TabPane
            tab={(
              <Link
                onClick={trackClickEvent('TEAMMATES_ROLES')}
                to={ROUTE.ROLE_LIST.path.replace(':tabId', ROLE_LIST_TAB_PANE_KEY.TEAMMATE_ROLES)}
              >
                {t('TEAMMATE_ROLES')}
              </Link>
            )}
            key={ROLE_LIST_TAB_PANE_KEY.TEAMMATE_ROLES}
          >
            <TeammateRoles searchText={searchText} />
          </TabPane>
          <TabPane
            tab={(
              <Link
                onClick={trackClickEvent('REQUESTS')}
                to={ROUTE.ROLE_LIST.path.replace(':tabId', ROLE_LIST_TAB_PANE_KEY.ROLE_REQUESTS)}
              >
                {t('REQUESTS')}
              </Link>
            )}
            key={ROLE_LIST_TAB_PANE_KEY.ROLE_REQUESTS}
          >
            <RoleRequests />
          </TabPane>
        </Tabs>
      </AntCard>
    </>
  );
};

const reduxKey = REDUX_KEY.ROLE.LIST;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(RoleListPage);
