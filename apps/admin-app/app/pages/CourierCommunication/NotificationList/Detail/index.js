import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { useInitAndDestroyPage } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';
import Spinner from '@shared/components/Spinner';
import PageHeader from '@app/pages/CourierCommunication/NotificationList/Detail/components/Header';
import { Creators } from '@app/pages/CourierCommunication/NotificationList/Detail/redux/actions';
import saga from '@app/pages/CourierCommunication/NotificationList/Detail/redux/saga';
import reducer from '@app/pages/CourierCommunication/NotificationList/Detail/redux/reducer';
import { notificationSelector } from '@app/pages/CourierCommunication/NotificationList/Detail/redux/selectors';
import NotificationEditForm from '@app/pages/CourierCommunication/NotificationList/Detail/components/Form';

const reduxKey = REDUX_KEY.COURIER_COMMUNICATION_NOTIFICATION.DETAIL;

const NotificationDetailPage = () => {
  const dispatch = useDispatch();
  usePageViewAnalytics({
    name: ROUTE.COURIER_COMMUNICATION_NOTIFICATION_DETAIL.name,
    squad: ROUTE.COURIER_COMMUNICATION_NOTIFICATION_DETAIL.squad,
  });
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const { id } = useParams();
  const notification = useSelector(notificationSelector.getData);
  const isNotificationPending = useSelector(notificationSelector.getData);

  const handleNotificationEditSubmit = updatedNotification => {
    const updatedNotificationTask = {
      ...notification,
      ...updatedNotification,
      channel: { ...notification.channel, push: updatedNotification.channel.includes('push') },
    };
    dispatch(Creators.notificationUpdateRequest(updatedNotificationTask));
  };

  useEffect(() => {
    dispatch(Creators.getNotificationByIdRequest({ id }));
  }, [dispatch, id]);

  return (
    <>
      <PageHeader />
      {isNotificationPending ? <NotificationEditForm handleFormSubmission={handleNotificationEditSubmit} /> : <Spinner />}
    </>
  );
};

export default NotificationDetailPage;
