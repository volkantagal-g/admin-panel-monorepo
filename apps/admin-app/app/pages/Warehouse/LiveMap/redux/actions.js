import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.WAREHOUSE.LIVE_MAP}_`;

export const { Types, Creators } = createActions({
  getWarehouseRequest: { id: null },
  getWarehouseSuccess: { data: {} },
  getWarehouseFailure: { error: null },
  getPolygonsRequest: { id: null },
  getPolygonsSuccess: { data: {} },
  getPolygonsFailure: { error: null },
  getWarehouseCouriersSuccess: { data: [] },
  getWarehouseCouriersFailure: { error: null },
  startCouriersRefreshLogic: null,
  stopCouriersRefreshLogic: null,
  setSelectedPlaceMark: { data: {}, eventType: null },
  setFilterParams: { filterParams: {} },
  initPage: null,
  destroyPage: null,
}, { prefix });
