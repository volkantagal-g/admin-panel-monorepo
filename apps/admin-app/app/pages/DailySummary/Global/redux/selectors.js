import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';
import { t, getLangKey } from '@shared/i18n';

import { DS_GLOBAL_TABLES } from '../constants';
import {
  getFormattedCountsRowChartDataForGlobal,
  getFormattedFinancialsChartData,
  getFormattedGetirFoodChartData,
  getFormattedGetirLocalsChartData,
  getFormattedGetirDriveChartData,
  getFormattedGetirJobsChartData,
  getFormattedGetirN11ChartData,
  getFormattedGetirKuzeydenChartData,
  getFormattedGetirSelectChartData,
  getFormattedGorillasChartData,
  getFormattedGetirMarketIntegrationChartData,
} from '../../utils';
import {
  getCountsTableChartConfigs,
  getGetirJobsTableChartConfigs,
  getFinancialsTableChartConfigs,
  getN11TableChartConfigs,
  getKuzeydenTableChartConfigs,
  getGetirFoodTableChartConfigs,
  getGetirLocalsTableChartConfigs,
  getGetirDriveTableChartConfigs,
  getGetirSelectTableChartConfigs,
  getGorillasTableChartConfigs,
  getGetirMarketIntegrationTableChartConfigs,
  countsTableChartKeys,
  financialsTableChartKeys,
  getirFoodTableChartKeys,
  getirLocalsTableChartKeys,
  getirJobsTableChartKeys,
  getirN11TableChartKeys,
  getirDriveTableChartKeys,
  getirSelectTableChartKeys,
  gorillasTableChartKeys,
  getirMarketIntegrationTableChartKeys,
} from '../chartConfigs';

const reducerKey = REDUX_KEY.DAILY_SUMMARY.GLOBAL;

export const dataFiltersSelector = state => state[reducerKey].dataFilters;
export const lastUsedDateFilterSelector = state => state[reducerKey].lastUsedDateFilter;
export const chartViewStatusMapSelector = state => state[reducerKey].chartViewStatusMap;
export const computedDateRangesSelector = state => state[reducerKey].computedDateRanges;

// anything pending in the page, it is useful for disabling get button etc...
export const getIsAnyTableDataPending = createSelector(
  state => state[reducerKey]?.[DS_GLOBAL_TABLES.countsTable],
  state => state[reducerKey]?.[DS_GLOBAL_TABLES.financialsTable],
  state => state[reducerKey]?.[DS_GLOBAL_TABLES.getirJobs],
  state => state[reducerKey]?.[DS_GLOBAL_TABLES.getirN11],
  state => state[reducerKey]?.[DS_GLOBAL_TABLES.getirKuzeyden],
  state => state[reducerKey]?.[DS_GLOBAL_TABLES.getirFood],
  state => state[reducerKey]?.[DS_GLOBAL_TABLES.getirLocals],
  state => state[reducerKey]?.[DS_GLOBAL_TABLES.getirDrive],
  state => state[reducerKey]?.[DS_GLOBAL_TABLES.getirSelect],
  state => state[reducerKey]?.[DS_GLOBAL_TABLES.gorillas],
  state => state[reducerKey]?.[DS_GLOBAL_TABLES.getirMarketIntegration],
  (...tableDatas) => {
    return tableDatas.some(eachTable => Object.values(eachTable).some(eachRow => eachRow?.isPending));
  },
);

export const getIsAllTableDataPending = createSelector(
  state => state[reducerKey]?.[DS_GLOBAL_TABLES.countsTable],
  state => state[reducerKey]?.[DS_GLOBAL_TABLES.financialsTable],
  state => state[reducerKey]?.[DS_GLOBAL_TABLES.getirJobs],
  state => state[reducerKey]?.[DS_GLOBAL_TABLES.getirN11],
  state => state[reducerKey]?.[DS_GLOBAL_TABLES.getirKuzeyden],
  state => state[reducerKey]?.[DS_GLOBAL_TABLES.getirFood],
  state => state[reducerKey]?.[DS_GLOBAL_TABLES.getirLocals],
  state => state[reducerKey]?.[DS_GLOBAL_TABLES.getirDrive],
  state => state[reducerKey]?.[DS_GLOBAL_TABLES.getirSelect],
  state => state[reducerKey]?.[DS_GLOBAL_TABLES.gorillas],
  state => state[reducerKey]?.[DS_GLOBAL_TABLES.getirMarketIntegration],
  (...tableDatas) => {
    return tableDatas.every(eachTable => Object.values(eachTable).some(eachRow => eachRow?.isPending));
  },
);

export const chartsSelector = {
  getChartsData: createSelector(
    state => state[reducerKey]?.[DS_GLOBAL_TABLES.countsTable],
    state => state[reducerKey]?.[DS_GLOBAL_TABLES.getirJobs],
    state => state[reducerKey]?.[DS_GLOBAL_TABLES.financialsTable],
    state => state[reducerKey]?.[DS_GLOBAL_TABLES.getirKuzeyden],
    state => state[reducerKey]?.[DS_GLOBAL_TABLES.getirN11],
    state => state[reducerKey]?.[DS_GLOBAL_TABLES.getirFood],
    state => state[reducerKey]?.[DS_GLOBAL_TABLES.getirLocals],
    state => state[reducerKey]?.[DS_GLOBAL_TABLES.getirDrive],
    state => state[reducerKey]?.[DS_GLOBAL_TABLES.getirSelect],
    state => state[reducerKey]?.[DS_GLOBAL_TABLES.gorillas],
    state => state[reducerKey]?.[DS_GLOBAL_TABLES.getirMarketIntegration],
    computedDateRangesSelector,
    state => state[reducerKey]?.currency,
    (
      countsTableData,
      { getirJobsData: getirJobsTableData = {} },
      { financials: financialData = {} },
      { getirKuzeydenData },
      { getirN11Data = {} },
      { getirFoodData = {} },
      { getirLocalsData = {} },
      { getirDriveData = {} },
      { getirSelectDataKey: getirSelectData = {} } = {},
      { gorillasDataKey: gorillasData = {} } = {},
      { getirMarketIntegrationDataKey: getirMarketIntegrationData = {} } = {},
      computedDateRanges = [],
      currency,
    ) => {
      const langKey = getLangKey();

      return {
        [DS_GLOBAL_TABLES.countsTable]: {
          isPending: Object.values(countsTableData).some(data => data?.isPending),
          configs: getCountsTableChartConfigs({ t, langKey }),
          data: getFormattedCountsRowChartDataForGlobal({ countsTableData, chartKeys: countsTableChartKeys }),
        },
        [DS_GLOBAL_TABLES.financialsTable]: {
          isPending: !!financialData.isPending,
          configs: getFinancialsTableChartConfigs({ t, langKey, currency }),
          data: getFormattedFinancialsChartData({
            chartKeys: financialsTableChartKeys,
            financialData,
            countsTableData,
            currency,
            computedDateRanges,
            tableDataKeys: DS_GLOBAL_TABLES,
          }),
        },
        [DS_GLOBAL_TABLES.getirFood]: {
          isPending: !!getirFoodData.isPending,
          configs: getGetirFoodTableChartConfigs({ t, langKey, currency }),
          data: getFormattedGetirFoodChartData({
            getirFoodData,
            currency,
            computedDateRanges,
            chartKeys: getirFoodTableChartKeys,
          }),
        },
        [DS_GLOBAL_TABLES.getirLocals]: {
          isPending: !!getirLocalsData.isPending,
          configs: getGetirLocalsTableChartConfigs({ t, langKey, currency }),
          data: getFormattedGetirLocalsChartData({
            getirLocalsData,
            currency,
            computedDateRanges,
            chartKeys: getirLocalsTableChartKeys,
          }),
        },
        [DS_GLOBAL_TABLES.getirDrive]: {
          isPending: !!getirDriveData.isPending,
          configs: getGetirDriveTableChartConfigs({ t, langKey, currency }),
          data: getFormattedGetirDriveChartData({
            getirDriveData,
            currency,
            chartKeys: getirDriveTableChartKeys,
            computedDateRanges,
          }),
        },
        [DS_GLOBAL_TABLES.getirJobs]: {
          isPending: !!getirJobsTableData.isPending,
          configs: getGetirJobsTableChartConfigs({ t, langKey }),
          data: getFormattedGetirJobsChartData({
            getirJobsTableData,
            computedDateRanges,
            chartKeys: getirJobsTableChartKeys,
          }),
        },
        [DS_GLOBAL_TABLES.getirN11]: {
          isPending: !!getirN11Data.isPending,
          configs: getN11TableChartConfigs({ t, langKey, currency }),
          data: getFormattedGetirN11ChartData({
            getirN11Data,
            currency,
            chartKeys: getirN11TableChartKeys,
          }),
        },
        [DS_GLOBAL_TABLES.getirKuzeyden]: {
          isPending: !!getirKuzeydenData?.isPending,
          configs: getKuzeydenTableChartConfigs({ t, langKey }),
          data: getFormattedGetirKuzeydenChartData({ getirKuzeydenData }),
        },
        [DS_GLOBAL_TABLES.getirSelect]: {
          isPending: !!getirSelectData.isPending,
          configs: getGetirSelectTableChartConfigs({ t, langKey, currency }),
          data: getFormattedGetirSelectChartData({
            getirSelectData,
            computedDateRanges,
            currency,
            chartKeys: getirSelectTableChartKeys,
            allowUndefinedRows: ['subClientCount', 'totalRevenue'],
          }),
        },
        [DS_GLOBAL_TABLES.gorillas]: {
          isPending: !!gorillasData?.isPending,
          configs: getGorillasTableChartConfigs({ t, currency }),
          data: getFormattedGorillasChartData({ gorillasData, chartKeys: gorillasTableChartKeys, currency }),
        },
        [DS_GLOBAL_TABLES.getirMarketIntegration]: {
          isPending: !!getirMarketIntegrationData?.isPending,
          configs: getGetirMarketIntegrationTableChartConfigs({ t, currency }),
          data: getFormattedGetirMarketIntegrationChartData({ getirMarketIntegrationData, chartKeys: getirMarketIntegrationTableChartKeys, currency }),
        },
      };
    },
  ),
};
