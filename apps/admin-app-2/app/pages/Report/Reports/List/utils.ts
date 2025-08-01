import moment from 'moment';

export function getInitialDateRange() {
  return [moment().subtract(1, 'day').startOf('day'), moment()];
}

export const INITIAL_CURSOR = '';
export const ROWS_PER_PAGE = 10;

export function getFormattedRequestData(dates: Date[], isOnlyCreatedByMe: boolean, cursor = INITIAL_CURSOR, limit = ROWS_PER_PAGE) {
  const formatted = {
    startDate: dates[0].toISOString(),
    endDate: dates[1].toISOString(),
    isOnlyCreatedByMe,
    cursor,
    limit,
  };
  return formatted;
}
