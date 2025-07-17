import { useDispatch } from 'react-redux';

import { useInitAndDestroyPage } from '@shared/hooks';
import { REDUX_KEY } from '@shared/shared/constants';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';

import { Creators } from './redux/actions';
import reducer from './redux/reducer';
import saga from './redux/saga';

import { Filter, Table } from './components';

const reduxKey = REDUX_KEY.FINANCE.FILTER;

const FinanceOrderFilterPage = () => {
  const dispatch = useDispatch();

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  return (
    <>
      <Filter />
      <Table />

    </>
  );
};

export default FinanceOrderFilterPage;
