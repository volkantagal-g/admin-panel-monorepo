import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions(
  {
    createAnnouncementRequest: { data: {} },
    createAnnouncementSuccess: { announcements: [] },
    createAnnouncementFailure: { error: null },
    getVendorsRequest: { data: {} },
    getVendorsSuccess: { data: [] },
    getVendorsFailure: { error: null },
    vendorsProductsRequest: { data: {} },
    vendorsProductsSuccess: { data: [] },
    vendorsProductsFailure: { error: null },
    getBrandsRequest: {},
    getBrandsSuccess: { data: [] },
    getBrandsFailure: { error: null },
    getAnnouncementsRequest: { },
    getAnnouncementsSuccess: { data: [] },
    getAnnouncementsFailure: { error: null },
    campaignImageUrlRequest: { onSuccess: {}, loadedImage: null },
    campaignImageUrlSuccess: {},
    campaignImageUrlFailure: { error: null },
    isVendorChangedToggle: { toggled: false },
    isBrandsChangedToggle: { toggled: false },
    initPage: null,
    destroyPage: null,
  },
  { prefix: `${REDUX_KEY.GETIR_WATER.ANNOUNCEMENTS}_` },
);
