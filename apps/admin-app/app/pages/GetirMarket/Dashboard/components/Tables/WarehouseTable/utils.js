import _ from 'lodash';

import { getLangKey, t } from '@shared/i18n';
import { GETIR_MARKET_DOMAIN_TYPES } from '@shared/shared/constants';
import { numberFormat } from '@shared/utils/localization';

const warehouseStatsTemplate = {
  name: null,
  city: null,
  idleHours: 0,
  utilizedHours: 0,
  busyHours: 0,
  availableHours: 0,
  throughput: 0,
  utilization: 0,
  orderCount: 0,
  totalOrderCountOfAllDomains: 0,
  missedOrderCount: 0,
  queuedOrderCount: 0,
  nonQueuedOrderCount: 0,
  queuedOrderPct: 0,
  checkoutToReachDuration: 0,
  checkoutToReachDurationNonQueued: 0,
  batchStats: {},
  isCollapsed: true,
};

const calculateTotalMarketOrderByWarehouse = (data, warehouseMap, citiesMap, selectedDomainType, selectedCities) => {
  // Calculate total market order count and total utilized hours by warehouse id for market domains
  const totalMarketOrder = {
    totalUtilizedHours: {},
    orderCountByWarehouseID: {},
    totalOrderCount: 0,
  };
  Object.entries(data || {}).forEach(([domainType, domainData]) => {
    if (GETIR_MARKET_DOMAIN_TYPES.includes(Number(domainType))) {
      domainData.forEach(warehouse => {
        const foundWarehouse = warehouseMap.get(warehouse.warehouse);
        const foundCity = citiesMap.get(foundWarehouse?.city);
        if (!foundWarehouse || !foundCity) return;
        const hasWarehouseSelectedDomainType = foundWarehouse.domainTypes.includes(selectedDomainType);
        if (!hasWarehouseSelectedDomainType) return;
        if (selectedCities?.length) {
          const isWarehouseInSelectedCity = selectedCities.includes(foundWarehouse?.city);
          if (!isWarehouseInSelectedCity) return;
        }

        totalMarketOrder.totalUtilizedHours[warehouse?.warehouse] = (warehouse?.utilizedHours || 0) + (warehouse?.idleHours || 0);
        totalMarketOrder.totalOrderCount += warehouse?.orderCount || 0;
        if (totalMarketOrder.orderCountByWarehouseID[warehouse?.warehouse]) {
          totalMarketOrder.orderCountByWarehouseID[warehouse?.warehouse] += warehouse?.orderCount || 0;
        }
        else {
          totalMarketOrder.orderCountByWarehouseID[warehouse?.warehouse] = warehouse?.orderCount || 0;
        }
      });
    }
  });

  totalMarketOrder.totalUtilizedHours = Object.values(totalMarketOrder.totalUtilizedHours).reduce((a, b) => a + b, 0);
  return totalMarketOrder;
};

const formatData = ({ data, warehouseMap, citiesMap, selectedDomainType, selectedCities }) => {
  if (!data) return [];

  const langKey = getLangKey();
  const totalMarketOrderByWarehouse = calculateTotalMarketOrderByWarehouse(data, warehouseMap, citiesMap, selectedDomainType, selectedCities);

  const distribution = {};
  const formattedData = {
    distribution: [],
    totals: {
      idleHours: 0,
      utilizedHours: 0,
      busyHours: 0,
      availableHours: 0,
      throughput: 0,
      utilization: 0,
      orderCount: 0,
      totalOrderCountOfAllDomains: 0,
      missedOrderCount: 0,
      queuedOrderCount: 0,
      nonQueuedOrderCount: 0,
      queuedOrderPct: 0,
      checkoutToReachDuration: 0,
      checkoutToReachDurationNonQueued: 0,
      reachDurationAvg: 0,
      reachDurationWithoutQueueAvg: 0,
    },
  };
  data?.[selectedDomainType]?.forEach(warehouseStats => {
    const { warehouse: warehouseId } = warehouseStats;
    const foundWarehouse = warehouseMap.get(warehouseId);
    const foundCity = citiesMap.get(foundWarehouse?.city);

    if (!foundWarehouse || !foundCity) return;
    const hasWarehouseSelectedDomainType = foundWarehouse.domainTypes.includes(selectedDomainType);
    if (!hasWarehouseSelectedDomainType) return;

    if (selectedCities?.length) {
      const isWarehouseInSelectedCity = selectedCities.includes(foundWarehouse?.city);
      if (!isWarehouseInSelectedCity) return;
    }

    distribution[warehouseId] = distribution[warehouseId] || _.cloneDeep(warehouseStatsTemplate);
    distribution[warehouseId].name = foundWarehouse.name;
    distribution[warehouseId].city = foundCity.name[langKey];
    distribution[warehouseId].idleHours = warehouseStats.idleHours || 0;
    distribution[warehouseId].utilizedHours = warehouseStats.utilizedHours || 0;
    distribution[warehouseId].busyHours = warehouseStats.busyHours || 0;
    distribution[warehouseId].availableHours = distribution[warehouseId].idleHours + distribution[warehouseId].utilizedHours;
    distribution[warehouseId].orderCount += warehouseStats.orderCount || 0;
    distribution[warehouseId].missedOrderCount += warehouseStats.missedOrderCount || 0;

    formattedData.totals.orderCount += warehouseStats.orderCount || 0;
    formattedData.totals.missedOrderCount += warehouseStats.missedOrderCount || 0;

    _.forEach(warehouseStats.batchOrder, batchOrderStats => {
      distribution[warehouseId].batchStats[batchOrderStats.batchIndex] = distribution[warehouseId].batchStats[batchOrderStats.batchIndex] || {
        orderCount: 0,
        nonQueuedOrderCount: 0,
        checkoutToReachDuration: 0,
        checkoutToReachDurationNonQueued: 0,
      };
      distribution[warehouseId].batchStats[batchOrderStats.batchIndex].orderCount += batchOrderStats.orderCount;
      distribution[warehouseId].batchStats[batchOrderStats.batchIndex].nonQueuedOrderCount += batchOrderStats.nonQueuedOrderCount || 0;
      distribution[warehouseId].batchStats[batchOrderStats.batchIndex].checkoutToReachDuration += batchOrderStats.checkoutToReachDuration || 0;
      distribution[warehouseId].batchStats[batchOrderStats.batchIndex].checkoutToReachDurationNonQueued
        += batchOrderStats.checkoutToReachDurationNonQueued || 0;
      distribution[warehouseId].nonQueuedOrderCount += batchOrderStats.nonQueuedOrderCount || 0;
      distribution[warehouseId].checkoutToReachDuration += batchOrderStats.checkoutToReachDuration || 0;
      distribution[warehouseId].checkoutToReachDurationNonQueued += batchOrderStats.checkoutToReachDurationNonQueued || 0;
      if (
        (!selectedDomainType || _.includes(foundWarehouse.domainTypes, selectedDomainType)) &&
        (_.isEmpty(selectedCities) || _.includes(selectedCities, foundWarehouse?.city))
      ) {
        formattedData.totals.nonQueuedOrderCount += batchOrderStats.nonQueuedOrderCount || 0;
        formattedData.totals.checkoutToReachDuration += batchOrderStats.checkoutToReachDuration || 0;
        formattedData.totals.checkoutToReachDurationNonQueued += batchOrderStats.checkoutToReachDurationNonQueued || 0;
      }
    });
    distribution[warehouseId].totalOrderCountOfAllDomains += totalMarketOrderByWarehouse.orderCountByWarehouseID[warehouseId] || 0;

    if (_.isEmpty(selectedCities) || _.includes(selectedCities, warehouseMap.get(warehouseId)?.city)) {
      formattedData.totals.totalOrderCountOfAllDomains += warehouseStats.orderCount || 0;
    }
  });
  _.forEach(distribution, (warehouseStats, warehouseId) => {
    const warehouseStatsWithAverages = {
      ...warehouseStats,
      reachDurationAvg: warehouseStats.checkoutToReachDuration / 60 / warehouseStats.orderCount,
      reachDurationWithoutQueueAvg: warehouseStats.checkoutToReachDurationNonQueued / 60 / warehouseStats.nonQueuedOrderCount,
      children: Object.entries(warehouseStats.batchStats).map(([idx, batchStat]) => ({
        ...batchStat,
        batchStatIndex: Number(idx),
        idx,
        reachDurationAvg: batchStat.checkoutToReachDuration / 60 / batchStat.orderCount,
        reachDurationWithoutQueueAvg: batchStat.checkoutToReachDurationNonQueued / 60 / batchStat.nonQueuedOrderCount,
      })),
      queuedOrderCount: warehouseStats.orderCount - warehouseStats.nonQueuedOrderCount,
      queuedOrderPct: ((warehouseStats.orderCount - warehouseStats.nonQueuedOrderCount) / warehouseStats.orderCount) * 100,
      throughput: warehouseStats.totalOrderCountOfAllDomains / warehouseStats.availableHours,
      utilization: (warehouseStats.utilizedHours / warehouseStats.availableHours) * 100,
      key: warehouseId,
    };

    if (
      (!selectedDomainType || _.includes(warehouseMap.get(warehouseId)?.domainTypes, selectedDomainType)) &&
      (_.isEmpty(selectedCities) || _.includes(selectedCities, warehouseMap.get(warehouseId)?.city))
    ) {
      formattedData.totals.idleHours += warehouseStats.idleHours;
      formattedData.totals.utilizedHours += warehouseStats.utilizedHours;
      formattedData.totals.busyHours += warehouseStats.busyHours;
      formattedData.totals.availableHours += warehouseStats.availableHours;
      formattedData.distribution.push({ warehouseId, ...warehouseStatsWithAverages });
    }
  });

  formattedData.totals.reachDurationAvg = formattedData.totals.checkoutToReachDuration / 60 / formattedData.totals.orderCount;
  formattedData.totals.reachDurationWithoutQueueAvg =
    formattedData.totals.checkoutToReachDurationNonQueued / 60 / formattedData.totals.nonQueuedOrderCount;
  formattedData.totals.queuedOrderCount = formattedData.totals.orderCount - formattedData.totals.nonQueuedOrderCount;
  formattedData.totals.queuedOrderPct = (formattedData.totals.queuedOrderCount / formattedData.totals.orderCount) * 100;
  // total throughtput calculation is affected by domain type filter
  formattedData.totals.throughput = totalMarketOrderByWarehouse.totalOrderCount / totalMarketOrderByWarehouse.totalUtilizedHours;
  formattedData.totals.utilization = (formattedData.totals.utilizedHours / formattedData.totals.availableHours) * 100;

  return formattedData;
};

const createMap = data => {
  const newMap = new Map();
  data?.forEach(item => newMap.set(item._id, item));

  return newMap;
};

export const getFormattedData = ({ data, warehouses, cities, selectedDomainType, selectedCities }) => {
  if (!data || _.isEmpty(data)) return null;

  const warehouseMap = createMap(warehouses, { field: '_id' });
  const citiesMap = createMap(cities, { field: '_id' });
  const formattedData = formatData({ data, warehouseMap, citiesMap, selectedDomainType, selectedCities });

  return formattedData;
};

export const getWarehouseExportData = warehouseData => {
  const { distribution, totals } = warehouseData;

  if (!distribution) return [];

  const getPercentage = data => (data.missedOrderCount / (data.orderCount + data.missedOrderCount)) * 100;

  const exportData = [];
  distribution.forEach(warehouse => {
    exportData.push({
      ...warehouse,
      orderCount: numberFormat({ maxDecimal: 0 }).format(warehouse.orderCount || 0),
      missedOrderCount: numberFormat({ maxDecimal: 0 }).format(warehouse.missedOrderCount || 0),
      missedOrderRatio: numberFormat({ maxDecimal: 0 }).format(getPercentage(warehouse)),
      reachDurationAvg: numberFormat({ minDecimal: 1, maxDecimal: 1 }).format(warehouse.reachDurationAvg || 0),
      reachDurationWithoutQueueAvg: numberFormat({ minDecimal: 1, maxDecimal: 1 }).format(warehouse.reachDurationWithoutQueueAvg || 0),
      queuedOrderPct: numberFormat({ maxDecimal: 0 }).format(warehouse.queuedOrderPct || 0),
      throughput: numberFormat({ minDecimal: 2, maxDecimal: 2 }).format(warehouse.throughput || 0),
      utilization: numberFormat({ maxDecimal: 0 }).format(warehouse.utilization || 0),
    });
  });

  // Add totals row
  exportData.push({
    ...totals,
    name: t('global:TOTAL'),
    orderCount: numberFormat({ maxDecimal: 0 }).format(totals.orderCount || 0),
    missedOrderCount: numberFormat({ maxDecimal: 0 }).format(totals.missedOrderCount || 0),
    missedOrderRatio: numberFormat({ maxDecimal: 0 }).format(getPercentage(totals)),
    reachDurationAvg: numberFormat({ minDecimal: 1, maxDecimal: 1 }).format(totals.reachDurationAvg || 0),
    reachDurationWithoutQueueAvg: numberFormat({ minDecimal: 1, maxDecimal: 1 }).format(totals.reachDurationWithoutQueueAvg || 0),
    queuedOrderPct: numberFormat({ maxDecimal: 0 }).format(totals.queuedOrderPct || 0),
    throughput: numberFormat({ minDecimal: 2, maxDecimal: 2 }).format(totals.throughput || 0),
    utilization: numberFormat({ maxDecimal: 0 }).format(totals.utilization || 0),
  });

  return exportData;
};

export const WAREHOUSE_TABLE_COLUMNS = () => [
  {
    title: t('global:WAREHOUSE'),
    key: 'name',
    default: '',
  },
  {
    title: t('getirMarketDashboardPage:CITY_SHORT'),
    key: 'city',
    default: '',
  },
  {
    title: t('getirMarketDashboardPage:ORDER_SHORT_FOR_TABLE'),
    key: 'orderCount',
    default: '',
  },
  {
    title: t('getirMarketDashboardPage:MISSED_ORDER_SHORT'),
    key: 'missedOrderCount',
    default: '',
  },
  {
    title: `${t('getirMarketDashboardPage:MISSED_ORDER_SHORT')}%`,
    key: 'missedOrderRatio',
    default: '',
  },
  {
    title: t('getirMarketDashboardPage:REACH_SHORT'),
    key: 'reachDurationAvg',
    default: '',
  },
  {
    title: t('getirMarketDashboardPage:REACH_WITHOUT_QUEUE_SHORT'),
    key: 'reachDurationWithoutQueueAvg',
    default: '',
  },
  {
    title: `${t('getirMarketDashboardPage:QUEUE_SHORT')}%`,
    key: 'queuedOrderPct',
    default: '',
  },
  {
    title: t('getirMarketDashboardPage:THROUGHPUT_SHORT'),
    key: 'throughput',
    default: '',
  },
  {
    title: `${t('getirMarketDashboardPage:UTILIZATION_SHORT')}%`,
    key: 'utilization',
    default: '',
  },
];
