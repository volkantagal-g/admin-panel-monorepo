import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getWarehousesRequest: {
    domainTypes: undefined,
    cities: undefined,
    name: undefined,
    statuses: undefined,
    states: undefined,
    warehouseTypes: undefined,
    SAPReferenceCodes: undefined,
    limit: undefined,
    offset: undefined,
  },
  getWarehousesSuccess: { warehouses: [], totalCount: 0 },
  getWarehousesFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.WAREHOUSE.LIST}_` });
