import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.COURIER_COMMUNICATION_NOTIFICATION.LIST;

export const notificationList = {
  getNotificationListData: state => state?.[reducerKey]?.notificationList?.data,
  getNotificationDataIsPending: state => state?.[reducerKey]?.notificationList?.isPending,
};
