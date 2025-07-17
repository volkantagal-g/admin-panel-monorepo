export const sortByColumn = sorter => {
  // sort = columnKey,order
  let { order } = sorter;
  const { columnKey } = sorter;
  if (order === 'ascend') {
    order = 'asc';
  }
  else {
    order = 'desc';
  }
  return `${columnKey},${order}`;
};
