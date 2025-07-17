type Pagination = {
  currentPage: number;
  rowsPerPage: number;
}

export const INITIAL_PAGINATION: Pagination = { currentPage: 1, rowsPerPage: 50 };
