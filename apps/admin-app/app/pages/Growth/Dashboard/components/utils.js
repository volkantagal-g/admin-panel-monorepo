export const getRowClassName = (classes, index) => {
  return index % 2 === 0 ? classes.tableRowLight : classes.tableRowDark;
};
