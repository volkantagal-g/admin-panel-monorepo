import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getShopCurrentPaybackStatusRequest: { partnerId: null },
  getShopCurrentPaybackStatusSuccess: { data: {} },
  getShopCurrentPaybackStatusFailure: { error: null },
  updateShopPaybackStatusRequest: { partnerId: null, data: null },
  updateShopPaybackStatusSuccess: null,
  updateShopPaybackStatusFailure: { error: null },
  updateAllShopsPaybackStatusRequest: { data: null },
  updateAllShopsPaybackStatusSuccess: null,
  updateAllShopsPaybackStatusFailure: { error: null },
  updatePartialShopsPaybackStatusRequest: { data: null },
  updatePartialShopsPaybackStatusSuccess: null,
  updatePartialShopsPaybackStatusFailure: { error: null },
  validatePartialShopsPaybackStatusRequest: { file: null, onSuccess: null, onError: null },
  validatePartialShopsPaybackStatusSuccess: null,
  validatePartialShopsPaybackStatusFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.GL_SHOP_PAYBACK_STATUS}_` });
