import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  initPage: null,
  destroyPage: null,
  createWarehouseRequest: { requestBody: {} },
  createWarehouseSuccess: { data: {} },
  createWarehouseFailure: { error: null },
  getSAPDraftWarehousesRequest: null,
  getSAPDraftWarehousesSuccess: { data: [] },
  getSAPDraftWarehousesFailure: { error: null },
}, { prefix: `${REDUX_KEY.WAREHOUSE.NEW}_` });
