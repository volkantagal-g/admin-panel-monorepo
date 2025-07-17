import { createSelector } from 'reselect';
import { forEach as _forEach, isNull } from 'lodash';

import { createMap, getStateObject } from '@shared/utils/common';
import { GETIR_10_DOMAIN_TYPE, REDUX_KEY } from '@shared/shared/constants';
import {
  getCitiesSelector,
  getFilteredWarehousesSelector,
  getDivisionSelector, operationalCountriesSelector as countriesSelector,
  availableDomainTypesForCountrySelector,
} from '@shared/redux/selectors/common';
import { getLangKey } from '@shared/i18n';
import {
  getFormattedData,
  getFormattedWarehouseData,
  getFormattedCourierData,
  getFormattedCitiesMonitoringData,
  getFormattedFailedOrderData,
} from '../utils';

export const REDUCER_KEY = REDUX_KEY.GETIR_MARKET.LIVE_MAP;

export const getPolygonsSelector = {
  getData: createSelector(
    state => {
      return state[REDUCER_KEY].polygonsData.data;
    },
    data => getFormattedData(data),
  ),
  getIsPending: createSelector(
    state => state[REDUCER_KEY],
    state => state.polygonsData.isPending,
  ),
};

export const liveMapDataSelector = {
  getData: createSelector(
    state => {
      return state[REDUCER_KEY].liveMapData.data;
    },
    data => getFormattedCitiesMonitoringData(data),
  ),
  getIsPending: createSelector(
    state => state[REDUCER_KEY],
    state => state.liveMapData.isPending,
  ),
};

export const failedOrdersSelector = {
  getFailedOrderMarkers: createSelector(
    state => state[REDUCER_KEY].liveMapData.data.failedOrderMarkers,
    data => data,
  ),
};

export const getMapState = createSelector(
  state => {
    return state[REDUCER_KEY];
  },
  pageState => pageState.mapState,
);

export const couriersDataSelector = {
  getData: createSelector(
    state => {
      return state[REDUCER_KEY].couriersData.data;
    },
    data => data || [],
  ),
  getIsPending: createSelector(
    state => state[REDUCER_KEY],
    state => state.couriersData.isPending,
  ),
};

export const getCourierCountsDataSelector = createSelector(liveMapDataSelector.getData, data => data?.courierStatusCountsWithCourierPlan);

export const getCourierPlanViolationsSelector = state => liveMapDataSelector.getData(state)?.courierPlanViolationWarehouses;

export const noBreadStockWarehousesSelector = state => liveMapDataSelector.getData(state)?.noBreadStockWarehouses;
export const noRamadanPitaStockWarehousesSelector = state => liveMapDataSelector.getData(state)?.noRamadanPitaStockWarehouses;

export const getCourierCountsIsPendingSelector = createSelector(liveMapDataSelector.getIsPending, isPending => isPending);

export const getFilteredCourierCountsDataSelector = createSelector(
  state => state[REDUCER_KEY].filteredCourierStatusCountsData.data,
  data => data,
);

export const getFilteredCourierCountsIsPendingSelector = createSelector(
  state => state[REDUCER_KEY].filteredCourierStatusCountsData.isPending,
  data => data,
);

export const filtersSelector = {
  getCity: createSelector(
    state => {
      return getStateObject(state, REDUCER_KEY, 'filters');
    },
    ({ city }) => {
      return city;
    },
  ),
  getCityName: createSelector(
    getCitiesSelector.getData,
    state => {
      return getStateObject(state, REDUCER_KEY, 'filters');
    },
    (cities, { city }) => {
      if (!cities.length || !city) return '';
      return cities.find(c => c._id === city)?.name?.[getLangKey()] || '';
    },
  ),
  getSelectedCityData: state => {
    const citiesMap = getCitiesSelector.getCitiesMap(state);
    const selectedCityId = state?.[REDUCER_KEY]?.filters?.city;
    return citiesMap[selectedCityId];
  },
  getDomainType: createSelector(
    availableDomainTypesForCountrySelector.getDomainTypes,
    state => state?.[REDUCER_KEY]?.filters?.domainType,
    (availableDomainTypes, domainType) => {
      if (!availableDomainTypes?.includes(domainType) && !isNull(domainType)) return GETIR_10_DOMAIN_TYPE;
      if (isNull(domainType)) return null;
      return domainType;
    },
  ),
  getPolygonType: createSelector(
    state => {
      return getStateObject(state, REDUCER_KEY, 'filters');
    },
    ({ polygonType }) => {
      return polygonType;
    },
  ),
  getWarehouseSearch: createSelector(
    state => {
      return getStateObject(state, REDUCER_KEY, 'filters');
    },
    ({ warehouseSearch }) => warehouseSearch,
  ),
  getFilterCountry: createSelector(
    state => {
      return getStateObject(state, REDUCER_KEY, 'filters');
    },
    ({ country }) => country,
  ),
};

export const selectedPlaceMarkSelector = {
  formattedEventData: createSelector(
    state => state[REDUCER_KEY],
    ({ selectedPlaceMark, mappedWarehouses }) => {
      if (selectedPlaceMark?.type === 'courier') {
        return getFormattedCourierData(selectedPlaceMark, mappedWarehouses);
      }
      if (selectedPlaceMark?.type === 'warehouse') {
        return getFormattedWarehouseData(selectedPlaceMark);
      }
      return getFormattedFailedOrderData(selectedPlaceMark);
    },
  ),
  getId: createSelector(
    state => getStateObject(state, REDUCER_KEY, 'selectedPlaceMark'),
    selectedPlaceMark => selectedPlaceMark?._id,
  ),
  getType: createSelector(
    state => getStateObject(state, REDUCER_KEY, 'selectedPlaceMark'),
    selectedPlaceMark => selectedPlaceMark?.type,
  ),
  getData: state => state[REDUCER_KEY].selectedPlaceMark,
};

export const failedOrderPlaceMarkSelector = {
  getData: createSelector(
    state => state[REDUCER_KEY].failedOrderPlaceMark,
    data => data,
  ),
};

export const mappedWarehousesSelector = createSelector(
  state => getStateObject(state, REDUCER_KEY, 'mappedWarehouses'),
  mappedWarehouses => mappedWarehouses,
);

export const showCourierTypeSelector = createSelector(
  state => getStateObject(state, REDUCER_KEY, 'showCourierType'),
  showCourierType => showCourierType,
);

export const getFilteredWarehousesMap = createSelector(
  getFilteredWarehousesSelector.getData,
  warehouses => createMap(warehouses),
);

export const getTestWarehousesMap = createSelector(
  getFilteredWarehousesSelector.getData,
  warehouses => {
    const returnObj = {};
    _forEach(warehouses, warehouse => {
      if (warehouse.isTestWarehouse) {
        returnObj[warehouse._id] = warehouse;
      }
    });
    return returnObj;
  },
);

export const getSelectedDivisionSelector = createSelector(getDivisionSelector.getData, division => division);
export const getSelectedDivisionIsPendingSelector = createSelector(getDivisionSelector.getIsPending, isPending => isPending);

export const getSelectedFilterCountryCode = createSelector(
  countriesSelector.getData,
  filtersSelector.getFilterCountry,
  (countries, filterCountryId) => {
    const foundCountry = countries.find(c => c._id === filterCountryId);
    return foundCountry?.code?.alpha2;
  },
);
