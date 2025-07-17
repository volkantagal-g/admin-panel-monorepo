import { get, isEmpty } from 'lodash';

import { DS_GLOBAL_TABLES } from './constants';
import { GETIR_FINANCIALS_DOMAIN_TYPES } from '../constants';

export function getDomainTypeTotals({ domainData }) {
  if (isEmpty(domainData)) return null;
  const datesData = Object.values(domainData);
  for (let i = 0; i < datesData.length; i += 1) {
    const dateData = datesData[i];
    if (dateData > 0) return domainData;
  }
  // if all dates have 0 counts, don't show domain type
  return null;
}

export function getCountryGroupDataFromCountriesData(countryIdToData, groupName, countryIdToCountryGroupMap, startDates) {
  if (isEmpty(countryIdToData)) return {};
  if (!countryIdToCountryGroupMap?.size) return {};
  const data = {};
  Object.entries(countryIdToData).forEach(([countryId, countryData]) => {
    if (countryIdToCountryGroupMap.get(countryId)?.name === groupName) {
      startDates.forEach(startDate => {
        data[startDate] = (data[startDate] || 0) + (countryData[startDate] || 0);
      });
    }
  });
  return data;
}

export function getFinancialsCountryGroupDataFromCountriesData(countryIdToData, groupName, countryIdToCountryGroupMap, startDates) {
  if (!countryIdToData || isEmpty(countryIdToData)) return {};
  if (!countryIdToCountryGroupMap?.size) return {};
  const data = {};
  Object.entries(countryIdToData).forEach(([countryId, countryData]) => {
    if (countryIdToCountryGroupMap.get(countryId)?.name === groupName) {
      startDates.forEach(startDate => {
        data[startDate] = (data[startDate] || 0) + (countryData.totals[startDate] || 0);
      });
    }
  });
  return data;
}

export function getFinancialBasketAverageCountryGroupDataFromCountriesData({
  groupName,
  domainType,
  currency,
  unformattedAllData,
  countryIdToCountryGroupMap,
  startDates,
}) {
  const { expandOrderCounts } = unformattedAllData[DS_GLOBAL_TABLES.countsTable];
  const { financials } = unformattedAllData[DS_GLOBAL_TABLES.financialsTable];

  if (!countryIdToCountryGroupMap?.size || isEmpty(financials) || isEmpty(expandOrderCounts)) {
    return {};
  }

  const orderCountsByCountry = expandOrderCounts?.data?.[GETIR_FINANCIALS_DOMAIN_TYPES[domainType]] || {};
  const allBasketValueData = financials?.data?.[domainType]?.[currency.toLowerCase()]?.basketValue || {};
  const [firstItemKey] = Object.keys(allBasketValueData);
  const totalBasketValuesByCountry = allBasketValueData[firstItemKey]?.subTable || {};

  const basketValues = {};
  const orderCounts = {};
  const basketAverages = {};
  Object.entries(orderCountsByCountry).forEach(([countryId, countryData]) => {
    if (countryIdToCountryGroupMap.get(countryId)?.name === groupName) {
      startDates.forEach(startDate => {
        orderCounts[startDate] = (orderCounts[startDate] || 0) + (countryData[startDate] || 0);
        basketValues[startDate] = (basketValues[startDate] || 0) + (totalBasketValuesByCountry[countryId]?.totals?.[startDate] || 0);
        basketAverages[startDate] = basketValues[startDate] / orderCounts[startDate];
      });
    }
  });
  return basketAverages;
}

export function getCountriesFromCountriesData({ countryGroupName, countryIdToCountryGroupMap, countryIdToCountryMap, countryIdToData }) {
  if (!countryIdToData || isEmpty(countryIdToData)) return [];
  if (!countryIdToCountryGroupMap?.size) return [];
  if (!countryIdToCountryMap?.size) return [];
  const countriesMap = new Map();
  Object.keys(countryIdToData).forEach(countryId => {
    if (countryIdToCountryGroupMap.get(countryId)?.name === countryGroupName) {
      countriesMap.set(countryIdToCountryMap.get(countryId), true);
    }
  });

  return [...countriesMap.keys()];
}

export function getCountryDataFromCountriesData({ countryIdToData, country }) {
  const countryId = country._id;
  return countryIdToData?.[countryId];
}

export function getFinancialsCountryDataFromCountriesData({ countryIdToData, country }) {
  const countryId = country._id;
  return countryIdToData?.[countryId].totals;
}

export function getCountriesTotalAndFillEmpty({ countryIdToData = {}, startDates }) {
  const total = {};
  Object.values(countryIdToData).forEach(countryData => {
    startDates.forEach(startDate => {
      total[startDate] = (total[startDate] || 0) + (countryData.totals[startDate] || 0);
    });
  });
  return total;
}

export function getTotalForGetirN11Financials({ dataFromDataKey, startDates, currency, rowName }) {
  const rowData = get(dataFromDataKey, ['financials', currency.toLowerCase(), rowName, 'undefined', 'totals'], {});
  const total = {};

  if (isEmpty(rowData)) {
    return [];
  }

  startDates.forEach(startDate => {
    total[startDate] = (total[startDate] || 0) + (rowData[startDate] || 0);
  });

  return total;
}

export function getTotalForGetirN11({ orderType, startDates }) {
  const total = {};
  if (isEmpty(orderType)) {
    return total;
  }

  Object.values(orderType).forEach(orderTypeData => {
    startDates.forEach(startDate => {
      total[startDate] = (total[startDate] || 0) + (orderTypeData.totals[startDate] || 0);
    });
  });
  return total;
}
