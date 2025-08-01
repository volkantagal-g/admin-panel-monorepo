import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.MARKET_PRODUCT_CHAIN_MANAGEMENT.CONFIGURATION;

export const getPlanogramProductListSelector = {
  getData: createSelector(
    state => state[reducerKey],
    state => state.getPlanogramProductList.data,
  ),
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.getPlanogramProductList.isPending,
  ),
  getError: createSelector(
    state => state[reducerKey],
    state => state.getPlanogramProductList.error,
  ),
};

export const getSizesSelector = {
  getData: createSelector(
    state => state[reducerKey],
    state => state?.getSizes?.data,
  ),
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state?.getSizes?.isPending,
  ),
};

export const getDemographiesSelector = {
  getData: createSelector(
    state => state[reducerKey],
    state => state?.getDemographies?.data,
  ),
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state?.getDemographies?.isPending,
  ),
};

export const getWarehouseTypesSelector = {
  getData: createSelector(
    state => state[reducerKey],
    state => state?.getWarehouseTypes?.data,
  ),
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state?.getWarehouseTypes?.isPending,
  ),
};

export const getMainWarehousesAndCitiesSelector = {
  getCityData: createSelector(
    state => state[reducerKey],
    state => state?.getMainWarehousesAndCities?.data?.cities,
  ),
  getMainWarehousesData: createSelector(
    state => state[reducerKey],
    state => state?.getMainWarehousesAndCities?.data?.mainWarehouses,
  ),
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state?.getMainWarehousesAndCities?.isPending,
  ),
};

export const getProductDetailsSelector = {
  getProductData: createSelector(
    state => state[reducerKey],
    state => state?.getPlanogramProductDetails?.data?.Product,
  ),
  getAssignedWarehousesData: createSelector(
    state => state[reducerKey],
    state => state?.getPlanogramProductDetails?.data?.AssignedWarehouses,
  ),
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state?.getPlanogramProductDetails?.isPending,
  ),
};

export const filterPlanogramWarehouseSelector = {
  getRegularWarehousesData: createSelector(
    state => state[reducerKey],
    state => state?.filterPlanogramWarehouse?.data?.regularWarehouses || [],
  ),
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state?.filterPlanogramWarehouse?.isPending,
  ),
};

export const updatePlanogramProductSelector = {
  getData: createSelector(
    state => state[reducerKey],
    state => state?.updatePlanogramProduct?.data,
  ),
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state?.updatePlanogramProduct?.isPending,
  ),
  getError: createSelector(
    state => state[reducerKey],
    state => state?.updatePlanogramProduct?.error,
  ),
};
