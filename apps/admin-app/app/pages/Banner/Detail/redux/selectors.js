import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.BANNER.DETAIL;

export const bannerDetailSelector = {
  getData: state => state?.[reducerKey]?.bannerDetail?.data,
  getIsPending: state => state?.[reducerKey]?.bannerDetail?.isPending,
  getError: state => state?.[reducerKey]?.bannerDetail?.error,
};

export const fileUploadSelector = {
  getBannerContentImage: state => state?.[reducerKey]?.fileUploads?.bannerContentImage?.data,
  isBannerContentImagePending: state => state?.[reducerKey]?.fileUploads?.bannerContentImage?.isPending,
};

export const pageOptionSelector = { getPageOptions: state => state?.[reducerKey]?.pageOptions };
