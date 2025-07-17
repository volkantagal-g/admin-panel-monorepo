import { useDispatch } from 'react-redux';

import { REDUX_KEY } from '@shared/shared/constants';
import { usePageViewAnalytics, useInitAndDestroyPage, usePermission } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import Header from './components/Header';
import SingleTransaction from './components/SingleTransaction';
import BulkTransaction from './components/BulkTransaction';
import TransactionReport from './components/TransactionReport';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import permKey from '@shared/shared/permKey.json';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { useInjectReducer } from '@shared/utils/injectReducer';

const reduxKey = REDUX_KEY.GL_SHOP_EXTERNAL_TRANSACTION;

const ShopExternalTransaction = () => {
  const dispatch = useDispatch();

  usePageViewAnalytics({
    name: ROUTE.GL_SHOP_EXTERNAL_TRANSACTION.key,
    squad: ROUTE.GL_SHOP_EXTERNAL_TRANSACTION.squad,
  });

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });
  usePageViewAnalytics({ name: ROUTE.GL_SHOP_EXTERNAL_TRANSACTION.name, squad: ROUTE.GL_SHOP_EXTERNAL_TRANSACTION.squad });

  useInitAndDestroyPage({ dispatch, Creators });
  const { Can } = usePermission();

  return (
    <>
      <Header />
      <Can permKey={permKey.PAGE_GL_SHOP_EXTERNAL_TRANSACTION_COMPONENT_SINGLE_TRANSACTION}>
        <SingleTransaction />
      </Can>
      <Can permKey={permKey.PAGE_GL_SHOP_EXTERNAL_TRANSACTION_COMPONENT_BULK_TRANSACTION}>
        <BulkTransaction />
      </Can>
      <Can permKey={permKey.PAGE_GL_SHOP_EXTERNAL_TRANSACTION_COMPONENT_TRANSACTION_REPORT}>
        <TransactionReport />
      </Can>
    </>
  );
};

export default ShopExternalTransaction;
