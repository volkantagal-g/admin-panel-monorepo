import { createSelector } from 'reselect';
import _ from 'lodash';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY, DOMAIN_FILTER_TYPES, GETIR_10_DOMAIN_TYPE } from '@shared/shared/constants';
import { filterLiveMapData } from '../utils';
import { availableDomainTypesForCountrySelector } from '@shared/redux/selectors/common';

const reducerKey = REDUX_KEY.DAILY_TRACKING.INSTANT;
const commonReducerKey = REDUX_KEY.COMMON;

export const dashboardDataSelector = {
  getData: createSelector(
    liveMapState => {
      return getStateObject(liveMapState, reducerKey, 'liveMapData');
    },
    operationTimeSeriesState => {
      return getStateObject(operationTimeSeriesState, reducerKey, 'operationTimeSeriesData');
    },
    filters => {
      return getStateObject(filters, reducerKey, 'filters');
    },
    warehouses => {
      return getStateObject(warehouses, commonReducerKey, 'getWarehouses');
    },
    (liveMapState, operationTimeSeriesState, filters, warehouses) => {
      if (!Object.keys(liveMapState.data).length || !warehouses.data.length) {
        return { liveMapData: [], operationTimeSeriesData: [] };
      }

      const warehousesMap = new Map();
      const operationTimeSeriesDataObject = operationTimeSeriesState.data.operational_stats || {};
      let operationTimeSeriesData = [];

      let liveMapData = _.get(liveMapState.data, 'courierStatusCountsWithCourierPlan.selectedCity.total.warehouses', []);

      warehouses.data.forEach(warehouse => {
        warehousesMap.set(warehouse._id, warehouse);
      });

      if (filters.domainFilterType === DOMAIN_FILTER_TYPES.EXACT) {
        operationTimeSeriesData = Object.keys(operationTimeSeriesDataObject).filter(key => {
          return key === filters.selectedDomainType;
        }).map(key => operationTimeSeriesDataObject[key]);
      }
      else {
        Object.keys(operationTimeSeriesDataObject).filter(key => {
          return _.includes(key, filters.selectedDomainType);
        }).forEach(key => operationTimeSeriesData.push(...operationTimeSeriesDataObject[key]));
      }

      const props = {
        selectedDomainType: filters.selectedDomainType,
        domainFilterType: filters.domainFilterType,
      };

      liveMapData = liveMapData.map(warehouse => {
        const currentWarehouse = warehousesMap.get(warehouse.warehouseId);
        return { ...warehouse, warehouseObject: currentWarehouse };
      });

      liveMapData = filterLiveMapData(liveMapData, props);

      return {
        liveMapData,
        operationTimeSeriesData,
      };
    },
  ),
  getIsPending: createSelector(
    liveMapState => {
      return getStateObject(liveMapState, reducerKey, 'liveMapData');
    },
    operationTimeSeriesState => {
      return getStateObject(operationTimeSeriesState, reducerKey, 'operationTimeSeriesData');
    },
    (liveMapState, operationTimeSeriesState) => {
      return liveMapState.isPending || operationTimeSeriesState.isPending;
    },
  ),
};

export const filtersSelector = {
  getCities: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'filters');
    },
    ({ cities }) => {
      return cities;
    },
  ),
  getSelectedCityFilter: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'filters');
    },
    ({ selectedCityFilter }) => {
      return selectedCityFilter;
    },
  ),
  getSelectedDomainType: createSelector(
    availableDomainTypesForCountrySelector.getDomainTypes,
    state => state[reducerKey]?.filters?.selectedDomainType,
    (availableDomainTypes, domainType) => {
      if (!availableDomainTypes?.includes(domainType)) return GETIR_10_DOMAIN_TYPE;
      return domainType;
    },
  ),
  getDomainFilterType: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'filters');
    },
    ({ domainFilterType }) => {
      return domainFilterType;
    },
  ),
};
