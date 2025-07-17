import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getBrandsRequest: { limit: 10, offset: 0, name: '', status: undefined },
  getBrandsSuccess: { data: [] },
  getBrandsFailure: { error: null },
  initPage: null,
  setFilterOptions: { selectedStatuses: [] },
  destroyPage: null,
}, { prefix: `${REDUX_KEY.BRAND.LIST}_` });
