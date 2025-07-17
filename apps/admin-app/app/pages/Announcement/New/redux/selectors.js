import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.ANNOUNCEMENT.NEW;

export const fileUploadSelector = {
  getAnnouncementContentImage: state => state?.[reducerKey]?.fileUploads?.announcementContentImage?.data,
  isAnnouncementContentImagePending: state => state?.[reducerKey]?.fileUploads?.announcementContentImage?.isPending,
};
