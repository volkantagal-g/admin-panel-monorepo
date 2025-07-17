import { cloneDeep, isEmpty } from 'lodash';

import { t } from '@shared/i18n';
import { numberFormat, percentFormat } from '@shared/utils/localization';
import {
  GETIR_DOMAIN_TYPES,
  GETIR_BITAKSI_DOMAIN_TYPE,
  GETIR_WATER_MARKETPLACE_DOMAIN_TYPE,
  GETIR_FOOD,
  GETIR_LOCALS,
  DAILY_SUMMARY,
  GETIR_MARKET_DOMAIN_TYPE,
  GETIR_FOOD_DOMAIN_TYPE,
  GETIR_10_DOMAIN_TYPE,
  GETIR_VOYAGER_DOMAIN_TYPE,
  GETIR_LOCALS_DOMAIN_TYPE,
} from '@shared/shared/constants';

export const numberFormatter = (num, maxDecimal = 0) => {
  if (!num) return 0;
  return numberFormat({ maxDecimal }).format(num);
};

export const percentFormatter = (num, decimals) => {
  const defaultDecimal = 1;

  return percentFormat({
    minDecimal: decimals?.minDecimal || defaultDecimal,
    maxDecimal: decimals?.maxDecimal || defaultDecimal,
  }).format(num ?? 0);
};

const statsTemplate = {
  orderCount: 0,
  missedOrderCount: 0,
  netRevenue: 0,
};

const getIsInformationTypeOrderOrMissedOrFinancial = informationType => (
  informationType === DAILY_SUMMARY.INFORMATION_TYPE.ORDER_COUNT ||
  informationType === DAILY_SUMMARY.INFORMATION_TYPE.MISSED_ORDER ||
  informationType === DAILY_SUMMARY.INFORMATION_TYPE.ORDER_FINANCIALS
);

const formatState = ({
  dataByWarehouse,
  orderCounts,
  missedOrderCounts,
  netRevenues,
  getirFoodOrderCounts,
  getirFoodMissedOrderCounts,
  getirFoodNetRevenue,
  getirLocalsOrderCounts,
  getirLocalsMissedOrderCounts,
  getirLocalsNetRevenue,
}) => {
  const template = cloneDeep(statsTemplate);
  const state = {
    total: { ...template, cities: {} },
    getir10: {
      ...template,
      cities: {},
    },
    getirFood: {
      ...template,
      restaurantDelivery: { ...template },
      getirDelivery: { ...template },
    },
    getirMore: { ...template, cities: {} },
    getirLocals: {
      ...template,
      storeDelivery: { ...template },
      getirDelivery: { ...template },
    },
    biTaksi: { ...template },
    kuzeyden: { ...template },
    getirWater: { ...template, cities: {} },
    getirWaterMarketplace: { ...template },
  };

  if (!isEmpty(orderCounts)) {
    const {
      [GETIR_BITAKSI_DOMAIN_TYPE]: biTaksiOrderCount = 0,
      [GETIR_WATER_MARKETPLACE_DOMAIN_TYPE]: getirWaterMarketplaceOrderCount = 0,
    } = orderCounts;

    state.biTaksi.orderCount = biTaksiOrderCount;

    state.getirWaterMarketplace.orderCount = getirWaterMarketplaceOrderCount;
    state.total.orderCount += getirWaterMarketplaceOrderCount;
  }

  if (!isEmpty(missedOrderCounts)) {
    const {
      [GETIR_BITAKSI_DOMAIN_TYPE]: biTaksiMissedOrderCount = 0,
      [GETIR_WATER_MARKETPLACE_DOMAIN_TYPE]: getirWaterMarketplaceMissedOrderCount = 0,
    } = missedOrderCounts;

    state.biTaksi.missedOrderCount = biTaksiMissedOrderCount;

    state.getirWaterMarketplace.missedOrderCount = getirWaterMarketplaceMissedOrderCount;
    state.total.missedOrderCount += getirWaterMarketplaceMissedOrderCount;
  }

  if (!isEmpty(netRevenues)) {
    const {
      [GETIR_BITAKSI_DOMAIN_TYPE]: biTaksiNetRevenue = 0,
      [GETIR_WATER_MARKETPLACE_DOMAIN_TYPE]: getirWaterMarketplaceNetRevenue = 0,
    } = netRevenues;

    state.biTaksi.netRevenue = biTaksiNetRevenue;

    state.getirWaterMarketplace.netRevenue = getirWaterMarketplaceNetRevenue;
    state.total.netRevenue += getirWaterMarketplaceNetRevenue;
  }

  if (!isEmpty(getirFoodOrderCounts)) {
    const {
      [GETIR_FOOD.DELIVERY_TYPES.GETIR]: getirDeliveryOrderCount = 0,
      [GETIR_FOOD.DELIVERY_TYPES.RESTAURANT]: restaurantDeliveryOrderCount = 0,
    } = getirFoodOrderCounts;

    state.getirFood.orderCount = getirDeliveryOrderCount + restaurantDeliveryOrderCount;
    state.total.orderCount += state.getirFood.orderCount;
    state.getirFood.getirDelivery.orderCount = getirDeliveryOrderCount;
    state.getirFood.restaurantDelivery.orderCount = restaurantDeliveryOrderCount;
  }

  if (!isEmpty(getirFoodMissedOrderCounts)) {
    const {
      [GETIR_FOOD.DELIVERY_TYPES.GETIR]: getirDeliveryMissedOrderCount = 0,
      [GETIR_FOOD.DELIVERY_TYPES.RESTAURANT]: restaurantDeliveryMissedOrderCount = 0,
    } = getirFoodMissedOrderCounts;

    state.getirFood.missedOrderCount = getirDeliveryMissedOrderCount + restaurantDeliveryMissedOrderCount;
    state.total.missedOrderCount += state.getirFood.missedOrderCount;
    state.getirFood.getirDelivery.missedOrderCount = getirDeliveryMissedOrderCount;
    state.getirFood.restaurantDelivery.missedOrderCount = restaurantDeliveryMissedOrderCount;
  }

  if (!isEmpty(getirFoodNetRevenue)) {
    const {
      [GETIR_FOOD.DELIVERY_TYPES.GETIR]: getirDeliveryNetRevenue = 0,
      [GETIR_FOOD.DELIVERY_TYPES.RESTAURANT]: restaurantDeliveryNetRevenue = 0,
    } = getirFoodNetRevenue;

    state.getirFood.netRevenue = getirDeliveryNetRevenue + restaurantDeliveryNetRevenue;
    state.total.netRevenue += state.getirFood.netRevenue;
    state.getirFood.getirDelivery.netRevenue = getirDeliveryNetRevenue;
    state.getirFood.restaurantDelivery.netRevenue = restaurantDeliveryNetRevenue;
  }

  if (!isEmpty(getirLocalsOrderCounts)) {
    const {
      [GETIR_LOCALS.DELIVERY_TYPES.GETIR]: getirDeliveryOrderCount = 0,
      [GETIR_LOCALS.DELIVERY_TYPES.STORE]: storeDeliveryOrderCount = 0,
    } = getirLocalsOrderCounts;

    state.getirLocals.orderCount = getirDeliveryOrderCount + storeDeliveryOrderCount;
    state.total.orderCount += state.getirLocals.orderCount;
    state.getirLocals.getirDelivery.orderCount = getirDeliveryOrderCount;
    state.getirLocals.storeDelivery.orderCount = storeDeliveryOrderCount;
  }

  if (!isEmpty(getirLocalsMissedOrderCounts)) {
    const {
      [GETIR_LOCALS.DELIVERY_TYPES.GETIR]: getirDeliveryMissedOrderCount = 0,
      [GETIR_LOCALS.DELIVERY_TYPES.STORE]: storeDeliveryMissedOrderCount = 0,
    } = getirLocalsMissedOrderCounts;

    state.getirLocals.missedOrderCount = getirDeliveryMissedOrderCount + storeDeliveryMissedOrderCount;
    state.total.missedOrderCount += state.getirLocals.missedOrderCount;
    state.getirLocals.getirDelivery.missedOrderCount = getirDeliveryMissedOrderCount;
    state.getirLocals.storeDelivery.missedOrderCount = storeDeliveryMissedOrderCount;
  }

  if (!isEmpty(getirLocalsNetRevenue)) {
    const {
      [GETIR_LOCALS.DELIVERY_TYPES.GETIR]: getirDeliveryNetRevenue = 0,
      [GETIR_LOCALS.DELIVERY_TYPES.STORE]: storeDeliveryNetRevenue = 0,
    } = getirLocalsNetRevenue;

    state.getirLocals.netRevenue = getirDeliveryNetRevenue + storeDeliveryNetRevenue;
    state.total.netRevenue += state.getirLocals.netRevenue;
    state.getirLocals.getirDelivery.netRevenue = getirDeliveryNetRevenue;
    state.getirLocals.storeDelivery.netRevenue = storeDeliveryNetRevenue;
  }

  Object.values(dataByWarehouse).forEach(warehouseData => {
    if (!warehouseData?.group) return;

    const { group, value, informationType } = warehouseData;
    // store for missedOrder stats
    const { city, domainType, warehouse, store } = group;
    const { totalOrders = 0, totalMissedOrders = 0, netRevenueTaxExcluded = 0 } = value;
    if (getIsInformationTypeOrderOrMissedOrFinancial(informationType)) {
      state.total.orderCount += totalOrders;
      state.total.missedOrderCount += totalMissedOrders;
      state.total.netRevenue += netRevenueTaxExcluded;
    }

    let domainStats = {};
    if (domainType === GETIR_DOMAIN_TYPES.GETIR10) {
      domainStats = state.getir10;
    }
    else if (domainType === GETIR_DOMAIN_TYPES.MARKET) {
      domainStats = state.getirMore;
    }
    else if (
      domainType === GETIR_DOMAIN_TYPES.VOYAGER &&
      getIsInformationTypeOrderOrMissedOrFinancial(informationType)
    ) {
      domainStats = state.getirWater;
    }
    else if (domainType === GETIR_DOMAIN_TYPES.VOYAGER && informationType === DAILY_SUMMARY.INFORMATION_TYPE.CARBOY_ORDER_COUNT) {
      const { carboySoldCount = 0, missedCarboyOrderCount = 0 } = value;
      state.kuzeyden.orderCount += carboySoldCount;
      state.kuzeyden.missedOrderCount += missedCarboyOrderCount;
      state.kuzeyden.netRevenue += netRevenueTaxExcluded;
      return;
    }
    else {
      return;
    }

    domainStats.orderCount += totalOrders;
    domainStats.missedOrderCount += totalMissedOrders;
    domainStats.netRevenue += netRevenueTaxExcluded;
    if (isEmpty(domainStats.cities[city])) {
      domainStats.cities[city] = {
        ...template,
        warehouses: {},
      };
    }
    domainStats.cities[city].orderCount += totalOrders;
    domainStats.cities[city].missedOrderCount += totalMissedOrders;
    domainStats.cities[city].netRevenue += netRevenueTaxExcluded;

    const warehouseId = warehouse || store;
    if (warehouseId) {
      if (isEmpty(domainStats.cities[city].warehouses[warehouseId])) {
        domainStats.cities[city].warehouses[warehouseId] = { ...template };
      }

      domainStats.cities[city].warehouses[warehouseId].orderCount += totalOrders;
      domainStats.cities[city].warehouses[warehouseId].missedOrderCount += totalMissedOrders;
      domainStats.cities[city].warehouses[warehouseId].netRevenue += netRevenueTaxExcluded;
    }
  });

  return state;
};

const twoRowContainer = (classes, currentDate, previousData) => (
  <div className={classes.twoRowContainer}>
    {numberFormatter(currentDate)}
    <span
      className={[
        currentDate < previousData
          ? classes.textDanger
          : classes.textSuccess,
        classes.textSmall,
      ].join(' ')}
    >
      {percentFormatter(
        (currentDate - previousData) / previousData || 0,
      )}
    </span>
  </div>
);

export const formatDomainSummaryTableData = ({
  current: currentDataByWarehouse,
  previous: previousDataByWarehouse,
  orderCounts,
  missedOrderCounts,
  netRevenues,
  getirFoodOrderCounts,
  getirFoodMissedOrderCounts,
  getirFoodNetRevenue,
  getirLocalsOrderCounts,
  getirLocalsMissedOrderCounts,
  getirLocalsNetRevenue,
  classes,
  availableDomainTypes,
}) => {
  if (!currentDataByWarehouse || !previousDataByWarehouse) return null;

  const current = formatState({
    dataByWarehouse: currentDataByWarehouse,
    orderCounts: orderCounts?.current,
    missedOrderCounts: missedOrderCounts?.current,
    netRevenues: netRevenues?.current,
    getirFoodOrderCounts: getirFoodOrderCounts?.current,
    getirFoodMissedOrderCounts: getirFoodMissedOrderCounts?.current,
    getirFoodNetRevenue: getirFoodNetRevenue?.current,
    getirLocalsOrderCounts: getirLocalsOrderCounts?.current,
    getirLocalsMissedOrderCounts: getirLocalsMissedOrderCounts?.current,
    getirLocalsNetRevenue: getirLocalsNetRevenue?.current,
  });
  const previous = formatState({
    dataByWarehouse: previousDataByWarehouse,
    orderCounts: orderCounts?.previous,
    missedOrderCounts: missedOrderCounts?.previous,
    netRevenues: netRevenues?.previous,
    getirFoodOrderCounts: getirFoodOrderCounts?.previous,
    getirFoodMissedOrderCounts: getirFoodMissedOrderCounts?.previous,
    getirFoodNetRevenue: getirFoodNetRevenue?.previous,
    getirLocalsOrderCounts: getirLocalsOrderCounts?.previous,
    getirLocalsMissedOrderCounts: getirLocalsMissedOrderCounts?.previous,
    getirLocalsNetRevenue: getirLocalsNetRevenue?.previous,
  });

  const byWarehouses = {
    total: {
      current: current.total,
      previous: previous.total,
    },
    [GETIR_DOMAIN_TYPES.GETIR10]: {
      current: { ...current.getir10 },
      previous: { ...previous.getir10 },
    },
    [GETIR_DOMAIN_TYPES.MARKET]: {
      current: { ...current.getirMore },
      previous: { ...previous.getirMore },
    },
    [GETIR_DOMAIN_TYPES.VOYAGER]: {
      current: { ...current.getirWater },
      previous: { ...previous.getirWater },
    },
  };

  const domainSummaryTableData = [
    {
      key: 'TOTAL',
      rowName: t('global:TOTAL'),
      order: twoRowContainer(classes, current.total.orderCount, previous.total.orderCount),
      orderRatio: null,
      missedOrder: twoRowContainer(classes, current.total.missedOrderCount, previous.total.missedOrderCount),
      missedOrderRatio: percentFormatter(
        current.total.missedOrderCount / current.total.orderCount || 0,
      ),
      vatIncludedRevenue: twoRowContainer(classes, current.total.netRevenue, previous.total.netRevenue),
      vatIncludedRevenueRatio: null,
      netRevenuePerOrder: numberFormatter(current.total.netRevenue / current.total.orderCount || 0),
    },
    {
      key: 'GETIR10-TOTAL',
      rowName: t(`global:GETIR_MARKET_DOMAIN_TYPES:${GETIR_DOMAIN_TYPES.GETIR10}`),
      order: twoRowContainer(classes, current.getir10.orderCount, previous.getir10.orderCount),
      orderRatio: percentFormatter(current.getir10.orderCount / current.total.orderCount || 0),
      missedOrder: twoRowContainer(classes, current.getir10.missedOrderCount, previous.getir10.missedOrderCount),
      missedOrderRatio: percentFormatter(
        current.getir10.missedOrderCount / current.getir10.orderCount || 0,
      ),
      vatIncludedRevenue: twoRowContainer(classes, current.getir10.netRevenue, previous.getir10.netRevenue),
      vatIncludedRevenueRatio: percentFormatter(
        current.getir10.netRevenue / current.total.netRevenue || 0,
      ),
      vatExcludedRevenueRatioTooltip: t('growthDashboard:RATIO_OF_TOTAL_REVENUE'),
      domainType: GETIR_10_DOMAIN_TYPE,
      netRevenuePerOrder: numberFormatter(current.getir10.netRevenue / current.getir10.orderCount || 0),
    },
    {
      key: 'GETIR30',
      rowName: t(`global:GETIR_MARKET_DOMAIN_TYPES:${GETIR_DOMAIN_TYPES.MARKET}`),
      order: twoRowContainer(classes, current.getirMore.orderCount, previous.getirMore.orderCount),
      orderRatio: percentFormatter(current.getirMore.orderCount / current.total.orderCount || 0),
      missedOrder: twoRowContainer(classes, current.getirMore.missedOrderCount, previous.getirMore.missedOrderCount),
      missedOrderRatio: percentFormatter(
        current.getirMore.missedOrderCount / current.getirMore.orderCount || 0,
      ),
      vatIncludedRevenue: twoRowContainer(classes, current.getirMore.netRevenue, previous.getirMore.netRevenue),
      vatIncludedRevenueRatio: percentFormatter(
        current.getirMore.netRevenue / current.total.netRevenue || 0,
      ),
      vatExcludedRevenueRatioTooltip: t('growthDashboard:RATIO_OF_TOTAL_REVENUE'),
      domainType: GETIR_MARKET_DOMAIN_TYPE,
      netRevenuePerOrder: numberFormatter(current.getirMore.netRevenue / current.getirMore.orderCount || 0),
    },
    {
      key: 'GETIRFOOD-TOTAL',
      rowName: t(`global:GETIR_MARKET_DOMAIN_TYPES:${GETIR_DOMAIN_TYPES.FOOD}`),
      order: twoRowContainer(classes, current.getirFood.orderCount, previous.getirFood.orderCount),
      orderRatio: percentFormatter(current.getirFood.orderCount / current.total.orderCount || 0),
      missedOrder: twoRowContainer(classes, current.getirFood.missedOrderCount, previous.getirFood.missedOrderCount),
      missedOrderRatio: percentFormatter(
        current.getirFood.missedOrderCount / current.getirFood.orderCount || 0,
      ),
      vatIncludedRevenue: twoRowContainer(classes, current.getirFood.netRevenue, previous.getirFood.netRevenue),
      vatIncludedRevenueRatio: percentFormatter(
        current.getirFood.netRevenue / current.total.netRevenue || 0,
      ),
      vatExcludedRevenueRatioTooltip: t('growthDashboard:RATIO_OF_TOTAL_REVENUE'),
      domainType: GETIR_FOOD_DOMAIN_TYPE,
      netRevenuePerOrder: numberFormatter(current.getirFood.netRevenue / current.getirFood.orderCount || 0),
    },
    {
      key: 'GETIRFOOD-RESTAURANT_DELIVERY',
      rowName: t('growthDashboard:GF_RESTAURANT_DELIVERY'),
      order: twoRowContainer(classes, current.getirFood.restaurantDelivery.orderCount, previous.getirFood.restaurantDelivery.orderCount),
      orderRatio: percentFormatter(
        current.getirFood.restaurantDelivery.orderCount / current.getirFood.orderCount || 0,
      ),
      missedOrder: '-',
      missedOrderRatio: '-',
      vatIncludedRevenue: twoRowContainer(classes, current.getirFood.restaurantDelivery.netRevenue, previous.getirFood.restaurantDelivery.netRevenue),
      vatIncludedRevenueRatio: percentFormatter(
        current.getirFood.restaurantDelivery.netRevenue / current.getirFood.netRevenue || 0,
      ),
      vatExcludedRevenueRatioTooltip: t('growthDashboard:RATIO_OF_DOMAIN_REVENUE', { domainName: t('global:GETIR_FOOD') }),
      domainType: GETIR_FOOD_DOMAIN_TYPE,
      netRevenuePerOrder: numberFormatter(current.getirFood.restaurantDelivery.netRevenue / current.getirFood.restaurantDelivery.orderCount || 0),
    },
    {
      key: 'GETIRFOOD-GETIR_DELIVERY',
      rowName: t('growthDashboard:GF_GETIR_DELIVERY'),
      order: twoRowContainer(classes, current.getirFood.getirDelivery.orderCount, previous.getirFood.getirDelivery.orderCount),
      orderRatio: percentFormatter(
        current.getirFood.getirDelivery.orderCount / current.getirFood.orderCount || 0,
      ),
      missedOrder: twoRowContainer(classes, current.getirFood.getirDelivery.missedOrderCount, previous.getirFood.getirDelivery.missedOrderCount),
      missedOrderRatio: percentFormatter(
        current.getirFood.getirDelivery.missedOrderCount /
        current.getirFood.getirDelivery.orderCount || 0,
      ),
      vatIncludedRevenue: twoRowContainer(classes, current.getirFood.getirDelivery.netRevenue, previous.getirFood.getirDelivery.netRevenue),
      vatIncludedRevenueRatio: percentFormatter(
        current.getirFood.getirDelivery.netRevenue / current.getirFood.netRevenue || 0,
      ),
      vatExcludedRevenueRatioTooltip: t('growthDashboard:RATIO_OF_DOMAIN_REVENUE', { domainName: t('global:GETIR_FOOD') }),
      domainType: GETIR_FOOD_DOMAIN_TYPE,
      netRevenuePerOrder: numberFormatter(current.getirFood.getirDelivery.netRevenue / current.getirFood.getirDelivery.orderCount || 0),
    },
    {
      key: 'GETIRWATER',
      rowName: t(`global:GETIR_MARKET_DOMAIN_TYPES:${GETIR_DOMAIN_TYPES.VOYAGER}`),
      order: twoRowContainer(classes, current.getirWater.orderCount, previous.getirWater.orderCount),
      orderRatio: percentFormatter(current.getirWater.orderCount / current.total.orderCount || 0),
      missedOrder: twoRowContainer(classes, current.getirWater.missedOrderCount, previous.getirWater.missedOrderCount),
      missedOrderRatio: percentFormatter(
        current.getirWater.missedOrderCount / current.getirWater.orderCount || 0,
      ),
      vatIncludedRevenue: twoRowContainer(classes, current.getirWater.netRevenue, previous.getirWater.netRevenue),
      vatIncludedRevenueRatio: percentFormatter(
        current.getirWater.netRevenue / current.total.netRevenue || 0,
      ),
      vatExcludedRevenueRatioTooltip: t('growthDashboard:RATIO_OF_TOTAL_REVENUE'),
      domainType: GETIR_VOYAGER_DOMAIN_TYPE,
      netRevenuePerOrder: numberFormatter(current.getirWater.netRevenue / current.getirWater.orderCount || 0),
    },
    {
      key: 'KUZEYDEN',
      rowName: t('global:KUZEYDEN'),
      order: twoRowContainer(classes, current.kuzeyden.orderCount, previous.kuzeyden.orderCount),
      orderRatio: percentFormatter(current.kuzeyden.orderCount / current.total.orderCount || 0),
      missedOrder: twoRowContainer(classes, current.kuzeyden.missedOrderCount, previous.kuzeyden.missedOrderCount),
      missedOrderRatio: '-',
      vatIncludedRevenue: twoRowContainer(classes, current.kuzeyden.netRevenue, previous.kuzeyden.netRevenue),
      vatIncludedRevenueRatio: percentFormatter(
        current.kuzeyden.netRevenue / current.total.netRevenue || 0,
      ),
      domainType: GETIR_WATER_MARKETPLACE_DOMAIN_TYPE,
      netRevenuePerOrder: numberFormatter(current.kuzeyden.netRevenue / current.kuzeyden.orderCount || 0),
    },
    {
      key: 'GETIRWATER_MARKETPLACE',
      rowName: t('growthDashboard:GETIR_WATER_MARKETPLACE_SHORT'),
      order: twoRowContainer(classes, current.getirWaterMarketplace.orderCount, previous.getirWaterMarketplace.orderCount),
      orderRatio: percentFormatter(
        current.getirWaterMarketplace.orderCount / current.total.orderCount || 0,
      ),
      missedOrder: twoRowContainer(classes, current.getirWaterMarketplace.missedOrderCount, previous.getirWaterMarketplace.missedOrderCount),
      missedOrderRatio: percentFormatter(
        current.getirWaterMarketplace.missedOrderCount / current.getirWaterMarketplace.orderCount ||
        0,
      ),
      vatIncludedRevenue: twoRowContainer(classes, current.getirWaterMarketplace.netRevenue, previous.getirWaterMarketplace.netRevenue),
      vatIncludedRevenueRatio: percentFormatter(
        current.getirWaterMarketplace.netRevenue / current.total.netRevenue || 0,
      ),
      vatExcludedRevenueRatioTooltip: t('growthDashboard:RATIO_OF_TOTAL_REVENUE'),
      domainType: GETIR_WATER_MARKETPLACE_DOMAIN_TYPE,
      netRevenuePerOrder: numberFormatter(current.getirWaterMarketplace.netRevenue / current.getirWaterMarketplace.orderCount || 0),
    },
    {
      key: 'GETIRLOCALS-TOTAL',
      rowName: t(`global:GETIR_MARKET_DOMAIN_TYPES:${GETIR_DOMAIN_TYPES.LOCALS}`),
      order: twoRowContainer(classes, current.getirLocals.orderCount, previous.getirLocals.orderCount),
      orderRatio: percentFormatter(current.getirLocals.orderCount / current.total.orderCount || 0),
      missedOrder: twoRowContainer(classes, current.getirLocals.missedOrderCount, previous.getirLocals.missedOrderCount),
      missedOrderRatio: percentFormatter(
        current.getirLocals.missedOrderCount / current.getirLocals.orderCount || 0,
      ),
      vatIncludedRevenue: twoRowContainer(classes, current.getirLocals.netRevenue, previous.getirLocals.netRevenue),
      vatIncludedRevenueRatio: percentFormatter(
        current.getirLocals.netRevenue / current.total.netRevenue || 0,
      ),
      vatExcludedRevenueRatioTooltip: t('growthDashboard:RATIO_OF_TOTAL_REVENUE'),
      domainType: GETIR_LOCALS_DOMAIN_TYPE,
      netRevenuePerOrder: numberFormatter(current.getirLocals.netRevenue / current.getirLocals.orderCount || 0),
    },
    {
      key: 'GETIRLOCALS-STORE_DELIVERY',
      rowName: t('growthDashboard:GETIR_LOCALS_STORE_DELIVERY'),
      order: twoRowContainer(classes, current.getirLocals.storeDelivery.orderCount, previous.getirLocals.storeDelivery.orderCount),
      orderRatio: percentFormatter(
        current.getirLocals.storeDelivery.orderCount / current.getirLocals.orderCount || 0,
      ),
      missedOrder: '-',
      missedOrderRatio: '-',
      vatIncludedRevenue: twoRowContainer(classes, current.getirLocals.storeDelivery.netRevenue, previous.getirLocals.storeDelivery.netRevenue),
      vatIncludedRevenueRatio: percentFormatter(
        current.getirLocals.storeDelivery.netRevenue / current.getirLocals.netRevenue || 0,
      ),
      vatExcludedRevenueRatioTooltip: t('growthDashboard:RATIO_OF_DOMAIN_REVENUE', { domainName: t('GETIR_LOCALS') }),
      domainType: GETIR_LOCALS_DOMAIN_TYPE,
      netRevenuePerOrder: numberFormatter(current.getirLocals.storeDelivery.netRevenue / current.getirLocals.storeDelivery.orderCount || 0),
    },
    {
      key: 'GETIRLOCALS-GETIR_DELIVERY',
      rowName: t('growthDashboard:GETIR_LOCALS_GETIR_DELIVERY'),
      order: twoRowContainer(classes, current.getirLocals.getirDelivery.orderCount, previous.getirLocals.getirDelivery.orderCount),
      orderRatio: percentFormatter(
        current.getirLocals.getirDelivery.orderCount / current.getirLocals.orderCount || 0,
      ),
      missedOrder: twoRowContainer(classes, current.getirLocals.getirDelivery.missedOrderCount, previous.getirLocals.getirDelivery.missedOrderCount),
      missedOrderRatio: percentFormatter(
        current.getirLocals.getirDelivery.missedOrderCount /
        current.getirLocals.getirDelivery.orderCount || 0,
      ),
      vatIncludedRevenue: twoRowContainer(classes, current.getirLocals.getirDelivery.netRevenue, previous.getirLocals.getirDelivery.netRevenue),
      vatIncludedRevenueRatio: percentFormatter(
        current.getirLocals.getirDelivery.netRevenue / current.getirLocals.netRevenue || 0,
      ),
      vatExcludedRevenueRatioTooltip: t('growthDashboard:RATIO_OF_DOMAIN_REVENUE', { domainName: t('GETIR_LOCALS') }),
      domainType: GETIR_LOCALS_DOMAIN_TYPE,
      netRevenuePerOrder: numberFormatter(current.getirLocals.getirDelivery.netRevenue / current.getirLocals.getirDelivery.orderCount || 0),
    },
    {
      key: 'GETIRBITAKSI',
      rowName: t('global:GETIR_DRIVE_EXTERNAL_SOURCE:BITAKSI'),
      order: twoRowContainer(classes, current.biTaksi.orderCount, previous.biTaksi.orderCount),
      orderRatio: percentFormatter(current.biTaksi.orderCount / current.total.orderCount || 0),
      missedOrder: twoRowContainer(classes, current.biTaksi.missedOrderCount, previous.biTaksi.missedOrderCount),
      missedOrderRatio: percentFormatter(
        current.biTaksi.missedOrderCount / current.biTaksi.orderCount || 0,
      ),
      missedOrderRatioTooltip: t('growthDashboard:GETIR_BITAKSI_MISSED_ORDER_RATIO_TOOLTIP'),
      vatIncludedRevenue: twoRowContainer(classes, current.biTaksi.netRevenue, previous.biTaksi.netRevenue),
      vatIncludedRevenueRatio: percentFormatter(
        current.biTaksi.netRevenue / current.total.netRevenue || 0,
      ),
      vatExcludedRevenueRatioTooltip: t('growthDashboard:RATIO_OF_TOTAL_REVENUE'),
      domainType: GETIR_BITAKSI_DOMAIN_TYPE,
      netRevenuePerOrder: numberFormatter(current.biTaksi.netRevenue / current.biTaksi.orderCount || 0),
    },
  ];

  let filteredDomainSummaryTableData = [];
  if (!isEmpty(availableDomainTypes)) {
    filteredDomainSummaryTableData = domainSummaryTableData.filter(item => {
      if ('domainType' in item && !availableDomainTypes?.includes(item.domainType)) return null;

      return item;
    });
  }

  return {
    domainSummaryTableData: filteredDomainSummaryTableData || domainSummaryTableData,
    byWarehouses,
  };
};
