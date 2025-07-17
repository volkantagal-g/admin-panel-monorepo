import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.ANNOUNCEMENT.DETAIL;

export const announcementDetailSelector = {
  getData: state => state?.[reducerKey]?.announcementDetail?.data,
  getIsPending: state => state?.[reducerKey]?.announcementDetail?.isPending,
  getError: state => state?.[reducerKey]?.announcementDetail?.error,
};

export const fileUploadSelector = {
  getAnnouncementContentImage: state => state?.[reducerKey]?.fileUploads?.announcementContentImage?.data,
  isAnnouncementContentImagePending: state => state?.[reducerKey]?.fileUploads?.announcementContentImage?.isPending,
};
