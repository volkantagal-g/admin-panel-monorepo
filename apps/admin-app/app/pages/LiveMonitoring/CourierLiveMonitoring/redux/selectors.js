import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';
import { getTableData } from '../utils';
import { getCitiesSelector, getFilteredWarehousesSelector } from '@shared/redux/selectors/common';

const reducerKey = REDUX_KEY.LIVE_MONITORING.COURIER_LIVE_MONITORING;

export const filtersSelector = state => state[reducerKey]?.filters;

export const courierStatusDataSelector = {
  getData: createSelector(
    getFilteredWarehousesSelector.getData,
    getCitiesSelector?.getOperationalCities,
    state => state[reducerKey]?.courierStatusData?.data,
    state => state[reducerKey]?.filters?.selectedCity,
    (warehouseData, cities = [], courierStatusData, selectedCity = null) => {
      return getTableData(cities, warehouseData, courierStatusData, selectedCity);
    },
  ),
  getIsPending: createSelector(
    courierStatusData => {
      return getStateObject(courierStatusData, reducerKey, 'courierStatusData');
    },
    ({ isPending }) => isPending,
  ),
};

export const filteredData = createSelector(
  courierStatusDataSelector.getData,
  filtersSelector,
  (data, filters) => {
    const filteredCourierData = data.filter(item => {
      if (filters?.domainType && !(item?.domainTypes?.includes(filters?.domainType))) {
        return false;
      }
      if (filters?.selectedWarehouse && !(item?.firstColumn?.id === filters?.selectedWarehouse)) {
        return false;
      }
      if (filters?.selectedVehicleType && !(item?.vehicleTypes?.[filters?.selectedVehicleType]?.total?.total)) {
        return false;
      }
      return true;
    });
    let formattedCourierData = filteredCourierData;
    if (filters?.selectedVehicleType) {
      formattedCourierData = formattedCourierData.map(item => {
        const selectedVehicleType = item?.vehicleTypes?.[filters?.selectedVehicleType]?.total || {};
        const planned = selectedVehicleType.planned || 0;
        const total = selectedVehicleType.total || 0;
        return {
          ...item,
          onOrder: selectedVehicleType.onOrder || 0,
          busy: selectedVehicleType.busy || 0,
          differenceBetweenRealizedAndPlanned: total - planned,
          idle: selectedVehicleType.free || 0,
          planned,
          realized: total,
          returning: selectedVehicleType.returning || 0,
          utilization: selectedVehicleType.utilization || 0,
        };
      });
    }
    return formattedCourierData;
  },
);

// filter warehouse names
export const getOperationDataWarehouseNames = createSelector(
  courierStatusDataSelector.getData,
  data => {
    const warehouseNames = [];
    // filter total row, its id is empty
    data?.map(item => item?.firstColumn).forEach(item => {
      if (item?.id) {
        warehouseNames.push({ label: item?.name, value: item?.id });
      }
    });
    return warehouseNames;
  },
);
