export const getPaymentDetailsAPIPayload = ({
  currentPage,
  rowsPerPage,
  ...filters
}) => ({
  ...filters,
  skip: (currentPage - 1) * rowsPerPage,
  limit: rowsPerPage,
});
