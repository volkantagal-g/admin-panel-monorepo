import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.SELECT.WAREHOUSES}_`;

export const { Types, Creators } = createActions({
  getWarehousesRequest: {},
  getWarehousesSuccess: { data: [] },
  getWarehousesFailure: { error: null },
  initContainer: null,
  destroyContainer: null,
}, { prefix });
