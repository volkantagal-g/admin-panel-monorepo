import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  initPage: null,
  destroyPage: null,
  createLocationWriteOffRequest: { requestBody: {} },
  createLocationWriteOffSuccess: { data: {} },
  createLocationWriteOffFailure: { error: null },
  getLocationsRequest: { warehouseId: '', isAllowedForWriteOff: true, states: [] },
  clearProducts: null,
  getLocationsSuccess: { data: [] },
  getLocationsFailure: { error: null },
  getProductsRequest: { productIds: [], warehouseId: '', locationBarcodes: [] },
  getProductsSuccess: { data: [] },
  getProductsFailure: { error: null },
}, { prefix: `${REDUX_KEY.LOCATION_WRITE_OFF.NEW}_` });
