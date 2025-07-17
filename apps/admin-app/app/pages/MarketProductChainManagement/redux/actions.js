import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  initPage: null,
  destroyPage: null,
  setAddPlatformModalOpen: ['isOpen'],
  fetchModalCentralWarehousesRequest: null,
  fetchModalCentralWarehousesSuccess: ['centralWarehouses'],
  fetchModalCentralWarehousesFailure: ['error'],
  createPlatformRequest: ['request'],
  createPlatformSuccess: ['data'],
  createPlatformFailure: ['error'],
}, { prefix: `${REDUX_KEY.MARKET_PRODUCT_CHAIN_MANAGEMENT.ROOT}_` });
