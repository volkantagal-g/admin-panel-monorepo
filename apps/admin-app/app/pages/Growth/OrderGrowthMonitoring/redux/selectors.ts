import { createSelector } from 'reselect';

import { isEmpty } from 'lodash';

import { REDUX_KEY } from '@shared/shared/constants';
import { getCitiesSelector, getFilteredWarehousesSelector } from '@shared/redux/selectors/common';
import { formatOrderGrowthMonitoringCitiesData } from '../cityUtils';
import { formatOrderGrowthMonitoringWarehouseData } from '../warehouseUtils';
import { State } from './reducer';

const reduxKey = REDUX_KEY.LIVE_MONITORING.LIST;

export const refreshPageTimerSelector = { getData: (state: {[reduxKey: string]: State}) => state[reduxKey]?.refreshPageTimer };
export const filtersSelector = { getData: (state: {[reduxKey: string]: State}) => state[reduxKey]?.filters };

// get order operation stats for the country
export const operationStatsSelector = {
  getIsPending: (state: {[reduxKey: string]: State}) => state[reduxKey]?.operationStats?.isPending,
  getData: (state: {[reduxKey: string]: State}) => state[reduxKey]?.operationStats?.data,
};

export const orderGrowthMonitoringDataSelector = {
  getIsPending: (state: {[reduxKey: string]: State}) => state[reduxKey]?.orderGrowthMonitoringData?.isPending,
  getData: createSelector(
    (state: {[reduxKey: string]: State}) => state[reduxKey]?.orderGrowthMonitoringData?.data,
    operationStatsSelector.getData,
    getCitiesSelector.getOperationalCities,
    getFilteredWarehousesSelector.getData,
    (data, operationStatsData, cities, warehouses) => {
      return formatOrderGrowthMonitoringCitiesData({ data, operationStatsData, cities, warehouses });
    },
  ),
};

// order growth monitoring data selector for warehouse breakdown
export const orderGrowthMonitoringDataWithWarehouseStatsSelector = {
  getData: createSelector(
    filtersSelector.getData,
    (state: {[reduxKey: string]: State}) => state[reduxKey]?.orderGrowthMonitoringWarehouseData?.data,
    getFilteredWarehousesSelector.getData,
    (filters, data, warehouses) => {
      let filteredWarehousesByDomainType = warehouses;

      if (!isEmpty(filters?.selectedDomainTypes)) {
        filteredWarehousesByDomainType = warehouses.filter(
          warehouse => warehouse?.domainTypes?.some(domainType => filters?.selectedDomainTypes?.includes(domainType)),
        );
      }

      if (!isEmpty(filters?.selectedWarehouses)) {
        filteredWarehousesByDomainType = warehouses.filter(warehouse => filters?.selectedWarehouses?.includes(warehouse.id));
      }
      const courierStatusCountsWithCourierPlan = data?.courierStatusCounts;
      const cityOperationStats = data?.cityOperationStats;
      const warehouseStats = data?.warehouseData;
      return formatOrderGrowthMonitoringWarehouseData({
        courierStatusCountsWithCourierPlan,
        cityOperationStats,
        warehouseStats,
        warehouses: filteredWarehousesByDomainType,
      });
    },
  ),
  getIsPending: (state: {[reduxKey: string]: State}) => state[reduxKey]?.orderGrowthMonitoringWarehouseData?.isPending,
};

// this selector is used in the table component to determine which data to show based on the city filter
export const tableDataSelector = {
  getData: createSelector(
    filtersSelector.getData,
    orderGrowthMonitoringDataSelector.getData,
    orderGrowthMonitoringDataWithWarehouseStatsSelector.getData,
    (filters, orderGrowthMonitoringData, orderGrowthMonitoringWarehouseData) => {
      if (filters?.selectedCity) {
        return orderGrowthMonitoringWarehouseData;
      }
      return orderGrowthMonitoringData;
    },
  ),
  getTotalCount: createSelector(
    filtersSelector.getData,
    orderGrowthMonitoringDataSelector.getData,
    orderGrowthMonitoringDataWithWarehouseStatsSelector.getData,
    (filters, orderGrowthMonitoringData, orderGrowthMonitoringWarehouseData) => {
      if (filters?.selectedCity) {
        return orderGrowthMonitoringWarehouseData.length;
      }
      return orderGrowthMonitoringData.length;
    },
  ),
};
