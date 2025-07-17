import { createSelector } from 'reselect';
import { isEmpty as _isEmpty } from 'lodash';

import { REDUX_KEY } from '@shared/shared/constants';
import { t } from '@shared/i18n';

import {
  lastSuccessfulDateRangesSelector,
  currencySelector,
} from '../../commonRedux/selectors';

import { DS_GLOBAL_TABLES } from '../constants';

const reducerKey = REDUX_KEY.DAILY_SUMMARY.FOUNDERS_CUSTOM;

export const dataFiltersSelector = state => state[reducerKey].dataFilters;
export const lastUsedDateFilterSelector = state => state[reducerKey].lastUsedDateFilter;
export const computedDateRangesSelector = state => state[reducerKey].computedDateRanges;
export const firstDataFetchTimestampSelector = state => state[reducerKey]?.firstDataFetchTimestamp;

// anything pending in the page, it is useful for disabling get button etc...
export const getIsAnyTableDataPending = createSelector(
  state => state[reducerKey]?.[DS_GLOBAL_TABLES.getirMarketOrderNetRevenueGMVTable],
  (...tableDatas) => {
    return tableDatas.some(eachTable => Object.values(eachTable).some(eachRow => eachRow?.isPending)); // TODO: check here
  },
);

export const getIsAllTableDataPending = createSelector(
  state => state[reducerKey]?.[DS_GLOBAL_TABLES.getirMarketOrderNetRevenueGMVTable],
  (...tableDatas) => {
    return tableDatas.every(eachTable => Object.values(eachTable).some(eachRow => eachRow?.isPending));
  },
);

const getNameFromResponseDataKey = dataKey => {
  if (!dataKey) return '';
  // dataKey's are in this format <keyGroup>-<keyValue> ex: countryCode-tr
  const [keyGroup, keyValue] = dataKey.split('-');
  switch (keyGroup) {
    case 'countryCode':
      return t(`dailySummaryFoundersCustomPage:ROW_NAMES.COUNTRY_CODES.${keyValue}`);
    case 'countryGroupCode':
      return t(`dailySummaryFoundersCustomPage:ROW_NAMES.COUNTRY_GROUP_CODES.${keyValue}`);
    case 'domainCode':
      return t(`dailySummaryFoundersCustomPage:ROW_NAMES.DOMAIN_CODES.${keyValue}`);
    default:
      return dataKey;
  }
};

const getTooltipFromResponseDataKey = dataKey => {
  if (!dataKey) return '';
  const [keyGroup, keyValue] = dataKey.split('-');
  switch (keyGroup) {
    case 'countryCode':
      return t(`dailySummaryFoundersCustomPage:ROW_NAME_TOOLTIPS.COUNTRY_CODES.${keyValue}`);
    case 'countryGroupCode':
      return t(`dailySummaryFoundersCustomPage:ROW_NAME_TOOLTIPS.COUNTRY_GROUP_CODES.${keyValue}`);
    case 'domainCode':
      return t(`dailySummaryFoundersCustomPage:ROW_NAME_TOOLTIPS.DOMAIN_CODES.${keyValue}`);
    default:
      return dataKey;
  }
};

// TODO: this is not a generic formatter, change its name
export function genericFormatter({
  data,
  config,
  startDates,
  dateRanges,
  currency,
  tableKey,
  nestLevel = 0,
  parentDataKey,
}) {
  const { name, dataKey, tooltip, isSectionHeader } = config;
  const totalData = data?.total;
  // if the row data is not ready yet, we still want to show its row and name, if it is pending etc...
  if (_isEmpty(totalData) || isSectionHeader) {
    return { name, dataKey, recordConfig: config };
  }

  const formattedData = {
    name,
    tooltip,
    dataKey,
    tableKey,
    nestLevel,
    key: `${tableKey}_${parentDataKey}_${nestLevel}_${name}`,
    recordConfig: config,
    formattedData: totalData,
  };

  if (_isEmpty(data)) return null;
  const total = { ...formattedData };

  const childRowsData = data?.children;
  if (!_isEmpty(childRowsData)) {
    if (childRowsData?.length) {
      total.children = [];
      childRowsData.forEach(childRowData => {
        const rowFormatted = genericFormatter({
          data: childRowData,
          startDates,
          dateRanges,
          currency,
          tableKey,
          config: {
            name: getNameFromResponseDataKey(childRowData?.total?.key),
            tooltip: getTooltipFromResponseDataKey(childRowData?.total?.key),
            dataKey: childRowData?.total?.key,
          },
          // child config creation, increase nest level
          nestLevel: nestLevel + 1,
          parentDataKey: dataKey,
        });

        if (rowFormatted) {
          total.children.push(rowFormatted);
        }
      });
    }
  }

  return total;
}

export const getTableDataSelector = () => ({
  getData: createSelector(
    (state, tableKey) => state[reducerKey]?.[tableKey],
    (state, tableKey) => tableKey,
    (state, tableKey, configs) => configs,
    state => lastSuccessfulDateRangesSelector(state, reducerKey),
    state => currencySelector(state, reducerKey),
    (
      unformattedTableData,
      tableKey,
      configs,
      dateRanges,
      currency,
    ) => {
      const tableData = [];
      const startDates = dateRanges.map(dr => dr.start);
      configs.forEach(config => {
        const rowData = genericFormatter({
          data: unformattedTableData?.[config.dataKey]?.data,
          config,
          startDates,
          dateRanges,
          currency,
          tableKey,
          nestLevel: 0,
          // top level row config, no parent data
          parentDataKey: null,
        });
        if (rowData) {
          tableData.push(rowData);
        }
      });
      return tableData;
    },
  ),
  getTotalTablePending: createSelector(
    (state, tableKey) => state[reducerKey]?.[tableKey],
    tableData => {
      if (_isEmpty(tableData)) return false;
      return Object.values(tableData).every(data => data?.isPending);
    },
  ),
  getIsPendingObj: createSelector(
    (state, tableKey) => state[reducerKey]?.[tableKey],
    tableData => {
      const isPendingObj = {};
      if (_isEmpty(tableData)) return isPendingObj;
      Object.entries(tableData).forEach(([key, data]) => {
        isPendingObj[key] = data?.isPending;
      });
      return isPendingObj;
    },
  ),
});
