export enum PredefinedDateFilterIntervals {
  LAST_7_DAYS = 'LAST_7_DAYS',
  YESTERDAY = 'YESTERDAY',
  TODAY = 'TODAY',
}

export enum DAILY_STATS_STATUSES {
  ON_SITE = 'ON_SITE',
  ON_LEAVE = 'ON_LEAVE',
  REMOTE = 'REMOTE',
  NO_SHOW = 'NO_SHOW',
  NOT_PLANNED = 'NOT_PLANNED',
}

export enum DAILY_STATS_INVITE_STATUSES {
  INVITED = 'INVITED',
  NOT_INVITED = 'NOT_INVITED',
  NOT_PLANNED = 'NOT_PLANNED',
}

export interface IPagination {
  currentPage: number;
  rowsPerPage: number;
}

export interface ISortingObject {
  sortKey: string | null;
  sortDirection: number | null;
}

export const initialTablePagination = {
  // NS wants to show 100 rows per page by default
  rowsPerPage: 100,
  currentPage: 1,
};

export const CHECKIN_CHECKOUT_TYPES = {
  CHECK_IN: 100,
  CHECK_OUT: 200,
  CHECK_IN_OUT: 300,
};

export const DEFAULT_OFFICE_SELECTION = { GETIR_ISTANBUL: 'HQTUXX1001' };

export const MIN_SEARCH_TERM_LENGTH = 3;

export const CSV_DOWNLOAD_MAX_DATE_INTERVAL_IN_DAYS = 30;

export const TRANSACTION_SOURCE_TYPE = {
  TURNGATE: 1,
  VPN: 2,
  QR: 3,
};
