export const formatDateRangeValues = dateRange => {
  return {
    begin: dateRange[0].format('YYYY-MM-DD'),
    end: dateRange[1].format('YYYY-MM-DD'),
  };
};
