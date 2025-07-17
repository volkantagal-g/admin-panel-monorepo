import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.TRANSACTIONAL_NOTIFICATION.DETAIL;

export const transactionalNotificationDetailSelector = {
  getData: state => state?.[reducerKey]?.transactionalNotificationDetail?.data,
  getIsPending: state => state?.[reducerKey]?.transactionalNotificationDetail?.isPending,
  getError: state => state?.[reducerKey]?.transactionalNotificationDetail?.error,
};

export const configSelector = {
  getConfig: state => state?.[reducerKey]?.config?.data,
  isPending: state => state?.[reducerKey]?.config?.isPending,
};

export const getNotificationImagesSelector = {
  getData: state => state?.[reducerKey]?.notificationImages?.data,
  getIsPending: state => state?.[reducerKey]?.notificationImages?.isPending,
};
