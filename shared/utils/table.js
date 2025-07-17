export const createSortObject = (sortKey, direction) => {
  let sortDirection = null;
  if (direction === 'descend') {
    sortDirection = -1;
  }
  else if (direction === 'ascend') {
    sortDirection = 1;
  }

  return { sortKey, sortDirection };
};

export const getPaginatedData = (data = [], currentPage, rowsPerPage) => {
  return data?.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
};
