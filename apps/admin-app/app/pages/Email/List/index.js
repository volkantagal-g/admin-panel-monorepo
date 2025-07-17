import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';

import { Header, EmailFilter, EmailListTable } from '@app/pages/Email/List/components';
import { ADMIN_PANEL_CONFIGS, MARKET_CONFIG_QUERY_TYPES, REDUX_KEY } from '@shared/shared/constants';
import reducer from '@app/pages/Email/List/redux/reducer';
import { Creators } from '@app/pages/Email/List/redux/actions';
import { ROUTE } from '@app/routes';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { usePageViewAnalytics } from '@shared/hooks';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import saga from '@app/pages/Email/List/redux/saga';

const EmailListPage = () => {
  usePageViewAnalytics({ name: ROUTE.EMAIL_LIST.name, squad: ROUTE.EMAIL_LIST.squad });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Creators.initPage());
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

  return (
    <>
      <Header />
      <EmailFilter />
      <EmailListTable />
    </>
  );
};

const reduxKey = REDUX_KEY.EMAIL.LIST;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(EmailListPage);
