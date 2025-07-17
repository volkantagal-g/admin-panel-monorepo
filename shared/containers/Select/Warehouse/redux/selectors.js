import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.SELECT.WAREHOUSES;

export const getWarehousesSelector = {
  getData: state => state[reducerKey]?.warehouses.data || [],
  getIsPending: state => state[reducerKey]?.warehouses.isPending,
};
