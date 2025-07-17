import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.SELECT.MARKET_PRODUCT_BRAND}_`;

export const { Types, Creators } = createActions({
  getBrandsRequest: { limit: 10, offset: 0, name: '', status: undefined, fields: undefined },
  getBrandsSuccess: { data: [] },
  getBrandsFailure: { error: null },
  clearBrands: null,
  initContainer: null,
  destroyContainer: null,
}, { prefix });
