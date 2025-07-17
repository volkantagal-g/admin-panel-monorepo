import {
  COURIER_STATUS_BUSY,
  REDUX_KEY,
} from '@shared/shared/constants';
import { createCourierMarkerFeature } from '@shared/utils/yandexMaps';
import { getFormattedCouriersAndCalculatedStats, getFormattedSelectedPlaceMark } from '@app/pages/Warehouse/LiveMap/utils';

const reduxKey = REDUX_KEY.WAREHOUSE.LIVE_MAP;

export const filtersSelector = { getFilters: state => state[reduxKey]?.filters };
export const selectedPlaceMarkSelector = {
  getData: state => state[reduxKey]?.selectedPlaceMark,
  getFormattedTableData: state => getFormattedSelectedPlaceMark(state[reduxKey]?.selectedPlaceMark),
};

export const warehouseSelector = {
  getIsPending: state => state[reduxKey]?.warehouse.isPending,
  getData: state => state[reduxKey]?.warehouse.data,
  getPickers: state => {
    return state[reduxKey]?.warehouse.data.pickers?.filter(picker => picker.isLoggedIn);
  },
};

export const polygonsSelector = {
  getIsPending: state => state[reduxKey]?.polygons.isPending,
  getData: state => state[reduxKey]?.polygons.data,
};

export const couriersSelector = {
  getIsPending: state => state[reduxKey]?.couriers.isPending,
  getDataWithStatusStats: state => {
    const couriers = state[reduxKey]?.couriers.data;
    return getFormattedCouriersAndCalculatedStats(couriers);
  },
  getMarkerFeatures: state => {
    const couriers = state[reduxKey]?.couriers.data;
    const { showCouriers } = filtersSelector.getFilters(state);
    const features = [];
    couriers.forEach(courier => {
      if (!showCouriers.showBusyCouriers && courier.status === COURIER_STATUS_BUSY) {
        return undefined;
      }

      const feature = createCourierMarkerFeature(courier, { hintContentKey: 'name' });
      features.push(feature);

      return undefined;
    });

    return features;
  },
};
