import { compose } from 'redux';
import { useDispatch } from 'react-redux';

import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
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

const RestaurantExternalTransaction = () => {
  usePageViewAnalytics({
    name: ROUTE.GETIR_FOOD_RESTAURANT_EXTERNAL_TRANSACTION.key,
    squad: ROUTE.GETIR_FOOD_RESTAURANT_EXTERNAL_TRANSACTION.squad,
  });
  const dispatch = useDispatch();
  useInitAndDestroyPage({ dispatch, Creators });
  const { Can } = usePermission();

  return (
    <>
      <Header />
      <Can permKey={permKey.PAGE_GETIR_FOOD_RESTAURANT_EXTERNAL_TRANSACTION_SINGLE_TRANSACTION}>
        <SingleTransaction />
      </Can>
      <Can permKey={permKey.PAGE_GETIR_FOOD_RESTAURANT_EXTERNAL_TRANSACTION_BULK_TRANSACTION}>
        <BulkTransaction />
      </Can>
      <Can permKey={permKey.PAGE_GETIR_FOOD_RESTAURANT_EXTERNAL_TRANSACTION_REPORT}>
        <TransactionReport />
      </Can>
    </>
  );
};

const reduxKey = REDUX_KEY.FOOD.RESTAURANT_EXTERNAL_TRANSACTION;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(RestaurantExternalTransaction);
