import {
  isEmpty,
  get,
  isObject as _isObject,
  map as _map,
  forEach as _forEach,
} from 'lodash';

import {
  getGetirJobsData,
  getPermittedDemandCountsData,
  getPermittedMissedCountsData,
  getPermittedOrderCountsData,
  getPermittedOrganicCountsData,
  getPermittedPromoUsedCountsData,
  getPermittedTotalTabClickCountsData,
  getPermittedUniqueTabClickCountsData,
  getPermittedFinancialData,
  getGetirN11Data,
  getPermittedUniqueAppOpenCountsData,
  getPermittedTotalAppOpenCountsData,
  getGetirKuzeydenData,
  getGetirFoodData,
  getGetirLocalsData,
  getGetirDriveData,
  getGetirSelectData,
  getGorillasData,
  getGetirMarketIntegrationData,
} from '@shared/api/dailySummary/country';
import { getLangKey } from '@shared/i18n';
import {
  getDomainTypeTotals,
  getTotalCountsFromCityDimensionedData,
} from './dataFormatters';
import { DS_COUNTRY_TABLES } from './constants';
import {
  BAD_KEYS_FOR_GETIR_JOBS,
  GETIR_FINANCIALS_DOMAIN_TYPES,
  GETIR_N11_SOURCE_TYPE,
  INTEGRATION_TYPES_SORT,
} from '../constants';
import {
  getSimplifiedTotalsData,
  getTotalCountsForFirstRow,
  getTotalForGetirFinancials,
  getGetirMarketFinancialFromAllDomainsFinancial,
  getNumberFormatterByCurrency,
  getTotalCountsFromDomainDimensionedData,
  getGrossMarketValueFromGetirFinancials,
  getTotalBasketAverage,
  getTotalForGetirKuzeyden,
  getGetirFoodDeliveryTypeRowConfigs,
  getGetirLocalsDeliveryTypeRowConfigs,
  getGetirDriveSourceTypeRowConfigs,
  getFormattedGetirJobsPostTypesData,
  getTotalForGetirJobs,
  getGetirJobsPostTypeRowConfigs,
  getGetirN11SourceTypeRowConfigs,
  getGetirN11CategoryGroupRowsConfigs,
  getTotalForGetirN11Financials,
  getGetirN11ChannelTypeRowConfigs,
  getTotalForGetirDriveFinancials,
  getGetirDriveSourceTypeForFinancialsRowConfigs,
  getTotalBasketAverageForGetirDrive,
  getGMVAverageForN11,
  getTotalForFinancials,
  getGetirFoodDeliveryTypeForFinancialRowConfigs,
  getGetirLocalsDeliveryTypeForFinancialRowConfigs,
} from '../utils';
import {
  countsTableChartKeys,
  financialsTableChartKeys,
  getirKuzeydenTableChartKeys,
  getirDriveTableChartKeys,
  getirFoodTableChartKeys,
  getirLocalsTableChartKeys,
  getirJobsTableChartKeys,
  getirN11TableChartKeys,
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

function getCityRowsConfigs({ cityIdToData, cityIdToCityNameMap, parentDataKeysConfig }) {
  if (!cityIdToCityNameMap?.size || isEmpty(cityIdToData)) {
    return [];
  }

  const cityIds = Object.keys(cityIdToData);
  return cityIds
    .filter(cityId => !!cityIdToCityNameMap.get(cityId)?.name)
    .map(cityId => {
      const cityName = cityIdToCityNameMap.get(cityId)?.name;

      return {
        name: cityName?.[getLangKey()],
        dataKey: _isObject(parentDataKeysConfig) ? parentDataKeysConfig.domainTypes : parentDataKeysConfig,
        initialFormatter: () => cityIdToData[cityId],
      };
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
      dataKey: parentDataKeysConfig.cities,
      getRowConfigs: ({ dataFromDataKey, cityIdToCityNameMap }) => (
        getCityRowsConfigs({
          cityIdToData: dataFromDataKey[domainType],
          cityIdToCityNameMap,
          parentDataKeysConfig,
        })
      ),
    },
  }));
}

function getGetirDriveCityTypeRowsConfigs({ dataFromDataKey, parentDataKeysConfig, cityIdToCityNameMap }) {
  if (!cityIdToCityNameMap?.size || isEmpty(dataFromDataKey)) {
    return [];
  }

  const cityIds = Object.keys(dataFromDataKey);
  return cityIds
    .filter(cityId => !!cityIdToCityNameMap.get(cityId)?.name)
    .map(cityId => {
      const cityName = cityIdToCityNameMap.get(cityId)?.name;

      return {
        name: cityName?.[getLangKey()],
        dataKey: _isObject(parentDataKeysConfig) ? parentDataKeysConfig.domainTypes : parentDataKeysConfig,
        initialFormatter: () => dataFromDataKey[cityId].totals,
      };
    });
}

const totalOrderCountsDataKeys = {
  total: 'orderCounts',
  domainTypes: 'orderCounts',
  cities: 'expandOrderCounts',
};

const organicCountsDataKeys = {
  total: 'organicCounts',
  domainTypes: 'organicCounts',
  cities: 'expandOrganicCounts',
};

const promoUsedCountsDataKeys = {
  total: 'promoUsedCounts',
  domainTypes: 'promoUsedCounts',
  cities: 'expandPromoUsedCounts',
};

const missedCountsDataKeys = {
  total: 'missedCounts',
  domainTypes: 'missedCounts',
  cities: 'expandMissedCounts',
};

const demandCountsDataKeys = {
  total: 'demandCounts',
  domainTypes: 'demandCounts',
  cities: 'expandDemandCounts',
};

const uniqueTabClickCountsDataKeys = {
  total: 'uniqueTabClickCounts',
  domainTypes: 'uniqueTabClickCounts',
  cities: 'expandUniqueTabClickCounts',
};

const totalTabClickCountsDataKeys = {
  total: 'totalTabClickCounts',
  domainTypes: 'totalTabClickCounts',
  cities: 'expandTotalTabClickCounts',
};

const uniqueAppOpenCountsDataKeys = {
  total: 'uniqueAppOpenCounts',
  cities: 'uniqueAppOpenCounts',
  domainTypes: 'uniqueAppOpenCounts',
};

const totalAppOpenCountsDataKeys = {
  total: 'totalAppOpenCounts',
  cities: 'totalAppOpenCounts',
  domainTypes: 'totalAppOpenCounts',
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
        dataKey: totalOrderCountsDataKeys.cities,
        endpoint: getPermittedOrderCountsData,
        customRequestBody: { dimension: 'city' },
        // each request should have error msg associated to it
        errorMsg: t('MISSING_DOMAIN_COUNTRY_DATA', { rowName: rowNames.totalOrderCounts }),
      },
      // all the nested data keys under this top level row that are fetched on expanding
      // we will reset these after parent data refresh
      expandDataKeys: [totalOrderCountsDataKeys.cities],
      // if row has children on click
      childRowsConfig: {
        // where is the children data
        dataKey: totalOrderCountsDataKeys.domainTypes,
        // if rows are dynamic, produce configs from data in the dataKey above
        // if not dynamic, you can do:  () => [{name, dataKey, ...}]
        // getRowConfigs is called in genericFormatter, we pass auxiliary datas as well
        // like cities, countries, whatever auxiallry
        getRowConfigs: ({ dataFromDataKey }) => (
          getDomainTypeRowsConfigs({
            dataFromDataKey,
            parentDataKeysConfig: totalOrderCountsDataKeys,
            t,
            tooltip: tooltipsOfRows,
          })
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
        dataKey: organicCountsDataKeys.cities,
        endpoint: getPermittedOrganicCountsData,
        customRequestBody: { dimension: 'city' },
        errorMsg: t('MISSING_DOMAIN_COUNTRY_DATA', { rowName: rowNames.organicCounts }),
      },
      expandDataKeys: [organicCountsDataKeys.cities],
      childRowsConfig: {
        dataKey: organicCountsDataKeys.domainTypes,
        getRowConfigs: ({ dataFromDataKey }) => (
          getDomainTypeRowsConfigs({
            dataFromDataKey,
            parentDataKeysConfig: organicCountsDataKeys,
            t,
            tooltip: tooltipsOfRows,
          })
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
        dataKey: promoUsedCountsDataKeys.cities,
        endpoint: getPermittedPromoUsedCountsData,
        customRequestBody: { dimension: 'city' },
        errorMsg: t('MISSING_DOMAIN_COUNTRY_DATA', { rowName: rowNames.promoUsedCounts }),
      },
      expandDataKeys: [promoUsedCountsDataKeys.cities],
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
        dataKey: missedCountsDataKeys.cities,
        endpoint: getPermittedMissedCountsData,
        customRequestBody: { dimension: 'city' },
        errorMsg: t('MISSING_DOMAIN_COUNTRY_DATA', { rowName: rowNames.missedCounts }),
      },
      expandDataKeys: [missedCountsDataKeys.cities],
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
        dataKey: demandCountsDataKeys.cities,
        endpoint: getPermittedDemandCountsData,
        customRequestBody: { dimension: 'city' },
        errorMsg: t('MISSING_DOMAIN_COUNTRY_DATA', { rowName: rowNames.demandCounts }),
      },
      expandDataKeys: [demandCountsDataKeys.cities],
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
        dataKey: uniqueTabClickCountsDataKeys.cities,
        endpoint: getPermittedUniqueTabClickCountsData,
        customRequestBody: { dimension: 'city' },
        errorMsg: t('MISSING_DOMAIN_COUNTRY_DATA', { rowName: rowNames.uniqueTabClickCounts }),
      },
      expandDataKeys: [uniqueTabClickCountsDataKeys.cities],
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
        dataKey: totalTabClickCountsDataKeys.cities,
        endpoint: getPermittedTotalTabClickCountsData,
        customRequestBody: { dimension: 'city' },
        errorMsg: t('MISSING_DOMAIN_COUNTRY_DATA', { rowName: rowNames.totalTabClickCounts }),
      },
      expandDataKeys: [totalTabClickCountsDataKeys.cities],
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
        endpoint: getPermittedUniqueAppOpenCountsData,
        errorMsg: t('ERR_FAILED_TO_FETCH_ROW_DATA', { rowName: rowNames.uniqueAppOpenCounts }),
        customRequestBody: { dimensions: ['city'] },
        shouldItBeAffectedFromSorting: true,
        initialFormatter: ({ dataFromDataKey, startDates }) => (
          getTotalCountsFromCityDimensionedData({ dataFromDataKey: dataFromDataKey?.cityBased, startDates })
        ),
        childRowsConfig: {
          dataKey: uniqueAppOpenCountsDataKeys.cities,
          getRowConfigs: ({ dataFromDataKey, cityIdToCityNameMap }) => (
            getCityRowsConfigs({
              cityIdToData: getSimplifiedTotalsData({ dataWithTotals: dataFromDataKey?.cityBased || {} }),
              parentDataKeysConfig: uniqueAppOpenCountsDataKeys,
              cityIdToCityNameMap,
            })
          ),
        },
      },
      {
        name: rowNames.totalAppOpenCounts,
        dataKey: totalAppOpenCountsDataKeys.total,
        chartKey: countsTableChartKeys.totalAppOpenCounts,
        endpoint: getPermittedTotalAppOpenCountsData,
        errorMsg: t('ERR_FAILED_TO_FETCH_ROW_DATA', { rowName: rowNames.totalAppOpenCounts }),
        customRequestBody: { dimensions: ['city'] },
        shouldItBeAffectedFromSorting: true,
        initialFormatter: getTotalCountsFromCityDimensionedData,
        childRowsConfig: {
          dataKey: totalAppOpenCountsDataKeys.cities,
          getRowConfigs: ({ dataFromDataKey, cityIdToCityNameMap }) => (
            getCityRowsConfigs({
              cityIdToData: getSimplifiedTotalsData({ dataWithTotals: dataFromDataKey }),
              parentDataKeysConfig: totalAppOpenCountsDataKeys,
              cityIdToCityNameMap,
            })
          ),
        },
      },
    ] : []),
  ];
};

// Financials
const getirFinancialsDataKey = 'financials';

export const getFinancialsTableRowConfigs = ({
  t,
  computedDateRanges,
  lastSuccessfulDateRanges,
  hasPermissionToViewG10Data,
  hasPermissionToViewG30Data,
}) => {
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
      endpoint: getPermittedFinancialData,
      // custom arguments for that endpoint
      customRequestBody: { dimensions: ['domainType', 'city'] },
      // each request should have error msg associated to it
      errorMsg: t('MISSING_DOMAIN_TYPE_TOTALS', { rowName: rowNames.chargedAmount }),
      // given unformatted data, return {date0: count0, date1: count1, ... }, ready to do some percentage calculation later
      initialFormatter: params => getTotalForGetirFinancials({
        ...params,
        rowName: 'chargedAmount',
      }),
      // to closing sorting for child rows of this row
      shouldItBeAffectedFromSorting: false,
      // all the nested data keys under this top level row that are fetched on expanding
      // we will reset these after parent data refresh
      // expandDataKeys: [getirFinancialsDataKeys.cities],
      // if row has children on click
      childRowsConfig: {
        // where is the children data
        dataKey: getirFinancialsDataKey,
        // if rows are dynamic, produce configs from data in the dataKey above
        // if not dynamic, you can do:  () => [{name, dataKey, ...}]
        // getRowConfigs is called in genericFormatter, we pass auxiliary datas as well
        // like cities, countries, whatever auxiallry
        getRowConfigs: ({
          dataFromDataKey,
          currency,
        }) => getGetirFinancialsRowsConfigs({
          dataFromDataKey,
          currency,
          t,
          parentDataKeysConfig: getirFinancialsDataKey,
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
        initialFormatter: ({
          dataFromDataKey,
          startDates,
          currency,
        }) => getTotalForGetirFinancials({
          startDates,
          currency,
          dataFromDataKey: getGetirMarketFinancialFromAllDomainsFinancial({ data: dataFromDataKey }),
          rowName: 'chargedAmount',
        }),
        shouldItBeAffectedFromSorting: false,
        childRowsConfig: {
          dataKey: getirFinancialsDataKey,
          getRowConfigs: ({
            dataFromDataKey,
            currency,
          }) => getGetirFinancialsRowsConfigs({
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
        const basketValueData = getTotalForGetirFinancials({ ...params, rowName: 'basketValue' });
        const deliveryFeeData = getTotalForGetirFinancials({ ...params, rowName: 'deliveryFee' });
        return getGrossMarketValueFromGetirFinancials({
          basketValueData,
          deliveryFeeData,
          dateRanges: lastSuccessfulDateRanges,
        });
      },
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirFinancialsDataKey,
        getRowConfigs: ({
          dataFromDataKey,
          currency,
        }) => getGetirFinancialsGMVRowsConfigs({
          parentDataKeysConfig: getirFinancialsDataKey,
          dataFromDataKey,
          currency,
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
      initialFormatter: params => getTotalForGetirFinancials({
        ...params,
        rowName: 'netRevenue',
      }),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirFinancialsDataKey,
        getRowConfigs: ({
          dataFromDataKey,
          currency,
        }) => getGetirFinancialsRowsConfigs({
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
        initialFormatter: ({
          dataFromDataKey,
          startDates,
          currency,
        }) => getTotalForGetirFinancials({
          startDates,
          currency,
          dataFromDataKey: getGetirMarketFinancialFromAllDomainsFinancial({ data: dataFromDataKey }),
          rowName: 'netRevenue',
        }),
        shouldItBeAffectedFromSorting: false,
        childRowsConfig: {
          dataKey: getirFinancialsDataKey,
          getRowConfigs: ({
            dataFromDataKey,
            currency,
          }) => getGetirFinancialsRowsConfigs({
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
      initialFormatter: params => getTotalForGetirFinancials({
        ...params,
        rowName: 'grossMargin',
      }),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirFinancialsDataKey,
        getRowConfigs: ({
          dataFromDataKey,
          currency,
        }) => getGetirFinancialsRowsConfigs({
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
      initialFormatter: params => getTotalForGetirFinancials({
        ...params,
        rowName: 'basketValue',
      }),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirFinancialsDataKey,
        getRowConfigs: ({
          dataFromDataKey,
          currency,
        }) => getGetirFinancialsRowsConfigs({
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
      initialFormatterExtraParams: { tableDataKeys: DS_COUNTRY_TABLES },
      shouldAssignCurrencyFormatter: true,
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirFinancialsDataKey,
        getRowConfigs: ({
          dataFromDataKey,
          currency,
        }) => getGetirFinancialsRowsConfigs({
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
      initialFormatter: params => getTotalForGetirFinancials({
        ...params,
        rowName: 'deliveryFee',
      }),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirFinancialsDataKey,
        getRowConfigs: ({
          dataFromDataKey,
          currency,
        }) => getGetirFinancialsRowsConfigs({
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
      initialFormatter: params => getTotalForGetirFinancials({
        ...params,
        rowName: 'serviceFee',
      }),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirFinancialsDataKey,
        getRowConfigs: ({
          dataFromDataKey,
          currency,
        }) => getGetirFinancialsRowsConfigs({
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

function getFinancialsGMVCityRowsConfigs({
  basketValue,
  deliveryFee,
  cityIdToCityNameMap,
  parentDataKeysConfig,
  computedDateRanges,
}) {
  if (!cityIdToCityNameMap?.size || isEmpty(basketValue)) {
    return [];
  }

  const configs = [];
  Object.keys(basketValue).forEach(cityId => {
    const cityName = cityIdToCityNameMap.get(cityId)?.name;
    if (cityName) {
      configs.push({
        name: cityName?.[getLangKey()],
        dataKey: parentDataKeysConfig,
        initialFormatter: () => {
          const basketValueData = basketValue[cityId]?.totals || {};
          const deliveryFeeData = deliveryFee[cityId]?.totals || {};
          return getGrossMarketValueFromGetirFinancials({
            basketValueData,
            deliveryFeeData,
            dateRanges: computedDateRanges,
          });
        },
      });
    }
  });

  return configs;
}

function getFinancialCityRowsConfigs({ cityIdToData, cityIdToCityNameMap, parentDataKeysConfig }) {
  if (!cityIdToCityNameMap?.size || isEmpty(cityIdToData)) {
    return [];
  }

  const configs = [];
  Object.entries(cityIdToData).forEach(([cityId, cityData]) => {
    if (cityIdToCityNameMap.get(cityId)?.name) {
      const cityName = cityIdToCityNameMap.get(cityId)?.name;

      configs.push({
        name: cityName?.[getLangKey()],
        dataKey: parentDataKeysConfig,
        initialFormatter: () => cityData.totals || {},
      });
    }
  });

  return configs;
}

function getGetirFinancialsRowsConfigs({ dataFromDataKey: domainTypesData, currency, t, rowName }) {
  if (!domainTypesData) {
    return [];
  }

  const configs = [];
  Object.entries(GETIR_FINANCIALS_DOMAIN_TYPES).forEach(([domainKey, domainType]) => {
    const data = domainTypesData?.[domainKey]?.[currency?.toLowerCase()];
    if (data) {
      const objectKey = Object.keys(data[rowName])[0] || undefined;

      configs.push({
        name: t(`global:GETIR_MARKET_DOMAIN_TYPES.${domainType}`),
        dataKey: getirFinancialsDataKey,
        initialFormatter: () => getDomainTypeTotals({ domainData: data[rowName][objectKey]?.totals }),
        childRowsConfig: {
          dataKey: getirFinancialsDataKey,
          getRowConfigs: ({ cityIdToCityNameMap }) => (
            getFinancialCityRowsConfigs({
              cityIdToData: data[rowName][objectKey]?.subTable,
              parentDataKeysConfig: getirFinancialsDataKey,
              cityIdToCityNameMap,
            })
          ),
        },
      });
    }
  });

  return configs;
}

function getGetirFinancialsGMVRowsConfigs({ dataFromDataKey: domainTypesData, currency, t, computedDateRanges }) {
  if (!domainTypesData) {
    return [];
  }

  const configs = [];
  Object.entries(GETIR_FINANCIALS_DOMAIN_TYPES).forEach(([domainKey, domainType]) => {
    const data = domainTypesData?.[domainKey]?.[currency?.toLowerCase()];
    if (data) {
      const basketValue = Object.values(data?.basketValue || {})[0] || {};
      const deliveryFee = Object.values(data?.deliveryFee || {})[0] || {};

      configs.push({
        name: t(`global:GETIR_MARKET_DOMAIN_TYPES.${domainType}`),
        dataKey: getirFinancialsDataKey,
        initialFormatter: () => {
          const basketValueData = getDomainTypeTotals({ domainData: basketValue.totals || {} });
          const deliveryFeeData = getDomainTypeTotals({ domainData: deliveryFee.totals || {} });
          return getGrossMarketValueFromGetirFinancials({
            basketValueData,
            deliveryFeeData,
            dateRanges: computedDateRanges,
          });
        },
        childRowsConfig: {
          dataKey: getirFinancialsDataKey,
          getRowConfigs: ({ cityIdToCityNameMap }) => {
            if (isEmpty(basketValue.subTable)) {
              return {};
            }
            return getFinancialsGMVCityRowsConfigs({
              basketValue: basketValue.subTable,
              deliveryFee: deliveryFee.subTable,
              parentDataKeysConfig: getirFinancialsDataKey,
              cityIdToCityNameMap,
              computedDateRanges,
            });
          },
        },
      });
    }
  });

  return configs;
}

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
      customRequestBody: {},
      errorMsg,
      initialFormatter: ({
        dataFromDataKey,
        startDates,
      }) => (getTotalForGetirKuzeyden({ domainTypes: dataFromDataKey.carboySoldCount, startDates })),
      childRowsConfig: {
        dataKey: getirKuzeydenDataKey,
        getRowConfigs: ({ dataFromDataKey, cityIdToCityNameMap }) => (
          getCityRowsConfigs({
            cityIdToData: getSimplifiedTotalsData({ dataWithTotals: dataFromDataKey?.carboySoldCount }),
            parentDataKeysConfig: getirKuzeydenDataKey,
            cityIdToCityNameMap,
          })
        ),
      },
    },
    {
      name: rowNames.orderCount,
      dataKey: getirKuzeydenDataKey,
      chartKey: getirKuzeydenTableChartKeys.orderCount,
      errorMsg,
      initialFormatter: ({
        dataFromDataKey,
        startDates,
      }) => (getTotalForGetirKuzeyden({ domainTypes: dataFromDataKey.orderCount, startDates })),
      childRowsConfig: {
        dataKey: getirKuzeydenDataKey,
        getRowConfigs: ({ dataFromDataKey, cityIdToCityNameMap }) => (
          getCityRowsConfigs({
            cityIdToData: getSimplifiedTotalsData({ dataWithTotals: dataFromDataKey?.orderCount }),
            parentDataKeysConfig: getirKuzeydenDataKey,
            cityIdToCityNameMap,
          })
        ),
      },
    },
    {
      name: rowNames.organicOrder,
      dataKey: getirKuzeydenDataKey,
      chartKey: getirKuzeydenTableChartKeys.organicOrder,
      errorMsg,
      initialFormatter: ({
        dataFromDataKey,
        startDates,
      }) => (getTotalForGetirKuzeyden({ domainTypes: dataFromDataKey.organicOrderCount, startDates })),
      childRowsConfig: {
        dataKey: getirKuzeydenDataKey,
        getRowConfigs: ({ dataFromDataKey, cityIdToCityNameMap }) => (
          getCityRowsConfigs({
            cityIdToData: getSimplifiedTotalsData({ dataWithTotals: dataFromDataKey?.organicOrderCount }),
            parentDataKeysConfig: getirKuzeydenDataKey,
            cityIdToCityNameMap,
          })
        ),
      },
    },
    {
      name: rowNames.missedOrder,
      dataKey: getirKuzeydenDataKey,
      chartKey: getirKuzeydenTableChartKeys.missedOrder,
      errorMsg,
      initialFormatter: ({
        dataFromDataKey,
        startDates,
      }) => (getTotalForGetirKuzeyden({
        domainTypes: dataFromDataKey.missedCarboyOrderCount,
        startDates,
      })),
      childRowsConfig: {
        dataKey: getirKuzeydenDataKey,
        getRowConfigs: ({ dataFromDataKey, cityIdToCityNameMap }) => (
          getCityRowsConfigs({
            cityIdToData: getSimplifiedTotalsData({ dataWithTotals: dataFromDataKey?.missedCarboyOrderCount }),
            parentDataKeysConfig: getirKuzeydenDataKey,
            cityIdToCityNameMap,
          })
        ),
      },
    },
  ];
};

// everything fetched same time, into same data key
const getirFoodDataKey = 'getirFoodData';

export const getGetirFoodGMVRowsConfigs = ({ t, dataFromDataKey, currency, computedDateRanges }) => {
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
        dataKey: getirFoodDataKey,
        initialFormatter: () => {
          const allZero = Object.values(grossMarketValue).every(val => val === 0);
          return allZero ? null : grossMarketValue;
        },
        childRowsConfig: {
          dataKey: getirFoodDataKey,
          getRowConfigs: ({ cityIdToCityNameMap }) => {
            return getFinancialsGMVCityRowsConfigs({
              basketValue: basketValueDataByDeliveryType?.subTable,
              deliveryFee: deliveryFeeDataByDeliveryType?.subTable,
              parentDataKeysConfig: getirFoodDataKey,
              cityIdToCityNameMap,
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
    gmv: t('GMV'),
    chargedAmount: t('CHARGED_AMOUNT'),
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
      dataKey: getirFoodDataKey,
      isSectionHeader: true,
    },
    {
      name: rowNames.orderCounts,
      dataKey: getirFoodDataKey,
      chartKey: getirFoodTableChartKeys.orderCounts,
      endpoint: getGetirFoodData,
      customRequestBody: {},
      errorMsg,
      initialFormatter: ({ dataFromDataKey, startDates }) => (
        getTotalCountsForFirstRow({ dimension: dataFromDataKey?.orderCounts, startDates })
      ),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirFoodDataKey,
        getRowConfigs: ({ dataFromDataKey }) => (
          getGetirFoodDeliveryTypeRowConfigs({
            t,
            rowData: dataFromDataKey?.orderCounts,
            parentDataKeysConfig: { deliveryType: getirFoodDataKey },
            childRowsConfig: {
              dataKey: getirFoodDataKey,
              getRowConfigs: ({ cityIdToCityNameMap, rowData }) => {
                return getCityRowsConfigs({
                  cityIdToData: getSimplifiedTotalsData({ dataWithTotals: rowData }),
                  parentDataKeysConfig: getirFoodDataKey,
                  cityIdToCityNameMap,
                });
              },
            },
          })
        ),
      },
    },
    {
      name: rowNames.organicCounts,
      dataKey: getirFoodDataKey,
      chartKey: getirFoodTableChartKeys.organicCounts,
      errorMsg,
      initialFormatter: ({ dataFromDataKey, startDates }) => (
        getTotalCountsForFirstRow({ dimension: dataFromDataKey?.organicCounts, startDates })
      ),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirFoodDataKey,
        getRowConfigs: ({ dataFromDataKey }) => (
          getGetirFoodDeliveryTypeRowConfigs({
            t,
            rowData: dataFromDataKey?.organicCounts,
            parentDataKeysConfig: { deliveryType: getirFoodDataKey },
            childRowsConfig: {
              dataKey: getirFoodDataKey,
              getRowConfigs: ({ cityIdToCityNameMap, rowData }) => {
                return getCityRowsConfigs({
                  cityIdToData: getSimplifiedTotalsData({ dataWithTotals: rowData }),
                  parentDataKeysConfig: getirFoodDataKey,
                  cityIdToCityNameMap,
                });
              },
            },
          })
        ),
      },
    },
    {
      name: rowNames.promoUsedCounts,
      dataKey: getirFoodDataKey,
      chartKey: getirFoodTableChartKeys.promoUsedCounts,
      errorMsg,
      initialFormatter: ({ dataFromDataKey, startDates }) => (
        getTotalCountsForFirstRow({ dimension: dataFromDataKey?.promoUsedCounts, startDates })
      ),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirFoodDataKey,
        getRowConfigs: ({ dataFromDataKey }) => (
          getGetirFoodDeliveryTypeRowConfigs({
            t,
            rowData: dataFromDataKey?.promoUsedCounts,
            parentDataKeysConfig: { deliveryType: getirFoodDataKey },
            childRowsConfig: {
              dataKey: getirFoodDataKey,
              getRowConfigs: ({ cityIdToCityNameMap, rowData }) => {
                return getCityRowsConfigs({
                  cityIdToData: getSimplifiedTotalsData({ dataWithTotals: rowData }),
                  parentDataKeysConfig: getirFoodDataKey,
                  cityIdToCityNameMap,
                });
              },
            },
          })
        ),
      },
    },
    {
      name: rowNames.missedCounts,
      dataKey: getirFoodDataKey,
      chartKey: getirFoodTableChartKeys.missedCounts,
      errorMsg,
      initialFormatter: ({ dataFromDataKey, startDates }) => (
        getTotalCountsForFirstRow({ dimension: dataFromDataKey?.missedCounts, startDates })
      ),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirFoodDataKey,
        getRowConfigs: ({ dataFromDataKey }) => (
          getGetirFoodDeliveryTypeRowConfigs({
            t,
            rowData: dataFromDataKey?.missedCounts,
            parentDataKeysConfig: { deliveryType: getirFoodDataKey },
            childRowsConfig: {
              dataKey: getirFoodDataKey,
              getRowConfigs: ({ cityIdToCityNameMap, rowData }) => {
                return getCityRowsConfigs({
                  cityIdToData: getSimplifiedTotalsData({ dataWithTotals: rowData }),
                  parentDataKeysConfig: getirFoodDataKey,
                  cityIdToCityNameMap,
                });
              },
            },
          })
        ),
      },
    },
    {
      name: rowNames.demandCounts,
      dataKey: getirFoodDataKey,
      chartKey: getirFoodTableChartKeys.demandCounts,
      errorMsg,
      initialFormatter: ({ dataFromDataKey, startDates }) => (
        getTotalCountsForFirstRow({ dimension: dataFromDataKey?.demandCounts, startDates })
      ),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirFoodDataKey,
        getRowConfigs: ({ dataFromDataKey }) => (
          getGetirFoodDeliveryTypeRowConfigs({
            t,
            rowData: dataFromDataKey?.demandCounts,
            parentDataKeysConfig: { deliveryType: getirFoodDataKey },
            childRowsConfig: {
              dataKey: getirFoodDataKey,
              getRowConfigs: ({ cityIdToCityNameMap, rowData }) => {
                return getCityRowsConfigs({
                  cityIdToData: getSimplifiedTotalsData({ dataWithTotals: rowData }),
                  parentDataKeysConfig: getirFoodDataKey,
                  cityIdToCityNameMap,
                });
              },
            },
          })
        ),
      },
    },
    {
      name: rowNames.gmv,
      dataKey: getirFoodDataKey,
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
        dataKey: getirFoodDataKey,
        getRowConfigs: ({ dataFromDataKey, currency }) => {
          return getGetirFoodGMVRowsConfigs({ t, dataFromDataKey, computedDateRanges, currency });
        },
      },
    },
    {
      name: rowNames.chargedAmount,
      dataKey: getirFoodDataKey,
      chartKey: getirFoodTableChartKeys.chargedAmount,
      errorMsg,
      initialFormatter: params => (
        getTotalForFinancials({ ...params, rowName: 'chargedAmount' })
      ),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirFoodDataKey,
        getRowConfigs: ({ dataFromDataKey, currency }) => (
          getGetirFoodDeliveryTypeForFinancialRowConfigs({
            rowFinancialData: dataFromDataKey?.financials,
            t,
            currency,
            rowName: 'chargedAmount',
            parentDataKeysConfig: { deliveryType: getirFoodDataKey },
            childRowsConfig: {
              dataKey: getirFoodDataKey,
              getRowConfigs: ({ cityIdToCityNameMap, rowData }) => {
                return getCityRowsConfigs({
                  cityIdToData: getSimplifiedTotalsData({ dataWithTotals: rowData }),
                  parentDataKeysConfig: getirFoodDataKey,
                  cityIdToCityNameMap,
                });
              },
            },
          })
        ),
      },
    },
    {
      name: rowNames.netRevenue,
      dataKey: getirFoodDataKey,
      chartKey: getirFoodTableChartKeys.netRevenue,
      errorMsg,
      initialFormatter: params => (
        getTotalForFinancials({ ...params, rowName: 'netRevenue' })
      ),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirFoodDataKey,
        getRowConfigs: ({ dataFromDataKey, currency }) => (
          getGetirFoodDeliveryTypeForFinancialRowConfigs({
            rowFinancialData: dataFromDataKey?.financials,
            t,
            currency,
            rowName: 'netRevenue',
            parentDataKeysConfig: { deliveryType: getirFoodDataKey },
            childRowsConfig: {
              dataKey: getirFoodDataKey,
              getRowConfigs: ({ cityIdToCityNameMap, rowData }) => {
                return getCityRowsConfigs({
                  cityIdToData: getSimplifiedTotalsData({ dataWithTotals: rowData }),
                  parentDataKeysConfig: getirFoodDataKey,
                  cityIdToCityNameMap,
                });
              },
            },
          })
        ),
      },
    },
    {
      name: rowNames.grossMargin,
      dataKey: getirFoodDataKey,
      chartKey: getirFoodTableChartKeys.grossMargin,
      errorMsg,
      initialFormatter: params => (
        getTotalForFinancials({ ...params, rowName: 'grossMargin' })
      ),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirFoodDataKey,
        getRowConfigs: ({ dataFromDataKey, currency }) => (
          getGetirFoodDeliveryTypeForFinancialRowConfigs({
            rowFinancialData: dataFromDataKey?.financials,
            t,
            currency,
            rowName: 'grossMargin',
            parentDataKeysConfig: { deliveryType: getirFoodDataKey },
            childRowsConfig: {
              dataKey: getirFoodDataKey,
              getRowConfigs: ({ cityIdToCityNameMap, rowData }) => {
                return getCityRowsConfigs({
                  cityIdToData: getSimplifiedTotalsData({ dataWithTotals: rowData }),
                  parentDataKeysConfig: getirFoodDataKey,
                  cityIdToCityNameMap,
                });
              },
            },
          })
        ),
      },
    },
    {
      name: rowNames.basketValue,
      dataKey: getirFoodDataKey,
      chartKey: getirFoodTableChartKeys.basketValue,
      errorMsg,
      initialFormatter: params => (
        getTotalForFinancials({ ...params, rowName: 'basketValue' })
      ),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirFoodDataKey,
        getRowConfigs: ({ dataFromDataKey, currency }) => (
          getGetirFoodDeliveryTypeForFinancialRowConfigs({
            rowFinancialData: dataFromDataKey?.financials,
            t,
            currency,
            rowName: 'basketValue',
            parentDataKeysConfig: { deliveryType: getirFoodDataKey },
            childRowsConfig: {
              dataKey: getirFoodDataKey,
              getRowConfigs: ({ cityIdToCityNameMap, rowData }) => {
                return getCityRowsConfigs({
                  cityIdToData: getSimplifiedTotalsData({ dataWithTotals: rowData }),
                  parentDataKeysConfig: getirFoodDataKey,
                  cityIdToCityNameMap,
                });
              },
            },
          })
        ),
      },
    },
    {
      name: rowNames.basketAverage,
      dataKey: getirFoodDataKey,
      chartKey: getirFoodTableChartKeys.basketAverage,
      errorMsg,
      initialFormatter: params => (
        getTotalForFinancials({ ...params, rowName: 'basketAverage' })
      ),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirFoodDataKey,
        getRowConfigs: ({ dataFromDataKey, currency }) => (
          getGetirFoodDeliveryTypeForFinancialRowConfigs({
            rowFinancialData: dataFromDataKey?.financials,
            t,
            currency,
            rowName: 'basketAverage',
            parentDataKeysConfig: { deliveryType: getirFoodDataKey },
            childRowsConfig: {
              dataKey: getirFoodDataKey,
              getRowConfigs: ({ cityIdToCityNameMap, rowData }) => {
                return getCityRowsConfigs({
                  cityIdToData: getSimplifiedTotalsData({ dataWithTotals: rowData }),
                  parentDataKeysConfig: getirFoodDataKey,
                  cityIdToCityNameMap,
                });
              },
            },
          })
        ),
      },
    },
    {
      name: rowNames.deliveryFee,
      dataKey: getirFoodDataKey,
      chartKey: getirFoodTableChartKeys.deliveryFee,
      errorMsg,
      initialFormatter: params => (
        getTotalForFinancials({ ...params, rowName: 'deliveryFee' })
      ),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirFoodDataKey,
        getRowConfigs: ({ dataFromDataKey, currency }) => (
          getGetirFoodDeliveryTypeForFinancialRowConfigs({
            rowFinancialData: dataFromDataKey?.financials,
            t,
            currency,
            rowName: 'deliveryFee',
            parentDataKeysConfig: { deliveryType: getirFoodDataKey },
            childRowsConfig: {
              dataKey: getirFoodDataKey,
              getRowConfigs: ({ cityIdToCityNameMap, rowData }) => {
                return getCityRowsConfigs({
                  cityIdToData: getSimplifiedTotalsData({ dataWithTotals: rowData }),
                  parentDataKeysConfig: getirFoodDataKey,
                  cityIdToCityNameMap,
                });
              },
            },
          })
        ),
      },
    },
  ];
};

const getirLocalsDataKey = 'getirLocalsData';

export const getGetirLocalsTableGMVRowsConfigs = ({ t, dataFromDataKey, currency, computedDateRanges }) => {
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
        dataKey: getirLocalsDataKey,
        initialFormatter: () => {
          const allZero = Object.values(grossMarketValue).every(val => val === 0);
          return allZero ? null : grossMarketValue;
        },
        childRowsConfig: {
          dataKey: getirLocalsDataKey,
          getRowConfigs: ({ cityIdToCityNameMap }) => {
            return getFinancialsGMVCityRowsConfigs({
              basketValue: basketValueDataByDeliveryType?.subTable,
              deliveryFee: deliveryFeeDataByDeliveryType?.subTable,
              parentDataKeysConfig: getirLocalsDataKey,
              cityIdToCityNameMap,
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
      dataKey: getirLocalsDataKey,
      isSectionHeader: true,
    },
    {
      name: rowNames.orderCounts,
      dataKey: getirLocalsDataKey,
      chartKey: getirLocalsTableChartKeys.orderCounts,
      endpoint: getGetirLocalsData,
      customRequestBody: {},
      errorMsg,
      initialFormatter: ({ dataFromDataKey, startDates }) => (
        getTotalCountsForFirstRow({ dimension: dataFromDataKey?.orderCounts, startDates })
      ),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirLocalsDataKey,
        getRowConfigs: ({ dataFromDataKey }) => (
          getGetirLocalsDeliveryTypeRowConfigs({
            t,
            rowData: dataFromDataKey?.orderCounts,
            parentDataKeysConfig: { deliveryType: getirLocalsDataKey },
            childRowsConfig: {
              dataKey: getirLocalsDataKey,
              getRowConfigs: ({ cityIdToCityNameMap, rowData }) => {
                return getCityRowsConfigs({
                  cityIdToData: getSimplifiedTotalsData({ dataWithTotals: rowData }),
                  parentDataKeysConfig: getirLocalsDataKey,
                  cityIdToCityNameMap,
                });
              },
            },
          })
        ),
      },
    },
    {
      name: rowNames.organicCounts,
      dataKey: getirLocalsDataKey,
      chartKey: getirLocalsTableChartKeys.organicCounts,
      errorMsg,
      initialFormatter: ({ dataFromDataKey, startDates }) => (
        getTotalCountsForFirstRow({ dimension: dataFromDataKey?.organicCounts, startDates })
      ),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirLocalsDataKey,
        getRowConfigs: ({ dataFromDataKey }) => (
          getGetirLocalsDeliveryTypeRowConfigs({
            t,
            rowData: dataFromDataKey?.organicCounts,
            parentDataKeysConfig: { deliveryType: getirLocalsDataKey },
            childRowsConfig: {
              dataKey: getirLocalsDataKey,
              getRowConfigs: ({ cityIdToCityNameMap, rowData }) => {
                return getCityRowsConfigs({
                  cityIdToData: getSimplifiedTotalsData({ dataWithTotals: rowData }),
                  parentDataKeysConfig: getirLocalsDataKey,
                  cityIdToCityNameMap,
                });
              },
            },
          })
        ),
      },
    },
    {
      name: rowNames.promoUsedCounts,
      dataKey: getirLocalsDataKey,
      chartKey: getirLocalsTableChartKeys.promoUsedCounts,
      errorMsg,
      initialFormatter: ({ dataFromDataKey, startDates }) => (
        getTotalCountsForFirstRow({ dimension: dataFromDataKey?.promoUsedCounts, startDates })
      ),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirLocalsDataKey,
        getRowConfigs: ({ dataFromDataKey }) => (
          getGetirLocalsDeliveryTypeRowConfigs({
            t,
            rowData: dataFromDataKey?.promoUsedCounts,
            parentDataKeysConfig: { deliveryType: getirLocalsDataKey },
            childRowsConfig: {
              dataKey: getirLocalsDataKey,
              getRowConfigs: ({ cityIdToCityNameMap, rowData }) => {
                return getCityRowsConfigs({
                  cityIdToData: getSimplifiedTotalsData({ dataWithTotals: rowData }),
                  parentDataKeysConfig: getirLocalsDataKey,
                  cityIdToCityNameMap,
                });
              },
            },
          })
        ),
      },
    },
    {
      name: rowNames.missedCounts,
      dataKey: getirLocalsDataKey,
      chartKey: getirLocalsTableChartKeys.missedCounts,
      errorMsg,
      initialFormatter: ({ dataFromDataKey, startDates }) => (
        getTotalCountsForFirstRow({ dimension: dataFromDataKey?.missedCounts, startDates })
      ),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirLocalsDataKey,
        getRowConfigs: ({ dataFromDataKey }) => (
          getGetirLocalsDeliveryTypeRowConfigs({
            t,
            rowData: dataFromDataKey?.missedCounts,
            parentDataKeysConfig: { deliveryType: getirLocalsDataKey },
            childRowsConfig: {
              dataKey: getirLocalsDataKey,
              getRowConfigs: ({ cityIdToCityNameMap, rowData }) => {
                return getCityRowsConfigs({
                  cityIdToData: getSimplifiedTotalsData({ dataWithTotals: rowData }),
                  parentDataKeysConfig: getirLocalsDataKey,
                  cityIdToCityNameMap,
                });
              },
            },
          })
        ),
      },
    },
    {
      name: rowNames.demandCounts,
      dataKey: getirLocalsDataKey,
      chartKey: getirLocalsTableChartKeys.demandCounts,
      errorMsg,
      initialFormatter: ({ dataFromDataKey, startDates }) => (
        getTotalCountsForFirstRow({ dimension: dataFromDataKey?.demandCounts, startDates })
      ),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirLocalsDataKey,
        getRowConfigs: ({ dataFromDataKey }) => (
          getGetirLocalsDeliveryTypeRowConfigs({
            t,
            rowData: dataFromDataKey?.demandCounts,
            parentDataKeysConfig: { deliveryType: getirLocalsDataKey },
            childRowsConfig: {
              dataKey: getirLocalsDataKey,
              getRowConfigs: ({ cityIdToCityNameMap, rowData }) => {
                return getCityRowsConfigs({
                  cityIdToData: getSimplifiedTotalsData({ dataWithTotals: rowData }),
                  parentDataKeysConfig: getirLocalsDataKey,
                  cityIdToCityNameMap,
                });
              },
            },
          })
        ),
      },
    },
    {
      name: rowNames.gmv,
      dataKey: getirLocalsDataKey,
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
        dataKey: getirLocalsDataKey,
        getRowConfigs: ({ dataFromDataKey, currency }) => {
          return getGetirLocalsTableGMVRowsConfigs({ t, dataFromDataKey, computedDateRanges, currency });
        },
      },
    },
    {
      name: rowNames.chargedAmount,
      dataKey: getirLocalsDataKey,
      chartKey: getirLocalsTableChartKeys.chargedAmount,
      errorMsg,
      initialFormatter: params => (
        getTotalForFinancials({ ...params, rowName: 'chargedAmount' })
      ),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirLocalsDataKey,
        getRowConfigs: ({ dataFromDataKey, currency }) => (
          getGetirLocalsDeliveryTypeForFinancialRowConfigs({
            rowFinancialData: dataFromDataKey?.financials,
            t,
            currency,
            rowName: 'chargedAmount',
            parentDataKeysConfig: { deliveryType: getirLocalsDataKey },
            childRowsConfig: {
              dataKey: getirLocalsDataKey,
              getRowConfigs: ({ cityIdToCityNameMap, rowData }) => {
                return getCityRowsConfigs({
                  cityIdToData: getSimplifiedTotalsData({ dataWithTotals: rowData }),
                  parentDataKeysConfig: getirLocalsDataKey,
                  cityIdToCityNameMap,
                });
              },
            },
          })
        ),
      },
    },
    {
      name: rowNames.netRevenue,
      dataKey: getirLocalsDataKey,
      chartKey: getirLocalsTableChartKeys.netRevenue,
      errorMsg,
      initialFormatter: params => (
        getTotalForFinancials({ ...params, rowName: 'netRevenue' })
      ),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirLocalsDataKey,
        getRowConfigs: ({ dataFromDataKey, currency }) => (
          getGetirLocalsDeliveryTypeForFinancialRowConfigs({
            rowFinancialData: dataFromDataKey?.financials,
            t,
            currency,
            rowName: 'netRevenue',
            parentDataKeysConfig: { deliveryType: getirLocalsDataKey },
            childRowsConfig: {
              dataKey: getirLocalsDataKey,
              getRowConfigs: ({ cityIdToCityNameMap, rowData }) => {
                return getCityRowsConfigs({
                  cityIdToData: getSimplifiedTotalsData({ dataWithTotals: rowData }),
                  parentDataKeysConfig: getirLocalsDataKey,
                  cityIdToCityNameMap,
                });
              },
            },
          })
        ),
      },
    },
    {
      name: rowNames.grossMargin,
      dataKey: getirLocalsDataKey,
      chartKey: getirLocalsTableChartKeys.grossMargin,
      errorMsg,
      initialFormatter: params => (
        getTotalForFinancials({ ...params, rowName: 'grossMargin' })
      ),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirLocalsDataKey,
        getRowConfigs: ({ dataFromDataKey, currency }) => (
          getGetirLocalsDeliveryTypeForFinancialRowConfigs({
            rowFinancialData: dataFromDataKey?.financials,
            t,
            currency,
            rowName: 'grossMargin',
            parentDataKeysConfig: { deliveryType: getirLocalsDataKey },
            childRowsConfig: {
              dataKey: getirLocalsDataKey,
              getRowConfigs: ({ cityIdToCityNameMap, rowData }) => {
                return getCityRowsConfigs({
                  cityIdToData: getSimplifiedTotalsData({ dataWithTotals: rowData }),
                  parentDataKeysConfig: getirLocalsDataKey,
                  cityIdToCityNameMap,
                });
              },
            },
          })
        ),
      },
    },
    {
      name: rowNames.basketValue,
      dataKey: getirLocalsDataKey,
      chartKey: getirLocalsTableChartKeys.basketValue,
      errorMsg,
      initialFormatter: params => (
        getTotalForFinancials({ ...params, rowName: 'basketValue' })
      ),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirLocalsDataKey,
        getRowConfigs: ({ dataFromDataKey, currency }) => (
          getGetirLocalsDeliveryTypeForFinancialRowConfigs({
            rowFinancialData: dataFromDataKey?.financials,
            t,
            currency,
            rowName: 'basketValue',
            parentDataKeysConfig: { deliveryType: getirLocalsDataKey },
            childRowsConfig: {
              dataKey: getirLocalsDataKey,
              getRowConfigs: ({ cityIdToCityNameMap, rowData }) => {
                return getCityRowsConfigs({
                  cityIdToData: getSimplifiedTotalsData({ dataWithTotals: rowData }),
                  parentDataKeysConfig: getirLocalsDataKey,
                  cityIdToCityNameMap,
                });
              },
            },
          })
        ),
      },
    },
    {
      name: rowNames.basketAverage,
      dataKey: getirLocalsDataKey,
      chartKey: getirLocalsTableChartKeys.basketAverage,
      errorMsg,
      initialFormatter: params => (
        getTotalForFinancials({ ...params, rowName: 'basketAverage' })
      ),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirLocalsDataKey,
        getRowConfigs: ({ dataFromDataKey, currency }) => (
          getGetirLocalsDeliveryTypeForFinancialRowConfigs({
            rowFinancialData: dataFromDataKey?.financials,
            t,
            currency,
            rowName: 'basketAverage',
            parentDataKeysConfig: { deliveryType: getirLocalsDataKey },
            childRowsConfig: {
              dataKey: getirLocalsDataKey,
              getRowConfigs: ({ cityIdToCityNameMap, rowData }) => {
                return getCityRowsConfigs({
                  cityIdToData: getSimplifiedTotalsData({ dataWithTotals: rowData }),
                  parentDataKeysConfig: getirLocalsDataKey,
                  cityIdToCityNameMap,
                });
              },
            },
          })
        ),
      },
    },
    {
      name: rowNames.deliveryFee,
      dataKey: getirLocalsDataKey,
      chartKey: getirLocalsTableChartKeys.deliveryFee,
      errorMsg,
      initialFormatter: params => (
        getTotalForFinancials({ ...params, rowName: 'deliveryFee' })
      ),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirLocalsDataKey,
        getRowConfigs: ({ dataFromDataKey, currency }) => (
          getGetirLocalsDeliveryTypeForFinancialRowConfigs({
            rowFinancialData: dataFromDataKey?.financials,
            t,
            currency,
            rowName: 'deliveryFee',
            parentDataKeysConfig: { deliveryType: getirLocalsDataKey },
            childRowsConfig: {
              dataKey: getirLocalsDataKey,
              getRowConfigs: ({ cityIdToCityNameMap, rowData }) => {
                return getCityRowsConfigs({
                  cityIdToData: getSimplifiedTotalsData({ dataWithTotals: rowData }),
                  parentDataKeysConfig: getirLocalsDataKey,
                  cityIdToCityNameMap,
                });
              },
            },
          })
        ),
      },
    },
  ];
};

const getirDriveDataKey = 'getirDriveData';

export const getGetirDriveTableRowConfigs = ({ t }) => {
  const rowNames = {
    sectionHeader: t('global:GETIR_DRIVE'),
    rentalCounts: t('RENTAL'),
    organicCounts: t('ORGANIC_ORDER_TOTAL'),
    promoUsedCounts: t('PROMO_USED_TOTAL'),
    missedCounts: t('MISSED_ORDER_TOTAL'),
    chargedAmount: t('CHARGED_AMOUNT'),
    netRevenue: t('NET_REVENUE'),
    grossMargin: t('GROSS_MARGIN'),
    basketValue: t('BASKET_TOTAL'),
    basketAverage: t('BASKET_AVERAGE'),
    uniqueTabClickCounts: t('TAB_CLICK_UNIQUE'),
    totalTabClickCounts: t('TAB_CLICK_TOTAL'),
  };

  const errorMsg = t('MISSING_GETIR_DRIVE_DATA');

  return [
    {
      name: rowNames.sectionHeader,
      dataKey: getirDriveDataKey,
      isSectionHeader: true,
    },
    {
      name: rowNames.rentalCounts,
      dataKey: getirDriveDataKey,
      chartKey: getirDriveTableChartKeys.successfulRentalCounts,
      endpoint: getGetirDriveData,
      customRequestBody: {},
      errorMsg,
      initialFormatter: ({ dataFromDataKey, startDates }) => (
        getTotalCountsForFirstRow({ dimension: dataFromDataKey?.successfulRentalCounts, startDates })
      ),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirDriveDataKey,
        getRowConfigs: ({ dataFromDataKey }) => (
          getGetirDriveSourceTypeRowConfigs({
            t,
            rowData: dataFromDataKey?.successfulRentalCounts,
            parentDataKeysConfig: { sourceType: getirDriveDataKey },
            childRowsConfig: {
              dataKey: getirDriveDataKey,
              getRowConfigs: ({ cityIdToCityNameMap, rowData }) => {
                return getCityRowsConfigs({
                  cityIdToData: getSimplifiedTotalsData({ dataWithTotals: rowData }),
                  parentDataKeysConfig: getirDriveDataKey,
                  cityIdToCityNameMap,
                });
              },
            },
          })
        ),
      },
    },
    {
      name: rowNames.organicCounts,
      dataKey: getirDriveDataKey,
      chartKey: getirDriveTableChartKeys.organicCounts,
      errorMsg,
      initialFormatter: ({ dataFromDataKey, startDates }) => (
        getTotalCountsForFirstRow({ dimension: dataFromDataKey?.organicCounts, startDates })
      ),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirDriveDataKey,
        getRowConfigs: ({ dataFromDataKey }) => (
          getGetirDriveSourceTypeRowConfigs({
            t,
            rowData: dataFromDataKey?.organicCounts,
            parentDataKeysConfig: { sourceType: getirDriveDataKey },
            childRowsConfig: {
              dataKey: getirDriveDataKey,
              getRowConfigs: ({ cityIdToCityNameMap, rowData }) => {
                return getCityRowsConfigs({
                  cityIdToData: getSimplifiedTotalsData({ dataWithTotals: rowData }),
                  parentDataKeysConfig: getirDriveDataKey,
                  cityIdToCityNameMap,
                });
              },
            },
          })
        ),
      },
    },
    {
      name: rowNames.promoUsedCounts,
      dataKey: getirDriveDataKey,
      chartKey: getirDriveTableChartKeys.promoUsedCounts,
      errorMsg,
      initialFormatter: ({ dataFromDataKey, startDates }) => (
        getTotalCountsForFirstRow({ dimension: dataFromDataKey?.promoUsedCounts, startDates })
      ),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirDriveDataKey,
        getRowConfigs: ({ dataFromDataKey }) => (
          getGetirDriveSourceTypeRowConfigs({
            t,
            rowData: dataFromDataKey?.promoUsedCounts,
            parentDataKeysConfig: { sourceType: getirDriveDataKey },
            childRowsConfig: {
              dataKey: getirDriveDataKey,
              getRowConfigs: ({ cityIdToCityNameMap, rowData }) => {
                return getCityRowsConfigs({
                  cityIdToData: getSimplifiedTotalsData({ dataWithTotals: rowData }),
                  parentDataKeysConfig: getirDriveDataKey,
                  cityIdToCityNameMap,
                });
              },
            },
          })
        ),
      },
    },
    {
      name: rowNames.missedCounts,
      dataKey: getirDriveDataKey,
      chartKey: getirDriveTableChartKeys.missedCounts,
      errorMsg,
      initialFormatter: ({ dataFromDataKey, startDates }) => (
        getTotalCountsForFirstRow({ dimension: dataFromDataKey?.missedCounts, startDates })
      ),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirDriveDataKey,
        getRowConfigs: ({ dataFromDataKey }) => (
          getGetirDriveSourceTypeRowConfigs({
            t,
            rowData: dataFromDataKey?.missedCounts,
            parentDataKeysConfig: { sourceType: getirDriveDataKey },
            childRowsConfig: {
              dataKey: getirDriveDataKey,
              getRowConfigs: ({ cityIdToCityNameMap, rowData }) => {
                return getCityRowsConfigs({
                  cityIdToData: getSimplifiedTotalsData({ dataWithTotals: rowData }),
                  parentDataKeysConfig: getirDriveDataKey,
                  cityIdToCityNameMap,
                });
              },
            },
          })
        ),
      },
    },
    {
      name: rowNames.chargedAmount,
      dataKey: getirDriveDataKey,
      chartKey: getirDriveTableChartKeys.chargedAmount,
      errorMsg,
      initialFormatter: params => getTotalForGetirDriveFinancials({ ...params, rowName: 'chargedAmount' }),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirDriveDataKey,
        getRowConfigs: ({ currency, dataFromDataKey }) => (
          getGetirDriveSourceTypeForFinancialsRowConfigs({
            currency,
            rowName: 'chargedAmount',
            t,
            rowFinancialData: dataFromDataKey?.financials,
            rowData: dataFromDataKey?.chargedAmount,
            parentDataKeysConfig: { sourceType: getirDriveDataKey },
            childRowsConfig: {
              dataKey: getirDriveDataKey,
              getRowConfigs: ({ cityIdToCityNameMap, rowData }) => {
                return getCityRowsConfigs({
                  cityIdToData: getSimplifiedTotalsData({ dataWithTotals: rowData }),
                  parentDataKeysConfig: getirDriveDataKey,
                  cityIdToCityNameMap,
                });
              },
            },
          })
        ),
      },
    },
    {
      name: rowNames.netRevenue,
      dataKey: getirDriveDataKey,
      chartKey: getirDriveTableChartKeys.netRevenue,
      errorMsg,
      initialFormatter: params => getTotalForGetirDriveFinancials({ ...params, rowName: 'netRevenue' }),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirDriveDataKey,
        getRowConfigs: ({ currency, dataFromDataKey }) => (
          getGetirDriveSourceTypeForFinancialsRowConfigs({
            currency,
            rowName: 'netRevenue',
            t,
            rowFinancialData: dataFromDataKey?.financials,
            rowData: dataFromDataKey?.netRevenue,
            parentDataKeysConfig: { sourceType: getirDriveDataKey },
            childRowsConfig: {
              dataKey: getirDriveDataKey,
              getRowConfigs: ({ cityIdToCityNameMap, rowData }) => {
                return getCityRowsConfigs({
                  cityIdToData: getSimplifiedTotalsData({ dataWithTotals: rowData }),
                  parentDataKeysConfig: getirDriveDataKey,
                  cityIdToCityNameMap,
                });
              },
            },
          })
        ),
      },
    },
    {
      name: rowNames.grossMargin,
      dataKey: getirDriveDataKey,
      chartKey: getirDriveTableChartKeys.grossMargin,
      errorMsg,
      initialFormatter: params => getTotalForGetirDriveFinancials({ ...params, rowName: 'grossMargin' }),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirDriveDataKey,
        getRowConfigs: ({ currency, dataFromDataKey }) => (
          getGetirDriveSourceTypeForFinancialsRowConfigs({
            currency,
            rowName: 'grossMargin',
            t,
            rowFinancialData: dataFromDataKey?.financials,
            rowData: dataFromDataKey?.grossMargin,
            parentDataKeysConfig: { sourceType: getirDriveDataKey },
            childRowsConfig: {
              dataKey: getirDriveDataKey,
              getRowConfigs: ({ cityIdToCityNameMap, rowData }) => {
                return getCityRowsConfigs({
                  cityIdToData: getSimplifiedTotalsData({ dataWithTotals: rowData }),
                  parentDataKeysConfig: getirDriveDataKey,
                  cityIdToCityNameMap,
                });
              },
            },
          })
        ),
      },
    },
    {
      name: rowNames.basketValue,
      dataKey: getirDriveDataKey,
      chartKey: getirDriveTableChartKeys.basketValue,
      errorMsg,
      initialFormatter: params => getTotalForGetirDriveFinancials({ ...params, rowName: 'basketValue' }),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirDriveDataKey,
        getRowConfigs: ({ currency, dataFromDataKey }) => (
          getGetirDriveSourceTypeForFinancialsRowConfigs({
            currency,
            rowName: 'basketValue',
            t,
            rowFinancialData: dataFromDataKey?.financials,
            rowData: dataFromDataKey?.basketValue,
            parentDataKeysConfig: { sourceType: getirDriveDataKey },
            childRowsConfig: {
              dataKey: getirDriveDataKey,
              getRowConfigs: ({ cityIdToCityNameMap, rowData }) => {
                return getCityRowsConfigs({
                  cityIdToData: getSimplifiedTotalsData({ dataWithTotals: rowData }),
                  parentDataKeysConfig: getirDriveDataKey,
                  cityIdToCityNameMap,
                });
              },
            },
          })
        ),
      },
    },
    {
      name: rowNames.basketAverage,
      dataKey: getirDriveDataKey,
      chartKey: getirDriveTableChartKeys.basketAverage,
      errorMsg,
      shouldAssignCurrencyFormatter: true,
      initialFormatter: params => getTotalBasketAverageForGetirDrive({ ...params, rowName: 'basketAverage' }),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirDriveDataKey,
        getRowConfigs: ({ currency, dataFromDataKey }) => (
          getGetirDriveSourceTypeForFinancialsRowConfigs({
            currency,
            rowName: 'basketAverage',
            t,
            rowFinancialData: dataFromDataKey?.financials,
            rowData: dataFromDataKey?.basketValue,
            parentDataKeysConfig: { sourceType: getirDriveDataKey },
            childRowsConfig: {
              dataKey: getirDriveDataKey,
              getRowConfigs: ({ cityIdToCityNameMap, rowData }) => {
                return getCityRowsConfigs({
                  cityIdToData: getSimplifiedTotalsData({ dataWithTotals: rowData }),
                  parentDataKeysConfig: getirDriveDataKey,
                  cityIdToCityNameMap,
                });
              },
            },
          })
        ),
      },
    },
    {
      name: rowNames.totalTabClickCounts,
      dataKey: getirDriveDataKey,
      chartKey: getirDriveTableChartKeys.totalTabClickCounts,
      errorMsg,
      initialFormatter: ({ dataFromDataKey }) => dataFromDataKey?.totalTabClickCounts?.undefined?.totals || {},
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirDriveDataKey,
        getRowConfigs: ({ dataFromDataKey, cityIdToCityNameMap }) => (
          getGetirDriveCityTypeRowsConfigs({
            dataFromDataKey: dataFromDataKey?.totalTabClickCounts?.undefined?.subTable || {},
            parentDataKeysConfig: getirDriveDataKey,
            cityIdToCityNameMap,
          })
        ),
      },
    },
    {
      name: rowNames.uniqueTabClickCounts,
      dataKey: getirDriveDataKey,
      chartKey: getirDriveTableChartKeys.uniqueTabClickCounts,
      errorMsg,
      initialFormatter: ({ dataFromDataKey }) => dataFromDataKey?.uniqueTabClickCounts?.undefined?.totals || {},
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirDriveDataKey,
        getRowConfigs: ({ dataFromDataKey, cityIdToCityNameMap }) => (
          getGetirDriveCityTypeRowsConfigs({
            dataFromDataKey: dataFromDataKey?.uniqueTabClickCounts?.undefined?.subTable || {},
            parentDataKeysConfig: getirDriveDataKey,
            cityIdToCityNameMap,
          })
        ),
      },
    },
  ];
};

const getirJobsDataKey = 'getirJobsData';

function getGetirJobsPostTypeRowConfigsWithCities({ rowData, t }) {
  if (isEmpty(rowData)) {
    return [];
  }

  return getGetirJobsPostTypeRowConfigs({
    t,
    rowData,
    parentDataKeysConfig: { postTypes: getirJobsDataKey },
    childRowsConfig: {
      dataKey: getirJobsDataKey,
      getRowConfigs: ({ rowData: data, key, cityIdToCityNameMap, dateRanges }) => {
        const unformattedData = { ...data };
        const formattedData = {};
        Object.keys(unformattedData).forEach(cityId => {
          if (!BAD_KEYS_FOR_GETIR_JOBS.includes(cityId)) {
            formattedData[cityId] = getFormattedGetirJobsPostTypesData({
              postTypesData: { [key]: unformattedData[cityId] },
              dateRanges,
            });
          }
        });

        return getCityRowsConfigs({
          cityIdToData: formattedData,
          parentDataKeysConfig: getirJobsDataKey,
          cityIdToCityNameMap,
        });
      },
    },
  });
}

export const getGetirJobsTableRowConfigs = ({ t }) => {
  const rowNames = {
    sectionHeader: t('GETIR_JOBS'),
    activePosts: t('JOBS_AVERAGE_ACTIVE_POSTS'),
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
      dataKey: getirJobsDataKey,
      isSectionHeader: true,
    },
    {
      name: rowNames.posts,
      dataKey: getirJobsDataKey,
      chartKey: getirJobsTableChartKeys.posts,
      endpoint: getGetirJobsData,
      customRequestBody: {},
      errorMsg,
      initialFormatter: ({ dataFromDataKey, startDates }) => getTotalForGetirJobs({ postTypesData: dataFromDataKey?.posts, startDates }),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirJobsDataKey,
        getRowConfigs: ({ dataFromDataKey }) => (
          getGetirJobsPostTypeRowConfigsWithCities({
            t,
            rowData: dataFromDataKey?.posts,
            parentDataKeysConfig: { postTypes: getirJobsDataKey },
          })
        ),
      },
    },
    {
      name: rowNames.applications,
      dataKey: getirJobsDataKey,
      chartKey: getirJobsTableChartKeys.applications,
      initialFormatter: ({ dataFromDataKey, startDates }) => getTotalForGetirJobs({ postTypesData: dataFromDataKey?.applications, startDates }),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirJobsDataKey,
        getRowConfigs: ({ dataFromDataKey }) => (
          getGetirJobsPostTypeRowConfigsWithCities({
            t,
            rowData: dataFromDataKey?.applications,
            parentDataKeysConfig: { postTypes: getirJobsDataKey },
          })
        ),
      },
    },
    {
      name: rowNames.videoCalls,
      dataKey: getirJobsDataKey,
      chartKey: getirJobsTableChartKeys.finishedVideoCall,
      initialFormatter: ({
        dataFromDataKey,
        startDates,
      }) => getTotalForGetirJobs({
        postTypesData: dataFromDataKey?.finishedVideoCall,
        allowUndefined: true,
        startDates,
      }),
      shouldItBeAffectedFromSorting: false,
      // For the loading spinner to appear until the data is loaded
      childRowsConfig: {
        dataKey: getirJobsDataKey,
        getRowConfigs: () => ({}),
      },
    },
    {
      name: rowNames.registerUser,
      dataKey: getirJobsDataKey,
      chartKey: getirJobsTableChartKeys.registerUser,
      initialFormatter: ({
        dataFromDataKey,
        startDates,
      }) => getTotalForGetirJobs({
        postTypesData: dataFromDataKey?.registerUser,
        allowUndefined: true,
        startDates,
      }),
      shouldItBeAffectedFromSorting: false,
      // For the loading spinner to appear until the data is loaded
      childRowsConfig: {
        dataKey: getirJobsDataKey,
        getRowConfigs: () => ({}),
      },
    },
  ];
};

// GetirN11
export function getGetirN11FinancialsRowsConfigs({
  numberFormatter,
  dataFromDataKey,
  parentDataKey,
  currency,
  t,
  rowName,
}) {
  const financialDataByCurrency = dataFromDataKey.financials[currency.toLowerCase()];
  const rowData = get(financialDataByCurrency, [rowName, 'undefined', 'subTable'], {});

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
        });
      },
    },
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
        getTotalCountsForFirstRow({
          dimension: dataFromDataKey.orderCount,
          startDates,
          excludedKey: GETIR_N11_SOURCE_TYPE.N11_QUICK,
        })
      ),
      shouldItBeAffectedFromSorting: false,
      childRowsConfig: {
        dataKey: getirN11DataKey,
        getRowConfigs: ({ dataFromDataKey }) => {
          return getGetirN11SourceTypeRowConfigs({
            t,
            rowData: dataFromDataKey?.orderCount,
            parentDataKey: getirN11DataKey,
            childRowsConfig: {
              dataKey: getirN11DataKey,
              getRowConfigs: ({ rowData: categoryData }) => {
                return getGetirN11CategoryGroupRowsConfigs({
                  parentDataKey: getirN11DataKey,
                  rowData: categoryData,
                });
              },
            },
          });
        },
      },
    },
    {
      name: rowNames.grossMarketValue,
      dataKey: getirN11DataKey,
      chartKey: getirN11TableChartKeys.grossMarketValue,
      customRequestBody: {},
      errorMsg,
      initialFormatter: params => getTotalForGetirN11Financials({
        ...params,
        rowName: 'totalGMV',
        excludedKey: GETIR_N11_SOURCE_TYPE.N11_QUICK,
      }),
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
      initialFormatter: params => getGMVAverageForN11({
        ...params,
        rowName: 'totalGMV',
        excludedKey: GETIR_N11_SOURCE_TYPE.N11_QUICK,
      }),
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
        getRowConfigs: ({ dataFromDataKey }) => {
          return getGetirN11ChannelTypeRowConfigs({
            t,
            rowData: dataFromDataKey.traffic,
            parentDataKey: getirN11DataKey,
          });
        },
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
          getRowConfigs: ({ cityIdToCityNameMap }) => (
            getFinancialCityRowsConfigs({
              cityIdToData: domainData?.subTable,
              parentDataKeysConfig: getirSelectDataKey,
              cityIdToCityNameMap,
            })
          ),
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
        getTotalCountsForFirstRow({
          dimension: dataFromDataKey?.totalRevenue?.[currency.toLowerCase()]?.totalRevenue,
          startDates,
        })
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
            currency,
            t,
            rowName: 'deliveryFeeDiscountCost',
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
            currency,
            t,
            rowName: 'promoAandm',
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
      customRequestBody: { dimensions: ['city_name'] },
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
              getRowConfigs: ({ dataFromDataKey, cityIdToCityNameMap }) => {
                const cityIdToData = {};
                _forEach(dataFromDataKey?.getirGorillasOrderCounts, (cityData, cityId) => {
                  cityIdToData[cityId] = cityData.totals;
                });
                return getCityRowsConfigs({
                  cityIdToData,
                  cityIdToCityNameMap,
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
              getRowConfigs: ({ dataFromDataKey }) => {
                const cityNameToData = getSimplifiedTotalsData({ dataWithTotals: dataFromDataKey?.gorillasOnlyOrderCounts });
                return _map(cityNameToData, (cityData, cityName) => ({
                  name: cityName,
                  dataKey: gorillasDataKey,
                  initialFormatter: () => cityData,
                }));
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
              return getTotalCountsForFirstRow({
                dimension: dataFromDataKey?.getirGorillasFinancials?.[currency.toLowerCase()]?.netRevenue,
                startDates,
              });
            },
            childRowsConfig: {
              dataKey: gorillasDataKey,
              getRowConfigs: ({ dataFromDataKey, currency, cityIdToCityNameMap }) => {
                const netRevenueByCities = dataFromDataKey?.getirGorillasFinancials?.[currency.toLowerCase()]?.netRevenue;
                const cityIdToData = {};
                _forEach(netRevenueByCities, (cityData, cityId) => {
                  cityIdToData[cityId] = cityData.totals;
                });
                return getCityRowsConfigs({
                  cityIdToData,
                  cityIdToCityNameMap,
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
              return getTotalCountsForFirstRow({
                dimension: dataFromDataKey?.gorillasOnlyFinancials?.[currency.toLowerCase()]?.netRevenue,
                startDates,
              });
            },
            childRowsConfig: {
              dataKey: gorillasDataKey,
              getRowConfigs: ({ dataFromDataKey, currency }) => {
                const netRevenueByCities = dataFromDataKey?.gorillasOnlyFinancials?.[currency.toLowerCase()]?.netRevenue;
                const cityNameToData = getSimplifiedTotalsData({ dataWithTotals: netRevenueByCities });
                return _map(cityNameToData, (cityData, cityName) => ({
                  name: cityName,
                  dataKey: gorillasDataKey,
                  initialFormatter: () => cityData,
                }));
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
              return getTotalCountsForFirstRow({
                dimension: dataFromDataKey?.getirGorillasFinancials?.[currency.toLowerCase()]?.gmv,
                startDates,
              });
            },
            childRowsConfig: {
              dataKey: gorillasDataKey,
              getRowConfigs: ({ dataFromDataKey, currency, cityIdToCityNameMap }) => {
                const gmvByCities = dataFromDataKey?.getirGorillasFinancials?.[currency.toLowerCase()]?.gmv;
                const cityIdToData = {};
                _forEach(gmvByCities, (cityData, cityId) => {
                  cityIdToData[cityId] = cityData.totals;
                });
                return getCityRowsConfigs({
                  cityIdToData,
                  cityIdToCityNameMap,
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
              return getTotalCountsForFirstRow({
                dimension: dataFromDataKey?.gorillasOnlyFinancials?.[currency.toLowerCase()]?.gmv,
                startDates,
              });
            },
            childRowsConfig: {
              dataKey: gorillasDataKey,
              getRowConfigs: ({ dataFromDataKey, currency }) => {
                const gmvByCities = dataFromDataKey?.gorillasOnlyFinancials?.[currency.toLowerCase()]?.gmv;
                const cityNameToData = getSimplifiedTotalsData({ dataWithTotals: gmvByCities });
                return _map(cityNameToData, (cityData, cityName) => ({
                  name: cityName,
                  dataKey: gorillasDataKey,
                  initialFormatter: () => cityData,
                }));
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
      customRequestBody: { dimensions: ['integrationType', 'city'] },
      initialFormatter: ({ dataFromDataKey, startDates }) => {
        return getTotalCountsForFirstRow({ dimension: dataFromDataKey?.orderCounts, startDates });
      },
      childRowsConfig: {
        dataKey: getirMarketIntegrationDataKey,
        getRowConfigs: ({ dataFromDataKey, cityIdToCityNameMap }) => {
          const configs = [];
          const dataByIntegrationType = get(dataFromDataKey, ['orderCounts'], []);
          _forEach(INTEGRATION_TYPES_SORT, integrationType => {
            const integrationData = get(dataByIntegrationType, [integrationType]);
            if (integrationData) {
              const cityIdToData = {};
              _forEach(integrationData.subTable, (cityData, cityId) => {
                cityIdToData[cityId] = cityData.totals;
              });
              const cityRowsConfigs = getCityRowsConfigs({
                cityIdToData,
                cityIdToCityNameMap,
                parentDataKeysConfig: getirMarketIntegrationDataKey,
              });
              configs.push({
                name: t(`INTEGRATION_ORDERS_SECTION.${integrationType}`),
                tooltip: tooltipsOfRows[integrationType],
                dataKey: getirMarketIntegrationDataKey,
                initialFormatter: () => integrationData.totals,
                childRowsConfig: {
                  dataKey: getirMarketIntegrationDataKey,
                  getRowConfigs: () => cityRowsConfigs,
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
        const dataByIntegrationType = get(dataFromDataKey, ['financials', currency.toLowerCase(), 'netRevenue'], []);
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
        getRowConfigs: ({ dataFromDataKey, cityIdToCityNameMap, currency }) => {
          const configs = [];
          const dataByIntegrationType = get(dataFromDataKey, ['financials', currency.toLowerCase(), 'netRevenue'], []);
          _forEach(INTEGRATION_TYPES_SORT, integrationType => {
            const integrationData = get(dataByIntegrationType, [integrationType]);
            if (integrationData) {
              const cityIdToData = {};
              _forEach(integrationData.subTable, (cityData, cityId) => {
                cityIdToData[cityId] = cityData.totals;
              });
              const cityRowsConfigs = getCityRowsConfigs({
                cityIdToData,
                cityIdToCityNameMap,
                parentDataKeysConfig: getirMarketIntegrationDataKey,
              });
              configs.push({
                name: t(`INTEGRATION_ORDERS_SECTION.${integrationType}`),
                tooltip: tooltipsOfRows[integrationType],
                dataKey: getirMarketIntegrationDataKey,
                initialFormatter: () => integrationData.totals,
                childRowsConfig: {
                  dataKey: getirMarketIntegrationDataKey,
                  getRowConfigs: () => cityRowsConfigs,
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
        const dataByIntegrationType = get(dataFromDataKey, ['financials', currency.toLowerCase(), 'gmv'], []);
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
        getRowConfigs: ({ dataFromDataKey, cityIdToCityNameMap, currency }) => {
          const configs = [];
          const dataByIntegrationType = get(dataFromDataKey, ['financials', currency.toLowerCase(), 'gmv'], []);
          _forEach(INTEGRATION_TYPES_SORT, integrationType => {
            const integrationData = get(dataByIntegrationType, [integrationType]);
            if (integrationData) {
              const cityIdToData = {};
              _forEach(integrationData.subTable, (cityData, cityId) => {
                cityIdToData[cityId] = cityData.totals;
              });
              const cityRowsConfigs = getCityRowsConfigs({
                cityIdToData,
                cityIdToCityNameMap,
                parentDataKeysConfig: getirMarketIntegrationDataKey,
              });
              configs.push({
                name: t(`INTEGRATION_ORDERS_SECTION.${integrationType}`),
                tooltip: tooltipsOfRows[integrationType],
                dataKey: getirMarketIntegrationDataKey,
                initialFormatter: () => integrationData.totals,
                childRowsConfig: {
                  dataKey: getirMarketIntegrationDataKey,
                  getRowConfigs: () => cityRowsConfigs,
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
