import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  createBrandRequest: { body: null },
  createBrandSuccess: { data: [] },
  createBrandFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.BRAND.NEW}_` });
