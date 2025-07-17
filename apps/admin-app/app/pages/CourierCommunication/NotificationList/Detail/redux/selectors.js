import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.COURIER_COMMUNICATION_NOTIFICATION.DETAIL;

export const notificationSelector = {
  getIsPending: state => state[reduxKey]?.notification?.isPending,
  getData: state => state[reduxKey]?.notification?.data,
  getNotifStatPending: state => state[reduxKey]?.notificationStats?.isPending,
  getNotifStatData: state => state[reduxKey]?.notificationStats?.data,
  getCategories: state => state[reduxKey]?.categories || [],
  getIsPendingCategories: state => state[reduxKey]?.isPendingCategories || false,
};
