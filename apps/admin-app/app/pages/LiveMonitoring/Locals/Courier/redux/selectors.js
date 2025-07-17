import { createSelector } from 'reselect';
import { isEmpty } from 'lodash';

import { createMap } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

import {
  formatCourierPlanAndCountsData,
  formatCourierPlanAndCountsTableData,
  formatCourierPlanAndCountsTableDataByCities,
  isDedicatedLocalsWarehouse,
} from './utils';
import { SELECTABLE_VEHICLE_TYPES } from '../constants';

const reducerKey = REDUX_KEY.LIVE_MONITORING.LOCALS.COURIER;
const commonReducerKey = REDUX_KEY.COMMON;

export const getCourierPlanAndCountsTableData = {
  getData: ({ selectedCity }) => {
    return createSelector(
      state => state?.[reducerKey]?.courierPlanAndCounts,
      state => state?.[commonReducerKey]?.getActiveWarehouses,
      state => state?.[commonReducerKey]?.getCities,
      state => state?.[reducerKey]?.filters,
      (
        { data: courierPlanAndCounts },
        { data: warehousesState },
        { data: citiesData },
        { selectedVehicleTypes },
      ) => {
        if (
          isEmpty(courierPlanAndCounts) ||
          !warehousesState?.length ||
          !citiesData?.length
        ) {
          return null;
        }
        const dedicatedLocalsWarehouses = warehousesState?.filter(isDedicatedLocalsWarehouse);

        const formattedCourierPlanAndCounts = formatCourierPlanAndCountsData({
          data: courierPlanAndCounts,
          warehouses: dedicatedLocalsWarehouses,
        });

        if (isEmpty(formattedCourierPlanAndCounts)) return null;

        const cities = createMap(citiesData);
        const dedicatedLocalsWarehousesMap = createMap(dedicatedLocalsWarehouses);

        const formatableSelectedVehicleTypes = selectedVehicleTypes?.length
          ? selectedVehicleTypes
          : SELECTABLE_VEHICLE_TYPES;

        if (selectedCity) {
          if (!formattedCourierPlanAndCounts[selectedCity]) return null;
          return formatCourierPlanAndCountsTableDataByCities({
            data: formattedCourierPlanAndCounts[selectedCity].warehouses,
            warehouses: dedicatedLocalsWarehousesMap,
            selectedVehicleTypes: formatableSelectedVehicleTypes,
          });
        }

        return formatCourierPlanAndCountsTableData({
          data: formattedCourierPlanAndCounts,
          cities,
          selectedVehicleTypes: formatableSelectedVehicleTypes,
        });
      },
    );
  },
  getIsPending: createSelector(
    state => state?.[reducerKey]?.courierPlanAndCounts,
    state => state?.[commonReducerKey]?.getFilteredWarehouses,
    state => state?.[commonReducerKey]?.getCities,
    (
      { isPending: isCourierPlanAndCountsPending },
      { isPending: isWarehousesPending },
      { isPending: isCitiesPending },
    ) => {
      return isCourierPlanAndCountsPending || isWarehousesPending || isCitiesPending;
    },
  ),
};

export const getSelectedVehicleTypes = createSelector(
  state => state?.[reducerKey]?.filters,
  ({ selectedVehicleTypes }) => selectedVehicleTypes,
);
