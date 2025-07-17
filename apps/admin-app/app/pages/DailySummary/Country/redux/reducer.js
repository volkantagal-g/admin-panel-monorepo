import { createReducer } from 'reduxsauce';
import moment from 'moment-timezone';

import { Types } from './actions';
import { CURRENCY_TYPE, DAILY_SUMMARY_DATE_STEP_UNITS, DAILY_SUMMARY_SORT_TYPE } from '../../constants';
import { DATA_FILTERS, DS_COUNTRY_TABLES } from '../constants';
import { getDateRanges, getDateRangesForMonth, getComputedDateRangeForDateType, getStepInDays, getDayDiff, getInitialDataFilters } from '../../utils';
import GLocalStorage from '@shared/utils/gLocalStorage';

const INITIAL_STATE = {
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
  // to show which date filter used for current data
  lastUsedDateFilter: DATA_FILTERS.dateRange,
  // to show table columns, we don't want live dateRanges
  lastSuccessfulDateRanges: [],
  sortType: DAILY_SUMMARY_SORT_TYPE.VALUE,
  currency: CURRENCY_TYPE.USD,
  dataFilters: {
    [DATA_FILTERS.cities]: null,
    [DATA_FILTERS.countries]: [],
    [DATA_FILTERS.dateRange]: {
      startDate: null,
      endDate: null,
    },
    [DATA_FILTERS.singleDay]: null,
    [DATA_FILTERS.singleMonth]: null,
    [DATA_FILTERS.dateType]: null,
    [DATA_FILTERS.dateCount]: null,
  },
  [DS_COUNTRY_TABLES.countsTable]: {},
  [DS_COUNTRY_TABLES.financialsTable]: {},
  [DS_COUNTRY_TABLES.getirJobs]: {},
  [DS_COUNTRY_TABLES.getirN11]: {},
  [DS_COUNTRY_TABLES.getirKuzeyden]: {},
  [DS_COUNTRY_TABLES.getirFood]: {},
  [DS_COUNTRY_TABLES.getirLocals]: {},
  [DS_COUNTRY_TABLES.getirDrive]: {},
  [DS_COUNTRY_TABLES.getirSelect]: {},
  [DS_COUNTRY_TABLES.gorillas]: {},
  [DS_COUNTRY_TABLES.getirMarketIntegration]: {},
  chartViewStatusMap: {
    [DS_COUNTRY_TABLES.countsTable]: {},
    [DS_COUNTRY_TABLES.financialsTable]: {},
    [DS_COUNTRY_TABLES.getirJobs]: {},
    [DS_COUNTRY_TABLES.getirN11]: {},
    [DS_COUNTRY_TABLES.getirKuzeyden]: {},
    [DS_COUNTRY_TABLES.getirFood]: {},
    [DS_COUNTRY_TABLES.getirLocals]: {},
    [DS_COUNTRY_TABLES.getirDrive]: {},
    [DS_COUNTRY_TABLES.getirSelect]: {},
    [DS_COUNTRY_TABLES.gorillas]: {},
    [DS_COUNTRY_TABLES.getirMarketIntegration]: {},
  },
  activeDomainTypes: {
    isPending: true,
    data: {},
  },
  activeIntegrationTypes: {
    isPending: true,
    data: {},
  },
};

const chartViewStatusLS = new GLocalStorage({
  key: 'SUMMARY_QUICK_COUNTRY_CHART_VIEW_STATUSES',
  defaultValue: INITIAL_STATE.chartViewStatusMap,
});

const getCountryDailySummaryDataRequest = (state = INITIAL_STATE, { config, tableKey }) => {
  const { dataKey, expandDataKeys = [] } = config;

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

  expandDataKeys.forEach(expandKey => {
    delete newState[tableKey][expandKey];
  });
  return newState;
};

const getCountryDailySummaryDataSuccess = (state = INITIAL_STATE, { config, tableKey, data }) => {
  const { dataKey, expandDataKeys = [] } = config;

  const resettedExpandDatas = {};

  // if we reset top level row data, its expand data should also reset
  expandDataKeys.forEach(expandKey => {
    resettedExpandDatas[expandKey] = undefined;
  });

  return {
    ...state,
    [tableKey]: {
      ...state[tableKey],
      ...resettedExpandDatas,
      [dataKey]: {
        ...state[tableKey]?.[dataKey],
        data,
        isPending: false,
        error: null,
      },
    },
  };
};

const getCountryDailySummaryDataFailure = (state = INITIAL_STATE, { config, tableKey, error }) => {
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
  const { dataFilters } = state;
  const dateCount = state.dataFilters[DATA_FILTERS.dateCount];

  // when we change one filter, we should reset others so their previous value can trigger onChange
  // otherwise, if we pick a month "January" and then pick a day, after that we can't re-pick "January"
  // since it's value was "January", onChange doesn't trigger
  let otherFieldsResetToInitial = {};

  const restrictedFieldsToStateReset = new Set([DATA_FILTERS.dateCount, DATA_FILTERS.cities, DATA_FILTERS.countries]);
  if (!restrictedFieldsToStateReset.has(filterKey)) {
    otherFieldsResetToInitial = getInitialDataFilters({
      now: currentTime,
      isResetting: true,
      filterDataKeys: DATA_FILTERS,
    });
  }

  switch (filterKey) {
    case DATA_FILTERS.cities:
      dataFilters[DATA_FILTERS.cities] = filterValue;
      break;
    case DATA_FILTERS.countries:
      dataFilters[DATA_FILTERS.countries] = filterValue;
      break;
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

const setSortType = (state = INITIAL_STATE, { sortType }) => {
  return {
    ...state,
    sortType,
  };
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

const setChartViewStatus = (state = INITIAL_STATE, { tableKey, rowDataKey, isChecked }) => {
  const updatedState = {
    ...state,
    chartViewStatusMap: {
      ...state.chartViewStatusMap,
      [tableKey]: {
        ...state.chartViewStatusMap[tableKey],
        [rowDataKey]: isChecked,
      },
    },
  };

  chartViewStatusLS.setItem({ value: updatedState.chartViewStatusMap });
  return updatedState;
};

const getActiveDomainTypesConfigRequest = (state = INITIAL_STATE, { data = {} }) => ({
  ...state,
  activeDomainTypes: {
    isPending: true,
    data,
  },
});
const getActiveDomainTypesConfigSuccess = (state = INITIAL_STATE, { data = {} }) => ({
  ...state,
  activeDomainTypes: {
    isPending: false,
    data,
  },
});

const getActiveIntegrationTypesConfigRequest = (state = INITIAL_STATE, { data = {} }) => ({
  ...state,
  activeIntegrationTypes: {
    isPending: true,
    data,
  },
});

const getActiveIntegrationTypesConfigSuccess = (state = INITIAL_STATE, { data = {} }) => ({
  ...state,
  activeIntegrationTypes: {
    isPending: false,
    data,
  },
});

const init = (state = INITIAL_STATE, { initialDataFilters }) => {
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
  const chartViewStatusMap = {
    ...INITIAL_STATE.chartViewStatusMap,
    ...chartViewStatusLS.getItem(),
  };

  return {
    ...state,
    computedDateRanges,
    computedDateRange,
    computedStepAmount,
    computedStepUnit,
    dataRefreshTimestamp,
    lastUsedDateFilter,
    chartViewStatusMap,
    dataFilters: initialDataFilters,
  };
};

const destroy = () => {
  return { ...INITIAL_STATE };
};

const HANDLERS = {
  [Types.GET_COUNTRY_DAILY_SUMMARY_DATA_REQUEST]: getCountryDailySummaryDataRequest,
  [Types.GET_COUNTRY_DAILY_SUMMARY_DATA_SUCCESS]: getCountryDailySummaryDataSuccess,
  [Types.GET_COUNTRY_DAILY_SUMMARY_DATA_FAILURE]: getCountryDailySummaryDataFailure,
  [Types.TRIGGER_DATA_REFRESH]: triggerDataRefresh,
  [Types.SET_DATA_FILTER]: setDataFilter,
  [Types.SET_SORT_TYPE]: setSortType,
  [Types.SET_CURRENCY]: setCurrency,
  [Types.SET_LAST_SUCCESSFUL_DATE_RANGES]: setLastSuccessfulDateRanges,
  [Types.SET_CHART_VIEW_STATUS]: setChartViewStatus,
  [Types.GET_ACTIVE_DOMAIN_TYPES_CONFIG_REQUEST]: getActiveDomainTypesConfigRequest,
  [Types.GET_ACTIVE_DOMAIN_TYPES_CONFIG_SUCCESS]: getActiveDomainTypesConfigSuccess,
  [Types.GET_ACTIVE_INTEGRATION_TYPES_CONFIG_REQUEST]: getActiveIntegrationTypesConfigRequest,
  [Types.GET_ACTIVE_INTEGRATION_TYPES_CONFIG_SUCCESS]: getActiveIntegrationTypesConfigSuccess,
  [Types.INIT_PAGE]: init,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
