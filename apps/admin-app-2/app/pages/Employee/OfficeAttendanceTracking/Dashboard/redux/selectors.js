import moment from 'moment';
import { createSelector } from 'reselect';

/* eslint-disable object-curly-newline */
import { REDUX_KEY } from '@shared/shared/constants';
import { filterSingleDayDailyStats } from '../utils';

const reduxKey = REDUX_KEY.EMPLOYEE.OFFICE_ATTENDANCE_TRACKING.DASHBOARD;

export const filtersSelector = {
  getData: state => state[reduxKey]?.filters,
  getCommonFilters: state => state[reduxKey]?.filters?.commonFilters,
  getTableFilters: state => state[reduxKey]?.filters?.tableFilters,
  getIsToday: state => state[reduxKey]?.filters?.isToday,
  getIsSingleDay: state => state[reduxKey]?.filters?.isSingleDay,
  getTablePagination: state => state[reduxKey]?.filters?.tablePagination,
  getSortOptions: state => state[reduxKey]?.filters?.sort,
};

export const officeAttendanceTrackingGetStatisticDailyStatsSummarySelector = {
  getIsPending: state => state[reduxKey]?.officeAttendanceTrackingGetStatisticDailyStatsSummary?.isPending,
  getData: state => state[reduxKey]?.officeAttendanceTrackingGetStatisticDailyStatsSummary?.data,
};

export const officeAttendanceTrackingSingleDayRecordsSelector = {
  getIsPending: state => state[reduxKey]?.officeAttendanceTrackingSingleDayRecords?.isPending,
  getData: state => state[reduxKey]?.officeAttendanceTrackingSingleDayRecords?.data,
};

export const officeAttendanceTrackingTableSelector = {
  getFilteredAndPaginatedData: createSelector(
    state => state[reduxKey]?.officeAttendanceTrackingSingleDayRecords,
    state => state[reduxKey]?.officeAttendanceTrackingMultipleDayRecords,
    filtersSelector.getCommonFilters,
    filtersSelector.getTableFilters,
    filtersSelector.getSortOptions,
    filtersSelector.getTablePagination,
    filtersSelector.getIsSingleDay,
    (
      { data: singleDayData = [] } = {},
      { data: multipleDayData = [] } = {},
      commonFilters,
      tableFilters,
      sortOptions,
      paginationOptions,
      isSingleDay,
    ) => {
      const commonClientSideFilters = {
        businessUnit: commonFilters.businessUnit,
        department: commonFilters.department,
      };

      const {
        records: finalData,
        totalCount,
      } = filterSingleDayDailyStats({
        records: isSingleDay ? singleDayData : multipleDayData,
        commonClientSideFilters,
        tableFilters,
        sortOptions,
        paginationOptions,
        isSingleDay,
      });

      return { data: finalData, totalCount };
    },
  ),
  getIsLoading: state => (
    state[reduxKey]?.officeAttendanceTrackingSingleDayRecords?.isPending ||
    state[reduxKey]?.officeAttendanceTrackingMultipleDayRecords?.isPending
  ),
};

export const officeAttendanceTrackingMultipleDayRecordsSelector = {
  getIsPending: state => state[reduxKey]?.officeAttendanceTrackingMultipleDayRecords?.isPending,
  getData: state => state[reduxKey]?.officeAttendanceTrackingMultipleDayRecords?.data,
};

export const officeAttendanceTrackingFetchAndExportEmployeeStatsToCSVSelector = {
  getIsPending: state => state[reduxKey]?.fetchAndExportEmployeeStatsToCSV?.isPending,
};

export const dataUpdateDatesSelector = {
  getData: state => {
    const {
      lastTransactionDateOfOffice,
      lastDataFetchDate,
    } = state[reduxKey];

    return {
      lastDataFetchDate: moment(lastDataFetchDate).format('HH:mm'),
      lastTransactionDateOfOffice: lastTransactionDateOfOffice ? moment(lastTransactionDateOfOffice).format('HH:mm') : '--',
    };
  },
};

export const getTrackingEnabledOfficesSelector = {
  getIsPending: state => state[reduxKey]?.trackingEnabledOffices?.isPending,
  getData: state => state[reduxKey]?.trackingEnabledOffices?.data,
};
