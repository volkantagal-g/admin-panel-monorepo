import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';

import {
  Header,
  TransferGroupListTable,
} from './components';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';

const TransferGroupListPage = () => {
  usePageViewAnalytics({ name: ROUTE.TRANSFER_GROUP_LIST.name, squad: ROUTE.TRANSFER_GROUP_LIST.squad });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, []);

  return (
    <>
      <Header />
      <TransferGroupListTable />
    </>
  );
};

const reduxKey = REDUX_KEY.TRANSFER_GROUP.LIST;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(TransferGroupListPage);
