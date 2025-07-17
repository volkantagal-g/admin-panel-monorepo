import { useDispatch } from 'react-redux';

import { useInitAndDestroyPage } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';

import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Header, Table, Filter } from './components';

const reduxKey = REDUX_KEY.MERCHANTS.LIST;

const ListPage = () => {
  const dispatch = useDispatch();
  usePageViewAnalytics({ name: ROUTE.PAYMENT_MERCHANT_LIST.name, squad: ROUTE.PAYMENT_MERCHANT_LIST.squad });

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

export default ListPage;
