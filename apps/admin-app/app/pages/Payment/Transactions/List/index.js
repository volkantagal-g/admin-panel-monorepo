import { useDispatch } from 'react-redux';

import { ROUTE } from '@app/routes';
import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Filter, Header, Table } from './components';
import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.TRANSACTIONS.LIST;

const Payments = () => {
  const dispatch = useDispatch();

  usePageViewAnalytics({ name: ROUTE.PAYMENT_TRANSACTION_LIST, squad: ROUTE.PAYMENT_TRANSACTION_LIST.squad });

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  return (
    <>
      <Header />
      <Filter />
      <Table />
    </>
  );
};
export default Payments;
