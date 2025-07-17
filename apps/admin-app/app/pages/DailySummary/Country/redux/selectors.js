import { createSelector } from 'reselect';
import { get as _get } from 'lodash';

import {
  REDUX_KEY,
  GETIR_VOYAGER_DOMAIN_TYPE,
  GETIR_FOOD_DOMAIN_TYPE,
  GETIR_LOCALS_DOMAIN_TYPE,
  GETIR_DRIVE_DOMAIN_TYPE,
  GETIR_JOB_DOMAIN_TYPE,
  GETIR_N11_DOMAIN_TYPE,
  GETIR_SELECT_DOMAIN_TYPE,
  GORILLAS_INTEGRATION_TYPE,
} from '@shared/shared/constants';
import { t, getLangKey } from '@shared/i18n';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';

import { DS_COUNTRY_TABLES } from '../constants';
import {
  getCountsTableChartConfigs,
  getFinancialsTableChartConfigs,
  getKuzeydenTableChartConfigs,
  getGetirFoodTableChartConfigs,
  getGetirLocalsTableChartConfigs,
  getGetirDriveTableChartConfigs,
  getGetirJobsTableChartConfigs,
  getN11TableChartConfigs,
  getGetirSelectTableChartConfigs,
  getGorillasTableChartConfigs,
  getGetirMarketIntegrationTableChartConfigs,
  countsTableChartKeys,
  financialsTableChartKeys,
  getirJobsTableChartKeys,
  getirFoodTableChartKeys,
  getirLocalsTableChartKeys,
  getirN11TableChartKeys,
  getirDriveTableChartKeys,
  getirSelectTableChartKeys,
  gorillasTableChartKeys,
  getirMarketIntegrationTableChartKeys,
} from '../chartConfigs';
import {
  getFormattedCountsRowChartDataForCountry,
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
import { computedDateRangesSelector } from '../../commonRedux/selectors';

const reducerKey = REDUX_KEY.DAILY_SUMMARY.COUNTRY;

export const dataFiltersSelector = state => state[reducerKey].dataFilters;
export const lastUsedDateFilterSelector = state => state[reducerKey].lastUsedDateFilter;

export const getActiveDomainTypesIsPending = state => state[reducerKey]?.activeDomainTypes?.isPending;

export const getActiveDomainTypesSet = createSelector(
  state => state[reducerKey]?.activeDomainTypes?.data,
  activeDomainTypes => {
    const selectedCountry = getSelectedCountry();
    const countryCode = _get(selectedCountry, 'code.alpha2', '');

    return new Set([
      ...(activeDomainTypes?.value || []),
      ...(activeDomainTypes?.customValue?.[countryCode] || []),
    ]);
  },
);

export const getActiveIntegrationTypesIsPending = state => state[reducerKey]?.activeIntegrationTypes?.isPending;

export const getActiveIntegrationTypesSet = createSelector(
  state => state[reducerKey]?.activeIntegrationTypes?.data,
  activeIntegrationTypes => {
    const selectedCountry = getSelectedCountry();
    const countryCode = _get(selectedCountry, 'code.alpha2', '');

    return new Set([
      ...(activeIntegrationTypes?.value || []),
      ...(activeIntegrationTypes?.customValue?.[countryCode] || []),
    ]);
  },
);

export const chartViewStatusMapSelector = state => {
  const { chartViewStatusMap } = state[reducerKey];
  const activeDomainTypesIsPending = getActiveDomainTypesIsPending(state);
  const activeIntegrationTypesIsPending = getActiveIntegrationTypesIsPending(state);
  const activeDomainTypesSet = getActiveDomainTypesSet(state);
  const activeIntegrationTypesSet = getActiveIntegrationTypesSet(state);

  if (
    (activeDomainTypesIsPending || activeIntegrationTypesIsPending) ||
    (!activeDomainTypesSet.size && !activeIntegrationTypesSet.size)
  ) {
    return {};
  }

  if (!activeDomainTypesIsPending && !activeDomainTypesSet.has(GETIR_VOYAGER_DOMAIN_TYPE)) {
    chartViewStatusMap[DS_COUNTRY_TABLES.getirKuzeyden] = {};
  }
  if (!activeDomainTypesIsPending && !activeDomainTypesSet.has(GETIR_FOOD_DOMAIN_TYPE)) {
    chartViewStatusMap[DS_COUNTRY_TABLES.getirFood] = {};
  }
  if (!activeDomainTypesIsPending && !activeDomainTypesSet.has(GETIR_LOCALS_DOMAIN_TYPE)) {
    chartViewStatusMap[DS_COUNTRY_TABLES.getirLocals] = {};
  }
  if (!activeDomainTypesIsPending && !activeDomainTypesSet.has(GETIR_DRIVE_DOMAIN_TYPE)) {
    chartViewStatusMap[DS_COUNTRY_TABLES.getirDrive] = {};
  }
  if (!activeDomainTypesIsPending && !activeDomainTypesSet.has(GETIR_JOB_DOMAIN_TYPE)) {
    chartViewStatusMap[DS_COUNTRY_TABLES.getirJobs] = {};
  }
  if (!activeDomainTypesIsPending && !activeDomainTypesSet.has(GETIR_N11_DOMAIN_TYPE)) {
    chartViewStatusMap[DS_COUNTRY_TABLES.getirN11] = {};
  }
  if (!activeDomainTypesIsPending && !activeDomainTypesSet.has(GETIR_SELECT_DOMAIN_TYPE)) {
    chartViewStatusMap[DS_COUNTRY_TABLES.getirSelect] = {};
  }
  if (!activeIntegrationTypesIsPending && !activeIntegrationTypesSet.has(GORILLAS_INTEGRATION_TYPE)) {
    chartViewStatusMap[DS_COUNTRY_TABLES.gorillas] = {};
  }

  return chartViewStatusMap;
};

// anything pending in the page, it is useful for disabling get button etc...
export const getIsAnyTableDataPending = createSelector(
  state => state[reducerKey]?.[DS_COUNTRY_TABLES.countsTable],
  state => state[reducerKey]?.[DS_COUNTRY_TABLES.financialsTable],
  state => state[reducerKey]?.[DS_COUNTRY_TABLES.getirJobs],
  state => state[reducerKey]?.[DS_COUNTRY_TABLES.getirN11],
  state => state[reducerKey]?.[DS_COUNTRY_TABLES.getirSelect],
  state => state[reducerKey]?.[DS_COUNTRY_TABLES.gorillas],
  state => state[reducerKey]?.[DS_COUNTRY_TABLES.getirMarketIntegration],
  (...tableDatas) => {
    return tableDatas.some(eachTable => Object.values(eachTable).some(eachRow => eachRow?.isPending));
  },
);

export const chartsSelector = {
  getChartsData: createSelector(
    state => state[reducerKey]?.[DS_COUNTRY_TABLES.countsTable],
    state => state[reducerKey]?.[DS_COUNTRY_TABLES.financialsTable],
    state => state[reducerKey]?.[DS_COUNTRY_TABLES.getirKuzeyden],
    state => state[reducerKey]?.[DS_COUNTRY_TABLES.getirFood],
    state => state[reducerKey]?.[DS_COUNTRY_TABLES.getirLocals],
    state => state[reducerKey]?.[DS_COUNTRY_TABLES.getirDrive],
    state => state[reducerKey]?.[DS_COUNTRY_TABLES.getirJobs],
    state => state[reducerKey]?.[DS_COUNTRY_TABLES.getirN11],
    state => state[reducerKey]?.[DS_COUNTRY_TABLES.getirSelect],
    state => state[reducerKey]?.[DS_COUNTRY_TABLES.gorillas],
    state => state[reducerKey]?.[DS_COUNTRY_TABLES.getirMarketIntegration],
    state => computedDateRangesSelector(state, reducerKey),
    state => state[reducerKey]?.currency,
    (
      countsTableData,
      { financials: financialData = {} },
      { getirKuzeydenData = {} },
      { getirFoodData = {} },
      { getirLocalsData = {} },
      { getirDriveData = {} },
      { getirJobsData: getirJobsTableData = {} },
      { getirN11Data = {} },
      { getirSelectDataKey: getirSelectData = {} } = {},
      { gorillasDataKey: gorillasData = {} } = {},
      { getirMarketIntegrationDataKey: getirMarketIntegrationData = {} } = {},
      computedDateRanges = [],
      currency,
    ) => {
      const langKey = getLangKey();

      return {
        [DS_COUNTRY_TABLES.countsTable]: {
          isPending: Object.values(countsTableData).some(data => data?.isPending),
          configs: getCountsTableChartConfigs({ t, langKey }),
          data: getFormattedCountsRowChartDataForCountry({ countsTableData, chartKeys: countsTableChartKeys }),
        },
        [DS_COUNTRY_TABLES.financialsTable]: {
          isPending: !!financialData.isPending,
          configs: getFinancialsTableChartConfigs({ t, langKey, currency }),
          data: getFormattedFinancialsChartData({
            chartKeys: financialsTableChartKeys,
            financialData,
            countsTableData,
            currency,
            computedDateRanges,
            tableDataKeys: DS_COUNTRY_TABLES,
          }),
        },
        [DS_COUNTRY_TABLES.getirKuzeyden]: {
          isPending: !!getirKuzeydenData?.isPending,
          configs: getKuzeydenTableChartConfigs({ t }),
          data: getFormattedGetirKuzeydenChartData({ getirKuzeydenData }),
        },
        [DS_COUNTRY_TABLES.getirFood]: {
          isPending: !!getirFoodData.isPending,
          configs: getGetirFoodTableChartConfigs({ t, currency }),
          data: getFormattedGetirFoodChartData({
            getirFoodData,
            currency,
            computedDateRanges,
            chartKeys: getirFoodTableChartKeys,
          }),
        },
        [DS_COUNTRY_TABLES.getirLocals]: {
          isPending: !!getirLocalsData.isPending,
          configs: getGetirLocalsTableChartConfigs({ t, currency }),
          data: getFormattedGetirLocalsChartData({
            getirLocalsData,
            currency,
            computedDateRanges,
            chartKeys: getirLocalsTableChartKeys,
          }),
        },
        [DS_COUNTRY_TABLES.getirDrive]: {
          isPending: !!getirDriveData.isPending,
          configs: getGetirDriveTableChartConfigs({ t, currency }),
          data: getFormattedGetirDriveChartData({ getirDriveData, currency, chartKeys: getirDriveTableChartKeys, computedDateRanges }),
        },
        [DS_COUNTRY_TABLES.getirJobs]: {
          isPending: !!getirJobsTableData.isPending,
          configs: getGetirJobsTableChartConfigs({ t, langKey }),
          data: getFormattedGetirJobsChartData({
            getirJobsTableData,
            computedDateRanges,
            allowUndefinedRows: ['registerUser', 'finishedVideoCall'],
            chartKeys: getirJobsTableChartKeys,
          }),
        },
        [DS_COUNTRY_TABLES.getirN11]: {
          isPending: !!getirN11Data.isPending,
          configs: getN11TableChartConfigs({ t, currency }),
          data: getFormattedGetirN11ChartData({
            getirN11Data,
            currency,
            chartKeys: getirN11TableChartKeys,
          }),
        },
        [DS_COUNTRY_TABLES.getirSelect]: {
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
        [DS_COUNTRY_TABLES.gorillas]: {
          isPending: !!gorillasData?.isPending,
          configs: getGorillasTableChartConfigs({ t, currency }),
          data: getFormattedGorillasChartData({ gorillasData, chartKeys: gorillasTableChartKeys, currency }),
        },
        [DS_COUNTRY_TABLES.getirMarketIntegration]: {
          isPending: !!getirMarketIntegrationData?.isPending,
          configs: getGetirMarketIntegrationTableChartConfigs({ t, currency }),
          data: getFormattedGetirMarketIntegrationChartData({ getirMarketIntegrationData, chartKeys: getirMarketIntegrationTableChartKeys, currency }),
        },
      };
    },
  ),
};
