import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { ROUTE } from '@app/routes';
import { REDUX_KEY } from '@shared/shared/constants';
import reducer from '@app/pages/CourierCommunication/NotificationSegment/List/redux/reducer';
import saga from '@app/pages/CourierCommunication/NotificationSegment/List/redux/saga';
import { Creators } from '@app/pages/CourierCommunication/NotificationSegment/List/redux/actions';
import SegmentTable from './component/Table';
import Filter from '@app/pages/CourierCommunication/NotificationSegment/List/component/Filter/index';

import Header from './component/Header/index';

const reduxKey = REDUX_KEY.COURIER_COMMUNICATION_SEGMENT.LIST;
const CourierNotificationSegmentList = () => {
  usePageViewAnalytics({ name: ROUTE.COURIER_NOTIFICATION_SEGMENT_LIST.name, squad: ROUTE.COURIER_NOTIFICATION_SEGMENT_LIST.squad });
  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    rowsPerPage: 10,
  });
  const [filterData, setFilterData] = useState();

  const handleTablePagination = ({ currentPage, rowsPerPage }) => {
    setPagination({ currentPage, rowsPerPage });
  };

  const handleFilter = ({
    segmentName,
    creationDateTime,
  }) => {
    setFilterData({
      segmentName,
      creationDateTime,
    });
  };

  useEffect(() => {
    const { currentPage, rowsPerPage } = pagination;
    dispatch(Creators.segmentList({
      client: 1,
      ...filterData,
      currentPage,
      rowsPerPage,
    }));
  }, [dispatch, filterData, pagination]);

  return (
    <>
      <Header />
      <Filter
        handleSubmit={handleFilter}
      />
      <SegmentTable
        pagination={pagination}
        handlePagination={handleTablePagination}
      />
    </>
  );
};

export default CourierNotificationSegmentList;
