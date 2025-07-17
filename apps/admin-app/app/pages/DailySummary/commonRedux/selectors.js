import { createSelector } from 'reselect';

import {
  countriesSelector,
  countryIdToCountryGroupMapSelector,
  getCitiesSelector,
  getDivisionsCitiesSelector,
} from '@shared/redux/selectors/common';
import { genericFormatter } from '../utils';
import { DATA_FILTERS } from '../Country/constants';
import { getSelectedCountryDivision } from '@shared/redux/selectors/countrySelection';

export const countryIdToCountryMapSelector = createSelector(countriesSelector.getData, countries => {
  const theMap = new Map();
  countries.forEach(country => {
    theMap.set(country._id, country);
  });
  return theMap;
});

export const cityIdToCityMapSelector = createSelector(
  getCitiesSelector.getData,
  getDivisionsCitiesSelector.getData,
  (cities, divisionCities) => {
    const selectedDivision = getSelectedCountryDivision();
    const theMap = new Map();
    let citiesForSet = cities;
    if (selectedDivision) {
      citiesForSet = divisionCities;
    }
    citiesForSet.forEach(city => {
      theMap.set((city.id || city._id), city);
    });
    return theMap;
  },
);

export const getIsTableDataPendingSelector = createSelector(
  (state, reducerKey, tableKey) => state[reducerKey]?.[tableKey],
  tableData => {
    return Object.values(tableData || {}).every(eachRow => eachRow?.isPending);
  },
);

const DEFAULT_LAST_SUCCESSFUL_DATE_RANGES = [];
export const getRawTableDataSelector = (state, reducerKey, tableKey) => state[reducerKey]?.[tableKey];
export const computedDateRangesSelector = (state, reducerKey) => state[reducerKey]?.computedDateRanges;
export const selectedCitiesSelector = (state, reducerKey) => state[reducerKey]?.dataFilters[DATA_FILTERS.cities];
export const selectedCountriesSelector = (state, reducerKey) => state[reducerKey]?.dataFilters[DATA_FILTERS.countries];
export const lastDataRefreshTimestampSelector = (state, reducerKey) => state[reducerKey]?.dataRefreshTimestamp;
export const lastSuccessfulDateRangesSelector = (state, reducerKey) => state[reducerKey]?.lastSuccessfulDateRanges || DEFAULT_LAST_SUCCESSFUL_DATE_RANGES;
export const sortTypeSelector = (state, reducerKey) => state[reducerKey]?.sortType;
export const currencySelector = (state, reducerKey) => state[reducerKey]?.currency;

export const getTableDataSelector = () => ({
  getData: createSelector(
    (state, reducerKey) => state[reducerKey],
    (state, reducerKey, tableKey) => state[reducerKey]?.[tableKey],
    (state, reducerKey, tableKey) => tableKey,
    (state, reducerKey, tableKey, configs) => configs,
    (state, reducerKey, tableKey, configs, getOnExpand) => getOnExpand,
    lastSuccessfulDateRangesSelector,
    sortTypeSelector,
    currencySelector,
    countryIdToCountryMapSelector,
    countryIdToCountryGroupMapSelector.getData,
    cityIdToCityMapSelector,
    (
      unformattedAllData,
      unformattedTableData,
      tableKey,
      configs,
      getOnExpand,
      dateRanges,
      sortType,
      currency,
      countryIdToCountryMap,
      countryIdToCountryGroupMap,
      cityIdToCityNameMap,
    ) => {
      const tableData = [];
      const startDates = dateRanges.map(dr => dr.start);
      configs.forEach(config => {
        const rowData = genericFormatter({
          unformattedAllData,
          unformattedTableData,
          config,
          startDates,
          dateRanges,
          currency,
          sortType,
          countryIdToCountryGroupMap,
          countryIdToCountryMap,
          cityIdToCityNameMap,
          tableKey,
          getOnExpand,
          nestLevel: 0,
          // top level row config, no parent data
          parentData: null,
        });
        if (rowData) {
          tableData.push(rowData);
        }
      });
      return tableData;
    },
  ),
  getTotalTablePending: createSelector(
    (state, reducerKey, tableKey) => state[reducerKey]?.[tableKey],
    tableData => {
      return Object.values(tableData).every(data => data?.isPending);
    },
  ),
  getIsPendingObj: createSelector(
    (state, reducerKey, tableKey) => state[reducerKey]?.[tableKey],
    tableData => {
      const isPendingObj = {};
      Object.entries(tableData).forEach(([key, data]) => {
        isPendingObj[key] = data?.isPending;
      });
      return isPendingObj;
    },
  ),
});
