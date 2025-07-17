import moment from 'moment-timezone';
import { get, isEmpty, isInteger, orderBy, set as _set, forEach as _forEach } from 'lodash';

import {
  DAILY_SUMMARY_DATE_CONVERSION_FORMAT,
  DAILY_SUMMARY_DATE_TYPE,
  DAILY_SUMMARY_DATE_STEP_UNITS,
  DEFAULT_DATE_COUNT,
  DAILY_SUMMARY_SORT_TYPE,
  BASE_DATE_FORMAT,
  DECIMAL_COUNT_BY_CURRENCY,
  BAD_KEYS_SET_FOR_ROW_DATA,
  BAD_KEYS_FOR_GETIR_JOBS,
  GETIR_N11_SOURCE_TYPE,
  SOURCE_COLORS_BY_SOURCE_TYPE_FOR_GETIR_11,
  GETIR_N11_TRAFFIC_SOURCE,
  GETIR_FINANCIALS_DOMAIN_TYPES,
  COMMON_RESTRICTED_ROW_KEYS,
} from './constants';
import { domainTypes, getirJobsPostTypes } from '@shared/shared/constantValues';
import {
  DOMAIN_COLORS_BY_DOMAIN_TYPE,
  FOOD_DELIVERY_TYPES,
  GETIR_DOMAIN_TYPES,
  GETIR_DRIVE_EXTERNAL_SOURCE,
  LOCALS_DELIVERY_TYPES,
} from '@shared/shared/constants';
import { numberFormat } from '@shared/utils/localization';

export function getNumberFormatterByCurrency(currency) {
  const options = DECIMAL_COUNT_BY_CURRENCY[currency];
  return numberFormat(options);
}

export const getFakeLocalDateInUTC = localDate => {
  const dateString = localDate.format(DAILY_SUMMARY_DATE_CONVERSION_FORMAT);
  // local date as if it is in UTC timezone
  return moment.utc(dateString);
};

export const getDateRanges = ({ initialDateRange, stepAmount, stepCount, stepUnit = DAILY_SUMMARY_DATE_STEP_UNITS.days }) => {
  if (!isInteger(stepAmount) || stepAmount < 1) throw new Error('stepAmount should be bigger than 0');
  if (!isInteger(stepCount) || stepCount < 1) throw new Error('stepCount should be bigger than 0');

  const { startDate, endDate } = initialDateRange;

  const results = [];
  const firstStart = getFakeLocalDateInUTC(startDate);
  const firstEnd = getFakeLocalDateInUTC(endDate);
  for (let i = 0; i < stepCount; i += 1) {
    const start = firstStart.clone().subtract(i * stepAmount, stepUnit);
    const end = firstEnd.clone().subtract(i * stepAmount, stepUnit);
    results.push({ start: start.valueOf(), end: end.valueOf() });
  }

  return results;
};

export const getDateRangesForMonth = ({ initialDateRange, stepAmount, stepCount, stepUnit = DAILY_SUMMARY_DATE_STEP_UNITS.days }) => {
  if (!isInteger(stepAmount) || stepAmount < 1) throw new Error('stepAmount should be bigger than 0');
  if (!isInteger(stepCount) || stepCount < 1) throw new Error('stepCount should be bigger than 0');

  const { startDate } = initialDateRange;
  const results = [];
  const firstStart = getFakeLocalDateInUTC(startDate);
  for (let i = 0; i < stepCount; i += 1) {
    const start = firstStart.clone().subtract(i * stepAmount, stepUnit);
    // get the last day of the month based on the start date
    const end = start.clone().endOf('month');
    results.push({ start: start.valueOf(), end: end.valueOf() });
  }
  return results;
};

// moment rounds down same day startDate = 00:00:00 and endDate = 23:59:59 difference
// since it is less than 24 hours, it returns 0, but it is practically 1 day, so we add 1 to compensate
export const getDayDiff = (startDate, endDate) => moment.duration(moment(endDate).diff(startDate)).days() + 1;
// special case for one day difference => week apart data columns
export const getStepInDays = dayDiff => (dayDiff === 1 ? 7 : dayDiff);

export const getComputedDateRangeForDateType = (dateType, currentDay) => {
  let startDate = null;
  let endDate = null;
  switch (dateType) {
    case DAILY_SUMMARY_DATE_TYPE.YESTERDAY:
      startDate = moment(currentDay).subtract(1, 'day').startOf('day');
      endDate = moment(currentDay).subtract(1, 'day').endOf('day');
      break;
    case DAILY_SUMMARY_DATE_TYPE.LAST_WEEK:
      startDate = moment(currentDay).subtract(7, 'day').startOf('day');
      endDate = moment(currentDay).subtract(1, 'day').endOf('day');
      break;
    case DAILY_SUMMARY_DATE_TYPE.LAST_FOUR_WEEKS:
      startDate = moment(currentDay).subtract(28, 'day').startOf('day');
      endDate = moment(currentDay).subtract(1, 'day').endOf('day');
      break;

    default:
      throw new Error('wrong date type in getComputedDateRangeForDateType');
  }
  return { startDate, endDate };
};

// when we change one filter, we should reset others so their value can trigger onChange
export const getInitialDataFilters = ({ now, isResetting, filterDataKeys, defaultDateCount = DEFAULT_DATE_COUNT }) => {
  return {
    [filterDataKeys.dateRange]: {
      // initial request date filter, yesterday data will be the first requested data
      startDate: isResetting ? null : moment(now).subtract(1, 'day').startOf('day'),
      endDate: isResetting ? null : moment(now).subtract(1, 'day').endOf('day'),
    },
    [filterDataKeys.singleDay]: null,
    [filterDataKeys.singleMonth]: null,
    // we don't want to reset count when date inputs change
    ...(isResetting ? undefined : { [filterDataKeys.dateCount]: defaultDateCount }),
    [filterDataKeys.dateType]: null,
  };
};

export const getFakeUTCDateInLocal = UTCDate => {
  const dateString = moment.utc(UTCDate).format(DAILY_SUMMARY_DATE_CONVERSION_FORMAT);
  return moment(dateString);
};

// the formatter that takes unformatted api response data and formats according to configs
export function genericFormatter({
  unformattedAllData,
  unformattedTableData,
  config,
  startDates,
  dateRanges,
  sortType,
  currency,
  countryIdToCountryGroupMap,
  countryIdToCountryMap,
  cityIdToCityNameMap,
  tableKey,
  getOnExpand,
  nestLevel = 0,
  parentData,
}) {
  const { name, dataKey, tooltip, isSectionHeader, shouldItBeAffectedFromSorting = true } = config;
  const unformattedData = unformattedTableData?.[dataKey]?.data;
  // if the row data is not ready yet, we still want to show its row and name, if it is pending etc...
  if (isEmpty(unformattedData) || isSectionHeader) {
    return { name, dataKey, recordConfig: config };
  }
  const { initialFormatter, initialFormatterExtraParams = {}, childRowsConfig } = config;

  const formattedData = {
    name,
    tooltip,
    dataKey,
    key: `${tableKey}_${parentData?.key}_${nestLevel}_${name}`,
    recordConfig: {
      ...config,
      ...(config.shouldAssignCurrencyFormatter ? { numberFormatter: getNumberFormatterByCurrency(currency) } : null),
    },
    tableKey,
    getOnExpand,
    nestLevel,
  };
  // initial formatter turns unformatted data in dataKey field, and returns {startDate0: count0, startDate1: count1,...}
  const initialData = initialFormatter({
    ...initialFormatterExtraParams,
    unformattedAllData,
    dataFromDataKey: unformattedData,
    startDates,
    dateRanges,
    countryIdToCountryGroupMap,
    countryIdToCountryMap,
    cityIdToCityNameMap,
    currency,
  });

  if (isEmpty(initialData)) return null;
  // now that we have {startDate0: count0, startDate1: count1,...} data, we can calculate percentages
  const percentData = getRowPercentData(parentData, initialData, startDates, nestLevel);
  const total = { ...formattedData, ...initialData, ...percentData };

  if (childRowsConfig) {
    const childRowsData = unformattedTableData[childRowsConfig.dataKey]?.data;
    if (!isEmpty(childRowsData)) {
      const { getRowConfigs } = childRowsConfig;
      const rowConfigs = getRowConfigs({
        dataFromDataKey: childRowsData,
        countryIdToCountryGroupMap,
        countryIdToCountryMap,
        cityIdToCityNameMap,
        startDates,
        dateRanges,
        currency,
      });
      if (rowConfigs?.length) {
        total.children = [];
        rowConfigs.forEach(rowConfig => {
          const rowFormatted = genericFormatter({
            // for basket average calculation
            unformattedAllData,
            unformattedTableData,
            startDates,
            dateRanges,
            sortType,
            currency,
            countryIdToCountryGroupMap,
            countryIdToCountryMap,
            cityIdToCityNameMap,
            tableKey,
            getOnExpand,
            config: {
              shouldItBeAffectedFromSorting: childRowsConfig.shouldItBeAffectedFromSorting,
              // for override if rowConfig has shouldItBeAffectedFromSorting flag
              ...rowConfig,
            },
            // child config creation, increase nest level
            nestLevel: nestLevel + 1,
            parentData: total,
          });

          if (rowFormatted) {
            total.children.push(rowFormatted);
          }
        });
      }
    }
  }

  // if a parent has children, sort them
  // if you need to sort only some parts, put it in this if block to decide
  // right now, every expandable row is sorted, if you want to exclude some, use nestLevel
  if (total?.children?.length && shouldItBeAffectedFromSorting) {
    const firstStartDate = startDates[0];
    let sorted;
    switch (sortType) {
      case DAILY_SUMMARY_SORT_TYPE.ALPHABETICAL:
        sorted = orderBy(total.children, ['name'], 'asc');
        break;
      case DAILY_SUMMARY_SORT_TYPE.VALUE:
        sorted = orderBy(total.children, data => data?.[firstStartDate] || 0, 'desc');
        break;
      default:
        sorted = total.children;
        break;
    }
    total.children = sorted;
  }

  return total;
}

function getRowPercentData(parentTotal, initialData, startDates, nestLevel) {
  const percentsData = {};
  const firstStartDate = startDates[0];

  startDates.forEach((startDate, index) => {
    // if it is the top level row, we don't calculate distribution, children are distributed
    if (nestLevel > 0) {
      const distributionPercField = getPartialPercentFieldName(startDate);
      percentsData[distributionPercField] = getPercentageValue(initialData[startDate], parentTotal[startDate]);
    }

    // if it is the first date, we don't calculate difference from itself
    if (index > 0) {
      const diffPercentFieldName = getDiffPercentFieldName(startDate);
      const diff = initialData[firstStartDate] - initialData[startDate];
      percentsData[diffPercentFieldName] = getPercentageValue(diff, initialData[startDate]);
    }
  });
  return percentsData;
}

export function getDiffPercentFieldName(date) {
  return `${date}_diff_perc`;
}

export function getPartialPercentFieldName(date) {
  return `${date}_partial_perc`;
}

export function getPercentageValue(partial, total) {
  if (partial === 0 && total === 0) return NaN;
  if (total === 0) return partial * Infinity;
  return Math.round((partial / total) * 100);
}

export function getFormattedBaseDate(date) {
  return moment(date).format(BASE_DATE_FORMAT);
}

export function getFormattedColumnDate(startDate, endDate) {
  const isOneDayDiff = moment(endDate).diff(moment(startDate), 'days') < 1;
  if (isOneDayDiff) return getFormattedBaseDate(startDate);
  return `${getFormattedBaseDate(startDate)}-${getFormattedBaseDate(endDate)}`;
}

export function getSimplifiedTotalsData({ dataWithTotals = {} }) {
  const simplifiedData = {};
  Object.entries(dataWithTotals).forEach(([key, value]) => {
    simplifiedData[key] = value?.totals ?? {};
  });

  return simplifiedData;
}

export function getTotalCountsForFirstRow({ dimension, startDates, excludedKey = '' }) {
  const total = {};

  if (isEmpty(dimension)) return total;
  Object.entries(dimension).forEach(([key, value]) => {
    if (key !== excludedKey) {
      startDates.forEach(startDate => {
        total[startDate] = (total[startDate] || 0) + (value?.totals?.[startDate] || 0);
      });
    }
  });

  return total;
}

export function getCountsTableChartLineConfigs({ langKey }) {
  const chartConfigs = [];
  Object.entries(domainTypes).forEach(([key, value]) => {
    chartConfigs.push({
      key: Number(key),
      title: value[langKey],
      lineColor: DOMAIN_COLORS_BY_DOMAIN_TYPE[key],
    });
  });

  return chartConfigs;
}

export function getDomainTypeBasedLineConfigs({ langKey }) {
  const chartConfigs = [];
  Object.entries(domainTypes).forEach(([key, value]) => {
    chartConfigs.push({
      key: Number(key),
      title: value[langKey],
      lineColor: DOMAIN_COLORS_BY_DOMAIN_TYPE[key],
    });
  });

  return chartConfigs;
}

export function getFinancialsTableChartLineConfigs({ langKey }) {
  const chartConfigs = [];
  Object.values(GETIR_FINANCIALS_DOMAIN_TYPES).forEach(value => {
    chartConfigs.push({
      key: value,
      title: domainTypes[value][langKey],
      lineColor: DOMAIN_COLORS_BY_DOMAIN_TYPE[value],
    });
  });

  return chartConfigs;
}

export function getTotalForGetirFinancials({ dataFromDataKey, startDates, currency, rowName }) {
  if (isEmpty(dataFromDataKey)) {
    return {};
  }

  const total = {};
  Object.entries(dataFromDataKey).forEach(([domainKey, value]) => {
    if (!(domainKey in GETIR_FINANCIALS_DOMAIN_TYPES)) return;
    const rowData = value?.[currency.toLowerCase()]?.[rowName];
    if (!isEmpty(rowData)) {
      const objectKey = Object.keys(rowData)?.[0] || undefined;
      startDates.forEach(startDate => {
        total[startDate] = (total[startDate] || 0) + (value[currency.toLowerCase()][rowName][objectKey]?.totals[startDate] || 0);
      });
    }
  });

  return total;
}

export const getGetirMarketFinancialFromAllDomainsFinancial = ({ data }) => {
  return {
    ...(data?.getir10 ? { getir10: data.getir10 } : undefined),
    ...(data?.getir30 ? { getir30: data.getir30 } : undefined),
  };
};

export const getTotalsObjectsByDateOfDateRangeData = ({ data }) => {
  const formattedData = {};
  if (isEmpty(data)) {
    return {};
  }

  Object.entries(data).forEach(([rowKey, rowData]) => {
    if (!BAD_KEYS_SET_FOR_ROW_DATA.has(rowKey) && rowData && rowData.totals) {
      formattedData[rowKey] = rowData.totals;
    }
  });

  return formattedData;
};

export const getFormattedCountsRowChartDataForCountry = ({ countsTableData, chartKeys }) => {
  const formattedData = {};

  Object.entries(countsTableData).forEach(([rowKey, rowData]) => {
    let finalData = { ...rowData?.data };
    if (rowKey === chartKeys.totalAppOpenCounts && rowData?.data) {
      finalData = getTotalsObjectsByDateOfDateRangeData({ data: rowData.data });
    }
    formattedData[rowKey] = { ...rowData, data: finalData };
  });
  return formattedData;
};

export const getFormattedCountsRowChartDataForGlobal = ({ countsTableData, chartKeys }) => {
  const formattedData = {};
  Object.entries(countsTableData).forEach(([rowKey, rowData]) => {
    let finalData = { ...rowData?.data };
    if (
      (rowKey === chartKeys.totalAppOpenCounts || rowKey === chartKeys.uniqueAppOpenCounts) &&
      rowData?.data
    ) {
      finalData = getTotalsObjectsByDateOfDateRangeData({ data: rowData.data });
    }

    formattedData[rowKey] = { ...rowData, data: finalData };
  });

  return formattedData;
};

export function getGrossMarketValueFromGetirFinancials({ basketValueData = {}, deliveryFeeData = {}, dateRanges }) {
  const gmvData = {};

  dateRanges.forEach(({ start }) => {
    gmvData[start] = (basketValueData?.[start] || 0) + (deliveryFeeData?.[start] || 0);
  });

  return gmvData;
}

export function getTotalCountsFromDomainDimensionedData({ dataFromDataKey, startDates }) {
  if (isEmpty(dataFromDataKey)) {
    return {};
  }

  const initialData = {};
  Object.values(dataFromDataKey).forEach(domainData => {
    startDates.forEach(startDate => {
      initialData[startDate] = (initialData[startDate] || 0) + (domainData[startDate] || 0);
    });
  });
  return initialData;
}

export function getTotalBasketAverage({ unformattedAllData, startDates, currency, tableDataKeys }) {
  const { orderCounts } = unformattedAllData[tableDataKeys.countsTable];
  const { financials } = unformattedAllData[tableDataKeys.financialsTable];
  if (orderCounts && financials) {
    const totalOrderCounts = getTotalCountsFromDomainDimensionedData({ dataFromDataKey: orderCounts.data, startDates });
    const totalBasketValues = getTotalForGetirFinancials({ dataFromDataKey: financials.data, startDates, currency, rowName: 'basketValue' });
    const totalBasketAverages = {};
    startDates.forEach(startDate => {
      totalBasketAverages[startDate] = totalBasketValues[startDate] / totalOrderCounts[startDate];
    });
    return totalBasketAverages;
  }
  return {};
}

const setGMVDataForFinancials = ({
  chartKeys,
  formattedData,
  domainType,
  computedDateRanges,
  basketValue,
  deliveryFee,
}) => {
  if (!formattedData[chartKeys.grossMarketValue]) {
    _set(formattedData, [chartKeys.grossMarketValue, 'data'], {});
  }
  const calculatedGMV = getGrossMarketValueFromGetirFinancials({
    basketValueData: basketValue,
    deliveryFeeData: deliveryFee,
    dateRanges: computedDateRanges,
  });
  _set(formattedData[chartKeys.grossMarketValue], ['data', domainType], calculatedGMV || {});
};

export const getFormattedFinancialsChartData = ({ chartKeys, financialData, countsTableData, currency, computedDateRanges = [], tableDataKeys }) => {
  const formattedData = {};
  Object.entries(financialData.data || {}).forEach(([domainKey, domainData = {}]) => {
    const domainType = GETIR_FINANCIALS_DOMAIN_TYPES[domainKey];
    if (!domainType) return;

    Object.entries(domainData[currency.toLowerCase()]).forEach(([key, data]) => {
      if (key.search('TaxExcluded') === -1) {
        if (!formattedData[key]) {
          formattedData[key] = { data: {} };
        }
        const totalData = Object.values(data)[0]?.totals || {};
        formattedData[key].data[domainType] = totalData;
      }
      if (key === chartKeys.basketAverage) {
        const totalData = getTotalBasketAverage({
          unformattedAllData: {
            countsTableData,
            financialsTableData: { financials: financialData },
          },
          startDates: computedDateRanges.map(({ start }) => start),
          tableDataKeys,
          currency,
        });
        formattedData[key].totals = totalData;
      }
    });
    if (!isEmpty(domainData?.[currency.toLowerCase()]?.[chartKeys.basketValue])) {
      setGMVDataForFinancials({
        chartKeys,
        formattedData,
        basketValue: Object.values(domainData[currency.toLowerCase()][chartKeys.basketValue])[0]?.totals || {},
        deliveryFee: Object.values(domainData[currency.toLowerCase()][chartKeys.deliveryFee])[0]?.totals || {},
        domainType,
        computedDateRanges,
      });
    }
  });

  if (formattedData[chartKeys.chargedAmount]?.data && chartKeys.getirMarketChargedAmount) {
    formattedData[chartKeys.getirMarketChargedAmount] = (
      { data: getGetirMarketDataFromAllDomainsData({ data: formattedData[chartKeys.chargedAmount].data }) }
    );
  }

  if (formattedData[chartKeys.netRevenue]?.data && chartKeys.getirMarketNetRevenue) {
    formattedData[chartKeys.getirMarketNetRevenue] = (
      { data: getGetirMarketDataFromAllDomainsData({ data: formattedData[chartKeys.netRevenue].data }) }
    );
  }

  return formattedData;
};

export function getGetirMarketDataFromAllDomainsData({ data }) {
  return {
    [GETIR_DOMAIN_TYPES.GETIR10]: data[GETIR_DOMAIN_TYPES.GETIR10],
    [GETIR_DOMAIN_TYPES.MARKET]: data[GETIR_DOMAIN_TYPES.MARKET],
  };
}

export function getTotalForGetirKuzeyden({ domainTypes: tempDomainTypes, startDates }) {
  const total = {};
  if (isEmpty(tempDomainTypes)) {
    return total;
  }

  Object.values(tempDomainTypes).forEach(domainTypeData => {
    startDates.forEach(startDate => {
      total[startDate] = (total[startDate] || 0) + (domainTypeData.totals[startDate] || 0);
    });
  });
  return total;
}

export const getFormattedGetirKuzeydenChartData = ({ getirKuzeydenData }) => {
  const getirKuzeydenFormattedData = {};
  Object.entries(getirKuzeydenData?.data || {}).forEach(([rowKey, rowData]) => {
    getirKuzeydenFormattedData[rowKey] = { data: {} };
    Object.entries(rowData).forEach(([dataKey, data]) => {
      getirKuzeydenFormattedData[rowKey].data[dataKey] = data.totals;
    });
  });
  return getirKuzeydenFormattedData;
};

export function getGetirFoodDeliveryTypeRowConfigs({
  rowData,
  t,
  parentDataKeysConfig,
  childRowsConfig,
}) {
  if (isEmpty(rowData)) {
    return [];
  }

  return Object.keys(rowData)
    .map(key => ({
      name: t(`dailySummaryPage:FOOD_DELIVERY_TYPES.${key}`),
      dataKey: parentDataKeysConfig.deliveryType,
      initialFormatter: () => rowData[key]?.totals,
      childRowsConfig: {
        ...childRowsConfig,
        getRowConfigs: configs => childRowsConfig.getRowConfigs({ ...configs, rowData: rowData?.[key]?.subTable }),
      },
    }));
}

export const getGetirFoodTableChartLineConfigsForDeliveryType = ({ t }) => {
  const chartConfigs = [];
  FOOD_DELIVERY_TYPES.forEach(value => {
    chartConfigs.push({
      key: value,
      title: t(`global:FOOD_DELIVERY_TYPES.${value}`),
    });
  });

  return chartConfigs;
};

export const setGMVDataForGetirFoodFinancials = ({ formattedData, basketValue, computedDateRanges, deliveryFee, chartKeys }) => {
  FOOD_DELIVERY_TYPES.forEach(deliveryType => {
    const basketValueDataOfDeliveryType = basketValue[deliveryType];
    const deliveryFeeDataOfDeliveryType = deliveryFee[deliveryType];

    const calculatedGMV = getGrossMarketValueFromGetirFinancials({
      basketValueData: basketValueDataOfDeliveryType?.totals,
      deliveryFeeData: deliveryFeeDataOfDeliveryType?.totals,
      dateRanges: computedDateRanges,
    });

    _set(formattedData, [chartKeys.gmv, 'data', deliveryType], calculatedGMV);
  });
};

export const getFormattedGetirFoodChartData = ({ getirFoodData, currency, chartKeys, computedDateRanges }) => {
  const getirFoodFormattedData = {};
  const getirFoodFinancialsInExpectedCurrency = getirFoodData?.data?.financials?.[currency?.toLowerCase()];

  if (getirFoodFinancialsInExpectedCurrency) {
    Object.entries(getirFoodFinancialsInExpectedCurrency).forEach(([financialKey, financialValue]) => {
      const filteredFinancialsRowData = {};

      Object.entries(financialValue).forEach(([key, value]) => {
        filteredFinancialsRowData[key] = value.totals;
      });

      if (financialKey === chartKeys.gmv && getirFoodFinancialsInExpectedCurrency[chartKeys.basketValue]) {
        setGMVDataForGetirFoodFinancials({
          chartKeys,
          formattedData: getirFoodFormattedData,
          basketValue: getirFoodFinancialsInExpectedCurrency[chartKeys.basketValue] || {},
          deliveryFee: getirFoodFinancialsInExpectedCurrency[chartKeys.deliveryFee] || {},
          computedDateRanges,
        });
      }
      else {
        _set(getirFoodFormattedData, [financialKey, 'data'], filteredFinancialsRowData);
      }
    });
  }

  Object.entries(getirFoodData.data || {}).forEach(([rowKey, rowData = {}]) => {
    const filteredRowData = {};
    Object.entries(rowData).forEach(([dataKey, data]) => {
      filteredRowData[dataKey] = data.totals;
    });
    _set(getirFoodFormattedData, [rowKey, 'data'], filteredRowData);
  });

  return getirFoodFormattedData;
};

export function getGetirLocalsDeliveryTypeRowConfigs({
  rowData,
  t,
  parentDataKeysConfig,
  childRowsConfig,
}) {
  if (isEmpty(rowData)) {
    return [];
  }

  return Object.keys(rowData)
    .map(key => ({
      name: t(`dailySummaryPage:LOCALS_DELIVERY_TYPES.${key}`),
      dataKey: parentDataKeysConfig.deliveryType,
      initialFormatter: () => rowData[key]?.totals,
      childRowsConfig: {
        ...childRowsConfig,
        getRowConfigs: configs => childRowsConfig.getRowConfigs({ ...configs, rowData: rowData?.[key]?.subTable }),
      },
    }));
}

export const getGetirLocalsTableChartLineConfigsForDeliveryType = ({ t }) => {
  const chartConfigs = [];
  LOCALS_DELIVERY_TYPES.forEach(value => {
    chartConfigs.push({
      key: value,
      title: t(`global:LOCALS_DELIVERY_TYPES.${value}`),
    });
  });

  return chartConfigs;
};

export const setGMVDataForGetirLocalsFinancials = ({ formattedData, basketValue, computedDateRanges, deliveryFee, chartKeys }) => {
  LOCALS_DELIVERY_TYPES.forEach(deliveryType => {
    const basketValueDataOfDeliveryType = basketValue[deliveryType];
    const deliveryFeeDataOfDeliveryType = deliveryFee[deliveryType];

    const calculatedGMV = getGrossMarketValueFromGetirFinancials({
      basketValueData: basketValueDataOfDeliveryType?.totals,
      deliveryFeeData: deliveryFeeDataOfDeliveryType?.totals,
      dateRanges: computedDateRanges,
    });

    _set(formattedData, [chartKeys.gmv, 'data', deliveryType], calculatedGMV);
  });
};

export const getFormattedGetirLocalsChartData = ({ getirLocalsData, currency, chartKeys, computedDateRanges }) => {
  const getirLocalsFormattedData = {};
  const getirLocalsFinancialsInExpectedCurrency = getirLocalsData?.data?.financials?.[currency?.toLowerCase()];

  if (getirLocalsFinancialsInExpectedCurrency) {
    Object.entries(getirLocalsFinancialsInExpectedCurrency).forEach(([financialKey, financialValue]) => {
      const filteredFinancialsRowData = {};

      Object.entries(financialValue).forEach(([key, value]) => {
        filteredFinancialsRowData[key] = value.totals;
      });

      if (financialKey === chartKeys.gmv && getirLocalsFinancialsInExpectedCurrency) {
        setGMVDataForGetirLocalsFinancials({
          chartKeys,
          formattedData: getirLocalsFormattedData,
          basketValue: getirLocalsFinancialsInExpectedCurrency[chartKeys.basketValue] || {},
          deliveryFee: getirLocalsFinancialsInExpectedCurrency[chartKeys.deliveryFee] || {},
          computedDateRanges,
        });
      }
      else {
        _set(getirLocalsFormattedData, [financialKey, 'data'], filteredFinancialsRowData);
      }
    });
  }

  Object.entries(getirLocalsData.data || {}).forEach(([rowKey, rowData = {}]) => {
    const filteredRowData = {};
    Object.entries(rowData).forEach(([dataKey, data]) => {
      filteredRowData[dataKey] = data.totals;
    });
    _set(getirLocalsFormattedData, [rowKey, 'data'], filteredRowData);
  });

  return getirLocalsFormattedData;
};

export function getGetirDriveSourceTypeRowConfigs({ rowData, t, parentDataKeysConfig, childRowsConfig }) {
  if (isEmpty(rowData)) {
    return [];
  }

  return Object.keys(rowData)
    .map(key => ({
      name: t(`dailySummaryPage:GETIR_DRIVE_EXTERNAL_SOURCE.${key.toUpperCase()}`),
      dataKey: parentDataKeysConfig.sourceType,
      initialFormatter: () => rowData[key]?.totals,
      childRowsConfig: {
        ...childRowsConfig,
        getRowConfigs: configs => childRowsConfig.getRowConfigs({ ...configs, rowData: rowData?.[key]?.subTable }),
      },
    }));
}

export function getTotalForGetirDriveFinancials({ dataFromDataKey, startDates, currency, rowName }) {
  if (isEmpty(dataFromDataKey)) {
    return {};
  }

  const total = {};
  Object.entries(dataFromDataKey).forEach(([, value]) => {
    const rowData = value?.[currency.toLowerCase()]?.[rowName];
    if (!isEmpty(rowData)) {
      const objectKey = Object.keys(rowData) || undefined;
      startDates.forEach(startDate => {
        objectKey.forEach(key => {
          total[startDate] = (total[startDate] || 0) + (value[currency.toLowerCase()][rowName][key]?.totals[startDate] || 0);
        });
      });
    }
  });

  return total;
}

export function getGetirDriveSourceTypeForFinancialsRowConfigs({ rowFinancialData, t, parentDataKeysConfig, childRowsConfig, currency, rowName }) {
  if (isEmpty(rowFinancialData)) {
    return [];
  }
  const rowData = rowFinancialData?.[currency.toLowerCase()]?.[rowName];

  return Object.keys(rowData)
    .map(key => ({
      name: t(`dailySummaryPage:GETIR_DRIVE_EXTERNAL_SOURCE.${key.toUpperCase()}`),
      dataKey: parentDataKeysConfig.sourceType,
      shouldAssignCurrencyFormatter: rowName === 'basketAverage' && true,
      initialFormatter: () => rowData[key]?.totals,
      childRowsConfig: {
        ...childRowsConfig,
        getRowConfigs: configs => childRowsConfig.getRowConfigs({ ...configs, rowData: rowData?.[key]?.subTable }),
      },
    }
    ));
}

export function getTotalBasketAverageForGetirDrive({ dataFromDataKey, startDates, currency }) {
  const totalRentalCounts = getTotalCountsForFirstRow({ dimension: dataFromDataKey?.successfulRentalCounts, startDates });
  const totalBasketValue = getTotalForGetirDriveFinancials({ dataFromDataKey, startDates, currency, rowName: 'basketValue' });
  const totalBasketAverages = {};
  startDates.forEach(startDate => {
    totalBasketAverages[startDate] = (totalBasketValue[startDate] / totalRentalCounts[startDate]);
  });
  return totalBasketAverages;
}

export const getGetirDriveTableChartLineConfigsForDeliveryType = ({ t }) => {
  const chartConfigs = [];
  Object.values(GETIR_DRIVE_EXTERNAL_SOURCE).forEach(val => {
    chartConfigs.push({
      key: val.toUpperCase(),
      title: t(`global:GETIR_DRIVE_EXTERNAL_SOURCE.${val.toUpperCase()}`),
    });
  });

  return chartConfigs;
};

export const getFormattedGetirDriveChartData = ({ getirDriveData, currency, chartKeys, computedDateRanges }) => {
  const getirDriveFormattedData = {};
  Object.entries(getirDriveData?.data || {}).forEach(([rowKey, rowData = {}]) => {
    if (rowKey === 'financials') {
      Object.keys(chartKeys).forEach(key => {
        if (key === chartKeys.basketAverage) {
          const startDates = computedDateRanges.map(({ start }) => start);
          const basketAverageForGetirDrive = getTotalBasketAverageForGetirDrive({ dataFromDataKey: getirDriveData?.data, startDates, currency });
          _set(getirDriveFormattedData, [key, 'totals'], basketAverageForGetirDrive);
        }
        const filteredFinancialsRowData = {};
        const financialRowData = rowData?.[currency.toLowerCase()]?.[key] || {};
        Object.entries(financialRowData).forEach(([dataKey, data]) => {
          filteredFinancialsRowData[dataKey.toUpperCase()] = data.totals;
        });
        _set(getirDriveFormattedData, [key, 'data'], filteredFinancialsRowData);
      });
    }
  });

  Object.entries(getirDriveData.data || {}).forEach(([rowKey, rowData = {}]) => {
    const filteredRowData = {};
    Object.entries(rowData).forEach(([dataKey, data]) => {
      filteredRowData[dataKey.toUpperCase()] = data.totals;
    });
    _set(getirDriveFormattedData, [rowKey, 'data'], filteredRowData);
  });

  return getirDriveFormattedData;
};

export function getFormattedGetirJobsPostTypesData({ postTypesData, dateRanges }) {
  const total = {};
  if (isEmpty(postTypesData)) {
    return total;
  }
  Object.entries(postTypesData).forEach(([postType, postTypeData]) => {
    if (!BAD_KEYS_FOR_GETIR_JOBS.includes(postType)) {
      dateRanges.forEach(({ start, end }) => {
        const dayDiff = moment.duration(moment(end).diff(moment(start))).days() + 1;
        total[start] = ((total[start] || 0) + (postTypeData.totals[start] || 0)) / dayDiff;
      });
    }
  });
  return total;
}

export function getTotalForGetirJobs({ postTypesData, allowUndefined = false, startDates }) {
  const total = {};
  if (isEmpty(postTypesData)) {
    return total;
  }

  Object.entries(postTypesData).forEach(([postType, postTypeData]) => {
    if (!BAD_KEYS_FOR_GETIR_JOBS.includes(postType) || (allowUndefined && postType === 'undefined')) {
      startDates.forEach(startDate => {
        total[startDate] = (total[startDate] || 0) + (postTypeData.totals[startDate] || 0);
      });
    }
  });
  return total;
}

export function getGetirJobsPostTypeRowConfigs({ rowData, t, parentDataKeysConfig, childRowsConfig }) {
  if (isEmpty(rowData)) {
    return [];
  }

  const configArr = [];
  Object.keys(rowData)
    .forEach(key => {
      if (!BAD_KEYS_FOR_GETIR_JOBS.includes(key)) {
        configArr.push({
          name: t(`GETIR_JOBS_${key}`),
          dataKey: parentDataKeysConfig.postTypes,
          initialFormatter: ({ startDates }) => {
            return getTotalForGetirJobs({ postTypesData: { [key]: rowData[key] }, startDates });
          },
          childRowsConfig: {
            ...childRowsConfig,
            getRowConfigs: configs => childRowsConfig.getRowConfigs({ ...configs, key, rowData: rowData?.[key]?.subTable }),
          },
        });
      }
    });

  return configArr;
}

export const getGetirJobsTableChartLineConfigs = ({ langKey }) => (
  Object.entries(getirJobsPostTypes).map(([key, value]) => ({
    key,
    title: value[langKey],
  }))
);

export const getFormattedGetirJobsChartData = ({ getirJobsTableData, allowUndefinedRows }) => {
  const getirJobsFormattedData = {};
  Object.entries(getirJobsTableData.data || {}).forEach(([rowKey, rowData = {}]) => {
    if (!BAD_KEYS_FOR_GETIR_JOBS.includes(rowKey)) {
      const filteredRowData = {};
      Object.entries(rowData).forEach(([dataKey, data]) => {
        if (!BAD_KEYS_FOR_GETIR_JOBS.includes(dataKey) || allowUndefinedRows?.includes(rowKey)) {
          const totalData = data.totals || {};
          filteredRowData[dataKey] = totalData || {};
        }
      });
      _set(getirJobsFormattedData, [rowKey, 'data'], filteredRowData);
    }
  });
  return getirJobsFormattedData;
};

// GetirN11
export function getTotalForGetirN11Financials({ dataFromDataKey, startDates, currency, rowName, excludedKey }) {
  const rowData = get(dataFromDataKey, ['financials', currency.toLowerCase(), rowName, 'undefined', 'totals'], {});
  const excludedData = get(dataFromDataKey, ['financials', currency.toLowerCase(), rowName, 'undefined', 'subTable', excludedKey, 'totals'], {});
  const total = {};

  if (isEmpty(rowData)) {
    return [];
  }

  startDates.forEach(startDate => {
    total[startDate] = (total[startDate] ?? 0) + (rowData[startDate] ?? 0);
    if (excludedKey) {
      total[startDate] -= (excludedData[startDate] ?? 0);
    }
  });

  return total;
}

export function getGMVAverageForN11({ startDates, excludedKey = '', dataFromDataKey, currency, rowName }) {
  const totalOrder = getTotalCountsForFirstRow({ dimension: dataFromDataKey.orderCount, startDates, excludedKey });
  const totalGMV = getTotalForGetirN11Financials({ dataFromDataKey, startDates, currency, rowName, excludedKey });
  const gmvAverageForN11 = {};
  startDates.forEach(startDate => {
    gmvAverageForN11[startDate] = (totalGMV[startDate]) / (totalOrder[startDate]);
  });

  return gmvAverageForN11;
}

export function getGetirN11CategoryGroupRowsConfigs({ rowData, parentDataKey, numberFormatter, childRowsConfig = {} }) {
  if (isEmpty(rowData)) {
    return [];
  }

  return Object.entries(rowData).map(([categoryName, value]) => {
    return {
      name: categoryName,
      dataKey: parentDataKey,
      initialFormatter: () => value.totals,
      numberFormatter,
      childRowsConfig: {
        ...childRowsConfig,
        ...(
          childRowsConfig?.getRowConfigs &&
          { getRowConfigs: configs => childRowsConfig.getRowConfigs({ ...configs, key: categoryName, rowData: rowData?.[categoryName]?.subTable }) }
        ),
      },
    };
  });
}

export function getGetirN11SourceTypeRowConfigs({ rowData, t, parentDataKey, childRowsConfig, numberFormatter }) {
  if (isEmpty(rowData)) {
    return [];
  }
  const reorderedData = [];

  const updatedRowConfigData = Object.keys(rowData)
    .map(key => ({
      name: t(`N11_ORDER.${key}`),
      dataKey: parentDataKey,
      initialFormatter: () => rowData[key]?.totals,
      tooltip: t(`N11_ORDER.${key}_TOOLTIP`),
      numberFormatter,
      childRowsConfig: {
        ...childRowsConfig,
        getRowConfigs: configs => childRowsConfig.getRowConfigs({ ...configs, key, rowData: rowData?.[key]?.subTable }),
      },
    }));

  Object.values(GETIR_N11_SOURCE_TYPE).forEach(value => {
    const foundData = updatedRowConfigData.find(data => data?.name === t(`N11_ORDER.${value}`));
    reorderedData.push(foundData);
  });
  return reorderedData;
}

export function getGetirN11ChannelTypeRowConfigs({ rowData, t, parentDataKey, childRowsConfig = {}, numberFormatter }) {
  if (isEmpty(rowData)) {
    return [];
  }

  return Object.keys(rowData)
    .map(key => ({
      name: t(`N11_ORDER.${key}`),
      dataKey: parentDataKey,
      initialFormatter: () => rowData[key]?.totals,
      numberFormatter,
      childRowsConfig: {
        ...childRowsConfig,
        getRowConfigs: configs => childRowsConfig.getRowConfigs({ ...configs, key, rowData: rowData?.[key]?.subTable }),
      },
    }));
}

export const getN11TableChartLineConfigsForSource = ({ t }) => {
  const chartConfigs = [];
  Object.values(GETIR_N11_SOURCE_TYPE).forEach(value => {
    chartConfigs.push({
      key: value,
      title: t(`dailySummaryPage:N11_ORDER.${value}`),
      lineColor: SOURCE_COLORS_BY_SOURCE_TYPE_FOR_GETIR_11[value.toUpperCase()],
    });
  });

  return chartConfigs;
};

export const getN11TableChartLineConfigsForTraffic = ({ t }) => {
  const chartConfigs = [];
  Object.values(GETIR_N11_TRAFFIC_SOURCE).forEach(value => {
    chartConfigs.push({
      key: value,
      title: t(`dailySummaryPage:N11_ORDER.${value}`),
    });
  });

  return chartConfigs;
};

export const getFormattedGetirN11ChartData = ({ getirN11Data, chartKeys, currency }) => {
  const formattedData = {};
  Object.entries(getirN11Data?.data?.orderCount || {}).forEach(([sourceType, sourceData]) => {
    _set(formattedData, [chartKeys.orderCount, 'data', sourceType], sourceData?.totals || {});
  });

  Object.entries(getirN11Data?.data?.traffic || {}).forEach(([trafficType, sourceData]) => {
    _set(formattedData, [chartKeys.totalTraffic, 'data', trafficType], sourceData?.totals || {});
  });

  Object.entries(getirN11Data?.data?.financials?.[currency.toLowerCase()] || {}).forEach(([rowKey, rowData]) => {
    if (rowData?.undefined?.subTable) {
      Object.entries(rowData.undefined.subTable).forEach(([sourceType, sourceData]) => {
        _set(formattedData, [rowKey, 'data', sourceType], sourceData?.totals || {});
      });
      if (rowKey === chartKeys.gmvAverage || rowKey === chartKeys.revenueAverage) {
        _set(formattedData, [rowKey, 'totals'], rowData?.undefined?.totals || {});
      }
    }
  });

  return formattedData;
};

const getirSelectFinancialsRowKeys = new Set(['promoAandm', 'totalRevenue', 'deliveryFeeDiscountCost']);

export const getFormattedGetirSelectChartData = ({ getirSelectData, allowUndefinedRows, currency }) => {
  const getirSelectFormattedData = {};
  Object.entries(getirSelectData.data || {}).forEach(([rowKey, rowData = {}]) => {
    if (!COMMON_RESTRICTED_ROW_KEYS.includes(rowKey)) {
      const filteredRowData = {};
      let tempRowData = rowData || {};
      if (getirSelectFinancialsRowKeys.has(rowKey)) {
        tempRowData = rowData?.[currency.toLowerCase()]?.[rowKey] || {};
      }
      Object.entries(tempRowData).forEach(([dataKey, data]) => {
        if (!COMMON_RESTRICTED_ROW_KEYS.includes(dataKey) || allowUndefinedRows?.includes(rowKey)) {
          filteredRowData[dataKey] = data.totals || {};
        }
      });
      _set(getirSelectFormattedData, [rowKey, 'data'], filteredRowData);
    }
  });
  return getirSelectFormattedData;
};

export const getFormattedGorillasChartData = ({ gorillasData, chartKeys, currency }) => {
  const gorillasFormattedData = {};
  const gorillasOnlyOrderCounts = get(gorillasData, ['data', 'gorillasOnlyOrderCounts'], {});
  const gorillasOnlyFinancials = get(gorillasData, ['data', 'gorillasOnlyFinancials', currency.toLowerCase()], {});
  const getirGorillasOrderCounts = get(gorillasData, ['data', 'getirGorillasOrderCounts'], {});
  const getirGorillasFinancials = get(gorillasData, ['data', 'getirGorillasFinancials', currency.toLowerCase()], {});
  const { netRevenue: gorillasOnlyNetRevenue = {}, gmv: gorillasOnlyGmv = {} } = gorillasOnlyFinancials;
  const { netRevenue: getirGorillasNetRevenue = {}, gmv: getirGorillasGmv = {} } = getirGorillasFinancials;
  _forEach(gorillasOnlyOrderCounts, dimensionOrderCounts => {
    const totals = get(dimensionOrderCounts, ['totals'], {});
    gorillasFormattedData[chartKeys.orderCount] = gorillasFormattedData[chartKeys.orderCount] || {};
    gorillasFormattedData[chartKeys.orderCount].data = gorillasFormattedData[chartKeys.orderCount].data || {};
    gorillasFormattedData[chartKeys.orderCount].data.gorillasOnly = gorillasFormattedData[chartKeys.orderCount].data.gorillasOnly || {};
    _forEach(totals, (count, timestamp) => {
      gorillasFormattedData[chartKeys.orderCount].data.gorillasOnly[timestamp] =
        gorillasFormattedData[chartKeys.orderCount].data.gorillasOnly[timestamp] || 0;
      gorillasFormattedData[chartKeys.orderCount].data.gorillasOnly[timestamp] += count;
    });
  });
  _forEach(gorillasOnlyNetRevenue, dimensionNetRevenue => {
    const totals = get(dimensionNetRevenue, ['totals'], {});
    gorillasFormattedData[chartKeys.netRevenue] = gorillasFormattedData[chartKeys.netRevenue] || {};
    gorillasFormattedData[chartKeys.netRevenue].data = gorillasFormattedData[chartKeys.netRevenue].data || {};
    gorillasFormattedData[chartKeys.netRevenue].data.gorillasOnly = gorillasFormattedData[chartKeys.netRevenue].data.gorillasOnly || {};
    _forEach(totals, (netRevenue, timestamp) => {
      gorillasFormattedData[chartKeys.netRevenue].data.gorillasOnly[timestamp] =
        gorillasFormattedData[chartKeys.netRevenue].data.gorillasOnly[timestamp] || 0;
      gorillasFormattedData[chartKeys.netRevenue].data.gorillasOnly[timestamp] += netRevenue;
    });
  });
  _forEach(gorillasOnlyGmv, dimensionGmv => {
    const totals = get(dimensionGmv, ['totals'], {});
    gorillasFormattedData[chartKeys.gmv] = gorillasFormattedData[chartKeys.gmv] || {};
    gorillasFormattedData[chartKeys.gmv].data = gorillasFormattedData[chartKeys.gmv].data || {};
    gorillasFormattedData[chartKeys.gmv].data.gorillasOnly = gorillasFormattedData[chartKeys.gmv].data.gorillasOnly || {};
    _forEach(totals, (gmv, timestamp) => {
      gorillasFormattedData[chartKeys.gmv].data.gorillasOnly[timestamp] =
        gorillasFormattedData[chartKeys.gmv].data.gorillasOnly[timestamp] || 0;
      gorillasFormattedData[chartKeys.gmv].data.gorillasOnly[timestamp] += gmv;
    });
  });
  _forEach(getirGorillasOrderCounts, dimensionOrderCounts => {
    const totals = get(dimensionOrderCounts, ['totals'], {});
    gorillasFormattedData[chartKeys.orderCount] = gorillasFormattedData[chartKeys.orderCount] || {};
    gorillasFormattedData[chartKeys.orderCount].data = gorillasFormattedData[chartKeys.orderCount].data || {};
    gorillasFormattedData[chartKeys.orderCount].data.getirGorillas = gorillasFormattedData[chartKeys.orderCount].data.getirGorillas || {};
    _forEach(totals, (count, timestamp) => {
      gorillasFormattedData[chartKeys.orderCount].data.getirGorillas[timestamp] =
        gorillasFormattedData[chartKeys.orderCount].data.getirGorillas[timestamp] || 0;
      gorillasFormattedData[chartKeys.orderCount].data.getirGorillas[timestamp] += count;
    });
  });
  _forEach(getirGorillasNetRevenue, dimensionNetRevenue => {
    const totals = get(dimensionNetRevenue, ['totals'], {});
    gorillasFormattedData[chartKeys.netRevenue] = gorillasFormattedData[chartKeys.netRevenue] || {};
    gorillasFormattedData[chartKeys.netRevenue].data = gorillasFormattedData[chartKeys.netRevenue].data || {};
    gorillasFormattedData[chartKeys.netRevenue].data.getirGorillas = gorillasFormattedData[chartKeys.netRevenue].data.getirGorillas || {};
    _forEach(totals, (netRevenue, timestamp) => {
      gorillasFormattedData[chartKeys.netRevenue].data.getirGorillas[timestamp] =
        gorillasFormattedData[chartKeys.netRevenue].data.getirGorillas[timestamp] || 0;
      gorillasFormattedData[chartKeys.netRevenue].data.getirGorillas[timestamp] += netRevenue;
    });
  });
  _forEach(getirGorillasGmv, dimensionGmv => {
    const totals = get(dimensionGmv, ['totals'], {});
    gorillasFormattedData[chartKeys.gmv] = gorillasFormattedData[chartKeys.gmv] || {};
    gorillasFormattedData[chartKeys.gmv].data = gorillasFormattedData[chartKeys.gmv].data || {};
    gorillasFormattedData[chartKeys.gmv].data.getirGorillas = gorillasFormattedData[chartKeys.gmv].data.getirGorillas || {};
    _forEach(totals, (gmv, timestamp) => {
      gorillasFormattedData[chartKeys.gmv].data.getirGorillas[timestamp] =
        gorillasFormattedData[chartKeys.gmv].data.getirGorillas[timestamp] || 0;
      gorillasFormattedData[chartKeys.gmv].data.getirGorillas[timestamp] += gmv;
    });
  });
  return gorillasFormattedData;
};

export const getFormattedGetirMarketIntegrationChartData = ({ getirMarketIntegrationData, chartKeys, currency }) => {
  const formattedData = {};
  const orderCounts = get(getirMarketIntegrationData, ['data', 'orderCounts'], {});
  const financials = get(getirMarketIntegrationData, ['data', 'financials', currency.toLowerCase()], {});
  const { netRevenue: getirMarketIntegrationNetRevenue = {}, gmv: getirMarketIntegrationGmv = {} } = financials;
  _forEach(orderCounts, (dimensionOrderCounts, dimensionKey) => {
    const totals = get(dimensionOrderCounts, ['totals'], {});
    formattedData[chartKeys.orderCount] = formattedData[chartKeys.orderCount] || {};
    formattedData[chartKeys.orderCount].data = formattedData[chartKeys.orderCount].data || {};
    formattedData[chartKeys.orderCount].data[dimensionKey] = formattedData[chartKeys.orderCount].data[dimensionKey] || {};
    _forEach(totals, (count, timestamp) => {
      formattedData[chartKeys.orderCount].data[dimensionKey][timestamp] =
        formattedData[chartKeys.orderCount].data[dimensionKey][timestamp] || 0;
      formattedData[chartKeys.orderCount].data[dimensionKey][timestamp] += count;
    });
  });
  _forEach(getirMarketIntegrationNetRevenue, (dimensionNetRevenue, dimensionKey) => {
    const totals = get(dimensionNetRevenue, ['totals'], {});
    formattedData[chartKeys.netRevenue] = formattedData[chartKeys.netRevenue] || {};
    formattedData[chartKeys.netRevenue].data = formattedData[chartKeys.netRevenue].data || {};
    formattedData[chartKeys.netRevenue].data[dimensionKey] = formattedData[chartKeys.netRevenue].data[dimensionKey] || {};
    _forEach(totals, (netRevenue, timestamp) => {
      formattedData[chartKeys.netRevenue].data[dimensionKey][timestamp] =
        formattedData[chartKeys.netRevenue].data[dimensionKey][timestamp] || 0;
      formattedData[chartKeys.netRevenue].data[dimensionKey][timestamp] += netRevenue;
    });
  });
  _forEach(getirMarketIntegrationGmv, (dimensionGmv, dimensionKey) => {
    const totals = get(dimensionGmv, ['totals'], {});
    formattedData[chartKeys.gmv] = formattedData[chartKeys.gmv] || {};
    formattedData[chartKeys.gmv].data = formattedData[chartKeys.gmv].data || {};
    formattedData[chartKeys.gmv].data[dimensionKey] = formattedData[chartKeys.gmv].data[dimensionKey] || {};
    _forEach(totals, (gmv, timestamp) => {
      formattedData[chartKeys.gmv].data[dimensionKey][timestamp] =
        formattedData[chartKeys.gmv].data[dimensionKey][timestamp] || 0;
      formattedData[chartKeys.gmv].data[dimensionKey][timestamp] += gmv;
    });
  });
  return formattedData;
};

export function getGetirFoodDeliveryTypeForFinancialRowConfigs({ rowFinancialData, t, parentDataKeysConfig, childRowsConfig, currency, rowName }) {
  if (isEmpty(rowFinancialData)) {
    return [];
  }

  const rowData = rowFinancialData?.[currency.toLowerCase()]?.[rowName];

  return Object.keys(rowData)
    .map(key => ({
      name: t(`dailySummaryPage:FOOD_DELIVERY_TYPES.${key}`),
      dataKey: parentDataKeysConfig.deliveryType,
      shouldAssignCurrencyFormatter: rowName === 'basketAverage' && true,
      initialFormatter: () => rowData[key]?.totals,
      childRowsConfig: {
        ...childRowsConfig,
        getRowConfigs: configs => childRowsConfig.getRowConfigs({ ...configs, rowData: rowData?.[key]?.subTable }),
      },
    }));
}

export function getTotalForFinancials({ dataFromDataKey, startDates, currency, rowName }) {
  if (isEmpty((dataFromDataKey))) {
    return {};
  }

  const total = {};
  Object.entries(dataFromDataKey).forEach(([, value]) => {
    const rowData = value?.[currency.toLowerCase()]?.[rowName];
    if (!isEmpty(rowData)) {
      const objectKey = Object.keys(rowData) || undefined;
      startDates.forEach(startDate => {
        objectKey.forEach(key => {
          total[startDate] = (total[startDate] || 0) + (value[currency.toLowerCase()][rowName][key]?.totals[startDate] || 0);
        });
      });
    }
  });

  return total;
}

export function getGetirLocalsDeliveryTypeForFinancialRowConfigs({ rowFinancialData, t, parentDataKeysConfig, childRowsConfig, currency, rowName }) {
  if (isEmpty(rowFinancialData)) {
    return [];
  }

  const rowData = rowFinancialData?.[currency.toLowerCase()]?.[rowName];

  return Object.keys(rowData)
    .map(key => ({
      name: t(`dailySummaryPage:LOCALS_DELIVERY_TYPES.${key}`),
      dataKey: parentDataKeysConfig.deliveryType,
      shouldAssignCurrencyFormatter: rowName === 'basketAverage' && true,
      initialFormatter: () => rowData[key]?.totals,
      childRowsConfig: {
        ...childRowsConfig,
        getRowConfigs: configs => childRowsConfig.getRowConfigs({ ...configs, rowData: rowData?.[key]?.subTable }),
      },
    }));
}
