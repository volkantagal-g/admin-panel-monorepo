import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  filterLocationWriteOffRequest: {
    statuses: undefined,
    reasons: undefined,
    warehouses: undefined,
    locations: undefined,
    products: undefined,
    createdAt: undefined,
    approvedAt: undefined,
    cancelledAt: undefined,
    rejectedAt: undefined,
    limit: undefined,
    offset: undefined,
  },
  filterLocationWriteOffSuccess: { locationWriteOffs: [], total: 0 },
  filterLocationWriteOffFailure: { error: null },
  getLocationsRequest: { warehouseId: '', isAllowedForWriteOff: true },
  getLocationsSuccess: { data: [] },
  getLocationsFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.LOCATION_WRITE_OFF.LIST}_` });
