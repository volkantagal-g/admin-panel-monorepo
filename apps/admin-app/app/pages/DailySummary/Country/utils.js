import { isEmpty } from 'lodash';

import { BAD_KEYS_FOR_GETIR_JOBS } from '@app/pages/DailySummary/constants';

export function getAvailableCountryGroupNames(countryIdToData, countryIdToCountryGroupMap) {
  if (isEmpty(countryIdToData)) return [];
  if (!countryIdToCountryGroupMap.size) return [];
  const countryGroupNamesMap = new Map();
  const countryIds = Object.keys(countryIdToData);

  countryIds.forEach(countryId => {
    const countryGroupName = countryIdToCountryGroupMap.get(countryId).name;
    countryGroupNamesMap.set(countryGroupName, true);
  });

  return [...countryGroupNamesMap.keys()];
}

export function getAvailableCityName(cityIdToData, cityIdToCityNameMap) {
  if (isEmpty(cityIdToData)) return [];
  if (!cityIdToCityNameMap.size) return [];
  const countryGroupNamesMap = new Map();
  const cityIds = Object.keys(cityIdToData);

  cityIds.forEach(countryId => {
    const countryGroupName = cityIdToCityNameMap.get(countryId).name;
    countryGroupNamesMap.set(countryGroupName, true);
  });

  return [...countryGroupNamesMap.keys()];
}

export const getFormattedGetirJobsChartData = ({ getirJobsTableData }) => {
  const getirJobsFormattedData = {};
  Object.entries(getirJobsTableData.data || {}).forEach(([rowKey, rowData = {}]) => {
    if (!BAD_KEYS_FOR_GETIR_JOBS.includes(rowKey)) {
      const filteredRowData = {};
      Object.entries(rowData).forEach(([dataKey, data]) => {
        if (!BAD_KEYS_FOR_GETIR_JOBS.includes(dataKey)) {
          filteredRowData[dataKey] = data.totals || {};
        }
      });
      getirJobsFormattedData[rowKey] = { data: filteredRowData };
    }
  });
  return getirJobsFormattedData;
};
