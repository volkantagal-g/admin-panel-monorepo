import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';

import {
  Header,
  SupplierListTable,
} from './components';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics } from '@shared/hooks';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import Filter from './components/Filter';
import { ROUTE } from '@app/routes';

const SupplierListPage = () => {
  usePageViewAnalytics({ name: ROUTE.SUPPLIER_LIST.name, squad: ROUTE.SUPPLIER_LIST.squad });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <Filter />
      <SupplierListTable />
    </>
  );
};

const reduxKey = REDUX_KEY.SUPPLIER.LIST;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(SupplierListPage);
