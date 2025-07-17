import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';
import { DEFAULT_FILTERS, DEFAULT_ROWS_PER_PAGE } from '../constants';

const prefix = `${REDUX_KEY.FINANCE.FILTER}_`;

export const { Types, Creators } = createActions({
  getFinanceOrderFilterRequest: DEFAULT_FILTERS,
  getFinanceOrderFilterSuccess: { data: [] },
  getFinanceOrderFilterFailure: { error: null },
  updateFinanceOrderFilterPagination: { currentPage: 1, rowsPerPage: DEFAULT_ROWS_PER_PAGE },
  updateFinanceOrderFilterValues: DEFAULT_FILTERS,
  initPage: null,
  destroyPage: null,
  setSelectedCity: { city: null },
  setSelectedWarehouse: { warehouse: null },
}, { prefix });
