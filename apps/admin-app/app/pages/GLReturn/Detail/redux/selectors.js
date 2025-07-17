import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.GL_RETURN.DETAIL;

export const filtersSelector = { getVehicle: state => state?.[reducerKey]?.filters?.vehicle };

export const selectedDateSelector = { getSelectedDate: state => state?.[reducerKey]?.selectedDate };

export const slotDataSelector = {
  getData: state => state?.[reducerKey]?.slotData?.data,
  getIsPending: state => state?.[reducerKey]?.slotData?.isPending,
};

export const updatedCourierPlanSelector = {
  getData: state => state?.[reducerKey]?.courierPlanData?.data,
  getIsPending: state => state?.[reducerKey]?.courierPlanData?.isPending,
};

export const courierReassignSelector = {
  getData: state => state?.[reducerKey]?.courierReassignData?.data,
  getIsPending: state => state?.[reducerKey]?.courierReassignData?.isPending,
};

export const mappedResultsSelector = {
  getResults: createSelector(
    state => state?.[reducerKey]?.mappedResults?.data,
    state => state?.[reducerKey]?.filters,
    (slotData, filters) => {
      return slotData?.filter(alert => {
        const hasVehicleFilter = filters.vehicleType ? (+filters.vehicleType === alert.vehicleType) : true;

        return hasVehicleFilter;
      });
    },
  ),
};
