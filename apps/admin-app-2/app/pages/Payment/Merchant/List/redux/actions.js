import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';
import { INIT_FILTERS } from '../constants';

const prefix = `${REDUX_KEY.MERCHANTS.LIST}_`;

export const { Types, Creators } = createActions({
  getMerchantListRequest: { body: null },
  getMerchantListSuccess: { data: [] },
  getMerchantListFailure: { error: null },
  setFilters: { filters: {} },
  setPagination: { currentPage: INIT_FILTERS.currentPage, rowsPerPage: INIT_FILTERS.rowsPerPage },
  initPage: null,
  destroyPage: null,
}, { prefix });
