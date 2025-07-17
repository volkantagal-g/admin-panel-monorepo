import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.GETIR_WATER.CAMPAIGNS;

export const createCampaignSelector = {
  getData: state => state?.[reducerKey]?.createCampaign?.data,
  getTotal: state => state?.[reducerKey]?.createCampaign?.totalCount,
  getIsPending: state => state?.[reducerKey]?.createCampaign?.isPending,
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

export const campaignImageUrlSelector = { getIsPending: state => state?.[reducerKey]?.campaignImageUrl?.isPending || false };

export const createSegmentSelector = {
  getData: state => state?.[reducerKey]?.createSegment?.data,
  getIsPending: state => state?.[reducerKey]?.createSegment?.isPending || false,
};

export const getClientCountBySegmentSelector = {
  getData: state => state?.[reducerKey]?.getClientCountBySegment?.data,
  getIsPending: state => state?.[reducerKey]?.getClientCountBySegment?.isPending || false,
};
