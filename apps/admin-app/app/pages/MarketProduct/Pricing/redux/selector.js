import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.MARKET_PRODUCT.PRICING;
export const getMarketProductsPriceListSelector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.getMarketProductsPriceList.isPending,
  ),
  getData: createSelector(
    state => state[reducerKey],
    state => state.getMarketProductsPriceList.data,
  ),
};
export const getActiveMarketProductsListSelector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.getActiveMarketProducts.isPending,
  ),
  getData: createSelector(
    state => state[reducerKey],
    state => state.getActiveMarketProducts.data,
  ),
};

export const updateMarketProductPriceSelector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.updateMarketProductPrice.isPending,
  ),
  getError: createSelector(
    state => state[reducerKey],
    state => state.updateMarketProductPrice.error,
  ),
};
export const updateMarketProductDiscountedPriceSelector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.updateMarketProductDiscountedPrice.isPending,
  ),
  getError: createSelector(
    state => state[reducerKey],
    state => state.updateMarketProductDiscountedPrice.error,
  ),
};
export const getMarketProductPriceDetailSelector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.getMarketProductPriceDetail.isPending,
  ),
  getData: createSelector(
    state => state[reducerKey],
    state => state.getMarketProductPriceDetail.data,
  ),
};

export const deletePriceSelector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.deletePrice.isPending,
  ),
  getData: createSelector(
    state => state[reducerKey],
    state => state.deletePrice.data,
  ),
};

export const deleteDiscountedPriceSelector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.deleteDiscountedPrice.isPending,
  ),
  getData: createSelector(
    state => state[reducerKey],
    state => state.deleteDiscountedPrice.data,
  ),
};

export const exportMarketProductSupplierBuyingPricesSelector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.exportMarketProductSupplierBuyingPrices.isPending,
  ),
};
