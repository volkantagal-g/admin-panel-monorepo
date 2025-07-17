import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.BANNER.NEW;

export const fileUploadSelector = {
  getBannerContentImage: state => state?.[reducerKey]?.fileUploads?.bannerContentImage?.data,
  isBannerContentImagePending: state => state?.[reducerKey]?.fileUploads?.bannerContentImage?.isPending,
};

export const pageOptionSelector = { getPageOptions: state => state?.[reducerKey]?.pageOptions };
