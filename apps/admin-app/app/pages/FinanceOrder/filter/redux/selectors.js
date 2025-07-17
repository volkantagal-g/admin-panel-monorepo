import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.FINANCE.FILTER;

export const financeOrderFilterSelector = {
  getIsPending: state => state[reduxKey].financeOrderFilter.isPending,
  getData: state => state[reduxKey]?.financeOrderFilter.data,
  getPageCount: state => state[reduxKey]?.financeOrderFilter.filters.currentPage,
  getItemPerPage: state => state[reduxKey]?.financeOrderFilter.filters.rowsPerPage,
  getFilters: state => state[reduxKey]?.financeOrderFilter.filters,
  getPagination: state => state[reduxKey]?.financeOrderFilter.pagination,
  getTotalCount: state => state[reduxKey]?.financeOrderFilter.totalCount,
};
