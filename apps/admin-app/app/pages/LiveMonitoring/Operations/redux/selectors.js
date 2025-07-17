import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';
import { getCitiesSelector, getFilteredWarehousesSelector } from '@shared/redux/selectors/common';

import { TOTALS_ROW_ID, formatDataForCitiesToTableRows, formatDataForSelectedCity } from '../logicV3';

const reducerKey = REDUX_KEY.LIVE_MONITORING.OPERATIONS;

export const filtersSelector = state => state[reducerKey].filters;

export const operationStatsDataForCitiesSelector = {
  getData: createSelector(
    state => state[reducerKey].operationStatsDataForCities.data,
    getCitiesSelector.getOperationalCities,
    getFilteredWarehousesSelector.getData,
    filtersSelector,
    (data, cities, warehouses, filters) => {
      return formatDataForCitiesToTableRows({ data, cities, warehouses, isCitySelected: false, selectedDomainType: filters.domainType });
    },
  ),
  isPending: state => state[reducerKey].operationStatsDataForCities.isPending,
};

export const getOperationStatsForCitiesCityNamesSelector = createSelector(
  operationStatsDataForCitiesSelector.getData,
  data => {
    // filter total row, its id is empty
    return data?.filter(item => item.id !== TOTALS_ROW_ID);
  },
);

export const operationStatsDataForSelectedCitySelector = {
  getData: createSelector(
    state => state[reducerKey].operationStatsDataForSelectedCity.data,
    getFilteredWarehousesSelector.getData,
    filtersSelector,
    (data, warehouses, filters) => formatDataForSelectedCity({ data, warehouses, selectedDomainType: filters.domainType }),
  ),
  isPending: state => state[reducerKey].operationStatsDataForSelectedCity.isPending,
};

export const getOperationDataWarehouseNames = createSelector(
  operationStatsDataForSelectedCitySelector.getData,
  data => {
    // filter total row, its id is empty
    return data?.filter(item => item.id !== TOTALS_ROW_ID);
  },
);
