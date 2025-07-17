import { isEmpty, get, forEach as _forEach } from 'lodash';

import {
  getGetirJobsData,
  getPermittedDemandCountsData,
  getPermittedMissedCountsData,
  getPermittedOrderCountsData,
  getPermittedOrganicCountsData,
  getPermittedPromoUsedCountsData,
  getPermittedTotalTabClickCountsData,
  getPermittedUniqueTabClickCountsData,
  getPermittedFinancialsData,
  getGetirN11Data,
  getGetirKuzeydenData,
  getTotalAppOpenCountsByCountryData,
  getUniqueAppOpenCountsByCountryData,
  getGetirFoodData,
  getGetirLocalsData,
  getGetirDriveData,
  getGetirSelectData,
  getGorillasData,
  getGetirMarketIntegrationData,
} from '@shared/api/dailySummary/global';
import { getLangKey } from '@shared/i18n';
import {
  getCountriesFromCountriesData,
  getCountryDataFromCountriesData,
  getCountryGroupDataFromCountriesData,
  getDomainTypeTotals,
  getFinancialsCountryGroupDataFromCountriesData,
  getFinancialsCountryDataFromCountriesData,
  getCountriesTotalAndFillEmpty,
  getFinancialBasketAverageCountryGroupDataFromCountriesData,
} from './dataFormatters';
import { DS_GLOBAL_TABLES } from './constants';
import {
  BAD_KEYS_FOR_GETIR_JOBS,
  GETIR_FINANCIALS_DOMAIN_TYPES,
  GETIR_N11_SOURCE_TYPE,
  INTEGRATION_TYPES_SORT,
} from '../constants';
import { getAvailableCountryGroupNames } from './utils';
import {
  getTotalCountsForFirstRow,
  getNumberFormatterByCurrency,
  getTotalsObjectsByDateOfDateRangeData,
  getTotalForGetirFinancials,
  getGetirMarketFinancialFromAllDomainsFinancial,
  getTotalCountsFromDomainDimensionedData,
  getGrossMarketValueFromGetirFinancials,
  getTotalBasketAverage,
  getTotalForGetirKuzeyden,
  getGetirFoodDeliveryTypeRowConfigs,
  getGetirLocalsDeliveryTypeRowConfigs,
  getGetirDriveSourceTypeRowConfigs,
  getTotalForGetirJobs,
  getGetirJobsPostTypeRowConfigs,
  getGetirN11SourceTypeRowConfigs,
  getGetirN11CategoryGroupRowsConfigs,
  getSimplifiedTotalsData,
  getTotalForGetirN11Financials,
  getTotalForGetirDriveFinancials,
  getGetirDriveSourceTypeForFinancialsRowConfigs,
  getTotalBasketAverageForGetirDrive,
  getGetirN11ChannelTypeRowConfigs,
  getGMVAverageForN11,
  getTotalForFinancials,
  getGetirFoodDeliveryTypeForFinancialRowConfigs,
  getGetirLocalsDeliveryTypeForFinancialRowConfigs,
} from '../utils';
import {
  countsTableChartKeys,
  getirJobsTableChartKeys,
  financialsTableChartKeys,
  getirKuzeydenTableChartKeys,
  getirN11TableChartKeys,
  getirFoodTableChartKeys,
  getirLocalsTableChartKeys,
  getirDriveTableChartKeys,
  getirSelectTableChartKeys,
  gorillasTableChartKeys,
  getirMarketIntegrationTableChartKeys,
} from './chartConfigs';
import { FOOD_DELIVERY_TYPES, LOCALS_DELIVERY_TYPES } from '@shared/shared/constants';

/*
  Explanation for the config design:
  - Each row and each child row has a config object associated to it
    it is passed as recordConfig to each antd table record data in genericFormatter function

  - "name" field is the name of the row, shown in first column

  - "dataKey" field is where the unformatted row data will be in redux, [pageState].[tableKey].[dataKey] will be the destination

  - Each top level row config fetches its data automatically on initial render if it has "endpoint" key

  - we will also understand from "dataKey" if it is pending or data exist

  - If a row has "onExpandClickConfig", it means, it will fetch data on expand icon click

  - How to fetch data is based on "endpoint" and "customRequestBody"

  - Only you know the data format returning from that endpoint
    so provide a "initialFormatter" to turn that endpoint data into row data as an object of {date0: count0, date1: count1, ...}

  - if a row has children, provide childRowsConfig, this is the parent config

  - If your child row configs depend on api response, use "getRowConfigs" with arguments
    Ex: we don't know how many domain types are available until response data
    But if you always render all the domain types, you don't need the data input in this function
    you can just use static constants, ex:
      getRowConfigs: () => ALL_DOMAIN_TYPES.map(domainType => ({ name: domainType, ...})),

*/

function getCountryGroupRowsConfigs({ numberFormatter, countryIdToData, countryIdToCountryGroupMap, parentDataKeysConfig }) {
  if (!countryIdToCountryGroupMap?.size) return [];
  if (isEmpty(countryIdToData)) return [];
  const groupNames = getAvailableCountryGroupNames(countryIdToData, countryIdToCountryGroupMap);
  return groupNames.map(groupName => ({
    numberFormatter,
    name: groupName[getLangKey()],
    dataKey: parentDataKeysConfig?.countryGroups || parentDataKeysConfig,
    initialFormatter: ({ countryIdToCountryGroupMap: countryGroupMap, startDates }) => {
      return getCountryGroupDataFromCountriesData(countryIdToData, groupName, countryGroupMap, startDates);
    },
    childRowsConfig: {
      dataKey: parentDataKeysConfig?.countries || parentDataKeysConfig,
      getRowConfigs: ({ countryIdToCountryMap }) => (
        getCountryChildRowsConfigs({
          data: countryIdToData,
          groupName,
          countryIdToCountryGroupMap,
          countryIdToCountryMap,
          parentDataKeysConfig,
          numberFormatter,
        })
      ),
    },
  }));
}

function getCountryChildRowsConfigs({
  data: countryIdToData,
  groupName,
  countryIdToCountryGroupMap,
  countryIdToCountryMap,
  parentDataKeysConfig,
  numberFormatter,
}) {
  if (!countryIdToCountryGroupMap?.size) return [];
  if (!countryIdToCountryMap?.size) return [];
  if (isEmpty(countryIdToData)) return [];
  return getCountriesFromCountriesData({
    countryIdToCountryGroupMap,
    countryIdToCountryMap,
    countryIdToData,
    countryGroupName: groupName,
  }).map(country => ({
    numberFormatter,
    name: country.name[getLangKey()],
    dataKey: parentDataKeysConfig?.countries || parentDataKeysConfig,
    initialFormatter: () => getCountryDataFromCountriesData({ countryIdToData, country }),
  }));
}

function getGetirKuzeydenRowConfigs({ rowData, t, parentDataKeysConfig }) {
  if (isEmpty(rowData)) {
    return [];
  }

  return Object.keys(rowData)
    .map(key => ({
      name: t(`global:GETIR_MARKET_DOMAIN_TYPES.${key}`),
      dataKey: parentDataKeysConfig,
      initialFormatter: () => rowData[key]?.totals,
      childRowsConfig: {
        dataKey: parentDataKeysConfig,
        getRowConfigs: ({ countryIdToCountryGroupMap }) => {
          const countryIdToDataWithTotals = { ...rowData[key].subTable };
          const countryIdToData = Object.keys(countryIdToDataWithTotals).reduce((acc, countryId) => {
            acc[countryId] = countryIdToDataWithTotals[countryId].totals;
            return acc;
          }, {});

          return getCountryGroupRowsConfigs({
            countryIdToData,
            countryIdToCountryGroupMap,
            parentDataKeysConfig,
          });
        },
      },
    }));
}

function getGetirJobsPostTypeRowConfigsWithCountryRows({ rowData, t, parentDataKeysConfig }) {
  if (isEmpty(rowData)) {
    return [];
  }

  return getGetirJobsPostTypeRowConfigs({
    t,
    rowData,
    parentDataKeysConfig,
    childRowsConfig: {
      dataKey: parentDataKeysConfig.countryGroups,
      getRowConfigs: ({ rowData: data, countryIdToCountryGroupMap }) => {
        const countryIdToDataWithTotals = { ...data };
        const countryIdToData = Object.keys(countryIdToDataWithTotals).reduce((acc, countryId) => {
          if (!BAD_KEYS_FOR_GETIR_JOBS.includes(countryId)) {
            Object.assign(acc, { [countryId]: countryIdToDataWithTotals[countryId].totals });
          }
          return acc;
        }, {});

        return getCountryGroupRowsConfigs({
          countryIdToData,
          countryIdToCountryGroupMap,
          parentDataKeysConfig,
        });
      },
    },
  });
}

function getGetirJobsCountryRowConfigs({ rowData, countryIdToCountryGroupMap, parentDataKeysConfig }) {
  if (isEmpty(rowData)) {
    return [];
  }

  const countryIdToData = Object.keys(rowData).reduce((acc, countryId) => {
    if (BAD_KEYS_FOR_GETIR_JOBS.includes(countryId)) return acc;
    // eslint-disable-next-line no-param-reassign
    acc[countryId] = rowData[countryId]?.totals || {};
    return acc;
  }, {});

  return getCountryGroupRowsConfigs({
    countryIdToData,
    countryIdToCountryGroupMap,
    parentDataKeysConfig,
  });
}

function getGetirDriveCountryRowConfigs({ rowData, countryIdToCountryGroupMap, parentDataKeysConfig }) {
  if (isEmpty(rowData)) {
    return [];
  }

  const countryIdToData = Object.keys(rowData).reduce((acc, countryId) => {
    acc[countryId] = rowData[countryId]?.totals || {};
    return acc;
  }, {});

  return getCountryGroupRowsConfigs({
    countryIdToData,
    countryIdToCountryGroupMap,
    parentDataKeysConfig,
  });
}

function getDomainTypeRowsConfigs({ dataFromDataKey: domainTypesData, parentDataKeysConfig, t, tooltip = {} }) {
  const getTooltipsByDomainType = Object.keys(tooltip);
  return Object.keys(domainTypesData).map(domainType => ({
    name: t(`global:GETIR_MARKET_DOMAIN_TYPES.${domainType}`),
    tooltip: getTooltipsByDomainType.includes(domainType) ? t(`${tooltip[domainType]}`) : null,
    dataKey: parentDataKeysConfig.domainTypes,
    initialFormatter: () => getDomainTypeTotals({ domainData: domainTypesData[domainType] }),
    childRowsConfig: {
      dataKey: parentDataKeysConfig.countryGroups,
      getRowConfigs: ({ dataFromDataKey, countryIdToCountryGroupMap }) => (
        getCountryGroupRowsConfigs({
          countryIdToData: dataFromDataKey[domainType],
          countryIdToCountryGroupMap,
          parentDataKeysConfig,
        })
      ),
    },
  }));
}

const totalOrderCountsDataKeys = {
  total: 'orderCounts',
  domainTypes: 'orderCounts',
  countryGroups: 'expandOrderCounts',
  countries: 'expandOrderCounts',
};

const organicCountsDataKeys = {
  total: 'organicCounts',
  domainTypes: 'organicCounts',
  countryGroups: 'expandOrganicCounts',
  countries: 'expandOrganicCounts',
};

const promoUsedCountsDataKeys = {
  total: 'promoUsedCounts',
  domainTypes: 'promoUsedCounts',
  countryGroups: 'expandPromoUsedCounts',
  countries: 'expandPromoUsedCounts',
};

const missedCountsDataKeys = {
  total: 'missedCounts',
  domainTypes: 'missedCounts',
  countryGroups: 'expandMissedCounts',
  countries: 'expandMissedCounts',
};

const demandCountsDataKeys = {
  total: 'demandCounts',
  domainTypes: 'demandCounts',
  countryGroups: 'expandDemandCounts',
  countries: 'expandDemandCounts',
};

const uniqueTabClickCountsDataKeys = {
  total: 'uniqueTabClickCounts',
  domainTypes: 'uniqueTabClickCounts',
  countryGroups: 'expandUniqueTabClickCounts',
  countries: 'expandUniqueTabClickCounts',
};

const totalTabClickCountsDataKeys = {
  total: 'totalTabClickCounts',
  domainTypes: 'totalTabClickCounts',
  countryGroups: 'expandTotalTabClickCounts',
  countries: 'expandTotalTabClickCounts',
};

const uniqueAppOpenCountsDataKeys = {
  total: 'uniqueAppOpenCounts',
  countryGroups: 'uniqueAppOpenCounts',
  countries: 'uniqueAppOpenCounts',
};

const totalAppOpenCountsDataKeys = {
  total: 'totalAppOpenCounts',
  countryGroups: 'totalAppOpenCounts',
  countries: 'totalAppOpenCounts',
};

export const getCountsTableRowConfigs = ({ t, hasPermissionToViewAppOpenData }) => {
  const rowNames = {
    totalOrderCounts: t('ORDER_COUNT_TOTAL'),
    organicCounts: t('ORGANIC_ORDER_TOTAL'),
    promoUsedCounts: t('PROMO_USED_TOTAL'),
    missedCounts: t('MISSED_ORDER_TOTAL'),
    demandCounts: t('TOTAL_DEMAND'),
    uniqueTabClickCounts: t('TAB_CLICK_UNIQUE'),
    totalTabClickCounts: t('TAB_CLICK_TOTAL'),
    uniqueAppOpenCounts: t('APP_OPEN_UNIQUE'),
    totalAppOpenCounts: t('APP_OPEN_TOTAL'),
  };

  const tooltipsOfRows = { 1: 'ORDER_TOTAL_G10_TOOLTIP' };

  return [
    {
      // name is shown in the first column
      name: rowNames.totalOrderCounts,
      // where to put data, isPending etc.. in redux store
      chartKey: countsTableChartKeys.orderCounts,
      // Chart view status key
      dataKey: totalOrderCountsDataKeys.total,
      // initial request endpoint
      endpoint: getPermittedOrderCountsData,
      // custom arguments for that endpoint
      customRequestBody: { dimension: 'domainType' },
      // each request should have error msg associated to it
      errorMsg: t('MISSING_DOMAIN_TYPE_TOTALS', { rowName: rowNames.totalOrderCounts }),
      // given unformatted data, return {date0: count0, date1: count1, ... }, ready to do some percentage calculation later
      initialFormatter: getTotalCountsFromDomainDimensionedData,
      // to closing sorting for child rows of this row
      shouldItBeAffectedFromSorting: false,
      /* We need this data to calculate the country group average basket amount.
        This is a quick workaround until move all the calculations to the backend.
        Don't use it unless you have a very good reason */
      shouldFetchExpandableRowDataBeforeExpand: true,
      // request config when the row is expanded
      onExpandClickConfig: {
        // where the expand click response data will be written
        dataKey: totalOrderCountsDataKeys.countryGroups,
        endpoint: getPermittedOrderCountsData,
        customRequestBody: { dimension: 'country' },
        // each request should have error msg associated to it
        errorMsg: t('MISSING_DOMAIN_COUNTRY_DATA', { rowName: rowNames.totalOrderCounts }),
      },
      // all the nested data keys under this top level row that are fetched on expanding
      // we will reset these after parent data refresh
      expandDataKeys: [totalOrderCountsDataKeys.countryGroups],
      // if row has children on click
      childRowsConfig: {
        // where is the children data
        dataKey: totalOrderCountsDataKeys.domainTypes,
        // if rows are dynamic, produce configs from data in the dataKey above
        // if not dynamic, you can do:  () => [{name, dataKey, ...}]
        // getRowConfigs is called in genericFormatter, we pass auxiliary datas as well
        // like countryGroups, countries, whatever auxiallry
        getRowConfigs: ({ dataFromDataKey }) => (
          getDomainTypeRowsConfigs({ dataFromDataKey, parentDataKeysConfig: totalOrderCountsDataKeys, t, tooltip: tooltipsOfRows })
        ),
      },
    },
    {
      name: rowNames.organicCounts,
      dataKey: organicCountsDataKeys.total,
      chartKey: countsTableChartKeys.organicCounts,
      endpoint: getPermittedOrganicCountsData,
      customRequestBody: { dimension: 'domainType' },
      errorMsg: t('MISSING_DOMAIN_TYPE_TOTALS', { rowName: rowNames.organicCounts }),
      initialFormatter: getTotalCountsFromDomainDimensionedData,
      shouldItBeAffectedFromSorting: false,
      onExpandClickConfig: {
        dataKey: organicCountsDataKeys.countryGroups,
        endpoint: getPermittedOrganicCountsData,
        customRequestBody: { dimension: 'country' },
        errorMsg: t('MISSING_DOMAIN_COUNTRY_DATA', { rowName: rowNames.organicCounts }),
      },
      expandDataKeys: [organicCountsDataKeys.countryGroups],
      childRowsConfig: {
        dataKey: organicCountsDataKeys.domainTypes,
        getRowConfigs: ({ dataFromDataKey }) => (
          getDomainTypeRowsConfigs({ dataFromDataKey, parentDataKeysConfig: organicCountsDataKeys, t, tooltip: tooltipsOfRows })
        ),
      },
    },
    {
      name: rowNames.promoUsedCounts,
      dataKey: promoUsedCountsDataKeys.total,
      chartKey: countsTableChartKeys.promoUsedCounts,
      endpoint: getPermittedPromoUsedCountsData,
      errorMsg: t('MISSING_DOMAIN_TYPE_TOTALS', { rowName: rowNames.promoUsedCounts }),
      customRequestBody: { dimension: 'domainType' },
      initialFormatter: getTotalCountsFromDomainDimensionedData,
      shouldItBeAffectedFromSorting: false,
      onExpandClickConfig: {
        dataKey: promoUsedCountsDataKeys.countryGroups,
        endpoint: getPermittedPromoUsedCountsData,
        customRequestBody: { dimension: 'country' },
        errorMsg: t('MISSING_DOMAIN_COUNTRY_DATA', { rowName: rowNames.promoUsedCounts }),
      },
      expandDataKeys: [promoUsedCountsDataKeys.countryGroups],
      childRowsConfig: {
        dataKey: promoUsedCountsDataKeys.domainTypes,
        getRowConfigs: ({ dataFromDataKey }) => (
          getDomainTypeRowsConfigs({ dataFromDataKey, parentDataKeysConfig: promoUsedCountsDataKeys, t })
        ),
      },
    },
    {
      name: rowNames.missedCounts,
      dataKey: missedCountsDataKeys.total,
      chartKey: countsTableChartKeys.missedCounts,
      endpoint: getPermittedMissedCountsData,
      errorMsg: t('MISSING_DOMAIN_TYPE_TOTALS', { rowName: rowNames.missedCounts }),
      customRequestBody: { dimension: 'domainType' },
      initialFormatter: getTotalCountsFromDomainDimensionedData,
      shouldItBeAffectedFromSorting: false,
      onExpandClickConfig: {
        dataKey: missedCountsDataKeys.countryGroups,
        endpoint: getPermittedMissedCountsData,
        customRequestBody: { dimension: 'country' },
        errorMsg: t('MISSING_DOMAIN_COUNTRY_DATA', { rowName: rowNames.missedCounts }),
      },
      expandDataKeys: [missedCountsDataKeys.countryGroups],
      childRowsConfig: {
        dataKey: missedCountsDataKeys.domainTypes,
        getRowConfigs: ({ dataFromDataKey }) => (
          getDomainTypeRowsConfigs({ dataFromDataKey, parentDataKeysConfig: missedCountsDataKeys, t })
        ),
      },
    },
    {
      name: rowNames.demandCounts,
      dataKey: demandCountsDataKeys.total,
      chartKey: countsTableChartKeys.demandCounts,
      endpoint: getPermittedDemandCountsData,
      errorMsg: t('MISSING_DOMAIN_TYPE_TOTALS', { rowName: rowNames.demandCounts }),
      customRequestBody: { dimension: 'domainType' },
      initialFormatter: getTotalCountsFromDomainDimensionedData,
      shouldItBeAffectedFromSorting: false,
      onExpandClickConfig: {
        dataKey: demandCountsDataKeys.countryGroups,
        endpoint: getPermittedDemandCountsData,
        customRequestBody: { dimension: 'country' },
        errorMsg: t('MISSING_DOMAIN_COUNTRY_DATA', { rowName: rowNames.demandCounts }),
      },
      expandDataKeys: [demandCountsDataKeys.countryGroups],
      childRowsConfig: {
        dataKey: demandCountsDataKeys.domainTypes,
        getRowConfigs: ({ dataFromDataKey }) => (
          getDomainTypeRowsConfigs({ dataFromDataKey, parentDataKeysConfig: demandCountsDataKeys, t })
        ),
      },
    },
    {
      name: rowNames.uniqueTabClickCounts,
      dataKey: uniqueTabClickCountsDataKeys.total,
      chartKey: countsTableChartKeys.uniqueTabClickCounts,
      endpoint: getPermittedUniqueTabClickCountsData,
      errorMsg: t('MISSING_DOMAIN_TYPE_TOTALS', { rowName: rowNames.uniqueTabClickCounts }),
      customRequestBody: { dimension: 'domainType' },
      initialFormatter: getTotalCountsFromDomainDimensionedData,
      shouldItBeAffectedFromSorting: false,
      onExpandClickConfig: {
        dataKey: uniqueTabClickCountsDataKeys.countryGroups,
        endpoint: getPermittedUniqueTabClickCountsData,
        customRequestBody: { dimension: 'country' },
        errorMsg: t('MISSING_DOMAIN_COUNTRY_DATA', { rowName: rowNames.uniqueTabClickCounts }),
      },
      expandDataKeys: [uniqueTabClickCountsDataKeys.countryGroups],
      childRowsConfig: {
        dataKey: uniqueTabClickCountsDataKeys.domainTypes,
        getRowConfigs: ({ dataFromDataKey }) => (
          getDomainTypeRowsConfigs({ dataFromDataKey, parentDataKeysConfig: uniqueTabClickCountsDataKeys, t })
        ),
      },
    },
    {
      name: rowNames.totalTabClickCounts,
      dataKey: totalTabClickCountsDataKeys.total,
      chartKey: countsTableChartKeys.totalTabClickCounts,
      endpoint: getPermittedTotalTabClickCountsData,
      errorMsg: t('MISSING_DOMAIN_TYPE_TOTALS', { rowName: rowNames.totalTabClickCounts }),
      customRequestBody: { dimension: 'domainType' },
      initialFormatter: getTotalCountsFromDomainDimensionedData,
      shouldItBeAffectedFromSorting: false,
      onExpandClickConfig: {
        dataKey: totalTabClickCountsDataKeys.countryGroups,
        endpoint: getPermittedTotalTabClickCountsData,
        customRequestBody: { dimension: 'country' },
        errorMsg: t('MISSING_DOMAIN_COUNTRY_DATA', { rowName: rowNames.totalTabClickCounts }),
      },
      expandDataKeys: [totalTabClickCountsDataKeys.countryGroups],
      childRowsConfig: {
        dataKey: totalTabClickCountsDataKeys.domainTypes,
        getRowConfigs: ({ dataFromDataKey }) => (
          getDomainTypeRowsConfigs({ dataFromDataKey, parentDataKeysConfig: totalTabClickCountsDataKeys, t })
        ),
      },
    },
    ...(hasPermissionToViewAppOpenData ? [
      {
        name: rowNames.uniqueAppOpenCounts,
        dataKey: uniqueAppOpenCountsDataKeys.total,
        chartKey: countsTableChartKeys.uniqueAppOpenCounts,
        endpoint: getUniqueAppOpenCountsByCountryData,
        errorMsg: t('ERR_FAILED_TO_FETCH_ROW_DATA', { rowName: rowNames.uniqueAppOpenCounts }),
        customRequestBody: { dimensions: ['country'] },
        shouldItBeAffectedFromSorting: true,
        initialFormatter: ({ dataFromDataKey = {}, startDates }) => {
          return getCountriesTotalAndFillEmpty({ countryIdToData: dataFromDataKey, startDates });
        },
        childRowsConfig: {
          dataKey: uniqueAppOpenCountsDataKeys.countryGroups,
          getRowConfigs: ({ countryIdToCountryGroupMap, dataFromDataKey }) => {
            if (isEmpty(dataFromDataKey)) {
              return [];
            }

            const countryIdToData = getTotalsObjectsByDateOfDateRangeData({ data: dataFromDataKey });
            return getCountryGroupRowsConfigs({
              countryIdToData,
              countryIdToCountryGroupMap,
              parentDataKeysConfig: uniqueAppOpenCountsDataKeys,
            });
          },
        },
      },
      {
        name: rowNames.totalAppOpenCounts,
        dataKey: totalAppOpenCountsDataKeys.total,
        chartKey: countsTableChartKeys.totalAppOpenCounts,
        endpoint: getTotalAppOpenCountsByCountryData,
        errorMsg: t('ERR_FAILED_TO_FETCH_ROW_DATA', { rowName: rowNames.totalAppOpenCounts }),
        customRequestBody: { dimensions: ['country'] },
        shouldItBeAffectedFromSorting: true,
        initialFormatter: ({ dataFromDataKey = {}, startDates }) => {
          return getCountriesTotalAndFillEmpty({ countryIdToData: dataFromDataKey, startDates });
        },
        childRowsConfig: {
          dataKey: totalAppOpenCountsDataKeys.countryGroups,
          getRowConfigs: ({ countryIdToCountryGroupMap, dataFromDataKey }) => {
            if (isEmpty(dataFromDataKey)) {
              return [];
            }

            const countryIdToData = getTotalsObjectsByDateOfDateRangeData({ data: dataFromDataKey });
            return getCountryGroupRowsConfigs({
              countryIdToData,
              countryIdToCountryGroupMap,
              parentDataKeysConfig: totalAppOpenCountsDataKeys,
            });
          },
        },
      },
    ] : []),
  ];
};

// Financials
const getirFinancialsDataKey = 'financials';

export const getFinancialsTableRowConfigs = ({ t, computedDateRanges, lastSuccessfulDateRanges, hasPermissionToViewG10Data, hasPermissionToViewG30Data }) => {
  const rowNames = {
    sectionHeader: t('FINANCIALS'),
    chargedAmount: t('CHARGED_AMOUNT'),
    getirMarketChargedAmount: `${t('CHARGED_AMOUNT')} (${t('global:GETIR_GROCERY_SHORT')})`,
    getirMarketChargedAmountTooltip: `${t('CHARGED_AMOUNT')} (${t('global:GETIR_GROCERY')})`,
    grossMarketValue: t('GROSS_MARKET_VALUE_SHORT'),
    netRevenue: t('NET_REVENUE'),
    getirMarketNetRevenue: `${t('NET_REVENUE')} (${t('global:GETIR_GROCERY_SHORT')})`,
    getirMarketNetRevenueTooltip: `${t('NET_REVENUE')} (${t('global:GETIR_GROCERY')})`,
    grossMargin: t('GROSS_MARGIN'),
    basketValue: t('BASKET_TOTAL'),
    basketAverage: t('BASKET_AVERAGE'),
    deliveryFee: t('DELIVERY_FEE'),
    serviceFee: t('SERVICE_FEE'),
  };

  return [
    {
      name: rowNames.sectionHeader,
      dataKey: getirFinancialsDataKey,
      isSectionHeader: true,
    },
    {
      // name is shown in the first column
      name: rowNames.chargedAmount,
      // where to put data, isPending etc.. in redux store. it is unformatted data
      dataKey: getirFinancialsDataKey,
      // Chart View Status Key
      chartKey: financialsTableChartKeys.chargedAmount,
      // initial request endpoint
      endpoint: getPermittedFinancialsData,
      // custom arguments for that endpoint
      customRequestBody: { dimensions: ['domainType', 'country'] },
      // each request should have error msg associated to it
      errorMsg: t('MISSING_DOMAIN_TYPE_TOTALS', { rowName: rowNames.chargedAmount }),
      // given unformatted data, return {date0: count0, date1: count1, ... }, ready to do some percentage calculation later
      initialFormatter: params => getTotalForGetirFinancials({ ...params, rowName: 'chargedAmount' }),
      // to closing sorting for child rows of this row
      shouldItBeAffectedFromSorting: false,
      // all the nested data keys under this top level row that are fetched on expanding
      // we will reset these after parent data refresh
      // expandDataKeys: [getirFinancialsDataKeys.countryGroups],
      // if row has children on click
      childRowsConfig: {
        // where is the children data
        dataKey: getirFinancialsDataKey,
        // if rows are dynamic, produce configs from data in the dataKey above
        // if not dynamic, you can do:  () => [{name, dataKey, ...}]
        // getRowConfigs is called in genericFormatter, we pass auxiliary datas as well
        // like countryGroups, countries, whatever auxiallry
        getRowConfigs: ({ dataFromDataKey, currency }) => getGetirFinancialsRowsConfigs({
          dataFromDataKey,
          currency,
          parentDataKeysConfig: getirFinancialsDataKey,
          t,
          rowName: 'chargedAmount',
        }),
      },
    },
    ...(hasPermissionToViewG10Data && hasPermissionToViewG30Data ? [
      {
        name: rowNames.getirMarketChargedAmount,
        tooltip: rowNames.getirMarketChargedAmountTooltip,
        dataKey: getirFinancialsDataKey,
        chartKey: financialsTableChartKeys.getirMarketChargedAmount,
        errorMsg: t('MISSING_DOMAIN_TYPE_TOTALS', { rowName: rowNames.chargedAmount }),
        initialFormatter: ({ dataFromDataKey, startDates, currency }) => getTotalForGetirFinancials({
          startDates,
          currency,
          dataFromDataKey: getGetirMarketFinancialFromAllDomainsFinancial({ data: dataFromDataKey }),
          rowName: 'chargedAmount',
        }),
        shouldItBeAffectedFromSorting: false,
        childRowsConfig: {
          dataKey: getirFinancialsDataKey,
          getRowConfigs: ({ dataFromDataKey, currency }) => getGetirFinancialsRowsConfigs({
            dataFromDataKey: getGetirMarketFinancialFromAllDomainsFinancial({ data: dataFromDataKey }),
            currency,
            parentDataKeysConfig: getirFinancialsDataKey,
            t,
            rowName: 'chargedAmount',
          }),
        },
      },
    ] : []),
    {
      name: rowNames.grossMarketValue,
      dataKey: getirFinancialsDataKey,
      chartKey: financialsTableChartKeys.grossMarketValue,
      errorMsg: t('MISSING_DOMAIN_TYPE_TOTALS', { rowName: rowNames.grossMarketValue }),
      initialFormatter: params => {
        const basketValueData = getTotalForGetirFinancials({ ...params, rowName: 'basketValue' }) || {};
        const deliveryFeeData = getTotalForGetirFinancials({ ...params, rowName: 'deliveryFee' }) || {};
        return getGrossMarketValueFromGetirFinancials({
          basketValueData,
          deliveryFeeData,
          dateRanges: lastSuccessfulDateRanges,
        });
      },
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirFinancialsDataKey,
        getRowConfigs: ({ dataFromDataKey, currency }) => getGetirFinancialsGMVRowsConfigs({
          dataFromDataKey,
          currency,
          parentDataKeysConfig: getirFinancialsDataKey,
          t,
          computedDateRanges,
        }),
      },
    },
    {
      name: rowNames.netRevenue,
      dataKey: getirFinancialsDataKey,
      chartKey: financialsTableChartKeys.netRevenue,
      errorMsg: t('MISSING_DOMAIN_TYPE_TOTALS', { rowName: rowNames.netRevenue }),
      initialFormatter: params => getTotalForGetirFinancials({ ...params, rowName: 'netRevenue' }),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirFinancialsDataKey,
        getRowConfigs: ({ dataFromDataKey, currency }) => getGetirFinancialsRowsConfigs({
          dataFromDataKey,
          currency,
          parentDataKeysConfig: getirFinancialsDataKey,
          t,
          rowName: 'netRevenue',
        }),
      },
    },
    ...(hasPermissionToViewG10Data && hasPermissionToViewG30Data ? [
      {
        name: rowNames.getirMarketNetRevenue,
        tooltip: rowNames.getirMarketNetRevenueTooltip,
        dataKey: getirFinancialsDataKey,
        chartKey: financialsTableChartKeys.getirMarketNetRevenue,
        errorMsg: t('MISSING_DOMAIN_TYPE_TOTALS', { rowName: rowNames.netRevenue }),
        initialFormatter: ({ dataFromDataKey, startDates, currency }) => getTotalForGetirFinancials({
          startDates,
          currency,
          dataFromDataKey: getGetirMarketFinancialFromAllDomainsFinancial({ data: dataFromDataKey }),
          rowName: 'netRevenue',
        }),
        shouldItBeAffectedFromSorting: false,
        childRowsConfig: {
          dataKey: getirFinancialsDataKey,
          getRowConfigs: ({ dataFromDataKey, currency }) => getGetirFinancialsRowsConfigs({
            dataFromDataKey: getGetirMarketFinancialFromAllDomainsFinancial({ data: dataFromDataKey }),
            currency,
            parentDataKeysConfig: getirFinancialsDataKey,
            t,
            rowName: 'netRevenue',
          }),
        },
      },
    ] : []),
    {
      name: rowNames.grossMargin,
      dataKey: getirFinancialsDataKey,
      chartKey: financialsTableChartKeys.grossMargin,
      customRequestBody: { dimensions: ['domainType', 'country'] },
      errorMsg: t('MISSING_DOMAIN_TYPE_TOTALS', { rowName: rowNames.grossMargin }),
      initialFormatter: params => getTotalForGetirFinancials({ ...params, rowName: 'grossMargin' }),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirFinancialsDataKey,
        getRowConfigs: ({ dataFromDataKey, currency }) => getGetirFinancialsRowsConfigs({
          dataFromDataKey,
          currency,
          parentDataKeysConfig: getirFinancialsDataKey,
          t,
          rowName: 'grossMargin',
        }),
      },
    },
    {
      name: rowNames.basketValue,
      chartKey: financialsTableChartKeys.basketValue,
      dataKey: getirFinancialsDataKey,
      customRequestBody: { dimensions: ['domainType', 'country'] },
      errorMsg: t('MISSING_DOMAIN_TYPE_TOTALS', { rowName: rowNames.basketValue }),
      initialFormatter: params => getTotalForGetirFinancials({ ...params, rowName: 'basketValue' }),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirFinancialsDataKey,
        getRowConfigs: ({ dataFromDataKey, currency }) => getGetirFinancialsRowsConfigs({
          dataFromDataKey,
          currency,
          parentDataKeysConfig: getirFinancialsDataKey,
          t,
          rowName: 'basketValue',
        }),
      },
    },
    {
      name: rowNames.basketAverage,
      dataKey: getirFinancialsDataKey,
      chartKey: financialsTableChartKeys.basketAverage,
      customRequestBody: { dimensions: ['domainType', 'country'] },
      errorMsg: t('MISSING_DOMAIN_TYPE_TOTALS', { rowName: rowNames.basketAverage }),
      initialFormatter: getTotalBasketAverage,
      initialFormatterExtraParams: { tableDataKeys: DS_GLOBAL_TABLES },
      shouldAssignCurrencyFormatter: true,
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirFinancialsDataKey,
        getRowConfigs: ({ dataFromDataKey, currency }) => getGetirFinancialsRowsConfigs({
          dataFromDataKey,
          currency,
          numberFormatter: getNumberFormatterByCurrency(currency),
          parentDataKeysConfig: getirFinancialsDataKey,
          t,
          rowName: 'basketAverage',
        }),
      },
    },
    {
      name: rowNames.deliveryFee,
      dataKey: getirFinancialsDataKey,
      chartKey: financialsTableChartKeys.deliveryFee,
      customRequestBody: { dimensions: ['domainType', 'country'] },
      errorMsg: t('MISSING_DOMAIN_TYPE_TOTALS', { rowName: rowNames.deliveryFee }),
      initialFormatter: params => getTotalForGetirFinancials({ ...params, rowName: 'deliveryFee' }),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirFinancialsDataKey,
        getRowConfigs: ({ dataFromDataKey, currency }) => getGetirFinancialsRowsConfigs({
          dataFromDataKey,
          currency,
          parentDataKeysConfig: getirFinancialsDataKey,
          t,
          rowName: 'deliveryFee',
        }),
      },
    },
    {
      name: rowNames.serviceFee,
      dataKey: getirFinancialsDataKey,
      chartKey: financialsTableChartKeys.serviceFee,
      customRequestBody: { dimensions: ['domainType', 'country'] },
      errorMsg: t('MISSING_DOMAIN_TYPE_TOTALS', { rowName: rowNames.serviceFee }),
      initialFormatter: params => getTotalForGetirFinancials({ ...params, rowName: 'serviceFee' }),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirFinancialsDataKey,
        getRowConfigs: ({ dataFromDataKey, currency }) => getGetirFinancialsRowsConfigs({
          dataFromDataKey,
          currency,
          parentDataKeysConfig: getirFinancialsDataKey,
          t,
          rowName: 'serviceFee',
        }),
      },
    },
  ];
};

// everything fetched same time, into same data key
const getirFoodDataKeys = {
  total: 'getirFoodData',
  deliveryType: 'getirFoodData',
  countryGroups: 'getirFoodData',
  countries: 'getirFoodData',
};

const getGetirFoodGMVRowsConfigs = ({ t, dataFromDataKey, currency, computedDateRanges }) => {
  const configs = [];

  FOOD_DELIVERY_TYPES.forEach(deliveryTypeValue => {
    const data = dataFromDataKey?.financials?.[currency?.toLowerCase()];

    if (data) {
      const basketValueDataByDeliveryType = data.basketValue?.[deliveryTypeValue];
      const deliveryFeeDataByDeliveryType = data.deliveryFee?.[deliveryTypeValue];

      const grossMarketValue = getGrossMarketValueFromGetirFinancials({
        basketValueData: basketValueDataByDeliveryType?.totals,
        deliveryFeeData: deliveryFeeDataByDeliveryType?.totals,
        dateRanges: computedDateRanges,
      });

      configs.push({
        name: t(`global:FOOD_DELIVERY_TYPES.${deliveryTypeValue}`),
        dataKey: getirFoodDataKeys.deliveryType,
        initialFormatter: () => {
          const allZero = Object.values(grossMarketValue).every(val => val === 0);
          return allZero ? null : grossMarketValue;
        },
        childRowsConfig: {
          dataKey: getirFoodDataKeys.countryGroups,
          getRowConfigs: ({ countryIdToCountryGroupMap }) => {
            return getFinancialsGMVCountryGroupRowsConfigs({
              basketValue: basketValueDataByDeliveryType?.subTable,
              deliveryFee: deliveryFeeDataByDeliveryType?.subTable,
              countryIdToCountryGroupMap,
              parentDataKeysConfig: getirFoodDataKeys.deliveryType,
              computedDateRanges,
            });
          },
        },
      });
    }
  });

  return configs;
};

export const getGetirFoodTableRowConfigs = ({ t, computedDateRanges }) => {
  const rowNames = {
    sectionHeader: t('global:GETIR_FOOD'),
    orderCounts: t('global:ORDER'),
    organicCounts: t('ORGANIC_ORDER_TOTAL'),
    promoUsedCounts: t('PROMO_USED_TOTAL'),
    missedCounts: t('MISSED_ORDER_TOTAL'),
    demandCounts: t('TOTAL_DEMAND'),
    chargedAmount: t('CHARGED_AMOUNT'),
    gmv: t('GMV'),
    netRevenue: t('NET_REVENUE'),
    grossMargin: t('GROSS_MARGIN'),
    basketValue: t('BASKET_TOTAL'),
    basketAverage: t('BASKET_AVERAGE'),
    deliveryFee: t('DELIVERY_FEE'),
  };

  // since we fetch all the related data together
  const errorMsg = t('MISSING_GETIR_FOOD_DATA');

  return [
    {
      name: rowNames.sectionHeader,
      dataKey: getirFoodDataKeys.total,
      isSectionHeader: true,
    },
    {
      name: rowNames.orderCounts,
      dataKey: getirFoodDataKeys.total,
      chartKey: getirFoodTableChartKeys.orderCounts,
      endpoint: getGetirFoodData,
      customRequestBody: {},
      errorMsg,
      initialFormatter: ({ dataFromDataKey, startDates }) => (
        getTotalCountsForFirstRow({ dimension: dataFromDataKey?.orderCounts, startDates })
      ),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirFoodDataKeys.deliveryType,
        getRowConfigs: ({ dataFromDataKey }) => (
          getGetirFoodDeliveryTypeRowConfigs({
            t,
            rowData: dataFromDataKey?.orderCounts,
            parentDataKeysConfig: getirFoodDataKeys,
            childRowsConfig: {
              dataKey: getirFoodDataKeys.countryGroups,
              getRowConfigs: ({ rowData, countryIdToCountryGroupMap }) => {
                const countryIdToData = getTotalsObjectsByDateOfDateRangeData({ data: rowData });

                return getCountryGroupRowsConfigs({
                  countryIdToData,
                  countryIdToCountryGroupMap,
                  parentDataKeysConfig: getirFoodDataKeys,
                });
              },
            },
          })
        ),
      },
    },
    {
      name: rowNames.organicCounts,
      dataKey: getirFoodDataKeys.total,
      chartKey: getirFoodTableChartKeys.organicCounts,
      errorMsg,
      initialFormatter: ({ dataFromDataKey, startDates }) => (
        getTotalCountsForFirstRow({ dimension: dataFromDataKey?.organicCounts, startDates })
      ),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirFoodDataKeys.deliveryType,
        getRowConfigs: ({ dataFromDataKey }) => (
          getGetirFoodDeliveryTypeRowConfigs({
            t,
            rowData: dataFromDataKey?.organicCounts,
            parentDataKeysConfig: getirFoodDataKeys,
            childRowsConfig: {
              dataKey: getirFoodDataKeys.countryGroups,
              getRowConfigs: ({ rowData, countryIdToCountryGroupMap }) => {
                const countryIdToData = getTotalsObjectsByDateOfDateRangeData({ data: rowData });

                return getCountryGroupRowsConfigs({
                  countryIdToData,
                  countryIdToCountryGroupMap,
                  parentDataKeysConfig: getirFoodDataKeys,
                });
              },
            },
          })
        ),
      },
    },
    {
      name: rowNames.promoUsedCounts,
      dataKey: getirFoodDataKeys.total,
      chartKey: getirFoodTableChartKeys.promoUsedCounts,
      errorMsg,
      initialFormatter: ({ dataFromDataKey, startDates }) => (
        getTotalCountsForFirstRow({ dimension: dataFromDataKey?.promoUsedCounts, startDates })
      ),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirFoodDataKeys.deliveryType,
        getRowConfigs: ({ dataFromDataKey }) => (
          getGetirFoodDeliveryTypeRowConfigs({
            t,
            rowData: dataFromDataKey?.promoUsedCounts,
            parentDataKeysConfig: getirFoodDataKeys,
            childRowsConfig: {
              dataKey: getirFoodDataKeys.countryGroups,
              getRowConfigs: ({ rowData, countryIdToCountryGroupMap }) => {
                const countryIdToData = getTotalsObjectsByDateOfDateRangeData({ data: rowData });

                return getCountryGroupRowsConfigs({
                  countryIdToData,
                  countryIdToCountryGroupMap,
                  parentDataKeysConfig: getirFoodDataKeys,
                });
              },
            },
          })
        ),
      },
    },
    {
      name: rowNames.missedCounts,
      dataKey: getirFoodDataKeys.total,
      chartKey: getirFoodTableChartKeys.missedCounts,
      errorMsg,
      initialFormatter: ({ dataFromDataKey, startDates }) => (
        getTotalCountsForFirstRow({ dimension: dataFromDataKey?.missedCounts, startDates })
      ),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirFoodDataKeys.deliveryType,
        getRowConfigs: ({ dataFromDataKey }) => (
          getGetirFoodDeliveryTypeRowConfigs({
            t,
            rowData: dataFromDataKey?.missedCounts,
            parentDataKeysConfig: getirFoodDataKeys,
            childRowsConfig: {
              dataKey: getirFoodDataKeys.countryGroups,
              getRowConfigs: ({ rowData, countryIdToCountryGroupMap }) => {
                const countryIdToData = getTotalsObjectsByDateOfDateRangeData({ data: rowData });

                return getCountryGroupRowsConfigs({
                  countryIdToData,
                  countryIdToCountryGroupMap,
                  parentDataKeysConfig: getirFoodDataKeys,
                });
              },
            },
          })
        ),
      },
    },
    {
      name: rowNames.demandCounts,
      dataKey: getirFoodDataKeys.total,
      chartKey: getirFoodTableChartKeys.demandCounts,
      errorMsg,
      initialFormatter: ({ dataFromDataKey, startDates }) => (
        getTotalCountsForFirstRow({ dimension: dataFromDataKey?.demandCounts, startDates })
      ),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirFoodDataKeys.deliveryType,
        getRowConfigs: ({ dataFromDataKey }) => (
          getGetirFoodDeliveryTypeRowConfigs({
            t,
            rowData: dataFromDataKey?.demandCounts,
            parentDataKeysConfig: getirFoodDataKeys,
            childRowsConfig: {
              dataKey: getirFoodDataKeys.countryGroups,
              getRowConfigs: ({ rowData, countryIdToCountryGroupMap }) => {
                const countryIdToData = getTotalsObjectsByDateOfDateRangeData({ data: rowData });

                return getCountryGroupRowsConfigs({
                  countryIdToData,
                  countryIdToCountryGroupMap,
                  parentDataKeysConfig: getirFoodDataKeys,
                });
              },
            },
          })
        ),
      },
    },
    {
      name: rowNames.chargedAmount,
      dataKey: getirFoodDataKeys.total,
      chartKey: getirFoodTableChartKeys.chargedAmount,
      errorMsg,
      initialFormatter: params => (
        getTotalForFinancials({ ...params, rowName: 'chargedAmount' })
      ),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirFoodDataKeys.deliveryType,
        getRowConfigs: ({ currency, dataFromDataKey }) => {
          return getGetirFoodDeliveryTypeForFinancialRowConfigs({
            rowFinancialData: dataFromDataKey?.financials,
            t,
            currency,
            rowName: 'chargedAmount',
            parentDataKeysConfig: getirFoodDataKeys,
            childRowsConfig: {
              dataKey: getirFoodDataKeys.countryGroups,
              getRowConfigs: ({ rowData, countryIdToCountryGroupMap }) => {
                const countryIdToData = getTotalsObjectsByDateOfDateRangeData({ data: rowData });

                return getCountryGroupRowsConfigs({
                  countryIdToData,
                  countryIdToCountryGroupMap,
                  parentDataKeysConfig: getirFoodDataKeys,
                });
              },
            },
          });
        },
      },
    },
    {
      name: rowNames.gmv,
      dataKey: getirFoodDataKeys.total,
      chartKey: getirFoodTableChartKeys.gmv,
      errorMsg,
      initialFormatter: params => {
        const basketValueData = getTotalForFinancials({ ...params, rowName: 'basketValue' });
        const deliveryFeeData = getTotalForFinancials({ ...params, rowName: 'deliveryFee' });

        const grossMarketValue = getGrossMarketValueFromGetirFinancials({
          basketValueData,
          deliveryFeeData,
          dateRanges: computedDateRanges,
        });

        return Object.values(grossMarketValue)?.every(val => val === 0) ? null : grossMarketValue;
      },
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirFoodDataKeys.deliveryType,
        getRowConfigs: ({ currency, dataFromDataKey }) => {
          return getGetirFoodGMVRowsConfigs({ t, dataFromDataKey, computedDateRanges, currency });
        },
      },
    },
    {
      name: rowNames.netRevenue,
      dataKey: getirFoodDataKeys.total,
      chartKey: getirFoodTableChartKeys.netRevenue,
      errorMsg,
      initialFormatter: params => (
        getTotalForFinancials({ ...params, rowName: 'netRevenue' })
      ),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirFoodDataKeys.deliveryType,
        getRowConfigs: ({ currency, dataFromDataKey }) => {
          return getGetirFoodDeliveryTypeForFinancialRowConfigs({
            rowFinancialData: dataFromDataKey?.financials,
            t,
            currency,
            rowName: 'netRevenue',
            parentDataKeysConfig: getirFoodDataKeys,
            childRowsConfig: {
              dataKey: getirFoodDataKeys.countryGroups,
              getRowConfigs: ({ rowData, countryIdToCountryGroupMap }) => {
                const countryIdToData = getTotalsObjectsByDateOfDateRangeData({ data: rowData });

                return getCountryGroupRowsConfigs({
                  countryIdToData,
                  countryIdToCountryGroupMap,
                  parentDataKeysConfig: getirFoodDataKeys,
                });
              },
            },
          });
        },
      },
    },
    {
      name: rowNames.grossMargin,
      dataKey: getirFoodDataKeys.total,
      chartKey: getirFoodTableChartKeys.grossMargin,
      errorMsg,
      initialFormatter: params => (
        getTotalForFinancials({ ...params, rowName: 'grossMargin' })
      ),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirFoodDataKeys.deliveryType,
        getRowConfigs: ({ currency, dataFromDataKey }) => {
          return getGetirFoodDeliveryTypeForFinancialRowConfigs({
            rowFinancialData: dataFromDataKey?.financials,
            t,
            currency,
            rowName: 'grossMargin',
            parentDataKeysConfig: getirFoodDataKeys,
            childRowsConfig: {
              dataKey: getirFoodDataKeys.countryGroups,
              getRowConfigs: ({ rowData, countryIdToCountryGroupMap }) => {
                const countryIdToData = getTotalsObjectsByDateOfDateRangeData({ data: rowData });

                return getCountryGroupRowsConfigs({
                  countryIdToData,
                  countryIdToCountryGroupMap,
                  parentDataKeysConfig: getirFoodDataKeys,
                });
              },
            },
          });
        },
      },
    },
    {
      name: rowNames.basketValue,
      dataKey: getirFoodDataKeys.total,
      chartKey: getirFoodTableChartKeys.basketValue,
      errorMsg,
      initialFormatter: params => (
        getTotalForFinancials({ ...params, rowName: 'basketValue' })
      ),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirFoodDataKeys.deliveryType,
        getRowConfigs: ({ currency, dataFromDataKey }) => {
          return getGetirFoodDeliveryTypeForFinancialRowConfigs({
            rowFinancialData: dataFromDataKey?.financials,
            t,
            currency,
            rowName: 'basketValue',
            parentDataKeysConfig: getirFoodDataKeys,
            childRowsConfig: {
              dataKey: getirFoodDataKeys.countryGroups,
              getRowConfigs: ({ rowData, countryIdToCountryGroupMap }) => {
                const countryIdToData = getTotalsObjectsByDateOfDateRangeData({ data: rowData });

                return getCountryGroupRowsConfigs({
                  countryIdToData,
                  countryIdToCountryGroupMap,
                  parentDataKeysConfig: getirFoodDataKeys,
                });
              },
            },
          });
        },
      },
    },
    {
      name: rowNames.basketAverage,
      dataKey: getirFoodDataKeys.total,
      chartKey: getirFoodTableChartKeys.basketAverage,
      errorMsg,
      initialFormatter: params => (
        getTotalForFinancials({ ...params, rowName: 'basketAverage' })
      ),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirFoodDataKeys.deliveryType,
        getRowConfigs: ({ currency, dataFromDataKey }) => {
          return getGetirFoodDeliveryTypeForFinancialRowConfigs({
            rowFinancialData: dataFromDataKey?.financials,
            t,
            currency,
            rowName: 'basketAverage',
            parentDataKeysConfig: getirFoodDataKeys,
            childRowsConfig: {
              dataKey: getirFoodDataKeys.countryGroups,
              getRowConfigs: ({ rowData, countryIdToCountryGroupMap }) => {
                const countryIdToData = getTotalsObjectsByDateOfDateRangeData({ data: rowData });

                return getCountryGroupRowsConfigs({
                  countryIdToData,
                  countryIdToCountryGroupMap,
                  parentDataKeysConfig: getirFoodDataKeys,
                });
              },
            },
          });
        },
      },
    },
    {
      name: rowNames.deliveryFee,
      dataKey: getirFoodDataKeys.total,
      chartKey: getirFoodTableChartKeys.deliveryFee,
      errorMsg,
      initialFormatter: params => (
        getTotalForFinancials({ ...params, rowName: 'deliveryFee' })
      ),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirFoodDataKeys.deliveryType,
        getRowConfigs: ({ currency, dataFromDataKey }) => {
          return getGetirFoodDeliveryTypeForFinancialRowConfigs({
            rowFinancialData: dataFromDataKey?.financials,
            t,
            currency,
            rowName: 'deliveryFee',
            parentDataKeysConfig: getirFoodDataKeys,
            childRowsConfig: {
              dataKey: getirFoodDataKeys.countryGroups,
              getRowConfigs: ({ rowData, countryIdToCountryGroupMap }) => {
                const countryIdToData = getTotalsObjectsByDateOfDateRangeData({ data: rowData });

                return getCountryGroupRowsConfigs({
                  countryIdToData,
                  countryIdToCountryGroupMap,
                  parentDataKeysConfig: getirFoodDataKeys,
                });
              },
            },
          });
        },
      },
    },
  ];
};

// everything fetched same time, into same data key
const getirLocalsDataKeys = {
  total: 'getirLocalsData',
  deliveryType: 'getirLocalsData',
  countryGroups: 'getirLocalsData',
  countries: 'getirLocalsData',
};

const getGetirLocalsGMVRowsConfigs = ({ t, dataFromDataKey, currency, computedDateRanges }) => {
  const configs = [];

  LOCALS_DELIVERY_TYPES.forEach(deliveryTypeValue => {
    const data = dataFromDataKey?.financials?.[currency?.toLowerCase()];

    if (data) {
      const basketValueDataByDeliveryType = data.basketValue?.[deliveryTypeValue];
      const deliveryFeeDataByDeliveryType = data.deliveryFee?.[deliveryTypeValue];

      const grossMarketValue = getGrossMarketValueFromGetirFinancials({
        basketValueData: basketValueDataByDeliveryType?.totals,
        deliveryFeeData: deliveryFeeDataByDeliveryType?.totals,
        dateRanges: computedDateRanges,
      });

      configs.push({
        name: t(`global:LOCALS_DELIVERY_TYPES.${deliveryTypeValue}`),
        dataKey: getirLocalsDataKeys.deliveryType,
        initialFormatter: () => {
          const allZero = Object.values(grossMarketValue).every(val => val === 0);
          return allZero ? null : grossMarketValue;
        },
        childRowsConfig: {
          dataKey: getirLocalsDataKeys.countryGroups,
          getRowConfigs: ({ countryIdToCountryGroupMap }) => {
            return getFinancialsGMVCountryGroupRowsConfigs({
              basketValue: basketValueDataByDeliveryType?.subTable,
              deliveryFee: deliveryFeeDataByDeliveryType?.subTable,
              countryIdToCountryGroupMap,
              parentDataKeysConfig: getirLocalsDataKeys.deliveryType,
              computedDateRanges,
            });
          },
        },
      });
    }
  });

  return configs;
};

export const getGetirLocalsTableRowConfigs = ({ t, computedDateRanges }) => {
  const rowNames = {
    sectionHeader: t('global:GETIR_LOCALS'),
    orderCounts: t('global:ORDER'),
    organicCounts: t('ORGANIC_ORDER_TOTAL'),
    promoUsedCounts: t('PROMO_USED_TOTAL'),
    missedCounts: t('MISSED_ORDER_TOTAL'),
    demandCounts: t('TOTAL_DEMAND'),
    gmv: t('GMV'),
    chargedAmount: t('CHARGED_AMOUNT'),
    netRevenue: t('NET_REVENUE'),
    grossMargin: t('GROSS_MARGIN'),
    basketValue: t('BASKET_TOTAL'),
    basketAverage: t('BASKET_AVERAGE'),
    deliveryFee: t('DELIVERY_FEE'),
  };

  // since we fetch all the related data together
  const errorMsg = t('MISSING_GETIR_LOCALS_DATA');

  return [
    {
      name: rowNames.sectionHeader,
      dataKey: getirLocalsDataKeys.total,
      isSectionHeader: true,
    },
    {
      name: rowNames.orderCounts,
      dataKey: getirLocalsDataKeys.total,
      chartKey: getirLocalsTableChartKeys.orderCounts,
      endpoint: getGetirLocalsData,
      customRequestBody: {},
      errorMsg,
      initialFormatter: ({ dataFromDataKey, startDates }) => (
        getTotalCountsForFirstRow({ dimension: dataFromDataKey?.orderCounts, startDates })
      ),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirLocalsDataKeys.deliveryType,
        getRowConfigs: ({ dataFromDataKey }) => (
          getGetirLocalsDeliveryTypeRowConfigs({
            t,
            rowData: dataFromDataKey?.orderCounts,
            parentDataKeysConfig: getirLocalsDataKeys,
            childRowsConfig: {
              dataKey: getirLocalsDataKeys.countryGroups,
              getRowConfigs: ({ rowData, countryIdToCountryGroupMap }) => {
                const countryIdToData = getTotalsObjectsByDateOfDateRangeData({ data: rowData });

                return getCountryGroupRowsConfigs({
                  countryIdToData,
                  countryIdToCountryGroupMap,
                  parentDataKeysConfig: getirLocalsDataKeys,
                });
              },
            },
          })
        ),
      },
    },
    {
      name: rowNames.organicCounts,
      dataKey: getirLocalsDataKeys.total,
      chartKey: getirLocalsTableChartKeys.organicCounts,
      customRequestBody: {},
      errorMsg,
      initialFormatter: ({ dataFromDataKey, startDates }) => (
        getTotalCountsForFirstRow({ dimension: dataFromDataKey?.organicCounts, startDates })
      ),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirLocalsDataKeys.deliveryType,
        getRowConfigs: ({ dataFromDataKey }) => (
          getGetirLocalsDeliveryTypeRowConfigs({
            t,
            rowData: dataFromDataKey?.organicCounts,
            parentDataKeysConfig: getirLocalsDataKeys,
            childRowsConfig: {
              dataKey: getirLocalsDataKeys.countryGroups,
              getRowConfigs: ({ rowData, countryIdToCountryGroupMap }) => {
                const countryIdToData = getTotalsObjectsByDateOfDateRangeData({ data: rowData });

                return getCountryGroupRowsConfigs({
                  countryIdToData,
                  countryIdToCountryGroupMap,
                  parentDataKeysConfig: getirLocalsDataKeys,
                });
              },
            },
          })
        ),
      },
    },
    {
      name: rowNames.promoUsedCounts,
      dataKey: getirLocalsDataKeys.total,
      chartKey: getirLocalsTableChartKeys.promoUsedCounts,
      customRequestBody: {},
      errorMsg,
      initialFormatter: ({ dataFromDataKey, startDates }) => (
        getTotalCountsForFirstRow({ dimension: dataFromDataKey?.promoUsedCounts, startDates })
      ),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirLocalsDataKeys.deliveryType,
        getRowConfigs: ({ dataFromDataKey }) => (
          getGetirLocalsDeliveryTypeRowConfigs({
            t,
            rowData: dataFromDataKey?.promoUsedCounts,
            parentDataKeysConfig: getirLocalsDataKeys,
            childRowsConfig: {
              dataKey: getirLocalsDataKeys.countryGroups,
              getRowConfigs: ({ rowData, countryIdToCountryGroupMap }) => {
                const countryIdToData = getTotalsObjectsByDateOfDateRangeData({ data: rowData });

                return getCountryGroupRowsConfigs({
                  countryIdToData,
                  countryIdToCountryGroupMap,
                  parentDataKeysConfig: getirLocalsDataKeys,
                });
              },
            },
          })
        ),
      },
    },
    {
      name: rowNames.missedCounts,
      dataKey: getirLocalsDataKeys.total,
      chartKey: getirLocalsTableChartKeys.missedCounts,
      customRequestBody: {},
      errorMsg,
      initialFormatter: ({ dataFromDataKey, startDates }) => (
        getTotalCountsForFirstRow({ dimension: dataFromDataKey?.missedCounts, startDates })
      ),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirLocalsDataKeys.deliveryType,
        getRowConfigs: ({ dataFromDataKey }) => (
          getGetirLocalsDeliveryTypeRowConfigs({
            t,
            rowData: dataFromDataKey?.missedCounts,
            parentDataKeysConfig: getirLocalsDataKeys,
            childRowsConfig: {
              dataKey: getirLocalsDataKeys.countryGroups,
              getRowConfigs: ({ rowData, countryIdToCountryGroupMap }) => {
                const countryIdToData = getTotalsObjectsByDateOfDateRangeData({ data: rowData });

                return getCountryGroupRowsConfigs({
                  countryIdToData,
                  countryIdToCountryGroupMap,
                  parentDataKeysConfig: getirLocalsDataKeys,
                });
              },
            },
          })
        ),
      },
    },
    {
      name: rowNames.demandCounts,
      dataKey: getirLocalsDataKeys.total,
      chartKey: getirLocalsTableChartKeys.demandCounts,
      customRequestBody: {},
      errorMsg,
      initialFormatter: ({ dataFromDataKey, startDates }) => (
        getTotalCountsForFirstRow({ dimension: dataFromDataKey?.demandCounts, startDates })
      ),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirLocalsDataKeys.deliveryType,
        getRowConfigs: ({ dataFromDataKey }) => (
          getGetirLocalsDeliveryTypeRowConfigs({
            t,
            rowData: dataFromDataKey?.demandCounts,
            parentDataKeysConfig: getirLocalsDataKeys,
            childRowsConfig: {
              dataKey: getirLocalsDataKeys.countryGroups,
              getRowConfigs: ({ rowData, countryIdToCountryGroupMap }) => {
                const countryIdToData = getTotalsObjectsByDateOfDateRangeData({ data: rowData });

                return getCountryGroupRowsConfigs({
                  countryIdToData,
                  countryIdToCountryGroupMap,
                  parentDataKeysConfig: getirLocalsDataKeys,
                });
              },
            },
          })
        ),
      },
    },
    {
      name: rowNames.chargedAmount,
      dataKey: getirLocalsDataKeys.total,
      chartKey: getirLocalsTableChartKeys.chargedAmount,
      errorMsg,
      initialFormatter: params => (
        getTotalForFinancials({ ...params, rowName: 'chargedAmount' })
      ),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirLocalsDataKeys.deliveryType,
        getRowConfigs: ({ currency, dataFromDataKey }) => {
          return getGetirLocalsDeliveryTypeForFinancialRowConfigs({
            rowFinancialData: dataFromDataKey?.financials,
            t,
            currency,
            rowName: 'chargedAmount',
            parentDataKeysConfig: getirLocalsDataKeys,
            childRowsConfig: {
              dataKey: getirLocalsDataKeys.countryGroups,
              getRowConfigs: ({ rowData, countryIdToCountryGroupMap }) => {
                const countryIdToData = getTotalsObjectsByDateOfDateRangeData({ data: rowData });

                return getCountryGroupRowsConfigs({
                  countryIdToData,
                  countryIdToCountryGroupMap,
                  parentDataKeysConfig: getirLocalsDataKeys,
                });
              },
            },
          });
        },
      },
    },
    {
      name: rowNames.gmv,
      dataKey: getirLocalsDataKeys.total,
      chartKey: getirLocalsTableChartKeys.gmv,
      errorMsg,
      initialFormatter: params => {
        const basketValueData = getTotalForFinancials({ ...params, rowName: 'basketValue' });
        const deliveryFeeData = getTotalForFinancials({ ...params, rowName: 'deliveryFee' });

        const grossMarketValue = getGrossMarketValueFromGetirFinancials({
          basketValueData,
          deliveryFeeData,
          dateRanges: computedDateRanges,
        });

        return Object.values(grossMarketValue)?.every(val => val === 0) ? null : grossMarketValue;
      },
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirLocalsDataKeys.deliveryType,
        getRowConfigs: ({ currency, dataFromDataKey }) => {
          return getGetirLocalsGMVRowsConfigs({ t, dataFromDataKey, computedDateRanges, currency });
        },
      },
    },
    {
      name: rowNames.netRevenue,
      dataKey: getirLocalsDataKeys.total,
      chartKey: getirLocalsTableChartKeys.netRevenue,
      errorMsg,
      initialFormatter: params => (
        getTotalForFinancials({ ...params, rowName: 'netRevenue' })
      ),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirLocalsDataKeys.deliveryType,
        getRowConfigs: ({ currency, dataFromDataKey }) => {
          return getGetirLocalsDeliveryTypeForFinancialRowConfigs({
            rowFinancialData: dataFromDataKey?.financials,
            t,
            currency,
            rowName: 'netRevenue',
            parentDataKeysConfig: getirLocalsDataKeys,
            childRowsConfig: {
              dataKey: getirLocalsDataKeys.countryGroups,
              getRowConfigs: ({ rowData, countryIdToCountryGroupMap }) => {
                const countryIdToData = getTotalsObjectsByDateOfDateRangeData({ data: rowData });

                return getCountryGroupRowsConfigs({
                  countryIdToData,
                  countryIdToCountryGroupMap,
                  parentDataKeysConfig: getirLocalsDataKeys,
                });
              },
            },
          });
        },
      },
    },
    {
      name: rowNames.grossMargin,
      dataKey: getirLocalsDataKeys.total,
      chartKey: getirLocalsTableChartKeys.grossMargin,
      errorMsg,
      initialFormatter: params => (
        getTotalForFinancials({ ...params, rowName: 'grossMargin' })
      ),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirLocalsDataKeys.deliveryType,
        getRowConfigs: ({ currency, dataFromDataKey }) => {
          return getGetirLocalsDeliveryTypeForFinancialRowConfigs({
            rowFinancialData: dataFromDataKey?.financials,
            t,
            currency,
            rowName: 'grossMargin',
            parentDataKeysConfig: getirLocalsDataKeys,
            childRowsConfig: {
              dataKey: getirLocalsDataKeys.countryGroups,
              getRowConfigs: ({ rowData, countryIdToCountryGroupMap }) => {
                const countryIdToData = getTotalsObjectsByDateOfDateRangeData({ data: rowData });

                return getCountryGroupRowsConfigs({
                  countryIdToData,
                  countryIdToCountryGroupMap,
                  parentDataKeysConfig: getirLocalsDataKeys,
                });
              },
            },
          });
        },
      },
    },
    {
      name: rowNames.basketValue,
      dataKey: getirLocalsDataKeys.total,
      chartKey: getirLocalsTableChartKeys.basketValue,
      errorMsg,
      initialFormatter: params => (
        getTotalForFinancials({ ...params, rowName: 'basketValue' })
      ),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirLocalsDataKeys.deliveryType,
        getRowConfigs: ({ currency, dataFromDataKey }) => {
          return getGetirLocalsDeliveryTypeForFinancialRowConfigs({
            rowFinancialData: dataFromDataKey?.financials,
            t,
            currency,
            rowName: 'basketValue',
            parentDataKeysConfig: getirLocalsDataKeys,
            childRowsConfig: {
              dataKey: getirLocalsDataKeys.countryGroups,
              getRowConfigs: ({ rowData, countryIdToCountryGroupMap }) => {
                const countryIdToData = getTotalsObjectsByDateOfDateRangeData({ data: rowData });

                return getCountryGroupRowsConfigs({
                  countryIdToData,
                  countryIdToCountryGroupMap,
                  parentDataKeysConfig: getirLocalsDataKeys,
                });
              },
            },
          });
        },
      },
    },
    {
      name: rowNames.basketAverage,
      dataKey: getirLocalsDataKeys.total,
      chartKey: getirLocalsTableChartKeys.basketAverage,
      errorMsg,
      initialFormatter: params => (
        getTotalForFinancials({ ...params, rowName: 'basketAverage' })
      ),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirLocalsDataKeys.deliveryType,
        getRowConfigs: ({ currency, dataFromDataKey }) => {
          return getGetirLocalsDeliveryTypeForFinancialRowConfigs({
            rowFinancialData: dataFromDataKey?.financials,
            t,
            currency,
            rowName: 'basketAverage',
            parentDataKeysConfig: getirLocalsDataKeys,
            childRowsConfig: {
              dataKey: getirLocalsDataKeys.countryGroups,
              getRowConfigs: ({ rowData, countryIdToCountryGroupMap }) => {
                const countryIdToData = getTotalsObjectsByDateOfDateRangeData({ data: rowData });

                return getCountryGroupRowsConfigs({
                  countryIdToData,
                  countryIdToCountryGroupMap,
                  parentDataKeysConfig: getirLocalsDataKeys,
                });
              },
            },
          });
        },
      },
    },
    {
      name: rowNames.deliveryFee,
      dataKey: getirLocalsDataKeys.total,
      chartKey: getirLocalsTableChartKeys.deliveryFee,
      errorMsg,
      initialFormatter: params => (
        getTotalForFinancials({ ...params, rowName: 'deliveryFee' })
      ),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirLocalsDataKeys.deliveryType,
        getRowConfigs: ({ currency, dataFromDataKey }) => {
          return getGetirLocalsDeliveryTypeForFinancialRowConfigs({
            rowFinancialData: dataFromDataKey?.financials,
            t,
            currency,
            rowName: 'deliveryFee',
            parentDataKeysConfig: getirLocalsDataKeys,
            childRowsConfig: {
              dataKey: getirLocalsDataKeys.countryGroups,
              getRowConfigs: ({ rowData, countryIdToCountryGroupMap }) => {
                const countryIdToData = getTotalsObjectsByDateOfDateRangeData({ data: rowData });

                return getCountryGroupRowsConfigs({
                  countryIdToData,
                  countryIdToCountryGroupMap,
                  parentDataKeysConfig: getirLocalsDataKeys,
                });
              },
            },
          });
        },
      },
    },
  ];
};

// everything fetched same time, into same data key
const getirDriveDataKeys = {
  total: 'getirDriveData',
  sourceType: 'getirDriveData',
  countryGroups: 'getirDriveData',
  countries: 'getirDriveData',
};

export const getGetirDriveTableRowConfigs = ({ t }) => {
  const rowNames = {
    sectionHeader: t('global:GETIR_DRIVE'),
    organicCounts: t('ORGANIC_ORDER_TOTAL'),
    promoUsedCounts: t('PROMO_USED_TOTAL'),
    missedCounts: t('MISSED_ORDER_TOTAL'),
    rentalCounts: t('RENTAL'),
    chargedAmount: t('CHARGED_AMOUNT'),
    netRevenue: t('NET_REVENUE'),
    grossMargin: t('GROSS_MARGIN'),
    basketValue: t('BASKET_TOTAL'),
    basketAverage: t('BASKET_AVERAGE'),
    uniqueTabClickCounts: t('TAB_CLICK_UNIQUE'),
    totalTabClickCounts: t('TAB_CLICK_TOTAL'),
  };

  // since we fetch all the related data together
  const errorMsg = t('MISSING_GETIR_DRIVE_DATA');

  return [
    {
      name: rowNames.sectionHeader,
      dataKey: getirDriveDataKeys.total,
      isSectionHeader: true,
    },
    {
      name: rowNames.rentalCounts,
      dataKey: getirDriveDataKeys.total,
      chartKey: getirDriveTableChartKeys.successfulRentalCounts,
      endpoint: getGetirDriveData,
      customRequestBody: {},
      errorMsg,
      initialFormatter: ({ dataFromDataKey, startDates }) => (
        getTotalCountsForFirstRow({ dimension: dataFromDataKey?.successfulRentalCounts, startDates })
      ),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirDriveDataKeys.sourceType,
        getRowConfigs: ({ dataFromDataKey }) => (
          getGetirDriveSourceTypeRowConfigs({
            t,
            rowData: dataFromDataKey?.successfulRentalCounts,
            parentDataKeysConfig: getirDriveDataKeys,
            childRowsConfig: {
              dataKey: getirDriveDataKeys.countryGroups,
              getRowConfigs: ({ rowData, countryIdToCountryGroupMap }) => {
                const countryIdToData = getTotalsObjectsByDateOfDateRangeData({ data: rowData });

                return getCountryGroupRowsConfigs({
                  countryIdToData,
                  countryIdToCountryGroupMap,
                  parentDataKeysConfig: getirDriveDataKeys,
                });
              },
            },
          })
        ),
      },
    },
    {
      name: rowNames.organicCounts,
      dataKey: getirDriveDataKeys.total,
      chartKey: getirDriveTableChartKeys.organicCounts,
      errorMsg,
      initialFormatter: ({ dataFromDataKey, startDates }) => (
        getTotalCountsForFirstRow({ dimension: dataFromDataKey?.organicCounts, startDates })
      ),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirDriveDataKeys.sourceType,
        getRowConfigs: ({ dataFromDataKey }) => (
          getGetirDriveSourceTypeRowConfigs({
            t,
            rowData: dataFromDataKey?.organicCounts,
            parentDataKeysConfig: getirDriveDataKeys,
            childRowsConfig: {
              dataKey: getirDriveDataKeys.countryGroups,
              getRowConfigs: ({ rowData, countryIdToCountryGroupMap }) => {
                const countryIdToData = getTotalsObjectsByDateOfDateRangeData({ data: rowData });

                return getCountryGroupRowsConfigs({
                  countryIdToData,
                  countryIdToCountryGroupMap,
                  parentDataKeysConfig: getirDriveDataKeys,
                });
              },
            },
          })
        ),
      },
    },
    {
      name: rowNames.promoUsedCounts,
      dataKey: getirDriveDataKeys.total,
      chartKey: getirDriveTableChartKeys.promoUsedCounts,
      errorMsg,
      initialFormatter: ({ dataFromDataKey, startDates }) => (
        getTotalCountsForFirstRow({ dimension: dataFromDataKey?.promoUsedCounts, startDates })
      ),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirDriveDataKeys.sourceType,
        getRowConfigs: ({ dataFromDataKey }) => (
          getGetirDriveSourceTypeRowConfigs({
            t,
            rowData: dataFromDataKey?.promoUsedCounts,
            parentDataKeysConfig: getirDriveDataKeys,
            childRowsConfig: {
              dataKey: getirDriveDataKeys.countryGroups,
              getRowConfigs: ({ rowData, countryIdToCountryGroupMap }) => {
                const countryIdToData = getTotalsObjectsByDateOfDateRangeData({ data: rowData });

                return getCountryGroupRowsConfigs({
                  countryIdToData,
                  countryIdToCountryGroupMap,
                  parentDataKeysConfig: getirDriveDataKeys,
                });
              },
            },
          })
        ),
      },
    },
    {
      name: rowNames.missedCounts,
      dataKey: getirDriveDataKeys.total,
      chartKey: getirDriveTableChartKeys.missedCounts,
      errorMsg,
      initialFormatter: ({ dataFromDataKey, startDates }) => (
        getTotalCountsForFirstRow({ dimension: dataFromDataKey?.missedCounts, startDates })
      ),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirDriveDataKeys.sourceType,
        getRowConfigs: ({ dataFromDataKey }) => (
          getGetirDriveSourceTypeRowConfigs({
            t,
            rowData: dataFromDataKey?.missedCounts,
            parentDataKeysConfig: getirDriveDataKeys,
            childRowsConfig: {
              dataKey: getirDriveDataKeys.countryGroups,
              getRowConfigs: ({ rowData, countryIdToCountryGroupMap }) => {
                const countryIdToData = getTotalsObjectsByDateOfDateRangeData({ data: rowData });

                return getCountryGroupRowsConfigs({
                  countryIdToData,
                  countryIdToCountryGroupMap,
                  parentDataKeysConfig: getirDriveDataKeys,
                });
              },
            },
          })
        ),
      },
    },
    {
      name: rowNames.chargedAmount,
      dataKey: getirDriveDataKeys.total,
      chartKey: getirDriveTableChartKeys.chargedAmount,
      errorMsg,
      initialFormatter: params => getTotalForGetirDriveFinancials({ ...params, rowName: 'chargedAmount' }),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirDriveDataKeys.sourceType,
        getRowConfigs: ({ currency, dataFromDataKey }) => (
          getGetirDriveSourceTypeForFinancialsRowConfigs({
            currency,
            rowName: 'chargedAmount',
            t,
            rowFinancialData: dataFromDataKey?.financials,
            parentDataKeysConfig: getirDriveDataKeys,
            childRowsConfig: {
              dataKey: getirDriveDataKeys.countryGroups,
              getRowConfigs: ({ rowData, countryIdToCountryGroupMap }) => {
                const countryIdToData = getTotalsObjectsByDateOfDateRangeData({ data: rowData });

                return getCountryGroupRowsConfigs({
                  countryIdToData,
                  countryIdToCountryGroupMap,
                  parentDataKeysConfig: getirDriveDataKeys,
                });
              },
            },
          })
        ),
      },
    },
    {
      name: rowNames.netRevenue,
      dataKey: getirDriveDataKeys.total,
      chartKey: getirDriveTableChartKeys.netRevenue,
      errorMsg,
      initialFormatter: params => getTotalForGetirDriveFinancials({ ...params, rowName: 'netRevenue' }),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirDriveDataKeys.sourceType,
        getRowConfigs: ({ currency, dataFromDataKey }) => (
          getGetirDriveSourceTypeForFinancialsRowConfigs({
            currency,
            rowName: 'netRevenue',
            t,
            rowFinancialData: dataFromDataKey?.financials,
            parentDataKeysConfig: getirDriveDataKeys,
            childRowsConfig: {
              dataKey: getirDriveDataKeys.countryGroups,
              getRowConfigs: ({ rowData, countryIdToCountryGroupMap }) => {
                const countryIdToData = getTotalsObjectsByDateOfDateRangeData({ data: rowData });

                return getCountryGroupRowsConfigs({
                  countryIdToData,
                  countryIdToCountryGroupMap,
                  parentDataKeysConfig: getirDriveDataKeys,
                });
              },
            },
          })
        ),
      },
    },
    {
      name: rowNames.grossMargin,
      dataKey: getirDriveDataKeys.total,
      chartKey: getirDriveTableChartKeys.grossMargin,
      errorMsg,
      initialFormatter: params => getTotalForGetirDriveFinancials({ ...params, rowName: 'grossMargin' }),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirDriveDataKeys.sourceType,
        getRowConfigs: ({ currency, dataFromDataKey }) => (
          getGetirDriveSourceTypeForFinancialsRowConfigs({
            currency,
            rowName: 'grossMargin',
            t,
            rowFinancialData: dataFromDataKey?.financials,
            parentDataKeysConfig: getirDriveDataKeys,
            childRowsConfig: {
              dataKey: getirDriveDataKeys.countryGroups,
              getRowConfigs: ({ rowData, countryIdToCountryGroupMap }) => {
                const countryIdToData = getTotalsObjectsByDateOfDateRangeData({ data: rowData });

                return getCountryGroupRowsConfigs({
                  countryIdToData,
                  countryIdToCountryGroupMap,
                  parentDataKeysConfig: getirDriveDataKeys,
                });
              },
            },
          })
        ),
      },
    },
    {
      name: rowNames.basketValue,
      dataKey: getirDriveDataKeys.total,
      chartKey: getirDriveTableChartKeys.basketValue,
      errorMsg,
      initialFormatter: params => getTotalForGetirDriveFinancials({ ...params, rowName: 'basketValue' }),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirDriveDataKeys.sourceType,
        getRowConfigs: ({ currency, dataFromDataKey }) => (
          getGetirDriveSourceTypeForFinancialsRowConfigs({
            currency,
            rowName: 'basketValue',
            t,
            rowFinancialData: dataFromDataKey?.financials,
            parentDataKeysConfig: getirDriveDataKeys,
            childRowsConfig: {
              dataKey: getirDriveDataKeys.countryGroups,
              getRowConfigs: ({ rowData, countryIdToCountryGroupMap }) => {
                const countryIdToData = getTotalsObjectsByDateOfDateRangeData({ data: rowData });

                return getCountryGroupRowsConfigs({
                  countryIdToData,
                  countryIdToCountryGroupMap,
                  parentDataKeysConfig: getirDriveDataKeys,
                });
              },
            },
          })
        ),
      },
    },
    {
      name: rowNames.basketAverage,
      dataKey: getirDriveDataKeys.total,
      chartKey: getirDriveTableChartKeys.basketAverage,
      errorMsg,
      initialFormatter: params => getTotalBasketAverageForGetirDrive({ ...params, rowName: 'basketAverage' }),
      shouldItBeAffectedFromSorting: false,
      shouldAssignCurrencyFormatter: true,
      childRowsConfig: {
        dataKey: getirDriveDataKeys.sourceType,
        getRowConfigs: ({ currency, dataFromDataKey }) => (
          getGetirDriveSourceTypeForFinancialsRowConfigs({
            rentalCount: dataFromDataKey.successfulRentalCounts,
            currency,
            rowName: 'basketAverage',
            t,
            rowFinancialData: dataFromDataKey?.financials,
            parentDataKeysConfig: getirDriveDataKeys,
            childRowsConfig: {
              dataKey: getirDriveDataKeys.countryGroups,
              getRowConfigs: ({ rowData, countryIdToCountryGroupMap }) => {
                const countryIdToData = getTotalsObjectsByDateOfDateRangeData({ data: rowData });

                return getCountryGroupRowsConfigs({
                  countryIdToData,
                  countryIdToCountryGroupMap,
                  parentDataKeysConfig: getirDriveDataKeys,
                });
              },
            },
          })
        ),
      },
    },
    {
      name: rowNames.uniqueTabClickCounts,
      dataKey: getirDriveDataKeys.total,
      chartKey: getirDriveTableChartKeys.uniqueTabClickCounts,
      errorMsg,
      initialFormatter: ({ dataFromDataKey }) => dataFromDataKey?.uniqueTabClickCounts?.undefined?.totals || {},
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirDriveDataKeys.countryGroups,
        getRowConfigs: ({ dataFromDataKey, countryIdToCountryGroupMap }) => {
          return getGetirDriveCountryRowConfigs({
            rowData: dataFromDataKey?.uniqueTabClickCounts?.undefined?.subTable || {},
            countryIdToCountryGroupMap,
            parentDataKeysConfig: getirDriveDataKeys.total,
          });
        },
      },
    },
    {
      name: rowNames.totalTabClickCounts,
      dataKey: getirDriveDataKeys.total,
      chartKey: getirDriveTableChartKeys.totalTabClickCounts,
      errorMsg,
      initialFormatter: ({ dataFromDataKey }) => dataFromDataKey?.totalTabClickCounts?.undefined?.totals || {},
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirDriveDataKeys.countryGroups,
        getRowConfigs: ({ dataFromDataKey, countryIdToCountryGroupMap }) => {
          return getGetirDriveCountryRowConfigs({
            rowData: dataFromDataKey?.totalTabClickCounts?.undefined?.subTable || {},
            countryIdToCountryGroupMap,
            parentDataKeysConfig: getirDriveDataKeys.total,
          });
        },
      },
    },
  ];
};

// everything fetched same time, into same data key
const getirJobsDataKeys = {
  total: 'getirJobsData',
  postTypes: 'getirJobsData',
  countryGroups: 'getirJobsData',
  countries: 'getirJobsData',
};

export const getGetirJobsTableRowConfigs = ({ t }) => {
  const rowNames = {
    sectionHeader: t('GETIR_JOBS'),
    posts: t('NEW_JOBS_POSTS'),
    applications: t('JOBS_APPLICATIONS'),
    registerUser: t('JOBS_REGISTER_USER'),
    videoCalls: t('JOBS_VIDEO_CALLS'),
  };

  // since we fetch all the related data together
  const errorMsg = t('MISSING_GETIR_JOBS_DATA');

  return [
    {
      name: rowNames.sectionHeader,
      dataKey: getirJobsDataKeys.total,
      isSectionHeader: true,
    },
    {
      name: rowNames.posts,
      dataKey: getirJobsDataKeys.total,
      chartKey: getirJobsTableChartKeys.posts,
      endpoint: getGetirJobsData,
      customRequestBody: { dimensions: ['posttype', 'country'] },
      errorMsg,
      initialFormatter: ({ dataFromDataKey, startDates }) => getTotalForGetirJobs({ postTypesData: dataFromDataKey?.posts, startDates }),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirJobsDataKeys.postTypes,
        getRowConfigs: ({ dataFromDataKey }) => (
          getGetirJobsPostTypeRowConfigsWithCountryRows({ rowData: dataFromDataKey?.posts, t, parentDataKeysConfig: getirJobsDataKeys })
        ),
      },
    },
    {
      name: rowNames.applications,
      dataKey: getirJobsDataKeys.total,
      chartKey: getirJobsTableChartKeys.applications,
      initialFormatter: ({ dataFromDataKey, startDates }) => (
        getTotalForGetirJobs({ postTypesData: dataFromDataKey?.applications, startDates })
      ),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirJobsDataKeys.postTypes,
        getRowConfigs: ({ dataFromDataKey }) => (
          getGetirJobsPostTypeRowConfigsWithCountryRows({ rowData: dataFromDataKey?.applications, t, parentDataKeysConfig: getirJobsDataKeys })
        ),
      },
    },
    {
      name: rowNames.videoCalls,
      dataKey: getirJobsDataKeys.total,
      chartKey: getirJobsTableChartKeys.finishedVideoCall,
      shouldItBeAffectedFromSorting: true,
      initialFormatter: ({ dataFromDataKey, startDates }) => (
        getTotalForGetirJobs({ postTypesData: dataFromDataKey?.finishedVideoCall, startDates })
      ),
      childRowsConfig: {
        dataKey: getirJobsDataKeys.countryGroups,
        getRowConfigs: ({ countryIdToCountryGroupMap, dataFromDataKey }) => (
          getGetirJobsCountryRowConfigs({ rowData: dataFromDataKey?.finishedVideoCall, countryIdToCountryGroupMap, parentDataKeysConfig: getirJobsDataKeys })
        ),
      },
    },
    {
      name: rowNames.registerUser,
      dataKey: getirJobsDataKeys.total,
      chartKey: getirJobsTableChartKeys.registerUser,
      shouldItBeAffectedFromSorting: true,
      initialFormatter: ({ dataFromDataKey, startDates }) => (
        getTotalForGetirJobs({ postTypesData: dataFromDataKey?.registerUser, startDates })
      ),
      childRowsConfig: {
        dataKey: getirJobsDataKeys.countryGroups,
        getRowConfigs: ({ countryIdToCountryGroupMap, dataFromDataKey }) => (
          getGetirJobsCountryRowConfigs({ rowData: dataFromDataKey?.registerUser, countryIdToCountryGroupMap, parentDataKeysConfig: getirJobsDataKeys })
        ),
      },
    },
  ];
};

function getFinancialsCountryGroupRowsConfigs({
  numberFormatter,
  countryIdToData,
  countryIdToCountryGroupMap,
  parentDataKeysConfig,
  rowName,
  domainType,
  currency,
}) {
  if (!countryIdToCountryGroupMap?.size) return [];
  if (isEmpty(countryIdToData)) return [];
  const groupNames = getAvailableCountryGroupNames(countryIdToData, countryIdToCountryGroupMap);
  return groupNames.map(groupName => ({
    numberFormatter,
    name: groupName[getLangKey()],
    dataKey: parentDataKeysConfig,
    initialFormatter: ({ unformattedAllData, startDates }) => {
      if (rowName === 'basketAverage') {
        return getFinancialBasketAverageCountryGroupDataFromCountriesData({
          groupName,
          domainType,
          currency,
          unformattedAllData,
          countryIdToCountryGroupMap,
          startDates,
        });
      }
      return getFinancialsCountryGroupDataFromCountriesData(countryIdToData, groupName, countryIdToCountryGroupMap, startDates);
    },
    childRowsConfig: {
      dataKey: parentDataKeysConfig,
      getRowConfigs: ({ countryIdToCountryMap }) => getFinancialsCountryChildRowsConfigs({
        data: countryIdToData,
        numberFormatter,
        groupName,
        countryIdToCountryGroupMap,
        countryIdToCountryMap,
        parentDataKeysConfig,
      }),
    },
  }));
}

function getFinancialsGMVCountryGroupRowsConfigs({
  basketValue,
  deliveryFee,
  countryIdToCountryGroupMap,
  parentDataKeysConfig,
  computedDateRanges,
}) {
  if (!countryIdToCountryGroupMap?.size) return [];
  if (isEmpty(basketValue)) return [];
  const groupNames = getAvailableCountryGroupNames(basketValue, countryIdToCountryGroupMap);
  return groupNames.map(groupName => ({
    name: groupName[getLangKey()],
    dataKey: parentDataKeysConfig,
    initialFormatter: ({ startDates }) => {
      const basketValueData = getFinancialsCountryGroupDataFromCountriesData(basketValue, groupName, countryIdToCountryGroupMap, startDates);
      const deliveryFeeData = getFinancialsCountryGroupDataFromCountriesData(deliveryFee, groupName, countryIdToCountryGroupMap, startDates);
      return getGrossMarketValueFromGetirFinancials({ basketValueData, deliveryFeeData, dateRanges: computedDateRanges });
    },
    childRowsConfig: {
      dataKey: parentDataKeysConfig,
      getRowConfigs: ({ countryIdToCountryMap }) => getFinancialsGMVCountryChildRowsConfigs({
        basketValue,
        deliveryFee,
        groupName,
        countryIdToCountryGroupMap,
        countryIdToCountryMap,
        parentDataKeysConfig,
        computedDateRanges,
      }),
    },
  }));
}

function getFinancialsCountryChildRowsConfigs({
  data: countryIdToData,
  numberFormatter,
  groupName,
  countryIdToCountryGroupMap,
  countryIdToCountryMap,
  parentDataKeysConfig,
}) {
  if (!countryIdToCountryGroupMap?.size) return [];
  if (!countryIdToCountryMap?.size) return [];
  if (isEmpty(countryIdToData)) return [];
  return getCountriesFromCountriesData({
    countryIdToCountryGroupMap,
    countryIdToCountryMap,
    countryIdToData,
    countryGroupName: groupName,
  }).map(country => ({
    numberFormatter,
    name: country.name[getLangKey()],
    dataKey: parentDataKeysConfig,
    initialFormatter: () => getFinancialsCountryDataFromCountriesData({ countryIdToData, country }),
  }));
}

function getFinancialsGMVCountryChildRowsConfigs({
  basketValue,
  deliveryFee,
  groupName,
  countryIdToCountryGroupMap,
  countryIdToCountryMap,
  parentDataKeysConfig,
  computedDateRanges,
}) {
  if (!countryIdToCountryGroupMap?.size) return [];
  if (!countryIdToCountryMap?.size) return [];
  if (isEmpty(basketValue) && isEmpty(deliveryFee)) return [];
  return getCountriesFromCountriesData({
    countryIdToCountryGroupMap,
    countryIdToCountryMap,
    countryIdToData: basketValue,
    countryGroupName: groupName,
  }).map(country => ({
    name: country.name[getLangKey()],
    dataKey: parentDataKeysConfig,
    initialFormatter: () => {
      const basketValueData = getFinancialsCountryDataFromCountriesData({ countryIdToData: basketValue, country });
      const deliveryFeeData = getFinancialsCountryDataFromCountriesData({ countryIdToData: deliveryFee, country });
      return getGrossMarketValueFromGetirFinancials({ basketValueData, deliveryFeeData, dateRanges: computedDateRanges });
    },
  }));
}

function getGetirFinancialsRowsConfigs({ dataFromDataKey: domainTypesData, numberFormatter, currency, t, rowName }) {
  const configs = [];
  Object.entries(GETIR_FINANCIALS_DOMAIN_TYPES).forEach(([domainKey, domainType]) => {
    const data = domainTypesData?.[domainKey]?.[currency?.toLowerCase()];
    if (data) {
      const objectKey = Object.keys(data[rowName])[0] || undefined;

      configs.push({
        name: t(`global:GETIR_MARKET_DOMAIN_TYPES.${domainType}`),
        dataKey: 'financials',
        numberFormatter,
        initialFormatter: () => getDomainTypeTotals({ domainData: data[rowName][objectKey]?.totals }),
        childRowsConfig: {
          dataKey: 'financials',
          getRowConfigs: ({ countryIdToCountryGroupMap }) => {
            return getFinancialsCountryGroupRowsConfigs({
              numberFormatter,
              countryIdToCountryGroupMap,
              rowName,
              currency,
              domainType: domainKey,
              countryIdToData: data[rowName][objectKey]?.subTable,
              parentDataKeysConfig: 'financials',
            });
          },
        },
      });
    }
  });

  return configs;
}

function getGetirFinancialsGMVRowsConfigs({ dataFromDataKey: domainTypesData, currency, t, computedDateRanges }) {
  const configs = [];
  Object.entries(GETIR_FINANCIALS_DOMAIN_TYPES).forEach(([domainKey, domainType]) => {
    const data = domainTypesData?.[domainKey]?.[currency?.toLowerCase()];
    if (data) {
      const basketValue = Object.values(data?.basketValue || {})[0] || {};
      const deliveryFee = Object.values(data?.deliveryFee || {})[0] || {};

      configs.push({
        name: t(`global:GETIR_MARKET_DOMAIN_TYPES.${domainType}`),
        dataKey: 'financials',
        initialFormatter: () => {
          const basketValueData = getDomainTypeTotals({ domainData: basketValue.totals || {} });
          const deliveryFeeData = getDomainTypeTotals({ domainData: deliveryFee.totals || {} });
          return getGrossMarketValueFromGetirFinancials({ basketValueData, deliveryFeeData, dateRanges: computedDateRanges });
        },
        childRowsConfig: {
          dataKey: 'financials',
          getRowConfigs: ({ countryIdToCountryGroupMap }) => {
            if (isEmpty(basketValue.subTable)) {
              return {};
            }
            return getFinancialsGMVCountryGroupRowsConfigs({
              basketValue: basketValue.subTable,
              deliveryFee: deliveryFee.subTable,
              countryIdToCountryGroupMap,
              parentDataKeysConfig: 'financials',
              computedDateRanges,
            });
          },
        },
      });
    }
  });

  return configs;
}

// GetirN11
function getGetirN11SourceAndCategoryAndCountryRowsConfigs({ rowData, t, parentDataKey, numberFormatter }) {
  if (isEmpty(rowData)) {
    return [];
  }

  return getGetirN11SourceTypeRowConfigs({
    t,
    rowData,
    parentDataKey,
    numberFormatter,
    childRowsConfig: {
      dataKey: parentDataKey,
      getRowConfigs: ({ rowData: categoryData }) => {
        return getGetirN11CategoryGroupRowsConfigs({
          t,
          parentDataKey,
          rowData: categoryData,
          numberFormatter,
          childRowsConfig: {
            dataKey: parentDataKey,
            getRowConfigs: ({ rowData: countryData, countryIdToCountryGroupMap }) => {
              const countryIdToData = getSimplifiedTotalsData({ dataWithTotals: countryData });
              return getCountryGroupRowsConfigs({
                countryIdToData,
                countryIdToCountryGroupMap,
                numberFormatter,
                parentDataKeysConfig: { countries: parentDataKey, countryGroups: parentDataKey },
              });
            },
          },
        });
      },
    },
  });
}

export function getGetirN11FinancialsRowsConfigs({ numberFormatter, dataFromDataKey, parentDataKey, currency, t, rowName }) {
  const financialDataByCurrency = dataFromDataKey.financials[currency.toLowerCase()];
  const rowData = get(financialDataByCurrency, [rowName, 'undefined', 'subTable'], {});

  return getGetirN11SourceAndCategoryAndCountryRowsConfigs({
    rowData,
    t,
    parentDataKey,
    numberFormatter,
  });
}

const getirN11DataKey = 'getirN11Data';

export const getGetirN11TableRowConfigs = ({ t }) => {
  const rowNames = {
    sectionHeader: t('GETIR_N11'),
    orderCount: t('ORDER'),
    grossMarketValue: t('GROSS_MARKET_VALUE_SHORT'),
    revenue: t('REVENUE'),
    otherRevenue: t('OTHER_REVENUE'),
    netRevenue: t('NET_REVENUE'),
    gmvAverage: t('GMV_PER_ORDER'),
    revenueAverage: t('REVENUE_PER_ORDER'),
    totalTraffic: t('APP_OPEN_TOTAL'),
  };

  // since we fetch all the related data together
  const errorMsg = t('MISSING_GETIR_N11_DATA');

  return [
    {
      name: rowNames.sectionHeader,
      dataKey: getirN11DataKey,
      isSectionHeader: true,
    },
    {
      name: rowNames.orderCount,
      dataKey: getirN11DataKey,
      chartKey: getirN11TableChartKeys.orderCount,
      endpoint: getGetirN11Data,
      customRequestBody: {},
      errorMsg,
      initialFormatter: ({ dataFromDataKey, startDates }) => (
        getTotalCountsForFirstRow({ dimension: dataFromDataKey.orderCount, startDates, excludedKey: GETIR_N11_SOURCE_TYPE.N11_QUICK })
      ),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirN11DataKey,
        getRowConfigs: ({ dataFromDataKey }) => (
          getGetirN11SourceAndCategoryAndCountryRowsConfigs({
            t,
            rowData: dataFromDataKey?.orderCount,
            parentDataKey: getirN11DataKey,
          })
        ),
      },
    },
    {
      name: rowNames.grossMarketValue,
      dataKey: getirN11DataKey,
      chartKey: getirN11TableChartKeys.grossMarketValue,
      customRequestBody: {},
      errorMsg,
      initialFormatter: params => getTotalForGetirN11Financials({ ...params, rowName: 'totalGMV', excludedKey: GETIR_N11_SOURCE_TYPE.N11_QUICK }),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirN11DataKey,
        getRowConfigs: ({ dataFromDataKey, currency }) => getGetirN11FinancialsRowsConfigs({
          dataFromDataKey,
          currency,
          t,
          parentDataKey: getirN11DataKey,
          rowName: 'totalGMV',
        }),
      },
    },
    {
      name: rowNames.revenue,
      dataKey: getirN11DataKey,
      chartKey: getirN11TableChartKeys.revenue,
      customRequestBody: {},
      errorMsg,
      initialFormatter: params => getTotalForGetirN11Financials({ ...params, rowName: 'totalRevenue' }),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirN11DataKey,
        getRowConfigs: ({ dataFromDataKey, currency }) => getGetirN11FinancialsRowsConfigs({
          dataFromDataKey,
          currency,
          t,
          parentDataKey: getirN11DataKey,
          rowName: 'totalRevenue',
        }),
      },
    },
    {
      name: rowNames.netRevenue,
      dataKey: getirN11DataKey,
      chartKey: getirN11TableChartKeys.netRevenue,
      customRequestBody: {},
      errorMsg,
      initialFormatter: params => getTotalForGetirN11Financials({ ...params, rowName: 'totalNetRevenue' }),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirN11DataKey,
        getRowConfigs: ({ dataFromDataKey, currency }) => getGetirN11FinancialsRowsConfigs({
          dataFromDataKey,
          currency,
          t,
          parentDataKey: getirN11DataKey,
          rowName: 'totalNetRevenue',
        }),
      },
    },
    {
      name: rowNames.otherRevenue,
      dataKey: getirN11DataKey,
      chartKey: getirN11TableChartKeys.otherRevenue,
      customRequestBody: {},
      errorMsg,
      initialFormatter: params => getTotalForGetirN11Financials({ ...params, rowName: 'otherRevenue' }),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirN11DataKey,
        getRowConfigs: ({ dataFromDataKey, currency }) => getGetirN11FinancialsRowsConfigs({
          dataFromDataKey,
          currency,
          t,
          parentDataKey: getirN11DataKey,
          rowName: 'otherRevenue',
        }),
      },
    },
    {
      name: rowNames.gmvAverage,
      dataKey: getirN11DataKey,
      chartKey: getirN11TableChartKeys.gmvAverage,
      customRequestBody: {},
      errorMsg,
      initialFormatter: params => getGMVAverageForN11({ ...params, rowName: 'totalGMV', excludedKey: GETIR_N11_SOURCE_TYPE.N11_QUICK }),
      shouldAssignCurrencyFormatter: true,
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirN11DataKey,
        getRowConfigs: ({ dataFromDataKey, currency }) => getGetirN11FinancialsRowsConfigs({
          dataFromDataKey,
          currency,
          t,
          numberFormatter: getNumberFormatterByCurrency(currency),
          parentDataKey: getirN11DataKey,
          rowName: 'gmvAverage',
        }),
      },
    },
    {
      name: rowNames.revenueAverage,
      dataKey: getirN11DataKey,
      chartKey: getirN11TableChartKeys.revenueAverage,
      customRequestBody: {},
      errorMsg,
      initialFormatter: params => getTotalForGetirN11Financials({ ...params, rowName: 'revenueAverage' }),
      shouldAssignCurrencyFormatter: true,
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirN11DataKey,
        getRowConfigs: ({ dataFromDataKey, currency }) => getGetirN11FinancialsRowsConfigs({
          dataFromDataKey,
          currency,
          t,
          numberFormatter: getNumberFormatterByCurrency(currency),
          parentDataKey: getirN11DataKey,
          rowName: 'revenueAverage',
        }),
      },
    },
    {
      name: rowNames.totalTraffic,
      dataKey: getirN11DataKey,
      chartKey: getirN11TableChartKeys.totalTraffic,
      customRequestBody: {},
      errorMsg,
      initialFormatter: ({ dataFromDataKey, startDates }) => (
        getTotalCountsForFirstRow({ dimension: dataFromDataKey.traffic, startDates })
      ),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirN11DataKey,
        getRowConfigs: ({ dataFromDataKey }) => (
          getGetirN11ChannelTypeRowConfigs({
            t,
            rowData: dataFromDataKey?.traffic,
            parentDataKey: getirN11DataKey,
            childRowsConfig: {
              dataKey: getirN11DataKey,
              getRowConfigs: ({ countryIdToCountryGroupMap, rowData }) => {
                const countryIdToData = getSimplifiedTotalsData({ dataWithTotals: rowData });

                return getCountryGroupRowsConfigs({
                  countryIdToData,
                  countryIdToCountryGroupMap,
                  parentDataKeysConfig: { countries: getirN11DataKey, countryGroups: getirN11DataKey },
                });
              },
            },
          })
        ),
      },
    },
  ];
};

const getirKuzeydenDataKey = 'getirKuzeydenData';

export const getGetirKuzeydenTableRowConfigs = ({ t }) => {
  const rowNames = {
    sectionHeader: t('GETIR_KUZEYDEN.TITLE'),
    carboy: t('GETIR_KUZEYDEN.CARBOY'),
    orderCount: t('GETIR_KUZEYDEN.ORDER_COUNT'),
    organicOrder: t('GETIR_KUZEYDEN.ORGANIC_ORDER'),
    missedOrder: t('GETIR_KUZEYDEN.MISSED_ORDER'),
  };

  // since we fetch all the related data together
  const errorMsg = t('MISSING_KUZEYDEN_DATA');

  return [
    {
      name: rowNames.sectionHeader,
      dataKey: getirKuzeydenDataKey,
      isSectionHeader: true,
    },
    {
      name: rowNames.carboy,
      dataKey: getirKuzeydenDataKey,
      chartKey: getirKuzeydenTableChartKeys.carboy,
      endpoint: getGetirKuzeydenData,
      customRequestBody: { dimensions: ['domainType', 'country'] },
      errorMsg,
      initialFormatter: ({ dataFromDataKey, startDates }) => (getTotalForGetirKuzeyden({ domainTypes: dataFromDataKey.carboySoldCount, startDates })),
      childRowsConfig: {
        dataKey: getirKuzeydenDataKey,
        getRowConfigs: ({ dataFromDataKey }) => (
          getGetirKuzeydenRowConfigs({ rowData: dataFromDataKey?.carboySoldCount, t, parentDataKeysConfig: getirKuzeydenDataKey })
        ),
      },
    },
    {
      name: rowNames.orderCount,
      dataKey: getirKuzeydenDataKey,
      chartKey: getirKuzeydenTableChartKeys.orderCount,
      errorMsg,
      initialFormatter: ({ dataFromDataKey, startDates }) => (getTotalForGetirKuzeyden({ domainTypes: dataFromDataKey.orderCount, startDates })),
      childRowsConfig: {
        dataKey: getirKuzeydenDataKey,
        getRowConfigs: ({ dataFromDataKey }) => (
          getGetirKuzeydenRowConfigs({ rowData: dataFromDataKey?.orderCount, t, parentDataKeysConfig: getirKuzeydenDataKey })
        ),
      },
    },
    {
      name: rowNames.organicOrder,
      dataKey: getirKuzeydenDataKey,
      chartKey: getirKuzeydenTableChartKeys.organicOrder,
      errorMsg,
      initialFormatter: ({ dataFromDataKey, startDates }) => (getTotalForGetirKuzeyden({ domainTypes: dataFromDataKey.organicOrderCount, startDates })),
      childRowsConfig: {
        dataKey: getirKuzeydenDataKey,
        getRowConfigs: ({ dataFromDataKey }) => (
          getGetirKuzeydenRowConfigs({ rowData: dataFromDataKey?.organicOrderCount, t, parentDataKeysConfig: getirKuzeydenDataKey })
        ),
      },
    },
    {
      name: rowNames.missedOrder,
      dataKey: getirKuzeydenDataKey,
      chartKey: getirKuzeydenTableChartKeys.missedOrder,
      errorMsg,
      initialFormatter: ({ dataFromDataKey, startDates }) => (getTotalForGetirKuzeyden({ domainTypes: dataFromDataKey.missedCarboyOrderCount, startDates })),
      childRowsConfig: {
        dataKey: getirKuzeydenDataKey,
        getRowConfigs: ({ dataFromDataKey }) => (
          getGetirKuzeydenRowConfigs({ rowData: dataFromDataKey?.missedCarboyOrderCount, t, parentDataKeysConfig: getirKuzeydenDataKey })
        ),
      },
    },
  ];
};

const getirSelectDataKey = 'getirSelectDataKey';

function getGetirSelectFinancialRowsConfigs({ dataFromDataKey: domainTypesData, currency, t, rowName }) {
  const rowData = domainTypesData?.[currency.toLowerCase()]?.[rowName];
  if (!rowData) {
    return [];
  }

  const configs = [];
  Object.entries(rowData).forEach(([domainKey, domainData]) => {
    if (domainData) {
      configs.push({
        name: t(`global:GETIR_MARKET_DOMAIN_TYPES.${domainKey}`),
        dataKey: getirSelectDataKey,
        initialFormatter: () => getDomainTypeTotals({ domainData: domainData?.totals }),
        childRowsConfig: {
          dataKey: getirSelectDataKey,
          getRowConfigs: ({ countryIdToCountryGroupMap }) => {
            const countryIdToDataWithTotals = { ...rowData[domainKey].subTable };
            const countryIdToData = Object.keys(countryIdToDataWithTotals).reduce((acc, countryId) => {
              acc[countryId] = countryIdToDataWithTotals[countryId].totals;
              return acc;
            }, {});

            return getCountryGroupRowsConfigs({
              countryIdToData,
              countryIdToCountryGroupMap,
              parentDataKeysConfig: getirSelectDataKey,
            });
          },
        },
      });
    }
  });

  return configs;
}

export function getGetirSelectTableRowConfigs({ t }) {
  const rowNames = {
    sectionHeader: t('GETIR_SELECT'),
    totalRevenue: t('global:REVENUE'),
    deliveryFeeDiscountCost: t('GETIR_SELECT_SECTION.DELIVERY_FEE_DISCOUNT_COST'),
    promoAandm: t('GETIR_SELECT_SECTION.PROMO_A_AND_M_COST'),
    subClientCount: t('GETIR_SELECT_SECTION.SUBSCRIBED_CLIENT_COUNT'),
  };

  // since we fetch all the related data together
  const errorMsg = t('MISSING_GETIR_SELECT_DATA');

  return [
    {
      name: rowNames.sectionHeader,
      dataKey: getirSelectDataKey,
      isSectionHeader: true,
    },
    {
      name: rowNames.subClientCount,
      dataKey: getirSelectDataKey,
      endpoint: getGetirSelectData,
      chartKey: getirSelectTableChartKeys.subClientCount,
      customRequestBody: { dimensions: ['domainType', 'city'] },
      initialFormatter: ({ dataFromDataKey, startDates }) => (
        getTotalCountsForFirstRow({ dimension: dataFromDataKey?.subClientCount, startDates })
      ),
      errorMsg,
      shouldItBeAffectedFromSorting: false,
    },
    {
      name: rowNames.totalRevenue,
      dataKey: getirSelectDataKey,
      chartKey: getirSelectTableChartKeys.totalRevenue,
      initialFormatter: ({ dataFromDataKey, startDates, currency }) => (
        getTotalCountsForFirstRow({ dimension: dataFromDataKey?.totalRevenue?.[currency.toLowerCase()]?.totalRevenue, startDates })
      ),
      errorMsg,
      shouldItBeAffectedFromSorting: false,
    },
    {
      name: rowNames.deliveryFeeDiscountCost,
      dataKey: getirSelectDataKey,
      chartKey: getirSelectTableChartKeys.deliveryFeeDiscountCost,
      initialFormatter: ({ dataFromDataKey, startDates, currency }) => (
        getTotalCountsForFirstRow({
          dimension: dataFromDataKey?.deliveryFeeDiscountCost?.[currency.toLowerCase()]?.deliveryFeeDiscountCost,
          startDates,
        })
      ),
      errorMsg,
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirSelectDataKey,
        getRowConfigs: ({ dataFromDataKey, currency }) => (
          getGetirSelectFinancialRowsConfigs({
            dataFromDataKey: dataFromDataKey?.deliveryFeeDiscountCost,
            rowName: 'deliveryFeeDiscountCost',
            currency,
            t,
          })
        ),
      },
    },
    {
      name: rowNames.promoAandm,
      dataKey: getirSelectDataKey,
      chartKey: getirSelectTableChartKeys.promoAandm,
      initialFormatter: ({ dataFromDataKey, startDates, currency }) => (
        getTotalCountsForFirstRow({
          dimension: dataFromDataKey?.promoAandm?.[currency.toLowerCase()]?.promoAandm,
          startDates,
        })
      ),
      errorMsg,
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirSelectDataKey,
        getRowConfigs: ({ dataFromDataKey, currency }) => (
          getGetirSelectFinancialRowsConfigs({
            dataFromDataKey: dataFromDataKey?.promoAandm,
            rowName: 'promoAandm',
            currency,
            t,
          })
        ),
      },
    },
  ];
}

const gorillasDataKey = 'gorillasDataKey';

export function getGorillasTableRowConfigs({ t }) {
  const rowNames = {
    sectionHeader: t('GORILLAS'),
    orderCount: t('GORILLAS_SECTION.ORDER_COUNT'),
    netRevenue: t('GORILLAS_SECTION.NET_REVENUE'),
    gmv: t('GORILLAS_SECTION.GMV'),
    getirGorillas: t('GORILLAS_SECTION.GETIR_GORILLAS'),
    gorillasOnly: t('GORILLAS_SECTION.GORILLAS_ONLY'),
    getirGorillasTooltip: t('GORILLAS_SECTION.GETIR_GORILLAS_TOOLTIP'),
    gorillasOnlyTooltip: t('GORILLAS_SECTION.GORILLAS_ONLY_TOOLTIP'),
  };

  // since we fetch all the related data together
  const errorMsg = t('MISSING_GORILLAS_DATA');

  return [
    {
      name: rowNames.sectionHeader,
      dataKey: gorillasDataKey,
      isSectionHeader: true,
    },
    {
      name: rowNames.orderCount,
      dataKey: gorillasDataKey,
      endpoint: getGorillasData,
      chartKey: gorillasTableChartKeys.orderCount,
      customRequestBody: { dimensions: ['country'] },
      initialFormatter: ({ dataFromDataKey, startDates }) => {
        const formattedData = {};
        const getirGorillasOrderCounts = get(dataFromDataKey, ['getirGorillasOrderCounts'], {});
        const gorillasOnlyOrderCounts = get(dataFromDataKey, ['gorillasOnlyOrderCounts'], {});
        _forEach(getirGorillasOrderCounts, dimensionOrderCounts => {
          _forEach(startDates, startDate => {
            const count = get(dimensionOrderCounts, ['totals', startDate], 0);
            formattedData[startDate] = formattedData[startDate] || 0;
            formattedData[startDate] += count;
          });
        });
        _forEach(gorillasOnlyOrderCounts, dimensionOrderCounts => {
          _forEach(startDates, startDate => {
            const count = get(dimensionOrderCounts, ['totals', startDate], 0);
            formattedData[startDate] = formattedData[startDate] || 0;
            formattedData[startDate] += count;
          });
        });
        return formattedData;
      },
      childRowsConfig: {
        dataKey: gorillasDataKey,
        getRowConfigs: () => ([
          {
            name: rowNames.getirGorillas,
            tooltip: rowNames.getirGorillasTooltip,
            dataKey: gorillasDataKey,
            initialFormatter: ({ dataFromDataKey, startDates }) => {
              return getTotalCountsForFirstRow({ dimension: dataFromDataKey?.getirGorillasOrderCounts, startDates });
            },
            childRowsConfig: {
              dataKey: gorillasDataKey,
              getRowConfigs: ({ dataFromDataKey, countryIdToCountryGroupMap }) => {
                const countryIdToData = getTotalsObjectsByDateOfDateRangeData({ data: dataFromDataKey?.getirGorillasOrderCounts });
                return getCountryGroupRowsConfigs({
                  countryIdToData,
                  countryIdToCountryGroupMap,
                  parentDataKeysConfig: gorillasDataKey,
                });
              },
            },
          },
          {
            name: rowNames.gorillasOnly,
            tooltip: rowNames.gorillasOnlyTooltip,
            dataKey: gorillasDataKey,
            initialFormatter: ({ dataFromDataKey, startDates }) => {
              return getTotalCountsForFirstRow({ dimension: dataFromDataKey?.gorillasOnlyOrderCounts, startDates });
            },
            childRowsConfig: {
              dataKey: gorillasDataKey,
              getRowConfigs: ({ dataFromDataKey, countryIdToCountryGroupMap }) => {
                const countryIdToData = getTotalsObjectsByDateOfDateRangeData({ data: dataFromDataKey?.gorillasOnlyOrderCounts });
                return getCountryGroupRowsConfigs({
                  countryIdToData,
                  countryIdToCountryGroupMap,
                  parentDataKeysConfig: gorillasDataKey,
                });
              },
            },
          },
        ]),
      },
      errorMsg,
      shouldItBeAffectedFromSorting: false,
    },
    {
      name: rowNames.netRevenue,
      dataKey: gorillasDataKey,
      chartKey: gorillasTableChartKeys.netRevenue,
      initialFormatter: ({ dataFromDataKey, startDates, currency }) => {
        const formattedData = {};
        const getirGorillasNetRevenue = get(dataFromDataKey, ['getirGorillasFinancials', currency.toLowerCase(), 'netRevenue'], {});
        const gorillasOnlyNetRevenue = get(dataFromDataKey, ['gorillasOnlyFinancials', currency.toLowerCase(), 'netRevenue'], {});
        _forEach(getirGorillasNetRevenue, dimensionNetRevenue => {
          _forEach(startDates, startDate => {
            const netRevenue = get(dimensionNetRevenue, ['totals', startDate], 0);
            formattedData[startDate] = formattedData[startDate] || 0;
            formattedData[startDate] += netRevenue;
          });
        });
        _forEach(gorillasOnlyNetRevenue, dimensionNetRevenue => {
          _forEach(startDates, startDate => {
            const netRevenue = get(dimensionNetRevenue, ['totals', startDate], 0);
            formattedData[startDate] = formattedData[startDate] || 0;
            formattedData[startDate] += netRevenue;
          });
        });
        return formattedData;
      },
      childRowsConfig: {
        dataKey: gorillasDataKey,
        getRowConfigs: () => ([
          {
            name: rowNames.getirGorillas,
            tooltip: rowNames.getirGorillasTooltip,
            dataKey: gorillasDataKey,
            initialFormatter: ({ dataFromDataKey, startDates, currency }) => {
              return getTotalCountsForFirstRow({ dimension: dataFromDataKey?.getirGorillasFinancials?.[currency.toLowerCase()]?.netRevenue, startDates });
            },
            childRowsConfig: {
              dataKey: gorillasDataKey,
              getRowConfigs: ({ dataFromDataKey, countryIdToCountryGroupMap, currency }) => {
                const netRevenueByCountries = dataFromDataKey?.getirGorillasFinancials?.[currency.toLowerCase()]?.netRevenue;
                const countryIdToData = getTotalsObjectsByDateOfDateRangeData({ data: netRevenueByCountries });
                return getCountryGroupRowsConfigs({
                  countryIdToData,
                  countryIdToCountryGroupMap,
                  parentDataKeysConfig: gorillasDataKey,
                });
              },
            },
          },
          {
            name: rowNames.gorillasOnly,
            tooltip: rowNames.gorillasOnlyTooltip,
            dataKey: gorillasDataKey,
            initialFormatter: ({ dataFromDataKey, startDates, currency }) => {
              return getTotalCountsForFirstRow({ dimension: dataFromDataKey?.gorillasOnlyFinancials?.[currency.toLowerCase()]?.netRevenue, startDates });
            },
            childRowsConfig: {
              dataKey: gorillasDataKey,
              getRowConfigs: ({ dataFromDataKey, countryIdToCountryGroupMap, currency }) => {
                const netRevenueByCountries = dataFromDataKey?.gorillasOnlyFinancials?.[currency.toLowerCase()]?.netRevenue;
                const countryIdToData = getTotalsObjectsByDateOfDateRangeData({ data: netRevenueByCountries });
                return getCountryGroupRowsConfigs({
                  countryIdToData,
                  countryIdToCountryGroupMap,
                  parentDataKeysConfig: gorillasDataKey,
                });
              },
            },
          },
        ]),
      },
      errorMsg,
      shouldItBeAffectedFromSorting: false,
    },
    {
      name: rowNames.gmv,
      dataKey: gorillasDataKey,
      chartKey: gorillasTableChartKeys.gmv,
      initialFormatter: ({ dataFromDataKey, startDates, currency }) => {
        const formattedData = {};
        const getirGorillasGmv = get(dataFromDataKey, ['getirGorillasFinancials', currency.toLowerCase(), 'gmv'], {});
        const gorillasOnlyGmv = get(dataFromDataKey, ['gorillasOnlyFinancials', currency.toLowerCase(), 'gmv'], {});
        _forEach(getirGorillasGmv, dimensionGmv => {
          _forEach(startDates, startDate => {
            const gmv = get(dimensionGmv, ['totals', startDate], 0);
            formattedData[startDate] = formattedData[startDate] || 0;
            formattedData[startDate] += gmv;
          });
        });
        _forEach(gorillasOnlyGmv, dimensionGmv => {
          _forEach(startDates, startDate => {
            const gmv = get(dimensionGmv, ['totals', startDate], 0);
            formattedData[startDate] = formattedData[startDate] || 0;
            formattedData[startDate] += gmv;
          });
        });
        return formattedData;
      },
      childRowsConfig: {
        dataKey: gorillasDataKey,
        getRowConfigs: () => ([
          {
            name: rowNames.getirGorillas,
            tooltip: rowNames.getirGorillasTooltip,
            dataKey: gorillasDataKey,
            initialFormatter: ({ dataFromDataKey, startDates, currency }) => {
              return getTotalCountsForFirstRow({ dimension: dataFromDataKey?.getirGorillasFinancials?.[currency.toLowerCase()]?.gmv, startDates });
            },
            childRowsConfig: {
              dataKey: gorillasDataKey,
              getRowConfigs: ({ dataFromDataKey, countryIdToCountryGroupMap, currency }) => {
                const gmvByCountries = dataFromDataKey?.getirGorillasFinancials?.[currency.toLowerCase()]?.gmv;
                const countryIdToData = getTotalsObjectsByDateOfDateRangeData({ data: gmvByCountries });
                return getCountryGroupRowsConfigs({
                  countryIdToData,
                  countryIdToCountryGroupMap,
                  parentDataKeysConfig: gorillasDataKey,
                });
              },
            },
          },
          {
            name: rowNames.gorillasOnly,
            tooltip: rowNames.gorillasOnlyTooltip,
            dataKey: gorillasDataKey,
            initialFormatter: ({ dataFromDataKey, startDates, currency }) => {
              return getTotalCountsForFirstRow({ dimension: dataFromDataKey?.gorillasOnlyFinancials?.[currency.toLowerCase()]?.gmv, startDates });
            },
            childRowsConfig: {
              dataKey: gorillasDataKey,
              getRowConfigs: ({ dataFromDataKey, countryIdToCountryGroupMap, currency }) => {
                const gmvByCountries = dataFromDataKey?.gorillasOnlyFinancials?.[currency.toLowerCase()]?.gmv;
                const countryIdToData = getTotalsObjectsByDateOfDateRangeData({ data: gmvByCountries });
                return getCountryGroupRowsConfigs({
                  countryIdToData,
                  countryIdToCountryGroupMap,
                  parentDataKeysConfig: gorillasDataKey,
                });
              },
            },
          },
        ]),
      },
      errorMsg,
      shouldItBeAffectedFromSorting: false,
    },
  ];
}

const getirMarketIntegrationDataKey = 'getirMarketIntegrationDataKey';

export function getGetirMarketIntegrationTableRowConfigs({ t }) {
  const rowNames = {
    sectionHeader: t('INTEGRATION_ORDERS'),
    orderCount: t('INTEGRATION_ORDERS_SECTION.ORDER_COUNT'),
    netRevenue: t('INTEGRATION_ORDERS_SECTION.NET_REVENUE'),
    gmv: t('INTEGRATION_ORDERS_SECTION.GMV'),
  };

  const tooltipsOfRows = {
    JET: t('JET_INTEGRATION_ORDERS_TOOLTIP'),
    GETIR: t('G10_INTEGRATION_ORDERS_TOOLTIP'),
    N11: t('N11_INTEGRATION_ORDERS_TOOLTIP'),
    GORILLAS: t('GORILLAS_INTEGRATION_ORDERS_TOOLTIP'),
    UBER: t('UBER_INTEGRATION_ORDERS_TOOLTIP'),
  };

  // since we fetch all the related data together
  const errorMsg = t('MISSING_INTEGRATION_ORDERS_DATA');

  return [
    {
      name: rowNames.sectionHeader,
      dataKey: getirMarketIntegrationDataKey,
      isSectionHeader: true,
    },
    {
      name: rowNames.orderCount,
      dataKey: getirMarketIntegrationDataKey,
      endpoint: getGetirMarketIntegrationData,
      chartKey: getirMarketIntegrationTableChartKeys.orderCount,
      customRequestBody: { dimensions: ['integrationType', 'country'] },
      initialFormatter: ({ dataFromDataKey, startDates }) => {
        return getTotalCountsForFirstRow({ dimension: dataFromDataKey?.orderCounts, startDates });
      },
      childRowsConfig: {
        dataKey: getirMarketIntegrationDataKey,
        getRowConfigs: ({ dataFromDataKey, countryIdToCountryGroupMap }) => {
          const configs = [];
          const dataByIntegrationType = get(dataFromDataKey, ['orderCounts'], {});
          _forEach(INTEGRATION_TYPES_SORT, integrationType => {
            const integrationData = get(dataByIntegrationType, [integrationType]);
            if (integrationData) {
              configs.push({
                name: t(`INTEGRATION_ORDERS_SECTION.${integrationType}`),
                tooltip: tooltipsOfRows[integrationType],
                dataKey: getirMarketIntegrationDataKey,
                initialFormatter: () => integrationData.totals,
                childRowsConfig: {
                  dataKey: getirMarketIntegrationDataKey,
                  getRowConfigs: () => {
                    const countryIdToData = getTotalsObjectsByDateOfDateRangeData({ data: integrationData.subTable });
                    return getCountryGroupRowsConfigs({
                      countryIdToData,
                      countryIdToCountryGroupMap,
                      parentDataKeysConfig: getirMarketIntegrationDataKey,
                    });
                  },
                },
              });
            }
          });
          return configs;
        },
      },
      errorMsg,
      shouldItBeAffectedFromSorting: false,
    },
    {
      name: rowNames.netRevenue,
      dataKey: getirMarketIntegrationDataKey,
      chartKey: getirMarketIntegrationTableChartKeys.netRevenue,
      initialFormatter: ({ dataFromDataKey, startDates, currency }) => {
        const totals = {};
        const dataByIntegrationType = get(dataFromDataKey, ['financials', currency.toLowerCase(), 'netRevenue'], {});
        _forEach(dataByIntegrationType, integrationData => {
          _forEach(startDates, startDate => {
            totals[startDate] = totals[startDate] || 0;
            totals[startDate] += get(integrationData, ['totals', startDate], 0);
          });
        });
        return totals;
      },
      childRowsConfig: {
        dataKey: getirMarketIntegrationDataKey,
        getRowConfigs: ({ dataFromDataKey, countryIdToCountryGroupMap, currency }) => {
          const configs = [];
          const dataByIntegrationType = get(dataFromDataKey, ['financials', currency.toLowerCase(), 'netRevenue'], {});
          _forEach(INTEGRATION_TYPES_SORT, integrationType => {
            const integrationData = get(dataByIntegrationType, [integrationType]);
            if (integrationData) {
              configs.push({
                name: t(`INTEGRATION_ORDERS_SECTION.${integrationType}`),
                tooltip: tooltipsOfRows[integrationType],
                dataKey: getirMarketIntegrationDataKey,
                initialFormatter: () => integrationData.totals,
                childRowsConfig: {
                  dataKey: getirMarketIntegrationDataKey,
                  getRowConfigs: () => {
                    const countryIdToData = getTotalsObjectsByDateOfDateRangeData({ data: integrationData.subTable });
                    return getCountryGroupRowsConfigs({
                      countryIdToData,
                      countryIdToCountryGroupMap,
                      parentDataKeysConfig: getirMarketIntegrationDataKey,
                    });
                  },
                },
              });
            }
          });
          return configs;
        },
      },
      errorMsg,
      shouldItBeAffectedFromSorting: false,
    },
    {
      name: rowNames.gmv,
      dataKey: getirMarketIntegrationDataKey,
      chartKey: getirMarketIntegrationTableChartKeys.gmv,
      initialFormatter: ({ dataFromDataKey, startDates, currency }) => {
        const totals = {};
        const dataByIntegrationType = get(dataFromDataKey, ['financials', currency.toLowerCase(), 'gmv'], {});
        _forEach(dataByIntegrationType, integrationData => {
          _forEach(startDates, startDate => {
            totals[startDate] = totals[startDate] || 0;
            totals[startDate] += get(integrationData, ['totals', startDate], 0);
          });
        });
        return totals;
      },
      childRowsConfig: {
        dataKey: getirMarketIntegrationDataKey,
        getRowConfigs: ({ dataFromDataKey, countryIdToCountryGroupMap, currency }) => {
          const configs = [];
          const dataByIntegrationType = get(dataFromDataKey, ['financials', currency.toLowerCase(), 'gmv'], {});
          _forEach(INTEGRATION_TYPES_SORT, integrationType => {
            const integrationData = get(dataByIntegrationType, [integrationType]);
            if (integrationData) {
              configs.push({
                name: t(`INTEGRATION_ORDERS_SECTION.${integrationType}`),
                tooltip: tooltipsOfRows[integrationType],
                dataKey: getirMarketIntegrationDataKey,
                initialFormatter: () => integrationData.totals,
                childRowsConfig: {
                  dataKey: getirMarketIntegrationDataKey,
                  getRowConfigs: () => {
                    const countryIdToData = getTotalsObjectsByDateOfDateRangeData({ data: integrationData.subTable });
                    return getCountryGroupRowsConfigs({
                      countryIdToData,
                      countryIdToCountryGroupMap,
                      parentDataKeysConfig: getirMarketIntegrationDataKey,
                    });
                  },
                },
              });
            }
          });
          return configs;
        },
      },
      errorMsg,
      shouldItBeAffectedFromSorting: false,
    },
  ];
}
