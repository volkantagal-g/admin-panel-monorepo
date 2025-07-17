import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.NOTIFICATION_CENTER.DETAIL;

export const announcementDetailSelector = {
  getData: state => state?.[reducerKey]?.announcementDetail?.data,
  getIsPending: state => state?.[reducerKey]?.announcementDetail?.isPending,
  getError: state => state?.[reducerKey]?.announcementDetail?.error,
};

export const fileUploadSelector = {
  getNotificationCenterContentImage: state => state?.[reducerKey]?.fileUploads?.notificationCenterContentImage?.data,
  isNotificationCenterContentImagePending: state => state?.[reducerKey]?.fileUploads?.notificationCenterContentImage?.isPending,
};

export const pageOptionSelector = { getPageOptions: state => state?.[reducerKey]?.pageOptions };
