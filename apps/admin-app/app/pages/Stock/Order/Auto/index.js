import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';

import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { REDUX_KEY } from '@shared/shared/constants';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';

import { Header, Form, DataTable } from './components';
import saga from './redux/saga';
import reducer from './redux/reducers';
import { Creators } from './redux/actions';

const Auto = () => {
  usePageViewAnalytics({ name: ROUTE.STOCK_ORDER_AUTO.name, squad: ROUTE.STOCK_ORDER_AUTO.squad });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(CommonCreators.getSuppliersRequest());

    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  return (
    <>
      <Header />
      <Form />
      <DataTable />
    </>
  );
};

const reduxKey = REDUX_KEY.STOCK.ORDER.AUTO;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(Auto);
