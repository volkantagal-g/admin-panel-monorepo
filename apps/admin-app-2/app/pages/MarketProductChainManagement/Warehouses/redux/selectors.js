import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.PLANOGRAM.WAREHOUSES;

export const updatePlanogramWarehouseSelector = {
  getData: createSelector(
    state => state[reducerKey],
    state => state.updatePlanogramWarehouse.data,
  ),
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.updatePlanogramWarehouse.isPending,
  ),
  getError: createSelector(
    state => state[reducerKey],
    state => state.updatePlanogramWarehouse.error,
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

export const listPlanogramWarehousesSelector = {
  getData: createSelector(
    state => state[reducerKey],
    state => state?.listPlanogramWarehouses?.data?.res,
  ),
  getWarehouseList: createSelector(
    state => state[reducerKey],
    state => state?.listPlanogramWarehouses?.warehouseList,
  ),
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state?.listPlanogramWarehouses?.isPending,
  ),
};

export const listPlanogramWarehousesInitialSelector = {
  getData: createSelector(
    state => state[reducerKey],
    state => state?.listPlanogramWarehousesInitial?.data?.res,
  ),
  getWarehouseList: createSelector(
    state => state[reducerKey],
    state => state?.listPlanogramWarehousesInitial?.warehouseList,
  ),
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state?.listPlanogramWarehousesInitial?.isPending,
  ),
};

export const getPlanogramWarehouseDetailsSelector = {
  getWarehouseData: createSelector(
    state => state[reducerKey],
    state => state?.getPlanogramWarehouseDetails?.data?.warehouse,
  ),
  getProductData: createSelector(
    state => state[reducerKey],
    state => state?.getPlanogramWarehouseDetails?.data?.products,
  ),
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state?.getPlanogramWarehouseDetails?.isPending,
  ),
};
