import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';

import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { REDUX_KEY } from '@shared/shared/constants';
import { Creators as CommonCreators } from '@shared/redux/actions/common';

import saga from './redux/sagas';
import reducer from './redux/reducers';
import { Creators } from './redux/actions';
import { Header, Filter, DataTable } from './components';

const ActiveOrders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getBrandsRequest());
    dispatch(Creators.getVendorsRequest());
    dispatch(Creators.getPaymentMethodsRequest());
    dispatch(CommonCreators.getCitiesRequest());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  return (
    <>
      <Header />
      <Filter />
      <DataTable />
    </>
  );
};

const reduxKey = REDUX_KEY.GETIR_WATER.ACTIVE_ORDER;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(ActiveOrders);
