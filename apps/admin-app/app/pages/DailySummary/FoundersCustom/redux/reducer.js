import { createReducer } from 'reduxsauce';
import moment from 'moment-timezone';

import { Types } from './actions';
import { CURRENCY_TYPE, DAILY_SUMMARY_DATE_STEP_UNITS, DAILY_SUMMARY_SORT_TYPE } from '../../constants';
import { DATA_FILTERS, DS_GLOBAL_TABLES, DEFAULT_DATE_COUNT } from '../constants';
import { getDateRanges, getDateRangesForMonth, getComputedDateRangeForDateType, getStepInDays, getDayDiff, getInitialDataFilters } from '../../utils';

export const INITIAL_STATE = {
  // keep track of different dataFilters' computed values
  computedDateRanges: [],
  computedDateRange: {
    startDate: null,
    endDate: null,
  },
  computedStepAmount: null,
  computedStepUnit: null,
  // some dataFilters don't refresh data immediately
  // any filter triggering data refresh, will update this timestamp
  dataRefreshTimestamp: null,
  firstDataFetchTimestamp: null,
  // to show which date filter used for current data
  lastUsedDateFilter: DATA_FILTERS.dateRange,
  // to show table columns, we don't want live dateRanges
  lastSuccessfulDateRanges: [],
  sortType: DAILY_SUMMARY_SORT_TYPE.VALUE,
  currency: CURRENCY_TYPE.USD,
  dataFilters: {
    [DATA_FILTERS.dateRange]: {
      startDate: null,
      endDate: null,
    },
    [DATA_FILTERS.singleDay]: null,
    [DATA_FILTERS.singleMonth]: null,
    [DATA_FILTERS.dateType]: null,
    [DATA_FILTERS.dateCount]: null,
  },
  [DS_GLOBAL_TABLES.getirMarketOrderNetRevenueGMVTable]: {},
};

const getGlobalDailySummaryDataRequest = (state = INITIAL_STATE, { config, tableKey }) => {
  const { dataKey } = config;

  const newState = {
    ...state,
    [tableKey]: {
      ...state[tableKey],
      [dataKey]: {
        ...state[tableKey]?.[dataKey],
        isPending: true,
      },
    },
  };

  return newState;
};

const getGlobalDailySummaryDataSuccess = (state = INITIAL_STATE, { config, tableKey, data }) => {
  const { dataKey } = config;

  return {
    ...state,
    ...(!state.firstDataFetchTimestamp && { firstDataFetchTimestamp: moment().valueOf() }),
    [tableKey]: {
      ...state[tableKey],
      [dataKey]: {
        ...state[tableKey]?.[dataKey],
        data,
        isPending: false,
        error: null,
      },
    },
  };
};

const getGlobalDailySummaryDataFailure = (state = INITIAL_STATE, { config, tableKey, error }) => {
  const { dataKey } = config;

  return {
    ...state,
    [tableKey]: {
      ...state[tableKey],
      [dataKey]: {
        ...state[tableKey]?.[dataKey],
        isPending: false,
        error,
      },
    },
  };
};

const triggerDataRefresh = (state = INITIAL_STATE, { currentTime }) => {
  return {
    ...state,
    dataRefreshTimestamp: currentTime.valueOf(),
  };
};

const setDataFilter = (state = INITIAL_STATE, { filterKey, filterValue, currentTime }) => {
  let { computedDateRanges, computedDateRange, computedStepAmount, computedStepUnit, lastUsedDateFilter, dataRefreshTimestamp } = state;
  const dateCount = state.dataFilters[DATA_FILTERS.dateCount];

  // when we change one filter, we should reset others so their previous value can trigger onChange
  // otherwise, if we pick a month "January" and then pick a day, after that we can't re-pick "January"
  // since it's value was "January", onChange doesn't trigger
  let otherFieldsResetToInitial = {};

  if (filterKey !== DATA_FILTERS.dateCount) {
    otherFieldsResetToInitial = getInitialDataFilters({
      now: currentTime,
      isResetting: true,
      filterDataKeys: DATA_FILTERS,
    });
  }

  switch (filterKey) {
    case DATA_FILTERS.dateRange:
      {
        const { startDate, endDate } = filterValue;
        computedDateRange = {
          startDate: startDate.clone().startOf('day'),
          endDate: endDate.clone().endOf('day'),
        };
        const dayDiff = getDayDiff(computedDateRange.startDate, computedDateRange.endDate);
        computedStepAmount = getStepInDays(dayDiff);
        computedStepUnit = DAILY_SUMMARY_DATE_STEP_UNITS.days;
        computedDateRanges = getDateRanges({
          initialDateRange: computedDateRange,
          stepAmount: computedStepAmount,
          stepCount: dateCount,
          stepUnit: computedStepUnit,
        });
        lastUsedDateFilter = DATA_FILTERS.dateRange;
      }
      break;
    case DATA_FILTERS.singleDay:
      {
        const newSingleDay = filterValue;
        computedDateRange = {
          startDate: moment(newSingleDay).startOf('day'),
          endDate: moment(newSingleDay).endOf('day'),
        };
        computedStepAmount = getStepInDays(1);
        computedStepUnit = DAILY_SUMMARY_DATE_STEP_UNITS.days;
        computedDateRanges = getDateRanges({
          initialDateRange: computedDateRange,
          stepAmount: computedStepAmount,
          stepCount: dateCount,
          stepUnit: computedStepUnit,
        });
        lastUsedDateFilter = DATA_FILTERS.singleDay;
        dataRefreshTimestamp = currentTime.valueOf();
      }
      break;
    case DATA_FILTERS.singleMonth:
      {
        const newSingleMonth = filterValue;
        computedDateRange = {
          startDate: moment(newSingleMonth).startOf('month'),
          endDate: moment(newSingleMonth).endOf('month'),
        };
        computedStepUnit = DAILY_SUMMARY_DATE_STEP_UNITS.months;
        computedStepAmount = 1;
        computedDateRanges = getDateRangesForMonth({
          initialDateRange: computedDateRange,
          stepAmount: computedStepAmount,
          stepCount: dateCount,
          stepUnit: computedStepUnit,
        });
        dataRefreshTimestamp = currentTime.valueOf();
        lastUsedDateFilter = DATA_FILTERS.singleMonth;
      }
      break;
    case DATA_FILTERS.dateType:
      {
        const newDateType = filterValue;
        const { startDate, endDate } = getComputedDateRangeForDateType(newDateType, moment(currentTime).startOf('day'));
        computedDateRange = { startDate, endDate };
        const dayDiff = getDayDiff(startDate, endDate);
        computedStepAmount = getStepInDays(dayDiff);
        computedStepUnit = DAILY_SUMMARY_DATE_STEP_UNITS.days;
        computedDateRanges = getDateRanges({
          initialDateRange: computedDateRange,
          stepAmount: computedStepAmount,
          stepCount: dateCount,
          stepUnit: computedStepUnit,
        });
        dataRefreshTimestamp = currentTime.valueOf();
        lastUsedDateFilter = DATA_FILTERS.dateType;
      }
      break;
    case DATA_FILTERS.dateCount:
      computedDateRanges = getDateRanges({
        initialDateRange: computedDateRange,
        stepAmount: computedStepAmount,
        stepCount: filterValue,
        stepUnit: computedStepUnit,
      });
      break;
    default:
      // eslint-disable-next-line no-console
      console.warn('Invalid data filter key, default switch case in reducer!');
      return state;
  }

  const newState = {
    ...state,
    computedDateRanges,
    computedDateRange,
    computedStepAmount,
    computedStepUnit,
    dataRefreshTimestamp,
    lastUsedDateFilter,
    dataFilters: {
      ...state.dataFilters,
      ...otherFieldsResetToInitial,
      [filterKey]: filterValue,
    },
  };
  return newState;
};

const setCurrency = (state = INITIAL_STATE, { currency }) => {
  return {
    ...state,
    currency,
  };
};

const setLastSuccessfulDateRanges = (state = INITIAL_STATE, { dateRanges }) => {
  // multiple requests trying to update this, we don't need to update if it is already same
  if (dateRanges === state.lastSuccessfulDateRanges) {
    return state;
  }
  return {
    ...state,
    lastSuccessfulDateRanges: dateRanges,
  };
};

const init = (state = INITIAL_STATE) => {
  const initialDataFilters = getInitialDataFilters({
    now: moment(),
    filterDataKeys: DATA_FILTERS,
    defaultDateCount: DEFAULT_DATE_COUNT,
  });
  // initial computation is done via dateRange and dateCount values
  const dateRange = initialDataFilters[DATA_FILTERS.dateRange];
  const dateCount = initialDataFilters[DATA_FILTERS.dateCount];
  const { startDate, endDate } = dateRange;
  const dayDiff = getDayDiff(startDate, endDate);
  const computedStepAmount = getStepInDays(dayDiff);
  const computedStepUnit = DAILY_SUMMARY_DATE_STEP_UNITS.days;
  const computedDateRanges = getDateRanges({
    initialDateRange: dateRange,
    stepAmount: computedStepAmount,
    stepCount: dateCount,
    stepUnit: computedStepUnit,
  });
  const computedDateRange = dateRange;
  const lastUsedDateFilter = DATA_FILTERS.dateRange;
  // initial page render should fetch data
  const dataRefreshTimestamp = startDate.valueOf();

  return {
    ...state,
    computedDateRanges,
    computedDateRange,
    computedStepAmount,
    computedStepUnit,
    dataRefreshTimestamp,
    lastUsedDateFilter,
    firstDataFetchTimestamp: null,
    dataFilters: initialDataFilters,
  };
};

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_GLOBAL_DAILY_SUMMARY_DATA_REQUEST]: getGlobalDailySummaryDataRequest,
  [Types.GET_GLOBAL_DAILY_SUMMARY_DATA_SUCCESS]: getGlobalDailySummaryDataSuccess,
  [Types.GET_GLOBAL_DAILY_SUMMARY_DATA_FAILURE]: getGlobalDailySummaryDataFailure,
  [Types.TRIGGER_DATA_REFRESH]: triggerDataRefresh,
  [Types.SET_DATA_FILTER]: setDataFilter,
  [Types.SET_CURRENCY]: setCurrency,
  [Types.SET_LAST_SUCCESSFUL_DATE_RANGES]: setLastSuccessfulDateRanges,
  [Types.INIT_PAGE]: init,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
