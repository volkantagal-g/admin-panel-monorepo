import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.MARKET_PRODUCT.FAMILY;

export const getMarketProductFamilyListSelector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state?.getMarketProductFamilyList?.isPending,
  ),
  getData: createSelector(
    state => state[reducerKey],
    state => state?.getMarketProductFamilyList?.data,
  ),
};

export const getMarketProductFamilyDetailSelector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state?.getMarketProductFamilyDetail?.isPending,
  ),
  getData: createSelector(
    state => state[reducerKey],
    state => state?.getMarketProductFamilyDetail?.data,
  ),
};

export const createMarketProductFamilySelector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state?.createMarketProductFamily?.isPending,
  ),
};

export const isNewFamilyModalOpenSelector = createSelector(
  state => state[reducerKey],
  state => state?.isNewFamilyModalOpen,
);
