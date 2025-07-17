import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';

import {
  Header,
  DataTable,
  Filter,
} from './components';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics } from '@shared/hooks';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { ROUTE } from '@app/routes';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';

const ArtisanOrderActive = () => {
  usePageViewAnalytics({ name: ROUTE.ARTISAN_ORDER_ACTIVE.name, squad: ROUTE.ARTISAN_ORDER_ACTIVE.squad });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getPaymentMethodsRequest({ includeOnline: true }));
    dispatch(CommonCreators.getCitiesRequest());
    dispatch(Creators.getActivesRequest());
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

const reduxKey = REDUX_KEY.ARTISAN_ORDER.ACTIVE;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(ArtisanOrderActive);
