import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getBrandRequest: { id: null },
  getBrandSuccess: { data: {} },
  getBrandFailure: { error: null },
  updateBrandRequest: { id: null, updateData: {} },
  updateBrandSuccess: {},
  updateBrandFailure: { error: null },
  activateBrandRequest: { id: null },
  activateBrandSuccess: {},
  activateBrandFailure: { error: null },
  deactivateBrandRequest: { id: null },
  deactivateBrandSuccess: {},
  deactivateBrandFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.BRAND.DETAIL}_` });
