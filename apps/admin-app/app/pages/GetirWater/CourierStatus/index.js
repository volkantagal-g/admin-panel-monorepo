import { useDispatch } from 'react-redux';

import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';

import saga from './redux/sagas';
import reducer from './redux/reducers';
import { Creators } from './redux/actions';

import { Header, Filter, DataTable } from './components';

const reduxKey = REDUX_KEY.GETIR_WATER.COURIER_STATUS;

const CourierStatus = () => {
  usePageViewAnalytics({ name: ROUTE.GETIR_WATER_COURIER_STATUS.name, squad: ROUTE.GETIR_WATER_COURIER_STATUS.squad });
  const dispatch = useDispatch();

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  return (
    <>
      <Header />
      <Filter />
      <DataTable />
    </>
  );
};

export default CourierStatus;
