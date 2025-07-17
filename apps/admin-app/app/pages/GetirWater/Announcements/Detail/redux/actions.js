import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions(
  {
    getAnnouncementDetailRequest: { announcementId: undefined },
    getAnnouncementDetailSuccess: { data: {} },
    getAnnouncementDetailFailure: { error: null },
    updateAnnouncementRequest: { data: {}, announcementId: undefined },
    updateAnnouncementSuccess: { announcements: [] },
    updateAnnouncementFailure: { error: null },
    vendorsProductsRequest: { data: {} },
    vendorsProductsSuccess: { data: [] },
    vendorsProductsFailure: { error: null },
    getBrandsRequest: {},
    getBrandsSuccess: { data: [] },
    getBrandsFailure: { error: null },
    getVendorsRequest: { data: {} },
    getVendorsSuccess: { data: [] },
    getVendorsFailure: { error: null },
    getAnnouncementsRequest: {},
    getAnnouncementsSuccess: { data: [] },
    getAnnouncementsFailure: { error: null },
    campaignImageUrlRequest: { onSuccess: {}, loadedImage: null },
    campaignImageUrlSuccess: {},
    campaignImageUrlFailure: { error: null },
    initPage: null,
    destroyPage: null,
  },
  { prefix: `${REDUX_KEY.GETIR_WATER.ANNOUNCEMENTS}_` },
);
