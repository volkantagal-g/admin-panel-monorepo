import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.GETIR_WATER.ANNOUNCEMENTS;

export const updateAnnouncementSelector = {
  getData: state => state?.[reducerKey]?.updateAnnouncement?.data,
  getTotal: state => state?.[reducerKey]?.updateAnnouncement?.totalCount,
  getIsPending: state => state?.[reducerKey]?.updateAnnouncement?.isPending,
};

export const announcementDetailSelector = {
  getData: state => state?.[reducerKey]?.announcementDetail?.data,
  getIsPending: state => state?.[reducerKey]?.announcementDetail?.isPending,
};

export const brandsSelector = {
  getBrands: state => state?.[reducerKey]?.brands?.data,
  getBrandsIsPending: state => state?.[reducerKey]?.brands?.isPending,
};

export const announcementsSelector = {
  getData: state => state?.[reducerKey]?.announcements?.data,
  getIsPending: state => state?.[reducerKey]?.announcements?.isPending,
};

export const vendorsSelector = {
  getVendors: state => state?.[reducerKey]?.vendors?.data,
  getVendorsIsPending: state => state?.[reducerKey]?.vendors?.isPending,
};

export const vendorsProductsSelector = {
  getVendorsProducts: state => state?.[reducerKey]?.vendorsProducts?.data,
  getVendorsProductsIsPending: state => state?.[reducerKey]?.vendorsProducts?.isPending,
};

export const campaignImageUrlSelector = { getIsPending: state => state?.[reducerKey]?.campaignImageUrl?.isPending || false };
