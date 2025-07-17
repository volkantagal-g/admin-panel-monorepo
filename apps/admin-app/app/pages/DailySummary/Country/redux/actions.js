import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.DAILY_SUMMARY.COUNTRY}_`;

export const { Types, Creators } = createActions(
  {
    triggerDataRefresh: { currentTime: null },
    setDataFilter: { filterKey: null, filterValue: null, currentTime: null },
    setSortType: { sortType: null },
    setCurrency: { currency: null },
    setLastSuccessfulDateRanges: { dateRanges: null },
    getCountryDailySummaryDataRequest: {
      config: null,
      tableKey: null,
      dateRanges: null,
      cities: undefined,
      division: undefined,
      selectedDivisionCountries: undefined,
    },
    getCountryDailySummaryDataSuccess: { config: null, tableKey: null, data: null },
    getCountryDailySummaryDataFailure: { config: null, tableKey: null, error: null },
    setChartViewStatus: { tableKey: null, rowDataKey: null, isChecked: null },
    getActiveDomainTypesConfigRequest: {},
    getActiveDomainTypesConfigSuccess: { data: null },
    getActiveDomainTypesConfigFailure: { error: null },
    getActiveIntegrationTypesConfigRequest: {},
    getActiveIntegrationTypesConfigSuccess: { data: null },
    getActiveIntegrationTypesConfigFailure: { error: null },
    initPage: { initialDataFilters: null },
    destroyPage: null,
  },
  { prefix },
);
