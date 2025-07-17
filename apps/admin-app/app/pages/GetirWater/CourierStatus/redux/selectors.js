import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.GETIR_WATER.COURIER_STATUS;

export const couriersSelector = {
  getData: state => state?.[reducerKey]?.couriers?.data,
  getTotal: state => state?.[reducerKey]?.couriers?.totalCount,
  getIsPending: state => state?.[reducerKey]?.couriers?.isPending,
};

export const busyReasonsSelector = {
  getData: state => state?.[reducerKey]?.reasons?.data,
  getTotal: state => state?.[reducerKey]?.reasons?.totalCount,
  getIsPending: state => state?.[reducerKey]?.reasons?.isPending,
};

export const mappedWarehousesSelector = { getData: state => state?.[reducerKey]?.mappedWarehouses };
