import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getCouriersRequest: {
    warehouseIds: undefined,
    status: undefined,
    lastBusyOptionIds: undefined,
  },
  getCouriersSuccess: { couriers: [], totalCount: 0, filter: [] },
  getCouriersFailure: { error: null },
  getBusyReasonsRequest: {},
  getBusyReasonsSuccess: { reasons: [] },
  getBusyReasonsFailure: { error: null },
  setMappedWarehousesSuccess: { mappedWarehouses: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.GETIR_WATER.COURIER_STATUS}_` });
