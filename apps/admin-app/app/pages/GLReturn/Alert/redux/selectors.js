import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.GL_RETURN.ALERT;

export const filtersSelector = {
  getCity: state => state?.[reducerKey]?.filters?.city,
  getAlertType: state => state?.[reducerKey]?.filters?.alertMessage,
  getWarehouse: state => state?.[reducerKey]?.filters?.warehouse,
};

export const alertDataSelector = {
  getData: state => state?.[reducerKey]?.alertData?.data,
  getIsPending: state => state?.[reducerKey]?.alertData?.isPending,
};

export const alertResolveDataSelector = {
  getData: state => state?.[reducerKey]?.alertResolveData?.data,
  getIsPending: state => state?.[reducerKey]?.alertResolveData?.isPending,
};

export const mappedResultsSelector = {
  getResults: createSelector(
    state => state?.[reducerKey]?.mappedResults?.data,
    state => state?.[reducerKey]?.filters,
    (alertData, filters) => {
      return alertData.filter(alert => {
        const hasCityFilter = filters.city ? (filters.city === alert.warehouseCityId) : true;
        const hasWarehouseFilter = filters.warehouse ? (filters.warehouse === alert.warehouseId) : true;
        const hasAlertTypeFilter = filters.alertMessage ? (filters.alertMessage === alert.category) : true;
        return hasCityFilter && hasWarehouseFilter && hasAlertTypeFilter;
      });
    },
  ),
};
