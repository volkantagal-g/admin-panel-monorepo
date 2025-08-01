import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.PROMO.BADGES;

export const getPromoBadgesByFiltersSelector = {
  getData: state => state?.[reducerKey]?.getPromoBadgesByFilters?.data,
  getIsPending: state => state?.[reducerKey]?.getPromoBadgesByFilters?.isPending,
};

export const managePromoBadgeSelector = { getIsPending: state => state?.[reducerKey]?.managePromoBadge?.isPending };

export const badgeErrorSelector = { getError: state => state?.[reducerKey]?.managePromoBadge?.error };
