import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import { warehouseSegmentSelector } from './redux/selector';
import { Creators } from './redux/actions';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { Form, Table } from './components';

const reduxKey = REDUX_KEY.WAREHOUSE_SEGMENT.DETAIL;

const WarehouseSegmentDetail = () => {
  usePageViewAnalytics({ name: ROUTE.WAREHOUSE_SEGMENT_DETAIL.name, squad: ROUTE.WAREHOUSE_SEGMENT_DETAIL.squad });
  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const { id: pageId } = useParams();

  const segment = {
    data: useSelector(warehouseSegmentSelector.getData),
    isPending: useSelector(warehouseSegmentSelector.getIsPending),
  };

  useEffect(() => {
    dispatch(Creators.getWarehouseSegmentRequest({ segmentId: pageId }));
  }, [dispatch, pageId]);

  return (
    <>
      <Form segmentData={segment.data} segmentIsPending={segment.isPending} />
      <Table segmentData={segment.data} />
    </>
  );
};

export default WarehouseSegmentDetail;
