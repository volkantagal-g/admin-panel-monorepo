import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { compose } from 'redux';

import {
  Header,
  TransferGroupDetailForm,
  ProductTransferGroupsTable,
  WarehouseTransferGroupsTable,
} from './components';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics } from '@shared/hooks';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { ROUTE } from '@app/routes';

const TransferGroupDetailPage = () => {
  usePageViewAnalytics({ name: ROUTE.TRANSFER_GROUP_DETAIL.name, squad: ROUTE.TRANSFER_GROUP_DETAIL.squad });
  const dispatch = useDispatch();
  const { id: transferGroupId } = useParams();
  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getTransferGroupByIdRequest({ id: transferGroupId }));
    dispatch(CommonCreators.getWarehousesRequest());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, []);

  return (
    <>
      <Header />
      <TransferGroupDetailForm />
      <ProductTransferGroupsTable />
      <WarehouseTransferGroupsTable />
    </>
  );
};

const reduxKey = REDUX_KEY.TRANSFER_GROUP.DETAIL;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(TransferGroupDetailPage);
