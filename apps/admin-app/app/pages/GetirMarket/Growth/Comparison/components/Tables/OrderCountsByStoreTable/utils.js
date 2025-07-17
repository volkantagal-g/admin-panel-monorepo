export function calculateOrderCountDiff({ row, formattedStartDateRange, formattedEndRange }) {
  const minuend = row[`${formattedEndRange}_orderCount`] || 0;
  const subtrahend = row[`${formattedStartDateRange}_orderCount`] || 0;

  return minuend - subtrahend;
}
