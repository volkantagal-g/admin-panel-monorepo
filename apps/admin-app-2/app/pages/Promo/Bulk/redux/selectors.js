import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.PROMO.BULK;

export const getMasterPromoIdsSelector = {
  getData: state => state?.[reducerKey]?.getMasterPromoIds?.data || [],
  getIsPending: state => state?.[reducerKey]?.getMasterPromoIds?.isPending || false,
};

export const createBulkPromosSelector = {
  getIsPending: state => state?.[reducerKey]?.createBulkPromos?.isPending || false,
  getData: state => state?.[reducerKey]?.createBulkPromos?.data || [],
};
