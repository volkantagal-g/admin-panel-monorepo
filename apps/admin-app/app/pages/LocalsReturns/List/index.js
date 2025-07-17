import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';

import { Header, DataTable, Filter } from './components';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';

const LocalsReturns = () => {
  usePageViewAnalytics({
    name: ROUTE.GETIR_LOCALS_RETURN_LIST.name,
    squad: ROUTE.GETIR_LOCALS_RETURN_LIST.squad,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getReturnRequest());
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

const reduxKey = REDUX_KEY.RETURNS;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(LocalsReturns);
