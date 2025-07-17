import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.GETIR_WATER.ANNOUNCEMENTS;

export const createAnnouncementSelector = {
  getData: state => state?.[reducerKey]?.createAnnouncement?.data,
  getTotal: state => state?.[reducerKey]?.createAnnouncement?.totalCount,
  getIsPending: state => state?.[reducerKey]?.createAnnouncement?.isPending,
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

export const isVendorChangedToggle = { getIsVendorChangedToggle: state => state?.[reducerKey]?.isVendorChangedToggle?.toggled };
export const isBrandsChangedToggle = { getIsBrandsChangedToggle: state => state?.[reducerKey]?.isBrandsChangedToggle?.toggled };

export const campaignImageUrlSelector = { getIsPending: state => state?.[reducerKey]?.campaignImageUrl?.isPending || false };
