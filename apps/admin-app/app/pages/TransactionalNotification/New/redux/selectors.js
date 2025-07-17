import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.TRANSACTIONAL_NOTIFICATION.NEW;

export const configSelector = {
  getConfig: state => state?.[reducerKey]?.config?.data,
  isPending: state => state?.[reducerKey]?.config?.isPending,
};

export const getNotificationImagesSelector = {
  getData: state => state?.[reducerKey]?.notificationImages?.data,
  getIsPending: state => state?.[reducerKey]?.notificationImages?.isPending,
};
