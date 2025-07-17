import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.ON_OFF_PROMO_CONFIG;

export const cityFilterSelector = {
  getCityList: createSelector(
    state => state[reducerKey],
    state => state?.cityFilter?.cityList || {},
  ),
  getSelectedCities: createSelector(
    state => state[reducerKey],
    state => state?.cityFilter?.selectedCities || {},
  ),
  getSelectedCountries: createSelector(
    state => state[reducerKey],
    state => state?.cityFilter?.selectedCountries || {},
  ),
};

export const warehouseFilterSelector = {
  getSelectedWarehouses: createSelector(
    state => state[reducerKey],
    state => state?.warehouseFilter?.selectedWarehouses || {},
  ),
  getWarehouseList: createSelector(
    state => state[reducerKey],
    state => state?.warehouseFilter?.warehouseList || {},
  ),
};

export const changeConfigSelector = {
  getIsSuccess: createSelector(
    state => state[reducerKey],
    state => state.changedConfig?.isSuccess || false,
  ),
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state.changedConfig?.isPending || false,
  ),
  getChangedConfig: createSelector(
    state => state[reducerKey],
    state => state?.changedConfig.data || {},
  ),
};

export const stateSelector = {
  getIsPending: createSelector(
    state => state[reducerKey],
    state => state?.isPending || false,
  ),
  getResultData: createSelector(
    state => state[reducerKey],
    state => state?.result?.resultData || [],
  ),
};

export const configFilterSelector = {
  getSelectedConfig: createSelector(
    state => state[reducerKey],
    state => state?.configFilter?.selectedConfig || null,
  ),
};
