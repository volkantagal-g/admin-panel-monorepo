import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

import Header from './components/Header/index';
import Filter from './components/Filter/index';
import NotificationsTable from './components/Table';

import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { ROUTE } from '@app/routes';
import { REDUX_KEY } from '@shared/shared/constants';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { Creators } from '@app/pages/CourierCommunication/NotificationList/List/redux/action';
import { NOTIFICATION_STATUS } from './constants';

const reduxKey = REDUX_KEY.COURIER_COMMUNICATION_NOTIFICATION.LIST;
const NotificationList = () => {
  usePageViewAnalytics({ name: ROUTE.COURIER_COMMUNICATION_NOTIFICATION_LIST.name, squad: ROUTE.COURIER_COMMUNICATION_NOTIFICATION_LIST.squad });
  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const [notificationData, setNotificationData] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    rowsPerPage: 10,
  });

  const handleTablePagination = ({ currentPage, rowsPerPage }) => {
    setPagination({ currentPage, rowsPerPage });
  };

  const handleFilter = ({
    notificationID,
    notificationName,
    priority,
    selectedStatus,
    creationDateTime,
    sendingDateTime,
  }) => {
    setNotificationData({
      notificationID,
      notificationName,
      priority,
      selectedStatus,
      creationDateTime,
      sendingDateTime,
    });
  };

  useEffect(() => {
    const { currentPage, rowsPerPage } = pagination;
    const defaultStatus = [NOTIFICATION_STATUS.PENDING_NOTIFICATION, NOTIFICATION_STATUS.RUNNING_NOTIFICATION, NOTIFICATION_STATUS.COMPLETED_NOTIFICATION];
    dispatch(Creators.notificationList({
      notificationID: notificationData?.notificationID,
      notificationName: notificationData?.notificationName,
      priority: notificationData?.priority,
      creationDateTime: notificationData?.creationDateTime,
      sendingDateTime: notificationData?.sendingDateTime,
      status: notificationData?.selectedStatus ? [notificationData.selectedStatus] : defaultStatus,
      currentPage,
      rowsPerPage,
    }));
  }, [dispatch, notificationData, pagination]);

  return (
    <>
      <Header />
      <Filter
        handleSubmit={handleFilter}
      />
      <NotificationsTable
        pagination={pagination}
        handlePagination={handleTablePagination}
      />
    </>
  );
};

export default NotificationList;
