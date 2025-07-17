import { cloneDeep, get } from 'lodash';

import {
  GETIR_10_DOMAIN_TYPE,
  GETIR_FOOD_DOMAIN_TYPE,
  GETIR_LOCALS_DOMAIN_TYPE,
  GETIR_MARKET_DOMAIN_TYPE,
  GETIR_BITAKSI_DOMAIN_TYPE,
  GETIR_VOYAGER_DOMAIN_TYPE,
  GETIR_WATER_MARKETPLACE_DOMAIN_TYPE,
} from '@shared/shared/constants';
import { numberFormat } from '@shared/utils/localization';

const getClassNameForGrowth = growth => (growth >= 0 ? 'pos' : 'neg');

const getShortFinancial = value => {
  const dividedValue = value >= 1_000_000 ? value / 1_000_000 : value / 1_000;
  return numberFormat({ maxDecimal: 2 }).format(dividedValue);
};

export const getOrderStatsRows = (dimenison, t) => [
  // 1st ROW
  [
    {
      className: () => 'financialColor financialCell',
      tooltip: `${t('getirMarketLiveMapPage:TOTAL_REVENUE')} (${t('global:TODAY')})`,
      field: `previousOrderCountsAndFinancial.${dimenison}.total.financial.today.totalNetRevenueTaxExcluded`,
      // hideAllColumn: true => when a cell of the first row invisible, rest of the column should also be invisible
      visibility: { field: 'showFinancials', hideAllColumn: true },
      render: value => getShortFinancial(value),
    },
    // when there is no render or children, that cell is empty ( but can be visible)
    { className: () => 'right-border', visibility: { field: 'showFinancials', hideAllColumn: true } },
    {
      className: () => 'g10Color orderCountCell',
      tooltip: `${t(`global:GETIR_MARKET_DOMAIN_TYPES:${GETIR_10_DOMAIN_TYPE}`)} ${t('getirMarketLiveMapPage:ORDER_COUNT')}` +
      ` ${t('getirMarketLiveMapPage:TODAY_INCLUDES_INTEGRATION_ORDERS')}`,
      field: `previousOrderCountsAndFinancial.${dimenison}.${GETIR_10_DOMAIN_TYPE}.orderCounts.today.total`,
      visibility: { field: 'getir10', hideAllColumn: true },
      render: value => value,
    },
    { className: () => 'right-border', visibility: { field: 'getir10', hideAllColumn: true } },
    {
      className: () => 'foodColor orderCountCell',
      tooltip: `${t(`global:GETIR_MARKET_DOMAIN_TYPES:${GETIR_FOOD_DOMAIN_TYPE}`)} ${t('getirMarketLiveMapPage:ORDER_COUNT')}  (${t(
        'global:TODAY',
      )})`,
      field: `previousOrderCountsAndFinancial.${dimenison}.${GETIR_FOOD_DOMAIN_TYPE}.orderCounts.today.total`,
      visibility: { field: 'getirFood', hideAllColumn: true },
      render: value => value,
    },
    { className: () => 'right-border', visibility: { field: 'getirFood', hideAllColumn: true } },
    {
      className: () => 'g30Color orderCountCell',
      tooltip: `${t(`global:GETIR_MARKET_DOMAIN_TYPES:${GETIR_MARKET_DOMAIN_TYPE}`)} ${t('getirMarketLiveMapPage:ORDER_COUNT')}  (${t(
        'global:TODAY',
      )})`,
      field: `previousOrderCountsAndFinancial.${dimenison}.${GETIR_MARKET_DOMAIN_TYPE}.orderCounts.today.total`,
      visibility: { field: 'getir30', hideAllColumn: true },
      render: value => value,
    },
    { className: () => 'right-border', visibility: { field: 'getir30', hideAllColumn: true } },
    {
      className: () => 'kuzeydenColor orderCountCell',
      tooltip: `${t('getirMarketLiveMapPage:KUZEYDEN_CARBOY_SOLD_COUNT')} (${t('global:TODAY')})`,
      field: `kuzeydenOrderCounts.${dimenison}.todayCarboy`,
      visibility: { field: 'kuzeydenCarboy', hideAllColumn: true },
      render: value => value,
    },
    { className: () => 'right-border', visibility: { field: 'kuzeydenCarboy', hideAllColumn: true } },
    {
      className: () => 'gWaterMarketplaceColor orderCountCell',
      tooltip: `${t(`global:GETIR_MARKET_DOMAIN_TYPES:${GETIR_WATER_MARKETPLACE_DOMAIN_TYPE}`)} ${t('getirMarketLiveMapPage:ORDER_COUNT')}  (${t(
        'global:TODAY',
      )})`,
      field: `previousOrderCountsAndFinancial.${dimenison}.${GETIR_WATER_MARKETPLACE_DOMAIN_TYPE}.orderCounts.today.total`,
      visibility: { field: 'getirWaterMarketplace', hideAllColumn: true },
      render: value => value,
    },
    { className: () => 'right-border', visibility: { field: 'getirBiTaksi', hideAllColumn: true } },
    {
      className: () => 'localsColor orderCountCell',
      tooltip: `${t(`global:GETIR_MARKET_DOMAIN_TYPES:${GETIR_LOCALS_DOMAIN_TYPE}`)} ${t('getirMarketLiveMapPage:ORDER_COUNT')}  (${t(
        'global:TODAY',
      )})`,
      field: `previousOrderCountsAndFinancial.${dimenison}.${GETIR_LOCALS_DOMAIN_TYPE}.orderCounts.today.total`,
      visibility: { field: 'getirLocals', hideAllColumn: true },
      render: value => value,
    },
    { className: () => 'right-border', visibility: { field: 'getirLocals', hideAllColumn: true } },
    {
      className: () => 'g30Color orderCountCell',
      tooltip: `${t(`global:GETIR_MARKET_DOMAIN_TYPES:${GETIR_BITAKSI_DOMAIN_TYPE}`)} ${t('getirMarketLiveMapPage:TRIP_COUNT')} (${t('global:TODAY')})`,
      field: `previousOrderCountsAndFinancial.${dimenison}.${GETIR_BITAKSI_DOMAIN_TYPE}.orderCounts.today.total`,
      visibility: { field: 'getirWaterMarketplace', hideAllColumn: true },
      render: value => value,
    },
    { className: () => 'right-border', visibility: { field: 'getirBiTaksi', hideAllColumn: true } },
  ],
  // 2nd ROW
  [
    {
      className: () => 'financialColor',
      tooltip: `${t('getirMarketLiveMapPage:TOTAL_REVENUE')} (${t('global:YESTERDAY')})`,
      field: `previousOrderCountsAndFinancial.${dimenison}.total.financial.yesterday.totalNetRevenueTaxExcluded`,
      render: value => getShortFinancial(value),
    },
    {
      className: value => `${getClassNameForGrowth(value)} financialGrowthCell right-border`,
      tooltip: `${t('getirMarketLiveMapPage:TOTAL_REVENUE_GROWTH')}% (${t('getirMarketLiveMapPage:TODAY_VS_YESTERDAY')})`,
      field: `previousOrderCountsAndFinancial.${dimenison}.total.financial.yesterday.totalNetRevenueTaxExcludedGrowthComparedToToday`,
      render: value => value.toFixed(0),
    },
    {
      className: () => 'g10Color',
      tooltip: `${t(`global:GETIR_MARKET_DOMAIN_TYPES:${GETIR_10_DOMAIN_TYPE}`)} ${t('getirMarketLiveMapPage:ORDER_COUNT')}  ${t(
        'getirMarketLiveMapPage:YESTERDAY_INCLUDES_INTEGRATION_ORDERS',
      )}`,
      field: `previousOrderCountsAndFinancial.${dimenison}.${GETIR_10_DOMAIN_TYPE}.orderCounts.yesterday.total`,
      render: value => value,
    },
    {
      className: value => `${getClassNameForGrowth(value)} orderGrowthCell right-border`,
      tooltip: `${t(`global:GETIR_MARKET_DOMAIN_TYPES:${GETIR_10_DOMAIN_TYPE}`)} ${t('getirMarketLiveMapPage:ORDER_COUNT_GROWTH')}% (${t(
        'getirMarketLiveMapPage:TODAY_VS_YESTERDAY',
      )})`,
      field: `previousOrderCountsAndFinancial.${dimenison}.${GETIR_10_DOMAIN_TYPE}.orderCounts.yesterday.totalGrowthComparedToToday`,
      render: value => value.toFixed(0),
    },
    {
      className: () => 'foodColor',
      tooltip: `${t(`global:GETIR_MARKET_DOMAIN_TYPES:${GETIR_FOOD_DOMAIN_TYPE}`)} ${t('getirMarketLiveMapPage:ORDER_COUNT')}  (${t(
        'global:YESTERDAY',
      )})`,
      field: `previousOrderCountsAndFinancial.${dimenison}.${GETIR_FOOD_DOMAIN_TYPE}.orderCounts.yesterday.total`,
      render: value => value,
    },
    {
      className: value => `${getClassNameForGrowth(value)} orderGrowthCell right-border`,
      tooltip: `${t(`global:GETIR_MARKET_DOMAIN_TYPES:${GETIR_FOOD_DOMAIN_TYPE}`)} ${t('getirMarketLiveMapPage:ORDER_COUNT_GROWTH')}% (${t(
        'getirMarketLiveMapPage:TODAY_VS_YESTERDAY',
      )})`,
      field: `previousOrderCountsAndFinancial.${dimenison}.${GETIR_FOOD_DOMAIN_TYPE}.orderCounts.yesterday.totalGrowthComparedToToday`,
      render: value => value.toFixed(0),
    },
    {
      className: () => 'g30Color',
      tooltip: `${t(`global:GETIR_MARKET_DOMAIN_TYPES:${GETIR_MARKET_DOMAIN_TYPE}`)} ${t('getirMarketLiveMapPage:ORDER_COUNT')}  (${t(
        'global:YESTERDAY',
      )})`,
      field: `previousOrderCountsAndFinancial.${dimenison}.${GETIR_MARKET_DOMAIN_TYPE}.orderCounts.yesterday.total`,
      render: value => value,
    },
    {
      className: value => `${getClassNameForGrowth(value)} orderGrowthCell right-border`,
      tooltip: `${t(`global:GETIR_MARKET_DOMAIN_TYPES:${GETIR_MARKET_DOMAIN_TYPE}`)} ${t(
        'getirMarketLiveMapPage:ORDER_COUNT_GROWTH',
      )}% (${t('getirMarketLiveMapPage:TODAY_VS_YESTERDAY')})`,
      field: `previousOrderCountsAndFinancial.${dimenison}.${GETIR_MARKET_DOMAIN_TYPE}.orderCounts.yesterday.totalGrowthComparedToToday`,
      render: value => value.toFixed(0),
    },
    {
      className: () => 'kuzeydenColor',
      tooltip: `${t('getirMarketLiveMapPage:KUZEYDEN_CARBOY_SOLD_COUNT')} (${t('global:YESTERDAY')})`,
      field: `kuzeydenOrderCounts.${dimenison}.yesterdayCarboy`,
      render: value => value,
    },
    {
      className: value => `${getClassNameForGrowth(value)} orderGrowthCell right-border`,
      tooltip: `${t('getirMarketLiveMapPage:KUZEYDEN_CARBOY_SOLD_GROWTH_COUNT')} (${t('getirMarketLiveMapPage:TODAY_VS_YESTERDAY')})`,
      field: `kuzeydenOrderCounts.${dimenison}.yesterdayTotalGrowthComparedToToday`,
      render: value => value.toFixed(0),
    },
    {
      className: () => 'gWaterMarketplaceColor',
      tooltip: `${t(`global:GETIR_MARKET_DOMAIN_TYPES:${GETIR_WATER_MARKETPLACE_DOMAIN_TYPE}`)} ${t('getirMarketLiveMapPage:ORDER_COUNT')}  (${t(
        'global:YESTERDAY',
      )})`,
      field: `previousOrderCountsAndFinancial.${dimenison}.${GETIR_WATER_MARKETPLACE_DOMAIN_TYPE}.orderCounts.yesterday.total`,
      render: value => value,
    },
    {
      className: value => `${getClassNameForGrowth(value)} orderGrowthCell right-border`,
      tooltip: `${t(`global:GETIR_MARKET_DOMAIN_TYPES:${GETIR_WATER_MARKETPLACE_DOMAIN_TYPE}`)} ${t(
        'getirMarketLiveMapPage:ORDER_COUNT_GROWTH',
      )}% (${t('getirMarketLiveMapPage:TODAY_VS_YESTERDAY')})`,
      field: `previousOrderCountsAndFinancial.${dimenison}.${GETIR_WATER_MARKETPLACE_DOMAIN_TYPE}.orderCounts.yesterday.totalGrowthComparedToToday`,
      render: value => value.toFixed(0),
    },
    {
      className: () => 'localsColor',
      tooltip: `${t(`global:GETIR_MARKET_DOMAIN_TYPES:${GETIR_LOCALS_DOMAIN_TYPE}`)} ${t('getirMarketLiveMapPage:ORDER_COUNT')}  (${t(
        'global:YESTERDAY',
      )})`,
      field: `previousOrderCountsAndFinancial.${dimenison}.${GETIR_LOCALS_DOMAIN_TYPE}.orderCounts.yesterday.total`,
      render: value => value,
    },
    {
      className: value => `${getClassNameForGrowth(value)} orderGrowthCell right-border`,
      tooltip: `${t(`global:GETIR_MARKET_DOMAIN_TYPES:${GETIR_LOCALS_DOMAIN_TYPE}`)} ${t(
        'getirMarketLiveMapPage:ORDER_COUNT_GROWTH',
      )}% (${t('getirMarketLiveMapPage:TODAY_VS_YESTERDAY')})`,
      field: `previousOrderCountsAndFinancial.${dimenison}.${GETIR_LOCALS_DOMAIN_TYPE}.orderCounts.yesterday.totalGrowthComparedToToday`,
      render: value => value.toFixed(0),
    },
    {
      className: () => 'g30Color',
      tooltip: `${t(`global:GETIR_MARKET_DOMAIN_TYPES:${GETIR_BITAKSI_DOMAIN_TYPE}`)} ${t('getirMarketLiveMapPage:TRIP_COUNT')}  (${t(
        'global:YESTERDAY',
      )})`,
      field: `previousOrderCountsAndFinancial.${dimenison}.${GETIR_BITAKSI_DOMAIN_TYPE}.orderCounts.yesterday.total`,
      render: value => value,
    },
    {
      className: value => `${getClassNameForGrowth(value)} orderGrowthCell right-border`,
      tooltip: `${t(`global:GETIR_MARKET_DOMAIN_TYPES:${GETIR_BITAKSI_DOMAIN_TYPE}`)} ${t(
        'getirMarketLiveMapPage:TRIP_COUNT_GROWTH',
      )}% (${t('getirMarketLiveMapPage:TODAY_VS_YESTERDAY')})`,
      field: `previousOrderCountsAndFinancial.${dimenison}.${GETIR_BITAKSI_DOMAIN_TYPE}.orderCounts.yesterday.totalGrowthComparedToToday`,
      render: value => value.toFixed(0),
    },
  ],
  // 3rd ROW
  [
    {
      className: () => 'financialColor',
      tooltip: `${t('getirMarketLiveMapPage:TOTAL_REVENUE')} (${t('global:LAST_WEEK')})`,
      field: `previousOrderCountsAndFinancial.${dimenison}.total.financial.lastWeek.totalNetRevenueTaxExcluded`,
      render: value => getShortFinancial(value),
    },
    {
      className: value => `${getClassNameForGrowth(value)} financialGrowthCell right-border`,
      tooltip: `${t('getirMarketLiveMapPage:TOTAL_REVENUE_GROWTH')}% (${t('getirMarketLiveMapPage:TODAY_VS_LAST_WEEK')})`,
      field: `previousOrderCountsAndFinancial.${dimenison}.total.financial.lastWeek.totalNetRevenueTaxExcludedGrowthComparedToToday`,
      render: value => value.toFixed(0),
    },
    {
      className: () => 'g10Color',
      tooltip: `${t(`global:GETIR_MARKET_DOMAIN_TYPES:${GETIR_10_DOMAIN_TYPE}`)} ${t('getirMarketLiveMapPage:ORDER_COUNT')}  ${t(
        'getirMarketLiveMapPage:LAST_WEEK_INCLUDES_INTEGRATION_ORDERS',
      )}`,
      field: `previousOrderCountsAndFinancial.${dimenison}.${GETIR_10_DOMAIN_TYPE}.orderCounts.lastWeek.total`,
      render: value => value,
    },
    {
      className: value => `${getClassNameForGrowth(value)} orderGrowthCell right-border`,
      tooltip: `${t(`global:GETIR_MARKET_DOMAIN_TYPES:${GETIR_10_DOMAIN_TYPE}`)} ${t('getirMarketLiveMapPage:ORDER_COUNT_GROWTH')}% (${t(
        'getirMarketLiveMapPage:TODAY_VS_LAST_WEEK',
      )})`,
      field: `previousOrderCountsAndFinancial.${dimenison}.${GETIR_10_DOMAIN_TYPE}.orderCounts.lastWeek.totalGrowthComparedToToday`,
      render: value => value.toFixed(0),
    },
    {
      className: () => 'foodColor',
      tooltip: `${t(`global:GETIR_MARKET_DOMAIN_TYPES:${GETIR_FOOD_DOMAIN_TYPE}`)} ${t('getirMarketLiveMapPage:ORDER_COUNT')}  (${t(
        'global:LAST_WEEK',
      )})`,
      field: `previousOrderCountsAndFinancial.${dimenison}.${GETIR_FOOD_DOMAIN_TYPE}.orderCounts.lastWeek.total`,
      render: value => value,
    },
    {
      className: value => `${getClassNameForGrowth(value)} orderGrowthCell right-border`,
      tooltip: `${t(`global:GETIR_MARKET_DOMAIN_TYPES:${GETIR_FOOD_DOMAIN_TYPE}`)} ${t('getirMarketLiveMapPage:ORDER_COUNT_GROWTH')}% (${t(
        'getirMarketLiveMapPage:TODAY_VS_LAST_WEEK',
      )})`,
      field: `previousOrderCountsAndFinancial.${dimenison}.${GETIR_FOOD_DOMAIN_TYPE}.orderCounts.lastWeek.totalGrowthComparedToToday`,
      render: value => value.toFixed(0),
    },
    {
      className: () => 'g30Color',
      tooltip: `${t(`global:GETIR_MARKET_DOMAIN_TYPES:${GETIR_MARKET_DOMAIN_TYPE}`)} ${t('getirMarketLiveMapPage:ORDER_COUNT')}  (${t(
        'global:LAST_WEEK',
      )})`,
      field: `previousOrderCountsAndFinancial.${dimenison}.${GETIR_MARKET_DOMAIN_TYPE}.orderCounts.lastWeek.total`,
      render: value => value,
    },
    {
      className: value => `${getClassNameForGrowth(value)} orderGrowthCell right-border`,
      tooltip: `${t(`global:GETIR_MARKET_DOMAIN_TYPES:${GETIR_MARKET_DOMAIN_TYPE}`)} ${t(
        'getirMarketLiveMapPage:ORDER_COUNT_GROWTH',
      )}% (${t('getirMarketLiveMapPage:TODAY_VS_LAST_WEEK')})`,
      field: `previousOrderCountsAndFinancial.${dimenison}.${GETIR_MARKET_DOMAIN_TYPE}.orderCounts.lastWeek.totalGrowthComparedToToday`,
      render: value => value.toFixed(0),
    },
    {
      className: () => 'kuzeydenColor',
      tooltip: `${t('getirMarketLiveMapPage:KUZEYDEN_CARBOY_SOLD_COUNT')} (${t('global:LAST_WEEK')})`,
      field: `kuzeydenOrderCounts.${dimenison}.lastWeekCarboy`,
      render: value => value,
    },
    {
      className: value => `${getClassNameForGrowth(value)} orderGrowthCell right-border`,
      tooltip: `${t('getirMarketLiveMapPage:KUZEYDEN_CARBOY_SOLD_GROWTH_COUNT')} (${t('getirMarketLiveMapPage:TODAY_VS_YESTERDAY')})`,
      field: `kuzeydenOrderCounts.${dimenison}.lastWeekTotalGrowthComparedToToday`,
      render: value => value.toFixed(0),
    },
    {
      className: () => 'gWaterMarketplaceColor',
      tooltip: `${t(`global:GETIR_MARKET_DOMAIN_TYPES:${GETIR_WATER_MARKETPLACE_DOMAIN_TYPE}`)} ${t('getirMarketLiveMapPage:ORDER_COUNT')}  (${t(
        'global:LAST_WEEK',
      )})`,
      field: `previousOrderCountsAndFinancial.${dimenison}.${GETIR_WATER_MARKETPLACE_DOMAIN_TYPE}.orderCounts.lastWeek.total`,
      render: value => value,
    },
    {
      className: value => `${getClassNameForGrowth(value)} orderGrowthCell right-border`,
      tooltip: `${t(`global:GETIR_MARKET_DOMAIN_TYPES:${GETIR_WATER_MARKETPLACE_DOMAIN_TYPE}`)} ${t(
        'getirMarketLiveMapPage:ORDER_COUNT_GROWTH',
      )}% (${t('getirMarketLiveMapPage:TODAY_VS_LAST_WEEK')})`,
      field: `previousOrderCountsAndFinancial.${dimenison}.${GETIR_WATER_MARKETPLACE_DOMAIN_TYPE}.orderCounts.lastWeek.totalGrowthComparedToToday`,
      render: value => value.toFixed(0),
    },
    {
      className: () => 'localsColor',
      tooltip: `${t(`global:GETIR_MARKET_DOMAIN_TYPES:${GETIR_LOCALS_DOMAIN_TYPE}`)} ${t('getirMarketLiveMapPage:ORDER_COUNT')}  (${t(
        'global:LAST_WEEK',
      )})`,
      field: `previousOrderCountsAndFinancial.${dimenison}.${GETIR_LOCALS_DOMAIN_TYPE}.orderCounts.lastWeek.total`,
      render: value => value,
    },
    {
      className: value => `${getClassNameForGrowth(value)} orderGrowthCell right-border`,
      tooltip: `${t(`global:GETIR_MARKET_DOMAIN_TYPES:${GETIR_LOCALS_DOMAIN_TYPE}`)} ${t(
        'getirMarketLiveMapPage:ORDER_COUNT_GROWTH',
      )}% (${t('getirMarketLiveMapPage:TODAY_VS_LAST_WEEK')})`,
      field: `previousOrderCountsAndFinancial.${dimenison}.${GETIR_LOCALS_DOMAIN_TYPE}.orderCounts.lastWeek.totalGrowthComparedToToday`,
      render: value => value.toFixed(0),
    },
    {
      className: () => 'g30Color',
      tooltip: `${t(`global:GETIR_MARKET_DOMAIN_TYPES:${GETIR_BITAKSI_DOMAIN_TYPE}`)} ${t('getirMarketLiveMapPage:TRIP_COUNT')}  (${t(
        'global:LAST_WEEK',
      )})`,
      field: `previousOrderCountsAndFinancial.${dimenison}.${GETIR_BITAKSI_DOMAIN_TYPE}.orderCounts.lastWeek.total`,
      render: value => value,
    },
    {
      className: value => `${getClassNameForGrowth(value)} orderGrowthCell right-border`,
      tooltip: `${t(`global:GETIR_MARKET_DOMAIN_TYPES:${GETIR_BITAKSI_DOMAIN_TYPE}`)} ${t(
        'getirMarketLiveMapPage:TRIP_COUNT_GROWTH',
      )}% (${t('getirMarketLiveMapPage:TODAY_VS_LAST_WEEK')})`,
      field: `previousOrderCountsAndFinancial.${dimenison}.${GETIR_BITAKSI_DOMAIN_TYPE}.orderCounts.lastWeek.totalGrowthComparedToToday`,
      render: value => value.toFixed(0),
    },
  ],
  // 4th ROW
  [
    {},
    { className: () => 'right-border' },
    {
      className: () => 'g10Color activeOrderCell',
      tooltip: `${t('getirMarketLiveMapPage:ACTIVE_ORDERS')} ${t('getirMarketLiveMapPage:ACTIVE_ORDERS_G10_INCLUDES_INTEGRATION_ORDERS')}`,
      field: `activeOrderCounts.${dimenison}.${GETIR_10_DOMAIN_TYPE}.active`,
      render: value => value,
    },
    { className: () => 'right-border' },
    {
      className: () => 'foodColor',
      tooltip: `${t('getirMarketLiveMapPage:ACTIVE_ORDERS')} (${t(`global:GETIR_MARKET_DOMAIN_TYPES:${GETIR_FOOD_DOMAIN_TYPE}`)})`,
      field: `activeOrderCounts.${dimenison}.${GETIR_FOOD_DOMAIN_TYPE}.active`,
      render: value => value,
    },
    { className: () => 'right-border' },
    {
      className: () => 'g30Color',
      tooltip: `${t('getirMarketLiveMapPage:ACTIVE_ORDERS')} (${t(`global:GETIR_MARKET_DOMAIN_TYPES:${GETIR_MARKET_DOMAIN_TYPE}`)})`,
      field: `activeOrderCounts.${dimenison}.${GETIR_MARKET_DOMAIN_TYPE}.active`,
      render: value => value,
    },
    { className: () => 'right-border' },
    {
      className: () => 'kuzeydenColor',
      tooltip: `${t('getirMarketLiveMapPage:ACTIVE_ORDERS')} (${t(`global:GETIR_MARKET_DOMAIN_TYPES:${GETIR_VOYAGER_DOMAIN_TYPE}`)})`,
      field: `activeOrderCounts.${dimenison}.${GETIR_VOYAGER_DOMAIN_TYPE}.active`,
      visibility: { field: 'kuzeydenCarboy', hideAllColumn: false },
      render: value => value,
    },
    { className: () => 'right-border' },
    {
      className: () => 'gWaterMarketplaceColor',
      tooltip: `${t('getirMarketLiveMapPage:ACTIVE_ORDERS')} (${t(`global:GETIR_MARKET_DOMAIN_TYPES:${GETIR_WATER_MARKETPLACE_DOMAIN_TYPE}`)})`,
      field: `activeOrderCounts.${dimenison}.${GETIR_WATER_MARKETPLACE_DOMAIN_TYPE}.active`,
      render: value => value,
    },
    { className: () => 'right-border' },
    {
      className: () => 'localsColor',
      tooltip: `${t('getirMarketLiveMapPage:ACTIVE_ORDERS')} (${t(`global:GETIR_MARKET_DOMAIN_TYPES:${GETIR_LOCALS_DOMAIN_TYPE}`)})`,
      field: `activeOrderCounts.${dimenison}.${GETIR_LOCALS_DOMAIN_TYPE}.active`,
      visibility: { field: 'getirLocals', hideAllColumn: false },
      render: value => value,
    },
    { className: () => 'right-border' },
    {
      className: () => 'g30Color',
      tooltip: `${t('getirMarketLiveMapPage:ACTIVE_TRIPS')} (${t(`global:GETIR_MARKET_DOMAIN_TYPES:${GETIR_BITAKSI_DOMAIN_TYPE}`)})`,
      field: `activeOrderCounts.${dimenison}.${GETIR_BITAKSI_DOMAIN_TYPE}.active`,
      render: value => value,
    },
    { className: () => 'right-border' },
  ],
  // 5th ROW
  [
    {},
    { className: () => 'right-border' },
    {
      className: () => 'g10-ratios',
      key: 'g10-ratios',
      tooltip:
        `${t('getirMarketLiveMapPage:BATCHED_RATE')}; ${t('getirMarketLiveMapPage:QUEUE')}; ${t('getirMarketLiveMapPage:TOOLTIP_RED_AND_BROWN_BASKETS')}`,
      children: [
        {
          className: () => 'batchedRate',
          field: `activeOrderCounts.${dimenison}.${GETIR_10_DOMAIN_TYPE}.batchedRate`,
          render: value => <>{value.toFixed(0)};&nbsp;</>,
        },
        {
          className: () => 'queued',
          field: `activeOrderCounts.${dimenison}.${GETIR_10_DOMAIN_TYPE}.queued`,
          render: value => <>{value};&nbsp;</>,
        },
      ],
    },
    {
      className: () => 'right-border text-align-left',
      key: 'g10-ratios-extra',
      tooltip:
        `${t('getirMarketLiveMapPage:BATCHED_RATE')}; ${t('getirMarketLiveMapPage:QUEUE')}; ${t('getirMarketLiveMapPage:TOOLTIP_RED_AND_BROWN_BASKETS')}`,
      children: [
        {
          className: () => 'failedOrderCount',
          field: `failOrderCounts.${dimenison}.${GETIR_10_DOMAIN_TYPE}`,
          render: value => `${value}`,
        },
      ],
    },
    {
      className: () => 'food-ratios',
      key: 'food-ratios',
      tooltip: `${t('getirMarketLiveMapPage:RESTAURANT_DELIVERY_RATE')}; ${t('getirMarketLiveMapPage:TOOLTIP_RED_AND_BROWN_BASKETS')}`,
      children: [
        {
          className: () => 'deliveryRate',
          field: `activeOrderCounts.${dimenison}.${GETIR_FOOD_DOMAIN_TYPE}.restaurantDeliveryRate`,
          render: value => <>{value.toFixed(0)};&nbsp;</>,
        },
        {
          className: () => 'failedOrderCount',
          field: `failOrderCounts.${dimenison}.${GETIR_FOOD_DOMAIN_TYPE}`,
          render: value => value,
        },
      ],
    },
    { className: () => 'right-border' },
    {
      className: () => 'g30-ratios',
      key: 'g30-ratios',
      tooltip:
        `${t('getirMarketLiveMapPage:BATCHED_RATE')}; ${t('getirMarketLiveMapPage:QUEUE')}; ${t('getirMarketLiveMapPage:TOOLTIP_RED_AND_BROWN_BASKETS')}`,
      children: [
        {
          className: () => 'batchedRate',
          field: `activeOrderCounts.${dimenison}.${GETIR_MARKET_DOMAIN_TYPE}.batchedRate`,
          render: value => <>{value.toFixed(0)};&nbsp;</>,
        },
        {
          className: () => 'queued',
          field: `activeOrderCounts.${dimenison}.${GETIR_MARKET_DOMAIN_TYPE}.queued`,
          render: value => <>{value};&nbsp;</>,
        },
      ],
    },
    {
      className: () => 'right-border text-align-left',
      key: 'g30-ratios-extra',
      tooltip:
        `${t('getirMarketLiveMapPage:BATCHED_RATE')}; ${t('getirMarketLiveMapPage:QUEUE')}; ${t('getirMarketLiveMapPage:TOOLTIP_RED_AND_BROWN_BASKETS')}`,
      children: [
        {
          className: () => 'failedOrderCount',
          field: `failOrderCounts.${dimenison}.${GETIR_MARKET_DOMAIN_TYPE}`,
          render: value => `${value}`,
        },
      ],
    },
    {
      className: () => 'voyager-ratios',
      key: 'voyager-ratios',
      tooltip:
        `${t('getirMarketLiveMapPage:BATCHED_RATE')}; ${t('getirMarketLiveMapPage:QUEUE')}; ${t('getirMarketLiveMapPage:TOOLTIP_RED_AND_BROWN_BASKETS')}`,
      visibility: { field: 'kuzeydenCarboy', hideAllColumn: false },
      children: [
        {
          className: () => 'batchedRate',
          field: `activeOrderCounts.${dimenison}.${GETIR_VOYAGER_DOMAIN_TYPE}.batchedRate`,
          render: value => <>{value.toFixed(0)};&nbsp;</>,
        },
        {
          className: () => 'queued',
          field: `activeOrderCounts.${dimenison}.${GETIR_VOYAGER_DOMAIN_TYPE}.queued`,
          render: value => <>{value};&nbsp;</>,
        },
      ],
    },
    {
      className: () => 'right-border text-align-left',
      key: 'voyager-ratios-extra',
      tooltip:
        `${t('getirMarketLiveMapPage:BATCHED_RATE')}; ${t('getirMarketLiveMapPage:QUEUE')}; ${t('getirMarketLiveMapPage:TOOLTIP_RED_AND_BROWN_BASKETS')}`,
      children: [
        {
          className: () => 'failedOrderCount',
          field: `failOrderCounts.${dimenison}.${GETIR_VOYAGER_DOMAIN_TYPE}`,
          render: value => value,
        },
      ],
    },
    {},
    { className: () => 'right-border' },
    {
      className: () => 'locals-ratios',
      key: 'locals-ratios',
      tooltip: `${t('getirMarketLiveMapPage:STORE_DELIVERY_RATE')}; ${t('getirMarketLiveMapPage:TOOLTIP_RED_AND_BROWN_BASKETS')}`,
      visibility: { field: 'getirLocals', hideAllColumn: false },
      children: [
        {
          className: () => 'deliveryRate',
          field: `activeOrderCounts.${dimenison}.${GETIR_LOCALS_DOMAIN_TYPE}.storeDeliveryRate`,
          render: value => <>{value.toFixed(0)};&nbsp;</>,
        },
        {
          className: () => 'failedOrderCount',
          field: `failOrderCounts.${dimenison}.${GETIR_LOCALS_DOMAIN_TYPE}`,
          render: value => value,
        },
      ],
    },
    { className: () => 'right-border' },
    {},
    { className: () => 'right-border' },
  ],
];

const LIVE_MAP_DOMAINS = [
  GETIR_10_DOMAIN_TYPE,
  GETIR_FOOD_DOMAIN_TYPE,
  GETIR_MARKET_DOMAIN_TYPE,
  GETIR_BITAKSI_DOMAIN_TYPE,
  GETIR_VOYAGER_DOMAIN_TYPE,
  GETIR_LOCALS_DOMAIN_TYPE,
  GETIR_WATER_MARKETPLACE_DOMAIN_TYPE,
];

export const getTotalCountryStats = (stats, t) => {
  const totalCountryStats = {
    today: {
      value: 0,
      tooltip: t('global:TODAY'),
    },
    lastWeek: {
      value: 0,
      tooltip: t('global:LAST_WEEK'),
    },
    growth: {
      value: 0,
      tooltip: t('getirMarketLiveMapPage:TODAY_VS_LAST_WEEK'),
      className: 'pos',
    },
  };

  LIVE_MAP_DOMAINS.forEach(domainType => {
    const todayCountPath = `previousOrderCountsAndFinancial.selectedCountry.${domainType}.orderCounts.today.total`;
    totalCountryStats.today.value += get(stats, todayCountPath, 0);
    const lastWeekCountPath = `previousOrderCountsAndFinancial.selectedCountry.${domainType}.orderCounts.lastWeek.total`;
    totalCountryStats.lastWeek.value += get(stats, lastWeekCountPath, 0);
  });

  if (totalCountryStats.today.value === 0 && totalCountryStats.lastWeek.value === 0) totalCountryStats.growth.value = 0;
  else {
    totalCountryStats.growth.value =
      ((totalCountryStats.today.value - totalCountryStats.lastWeek.value) * 100) / totalCountryStats.lastWeek.value;
  }

  if (totalCountryStats.growth.value < 0) totalCountryStats.growth.className = 'neg';

  return totalCountryStats;
};

const INITIAL_VISIBILITY_CONFIG = {
  getir10: {
    domainType: GETIR_10_DOMAIN_TYPE,
    visible: true,
  },
  getirFood: {
    domainType: GETIR_FOOD_DOMAIN_TYPE,
    visible: true,
  },
  getir30: {
    domainType: GETIR_MARKET_DOMAIN_TYPE,
    visible: true,
  },
  getirBiTaksi: {
    domainType: GETIR_BITAKSI_DOMAIN_TYPE,
    visible: true,
  },
  getirLocals: {
    domainType: GETIR_LOCALS_DOMAIN_TYPE,
    visible: true,
  },
  getirWaterMarketplace: {
    domainType: GETIR_WATER_MARKETPLACE_DOMAIN_TYPE,
    visible: true,
  },
  kuzeydenCarboy: { visible: true },
  showFinancials: { visible: true },
};

const getVisibilityCheckFields = (domainType, dimenison) => {
  return [
    `previousOrderCountsAndFinancial.${dimenison}.${domainType}.orderCounts.today.total`,
    `previousOrderCountsAndFinancial.${dimenison}.${domainType}.orderCounts.yesterday.total`,
    `previousOrderCountsAndFinancial.${dimenison}.${domainType}.orderCounts.lastWeek.total`,
  ];
};

const getVisibilityCheckFieldsForKuzeyden = dimenison => {
  return [
    `kuzeydenOrderCounts.${dimenison}.todayCarboy`,
    `kuzeydenOrderCounts.${dimenison}.yesterdayCarboy`,
    `kuzeydenOrderCounts.${dimenison}.lastWeekCarboy`,
  ];
};

export const getVisibilityOptions = (orderStatsData, showFinancials, dimenison) => {
  const visibility = cloneDeep(INITIAL_VISIBILITY_CONFIG);

  Object.values(visibility).forEach(item => {
    // if some of the data is bigger than 0, we should show
    // eslint-disable-next-line no-param-reassign
    item.visible = getVisibilityCheckFields(item.domainType, dimenison).some(field => get(orderStatsData, field, 0) > 0);
  });
  visibility.kuzeydenCarboy.visible = getVisibilityCheckFieldsForKuzeyden(dimenison).some(field => get(orderStatsData, field, 0) > 0);
  visibility.showFinancials.visible = showFinancials;

  return visibility;
};
