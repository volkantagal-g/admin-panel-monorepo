import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.POLYGON.MAP;

export const polygonsMapSelector = {
  getData: state => state?.[reducerKey]?.polygons?.data,
  getMapOptions: state => state?.[reducerKey]?.mapOptions,
  getFilters: state => state?.[reducerKey]?.filters,
  getGorillasWarehouses: state => state?.[reducerKey]?.gorillasWarehouses?.data,
  getDeliveryFeeConfig: state => state?.[reducerKey]?.deliveryFeeConfig?.data,
};
