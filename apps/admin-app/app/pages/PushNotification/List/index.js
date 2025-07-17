import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';

// eslint-disable-next-line import/no-cycle
import {
  Header,
  GlobalRuleset,
  Filter,
  PushNotificationListTable,
  DownloadListModal,
} from '@app/pages/PushNotification/List/components';
import { ADMIN_PANEL_CONFIGS, MARKET_CONFIG_QUERY_TYPES, REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import saga from '@app/pages/PushNotification/List/redux/saga';
import reducer from '@app/pages/PushNotification/List/redux/reducer';
import { Creators } from '@app/pages/PushNotification/List/redux/actions';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { usePageViewAnalytics, usePermission } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import permKey from '@shared/shared/permKey.json';

const PushNotificationListPage = () => {
  usePageViewAnalytics({ name: ROUTE.PUSH_NOTIFICATION_LIST.name, squad: ROUTE.PUSH_NOTIFICATION_LIST.squad });
  const dispatch = useDispatch();
  const { Can } = usePermission();

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(CommonCreators.getConfigWithKeyRequest(
      {
        body: {
          key: ADMIN_PANEL_CONFIGS.ACTIVE_DOMAIN_TYPES,
          type: MARKET_CONFIG_QUERY_TYPES.ARRAY,
        },
      },
    ));
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  return (
    <>
      <Header />
      <Can permKey={permKey.PAGE_PUSH_NOTIFICATION_GLOBAL_RULESET_PANE}>
        <GlobalRuleset />
      </Can>
      <Filter />
      <PushNotificationListTable />
      <DownloadListModal />
    </>
  );
};

const reduxKey = REDUX_KEY.PUSH_NOTIFICATION.LIST;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(PushNotificationListPage);
