import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getMarketProductGroupRequest: { id: null },
  getMarketProductGroupSuccess: { data: {} },
  getMarketProductGroupFailure: { error: null },
  updateMarketProductGroupRequest: { id: null, body: null, loadedImage: null, extension: null },
  updateMarketProductGroupSuccess: { data: {} },
  updateMarketProductGroupFailure: { error: null },
  copyMarketProductGroupRequest: { id: null },
  copyMarketProductGroupSuccess: {},
  copyMarketProductGroupFailure: { error: null },
  deleteMarketProductGroupRequest: { id: null },
  deleteMarketProductGroupSuccess: {},
  deleteMarketProductGroupFailure: { error: null },
  getProductsOfProductGroupRequest: { id: null },
  getProductsOfProductGroupSuccess: { data: {} },
  getProductsOfProductGroupFailure: { error: null },
  importProductsOfProductGroupRequest: { loadedFile: null },
  importProductsOfProductGroupSuccess: { data: [] },
  importProductsOfProductGroupFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.MARKET_PRODUCT.GROUP.DETAIL}_` });
