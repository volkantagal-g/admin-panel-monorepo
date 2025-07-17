import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions(
  {
    createCampaignRequest: { data: {} },
    createCampaignSuccess: { campaigns: [] },
    createCampaignFailure: { error: null },
    getVendorsRequest: { data: {} },
    getVendorsSuccess: { data: [] },
    getVendorsFailure: { error: null },
    getBrandsRequest: {},
    getBrandsSuccess: { data: [] },
    getBrandsFailure: { error: null },
    getProductsRequest: {},
    getProductsSuccess: { data: [] },
    getProductsFailure: { error: null },
    campaignImageUrlRequest: { onSuccess: {}, loadedImage: null },
    campaignImageUrlSuccess: {},
    campaignImageUrlFailure: { error: null },
    createSegmentRequest: { data: {} },
    createSegmentSuccess: { data: {} },
    createSegmentFailure: { error: null },
    getClientCountBySegmentRequest: { data: {} },
    getClientCountBySegmentSuccess: { data: {} },
    getClientCountBySegmentFailure: { error: null },
    initPage: null,
    destroyPage: null,
  },
  { prefix: `${REDUX_KEY.GETIR_WATER.CAMPAIGNS}_` },
);
