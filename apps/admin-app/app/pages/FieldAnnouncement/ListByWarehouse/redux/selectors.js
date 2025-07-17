import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.FIELD_ANNOUNCEMENT.LIST_BY_WAREHOUSE;

export const warehouseAnnouncementsListByWarehouseSelector = {
  getData: state => state[reducerKey]?.warehouseAnnouncementsListByWarehouse?.data,
  getTotal: state => state[reducerKey]?.warehouseAnnouncementsListByWarehouse?.total,
  getIsPending: state => state[reducerKey]?.warehouseAnnouncementsListByWarehouse?.isPending,
};
