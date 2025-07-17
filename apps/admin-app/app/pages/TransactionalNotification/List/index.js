import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';

import { Header, TransactionalNotificationFilter, TransactionalNotificationListTable } from '@app/pages/TransactionalNotification/List/components';
import { ADMIN_PANEL_CONFIGS, MARKET_CONFIG_QUERY_TYPES, REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import saga from '@app/pages/TransactionalNotification/List/redux/saga';
import reducer from '@app/pages/TransactionalNotification/List/redux/reducer';
import { Creators } from '@app/pages/TransactionalNotification/List/redux/actions';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { getLangKey } from '@shared/i18n';
import { configSelector } from '@app/pages/TransactionalNotification/List/redux/selectors';

const TransactionalNotificationListPage = () => {
  usePageViewAnalytics({ name: ROUTE.TRANSACTIONAL_NOTIFICATION_LIST.name, squad: ROUTE.TRANSACTIONAL_NOTIFICATION_LIST.squad });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getConfigRequest({ clientLanguage: getLangKey() }));
    dispatch(CommonCreators.getConfigWithKeyRequest({
      body: {
        key: ADMIN_PANEL_CONFIGS.ACTIVE_DOMAIN_TYPES,
        type: MARKET_CONFIG_QUERY_TYPES.ARRAY,
      },
    }));
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  const configData = useSelector(configSelector.getConfig);
  const isConfigPending = useSelector(configSelector.isPending);

  return (
    <>
      <Header />
      <TransactionalNotificationFilter config={{ configData, isConfigPending }} />
      <TransactionalNotificationListTable config={{ configData, isConfigPending }} />
    </>
  );
};

const reduxKey = REDUX_KEY.TRANSACTIONAL_NOTIFICATION.LIST;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(TransactionalNotificationListPage);
