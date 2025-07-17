import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.MARKET_PRODUCT.LIST;

export const getMarketProductsSelector = {
  getData: createSelector(
    state => state[reducerKey],
    state => state.getMarketProducts.data?.products,
  ),
  getCount: createSelector(
    state => state[reducerKey],
    state => state.getMarketProducts.data?.totalCount,
  ),
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.getMarketProducts.isPending,
  ),
};

export const filtersSelector = {
  getSelectedFilterOptions: createSelector(
    state => state[reducerKey],
    state => state?.filters.selectedOptions,
  ),
  getSelectedStatusFilterOptions: createSelector(
    state => state[reducerKey],
    state => state?.filters.selectedStatusOptions,
  ),
  getEnteredIds: createSelector(
    state => state[reducerKey],
    state => state?.filters.ids,
  ),
};

export const importMarketProductDomainLimitsSelector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.importMarketProductDomainLimits.isPending,
  ),
};

export const exportMarketProductDomainLimitsSelector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.exportMarketProductDomainLimits.isPending,
  ),
};

export const importMarketProductDetailsSelector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.importMarketProductDetails.isPending,
  ),
};

export const exportMarketProductDetailsSelector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.exportMarketProductDetails.isPending,
  ),
};

export const importMarketProductAdditionalTablesSelector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.importMarketProductAdditionalTables.isPending,
  ),
};

export const exportMarketProductAdditionalTablesSelector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.exportMarketProductAdditionalTables.isPending,
  ),
};

export const importMarketProductCategoryPositionsSelector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.importMarketProductCategoryPositions.isPending,
  ),
};

export const exportMarketProductCategoryPositionsSelector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.exportMarketProductCategoryPositions.isPending,
  ),
};

export const exportMarketProductSupplyAndLogisticSelector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.exportMarketProductSupplyAndLogistic.isPending,
  ),
};

export const exportMarketProductPricingMetadataSelector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.exportMarketProductPricingMetadata.isPending,
  ),
};

export const importMarketProductSupplyAndLogisticSelector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.importMarketProductSupplyAndLogistic.isPending,
  ),
};

export const importMarketProductPricingMetadataSelector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.importMarketProductPricingMetadata.isPending,
  ),
};

export const importMarketProductTogglesSelector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.importMarketProductToggles.isPending,
  ),
};
