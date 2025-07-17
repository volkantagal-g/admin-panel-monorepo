import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.GETIR_WATER.CAMPAIGNS;

export const updateCampaignSelector = {
  getData: state => state?.[reducerKey]?.updateCampaign?.data,
  getTotal: state => state?.[reducerKey]?.updateCampaign?.totalCount,
  getIsPending: state => state?.[reducerKey]?.updateCampaign?.isPending,
};

export const campaignDetailSelector = {
  getData: state => state?.[reducerKey]?.campaignDetail?.data,
  getIsPending: state => state?.[reducerKey]?.campaignDetail?.isPending,
};

export const vendorsSelector = {
  getVendors: state => state?.[reducerKey]?.vendors?.data,
  getVendorsIsPending: state => state?.[reducerKey]?.vendors?.isPending,
};

export const brandsSelector = {
  getBrands: state => state?.[reducerKey]?.brands?.data,
  getBrandsIsPending: state => state?.[reducerKey]?.brands?.isPending,
};

export const productsSelector = {
  getData: state => state?.[reducerKey]?.products?.data,
  getIsPending: state => state?.[reducerKey]?.products?.isPending,
};

export const promoUsageDetailSelector = {
  getData: state => state?.[reducerKey]?.promoUsageDetail?.data,
  getIsPending: state => state?.[reducerKey]?.promoUsageDetail?.isPending,
};

export const updateCampaignStatusSelector = {
  getData: state => state?.[reducerKey]?.updateCampaignStatus?.data,
  getIsPending: state => state?.[reducerKey]?.updateCampaignStatus?.isPending,
};

export const campaignImageUrlSelector = { getIsPending: state => state?.[reducerKey]?.campaignImageUrl?.isPending || false };

export const createSegmentSelector = {
  getData: state => state?.[reducerKey]?.createSegment?.data,
  getIsPending: state => state?.[reducerKey]?.createSegment?.isPending || false,
};

export const getClientCountBySegmentSelector = {
  getData: state => state?.[reducerKey]?.getClientCountBySegment?.data,
  getIsPending: state => state?.[reducerKey]?.getClientCountBySegment?.isPending || false,
};
