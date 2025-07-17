import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.COURIER_COMMUNICATION_NOTIFICATION.CREATE;

export const createNotificationSelector = {
  getCategories: state => state?.[reduxKey]?.createNotification?.categories || [],
  getIsPendingCategories: state => state?.[reduxKey]?.createNotification?.getIsPendingCategories,
  getCourierIdsList: state => state?.[reduxKey]?.createNotification?.courierIdsList || [],
};
