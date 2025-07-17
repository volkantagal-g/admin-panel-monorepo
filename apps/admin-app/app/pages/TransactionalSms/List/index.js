import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';

import { Header, TransactionalSmsFilter, TransactionalSmsListTable } from '@app/pages/TransactionalSms/List/components';
import { ADMIN_PANEL_CONFIGS, MARKET_CONFIG_QUERY_TYPES, REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import saga from '@app/pages/TransactionalSms/List/redux/saga';
import reducer from '@app/pages/TransactionalSms/List/redux/reducer';
import { Creators } from '@app/pages/TransactionalSms/List/redux/actions';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { configSelector } from '@app/pages/TransactionalSms/List/redux/selectors';
import { getLangKey } from '@shared/i18n';

const TransactionalSmsListPage = () => {
  usePageViewAnalytics({ name: ROUTE.TRANSACTIONAL_SMS_LIST.name, squad: ROUTE.TRANSACTIONAL_SMS_LIST.squad });
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
      <TransactionalSmsFilter config={{ configData, isConfigPending }} />
      <TransactionalSmsListTable config={{ configData, isConfigPending }} />
    </>
  );
};

const reduxKey = REDUX_KEY.TRANSACTIONAL_SMS.LIST;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(TransactionalSmsListPage);
