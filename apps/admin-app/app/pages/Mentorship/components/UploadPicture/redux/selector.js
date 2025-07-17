import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.MENTORSHIP.UPLOAD_PICTURE;

export const getUploadPictureSelector = {
  getUrl: state => state?.[reducerKey]?.uploadPicture?.url,
  getIsPending: state => state?.[reducerKey]?.uploadPicture?.isPending,
};
