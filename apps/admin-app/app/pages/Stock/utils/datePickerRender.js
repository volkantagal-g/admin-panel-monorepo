const datePickerRender = dates => {
  const result = {
    startDate: dates[0],
    endDate: dates[1],
  };
  if (result.startDate?.isoWeekday() > 1) {
    result.startDate.subtract((result.startDate.isoWeekday() - 1), 'day');
  }
  if (result.endDate?.isoWeekday() < 7) {
    result.endDate.add((7 - result.endDate.isoWeekday()), 'day');
  }
  return [result.startDate, result.endDate];
};

export { datePickerRender };
