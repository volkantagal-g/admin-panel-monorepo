import {
  getCountsTableChartLineConfigs,
  getFinancialsTableChartLineConfigs,
  getGetirFoodTableChartLineConfigsForDeliveryType,
  getGetirLocalsTableChartLineConfigsForDeliveryType,
  getGetirDriveTableChartLineConfigsForDeliveryType,
  getGetirJobsTableChartLineConfigs,
  getN11TableChartLineConfigsForSource,
  getN11TableChartLineConfigsForTraffic,
  getDomainTypeBasedLineConfigs,
} from '../utils';
import { DECIMAL_COUNT_BY_CURRENCY } from '@app/pages/DailySummary/constants';

export const countsTableChartKeys = {
  orderCounts: 'orderCounts',
  organicCounts: 'organicCounts',
  promoUsedCounts: 'promoUsedCounts',
  missedCounts: 'missedCounts',
  demandCounts: 'demandCounts',
  uniqueTabClickCounts: 'uniqueTabClickCounts',
  totalTabClickCounts: 'totalTabClickCounts',
  totalAppOpenCounts: 'totalAppOpenCounts',
  uniqueAppOpenCounts: 'uniqueAppOpenCounts',
};

export const getCountsTableChartConfigs = ({ t, langKey }) => {
  const chartConfigsByDomainType = getCountsTableChartLineConfigs({ langKey });

  return [
    {
      name: t('dailySummaryPage:ORDER_COUNT_TOTAL'),
      dataKey: countsTableChartKeys.orderCounts,
      divideBy: 1000,
      plotDecimalCount: 1,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsByDomainType },
    },
    {
      name: t('dailySummaryPage:ORGANIC_ORDER_TOTAL'),
      dataKey: countsTableChartKeys.organicCounts,
      divideBy: 1000,
      plotDecimalCount: 1,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsByDomainType },
    },
    {
      name: t('dailySummaryPage:PROMO_USED_TOTAL'),
      dataKey: countsTableChartKeys.promoUsedCounts,
      divideBy: 1000,
      plotDecimalCount: 1,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsByDomainType },
    },
    {
      name: t('dailySummaryPage:MISSED_ORDER_TOTAL'),
      dataKey: countsTableChartKeys.missedCounts,
      divideBy: 1000,
      plotDecimalCount: 1,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsByDomainType },
    },
    {
      name: t('dailySummaryPage:TOTAL_DEMAND'),
      dataKey: countsTableChartKeys.demandCounts,
      divideBy: 1000,
      plotDecimalCount: 1,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsByDomainType },
    },
    {
      name: t('dailySummaryPage:TAB_CLICK_UNIQUE'),
      dataKey: countsTableChartKeys.uniqueTabClickCounts,
      divideBy: 1000,
      plotDecimalCount: 1,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsByDomainType },
    },
    {
      name: t('dailySummaryPage:TAB_CLICK_TOTAL'),
      dataKey: countsTableChartKeys.totalTabClickCounts,
      divideBy: 1000,
      plotDecimalCount: 1,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsByDomainType },
    },
    {
      name: t('dailySummaryPage:APP_OPEN_UNIQUE'),
      dataKey: countsTableChartKeys.uniqueAppOpenCounts,
      divideBy: 1000,
      plotDecimalCount: 1,
      defaultVisibleKeys: ['total'],
    },
    {
      name: t('dailySummaryPage:APP_OPEN_TOTAL'),
      dataKey: countsTableChartKeys.totalAppOpenCounts,
      divideBy: 1000,
      plotDecimalCount: 1,
      defaultVisibleKeys: ['total'],
    },
  ];
};

export const getirJobsTableChartKeys = {
  activePosts: 'activePosts',
  posts: 'posts',
  applications: 'applications',
  finishedVideoCall: 'finishedVideoCall',
  registerUser: 'registerUser',
};

export const getGetirJobsTableChartConfigs = ({ t, langKey }) => {
  const chartConfigsByPostType = getGetirJobsTableChartLineConfigs({ langKey });

  return [
    {
      name: t('dailySummaryPage:JOBS_AVERAGE_ACTIVE_POSTS'),
      dataKey: getirJobsTableChartKeys.activePosts,
      divideBy: 1000,
      plotDecimalCount: 1,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsByPostType },
    },
    {
      name: t('dailySummaryPage:NEW_JOBS_POSTS'),
      dataKey: getirJobsTableChartKeys.posts,
      divideBy: 1000,
      plotDecimalCount: 1,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsByPostType },
    },
    {
      name: t('dailySummaryPage:JOBS_APPLICATIONS'),
      dataKey: getirJobsTableChartKeys.applications,
      divideBy: 1000,
      plotDecimalCount: 1,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsByPostType },
    },
    {
      name: t('dailySummaryPage:JOBS_VIDEO_CALLS'),
      dataKey: getirJobsTableChartKeys.finishedVideoCall,
      divideBy: 1,
      plotDecimalCount: 1,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: [] },
    },
    {
      name: t('dailySummaryPage:JOBS_REGISTER_USER'),
      dataKey: getirJobsTableChartKeys.registerUser,
      divideBy: 1,
      plotDecimalCount: 1,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: [] },
    },
  ];
};

export const financialsTableChartKeys = {
  chargedAmount: 'chargedAmount',
  getirMarketChargedAmount: 'getirMarketChargedAmount',
  grossMarketValue: 'grossMarketValue',
  netRevenue: 'netRevenue',
  getirMarketNetRevenue: 'getirMarketNetRevenue',
  grossMargin: 'grossMargin',
  basketValue: 'basketValue',
  basketAverage: 'basketAverage',
  deliveryFee: 'deliveryFee',
  serviceFee: 'serviceFee',
};

export const getFinancialsTableChartConfigs = ({ t, langKey, currency }) => {
  const chartConfigsByDomainType = getFinancialsTableChartLineConfigs({ langKey });
  const currencyDecimalCount = DECIMAL_COUNT_BY_CURRENCY?.[currency]?.minDecimal || 0;

  return [
    {
      name: t('dailySummaryPage:CHARGED_AMOUNT'),
      dataKey: financialsTableChartKeys.chargedAmount,
      divideBy: 1000,
      plotDecimalCount: 1,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsByDomainType },
    },
    {
      name: `${t('CHARGED_AMOUNT')} (${t('global:GETIR_GROCERY')})`,
      dataKey: financialsTableChartKeys.getirMarketChargedAmount,
      divideBy: 1000,
      plotDecimalCount: 1,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsByDomainType },
    },
    {
      name: t('dailySummaryPage:GROSS_MARKET_VALUE_SHORT'),
      dataKey: financialsTableChartKeys.grossMarketValue,
      divideBy: 1000,
      plotDecimalCount: 1,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsByDomainType },
    },
    {
      name: t('dailySummaryPage:NET_REVENUE'),
      dataKey: financialsTableChartKeys.netRevenue,
      divideBy: 1000,
      plotDecimalCount: 1,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsByDomainType },
    },
    {
      name: `${t('dailySummaryPage:NET_REVENUE')} (${t('global:GETIR_GROCERY')})`,
      dataKey: financialsTableChartKeys.getirMarketNetRevenue,
      divideBy: 1000,
      plotDecimalCount: 1,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsByDomainType },
    },
    {
      name: t('dailySummaryPage:GROSS_MARGIN'),
      dataKey: financialsTableChartKeys.grossMargin,
      divideBy: 1000,
      plotDecimalCount: 1,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsByDomainType },
    },
    {
      name: t('dailySummaryPage:BASKET_TOTAL'),
      dataKey: financialsTableChartKeys.basketValue,
      divideBy: 1000,
      plotDecimalCount: 1,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsByDomainType },
    },
    {
      name: t('dailySummaryPage:BASKET_AVERAGE'),
      dataKey: financialsTableChartKeys.basketAverage,
      divideBy: 1,
      plotDecimalCount: currencyDecimalCount,
      tooltipDecimalCount: currencyDecimalCount,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsByDomainType },
      isTotalRowCalculated: true,
    },
    {
      name: t('dailySummaryPage:DELIVERY_FEE'),
      dataKey: financialsTableChartKeys.deliveryFee,
      divideBy: 1000,
      plotDecimalCount: 1,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsByDomainType },
    },
    {
      name: t('dailySummaryPage:SERVICE_FEE'),
      dataKey: financialsTableChartKeys.serviceFee,
      divideBy: 1000,
      plotDecimalCount: 1,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsByDomainType },
    },
  ];
};

export const getirKuzeydenTableChartKeys = {
  carboy: 'carboySoldCount',
  orderCount: 'orderCount',
  organicOrder: 'organicOrderCount',
  missedOrder: 'missedCarboyOrderCount',
};

export const getKuzeydenTableChartConfigs = ({ t }) => {
  return [
    {
      name: t('dailySummaryPage:GETIR_KUZEYDEN.CARBOY'),
      dataKey: getirKuzeydenTableChartKeys.carboy,
      divideBy: 1000,
      plotDecimalCount: 1,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: [] },
    },
    {
      name: t('dailySummaryPage:GETIR_KUZEYDEN.ORDER_COUNT'),
      dataKey: getirKuzeydenTableChartKeys.orderCount,
      divideBy: 1000,
      plotDecimalCount: 1,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: [] },
    },
    {
      name: t('dailySummaryPage:GETIR_KUZEYDEN.ORGANIC_ORDER'),
      dataKey: getirKuzeydenTableChartKeys.organicOrder,
      divideBy: 1000,
      plotDecimalCount: 1,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: [] },
    },
    {
      name: t('dailySummaryPage:GETIR_KUZEYDEN.MISSED_ORDER'),
      dataKey: getirKuzeydenTableChartKeys.missedOrder,
      divideBy: 1,
      plotDecimalCount: 1,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: [] },
    },
  ];
};

export const getirFoodTableChartKeys = {
  orderCounts: 'orderCounts',
  organicCounts: 'organicCounts',
  promoUsedCounts: 'promoUsedCounts',
  missedCounts: 'missedCounts',
  demandCounts: 'demandCounts',
  chargedAmount: 'chargedAmount',
  gmv: 'gmv',
  netRevenue: 'netRevenue',
  grossMargin: 'grossMargin',
  basketValue: 'basketValue',
  basketAverage: 'basketAverage',
  deliveryFee: 'deliveryFee',
};

export const getGetirFoodTableChartConfigs = ({ t, currency }) => {
  const chartConfigsByDeliveryType = getGetirFoodTableChartLineConfigsForDeliveryType({ t });
  const currencyDecimalCount = DECIMAL_COUNT_BY_CURRENCY?.[currency]?.minDecimal || 0;

  return [
    {
      name: `${t('GETIR_FOOD')} - ${t('ORDER')}`,
      dataKey: getirFoodTableChartKeys.orderCounts,
      divideBy: 1000,
      plotDecimalCount: 1,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsByDeliveryType },
    },
    {
      name: `${t('GETIR_FOOD')} - ${t('dailySummaryPage:ORGANIC_ORDER_TOTAL')}`,
      dataKey: getirFoodTableChartKeys.organicCounts,
      divideBy: 1000,
      plotDecimalCount: currencyDecimalCount,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsByDeliveryType },
    },
    {
      name: `${t('GETIR_FOOD')} - ${t('dailySummaryPage:PROMO_USED_TOTAL')}`,
      dataKey: getirFoodTableChartKeys.promoUsedCounts,
      divideBy: 1000,
      plotDecimalCount: currencyDecimalCount,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsByDeliveryType },
    },
    {
      name: `${t('GETIR_FOOD')} - ${t('dailySummaryPage:MISSED_ORDER_TOTAL')}`,
      dataKey: getirFoodTableChartKeys.missedCounts,
      divideBy: 1000,
      plotDecimalCount: currencyDecimalCount,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsByDeliveryType },
    },
    {
      name: `${t('GETIR_FOOD')} - ${t('dailySummaryPage:TOTAL_DEMAND')}`,
      dataKey: getirFoodTableChartKeys.demandCounts,
      divideBy: 1000,
      plotDecimalCount: 1,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsByDeliveryType },
    },
    {
      name: `${t('GETIR_FOOD')} - ${t('dailySummaryPage:CHARGED_AMOUNT')}`,
      dataKey: getirFoodTableChartKeys.chargedAmount,
      divideBy: 1000,
      plotDecimalCount: currencyDecimalCount,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsByDeliveryType },
    },
    {
      name: `${t('GETIR_FOOD')} - ${t('dailySummaryPage:GMV')}`,
      dataKey: getirFoodTableChartKeys.gmv,
      divideBy: 1000,
      plotDecimalCount: currencyDecimalCount,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsByDeliveryType },
    },
    {
      name: `${t('GETIR_FOOD')} - ${t('dailySummaryPage:NET_REVENUE')}`,
      dataKey: getirFoodTableChartKeys.netRevenue,
      divideBy: 1000,
      plotDecimalCount: currencyDecimalCount,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsByDeliveryType },
    },
    {
      name: `${t('GETIR_FOOD')} - ${t('dailySummaryPage:GROSS_MARGIN')}`,
      dataKey: getirFoodTableChartKeys.grossMargin,
      divideBy: 1000,
      plotDecimalCount: currencyDecimalCount,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsByDeliveryType },
    },
    {
      name: `${t('GETIR_FOOD')} - ${t('dailySummaryPage:BASKET_TOTAL')}`,
      dataKey: getirFoodTableChartKeys.basketValue,
      divideBy: 1000,
      plotDecimalCount: currencyDecimalCount,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsByDeliveryType },
    },
    {
      name: `${t('GETIR_FOOD')} - ${t('dailySummaryPage:BASKET_AVERAGE')}`,
      dataKey: getirFoodTableChartKeys.basketAverage,
      divideBy: 1,
      plotDecimalCount: currencyDecimalCount,
      tooltipDecimalCount: currencyDecimalCount,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsByDeliveryType },
    },
    {
      name: `${t('GETIR_FOOD')} - ${t('dailySummaryPage:DELIVERY_FEE')}`,
      dataKey: getirFoodTableChartKeys.deliveryFee,
      divideBy: 1,
      plotDecimalCount: currencyDecimalCount,
      tooltipDecimalCount: currencyDecimalCount,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsByDeliveryType },
    },
  ];
};

export const getirLocalsTableChartKeys = {
  orderCounts: 'orderCounts',
  organicCounts: 'organicCounts',
  promoUsedCounts: 'promoUsedCounts',
  missedCounts: 'missedCounts',
  demandCounts: 'demandCounts',
  chargedAmount: 'chargedAmount',
  gmv: 'gmv',
  netRevenue: 'netRevenue',
  grossMargin: 'grossMargin',
  basketValue: 'basketValue',
  basketAverage: 'basketAverage',
  deliveryFee: 'deliveryFee',
};

export const getGetirLocalsTableChartConfigs = ({ t, currency }) => {
  const chartConfigsByDeliveryType = getGetirLocalsTableChartLineConfigsForDeliveryType({ t });
  const currencyDecimalCount = DECIMAL_COUNT_BY_CURRENCY?.[currency]?.minDecimal || 0;

  return [
    {
      name: `${t('GETIR_LOCALS')} - ${t('ORDER')}`,
      dataKey: getirLocalsTableChartKeys.orderCounts,
      divideBy: 1000,
      plotDecimalCount: 1,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsByDeliveryType },
    },
    {
      name: `${t('GETIR_LOCALS')} - ${t('dailySummaryPage:ORGANIC_ORDER_TOTAL')}`,
      dataKey: getirLocalsTableChartKeys.organicCounts,
      divideBy: 1000,
      plotDecimalCount: currencyDecimalCount,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsByDeliveryType },
    },
    {
      name: `${t('GETIR_LOCALS')} - ${t('dailySummaryPage:PROMO_USED_TOTAL')}`,
      dataKey: getirLocalsTableChartKeys.promoUsedCounts,
      divideBy: 1000,
      plotDecimalCount: currencyDecimalCount,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsByDeliveryType },
    },
    {
      name: `${t('GETIR_LOCALS')} - ${t('dailySummaryPage:MISSED_ORDER_TOTAL')}`,
      dataKey: getirLocalsTableChartKeys.missedCounts,
      divideBy: 1000,
      plotDecimalCount: currencyDecimalCount,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsByDeliveryType },
    },
    {
      name: `${t('GETIR_LOCALS')} - ${t('dailySummaryPage:TOTAL_DEMAND')}`,
      dataKey: getirFoodTableChartKeys.demandCounts,
      divideBy: 1000,
      plotDecimalCount: 1,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsByDeliveryType },
    },
    {
      name: `${t('GETIR_LOCALS')} - ${t('dailySummaryPage:CHARGED_AMOUNT')}`,
      dataKey: getirLocalsTableChartKeys.chargedAmount,
      divideBy: 1000,
      plotDecimalCount: currencyDecimalCount,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsByDeliveryType },
    },
    {
      name: `${t('GETIR_LOCALS')} - ${t('dailySummaryPage:GMV')}`,
      dataKey: getirLocalsTableChartKeys.gmv,
      divideBy: 1000,
      plotDecimalCount: currencyDecimalCount,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsByDeliveryType },
    },
    {
      name: `${t('GETIR_LOCALS')} - ${t('dailySummaryPage:NET_REVENUE')}`,
      dataKey: getirLocalsTableChartKeys.netRevenue,
      divideBy: 1000,
      plotDecimalCount: currencyDecimalCount,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsByDeliveryType },
    },
    {
      name: `${t('GETIR_LOCALS')} - ${t('dailySummaryPage:GROSS_MARGIN')}`,
      dataKey: getirLocalsTableChartKeys.grossMargin,
      divideBy: 1000,
      plotDecimalCount: currencyDecimalCount,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsByDeliveryType },
    },
    {
      name: `${t('GETIR_LOCALS')} - ${t('dailySummaryPage:BASKET_TOTAL')}`,
      dataKey: getirLocalsTableChartKeys.basketValue,
      divideBy: 1000,
      plotDecimalCount: currencyDecimalCount,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsByDeliveryType },
    },
    {
      name: `${t('GETIR_LOCALS')} - ${t('dailySummaryPage:BASKET_AVERAGE')}`,
      dataKey: getirLocalsTableChartKeys.basketAverage,
      divideBy: 1,
      plotDecimalCount: currencyDecimalCount,
      tooltipDecimalCount: currencyDecimalCount,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsByDeliveryType },
    },
    {
      name: `${t('GETIR_LOCALS')} - ${t('dailySummaryPage:DELIVERY_FEE')}`,
      dataKey: getirLocalsTableChartKeys.deliveryFee,
      divideBy: 1,
      plotDecimalCount: currencyDecimalCount,
      tooltipDecimalCount: currencyDecimalCount,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsByDeliveryType },
    },
  ];
};

export const getirDriveTableChartKeys = {
  successfulRentalCounts: 'successfulRentalCounts',
  organicCounts: 'organicCounts',
  chargedAmount: 'chargedAmount',
  netRevenue: 'netRevenue',
  grossMargin: 'grossMargin',
  basketValue: 'basketValue',
  basketAverage: 'basketAverage',
  promoUsedCounts: 'promoUsedCounts',
  missedCounts: 'missedCounts',
  totalTabClickCounts: 'totalTabClickCounts',
  uniqueTabClickCounts: 'uniqueTabClickCounts',
};

export const getGetirDriveTableChartConfigs = ({ t, currency }) => {
  const chartConfigsBySourceType = getGetirDriveTableChartLineConfigsForDeliveryType({ t });
  const currencyDecimalCount = DECIMAL_COUNT_BY_CURRENCY?.[currency]?.minDecimal || 0;

  return [
    {
      name: `${t('GETIR_DRIVE')} - ${t('dailySummaryPage:RENTAL')}`,
      dataKey: getirDriveTableChartKeys.successfulRentalCounts,
      divideBy: 1000,
      plotDecimalCount: 1,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsBySourceType },
    },
    {
      name: `${t('GETIR_DRIVE')} - ${t('dailySummaryPage:ORGANIC_ORDER_TOTAL')}`,
      dataKey: getirDriveTableChartKeys.organicCounts,
      divideBy: 1000,
      plotDecimalCount: currencyDecimalCount,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsBySourceType },
    },
    {
      name: `${t('GETIR_DRIVE')} - ${t('dailySummaryPage:PROMO_USED_TOTAL')}`,
      dataKey: getirDriveTableChartKeys.promoUsedCounts,
      divideBy: 1000,
      plotDecimalCount: currencyDecimalCount,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsBySourceType },
    },
    {
      name: `${t('GETIR_DRIVE')} - ${t('dailySummaryPage:MISSED_ORDER_TOTAL')}`,
      dataKey: getirDriveTableChartKeys.missedCounts,
      divideBy: 1000,
      plotDecimalCount: currencyDecimalCount,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsBySourceType },
    },
    {
      name: `${t('GETIR_DRIVE')} - ${t('dailySummaryPage:CHARGED_AMOUNT')}`,
      dataKey: getirDriveTableChartKeys.chargedAmount,
      divideBy: 1000,
      plotDecimalCount: currencyDecimalCount,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsBySourceType },
    },
    {
      name: `${t('GETIR_DRIVE')} - ${t('dailySummaryPage:NET_REVENUE')}`,
      dataKey: getirDriveTableChartKeys.netRevenue,
      divideBy: 1000,
      plotDecimalCount: currencyDecimalCount,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsBySourceType },
    },
    {
      name: `${t('GETIR_DRIVE')} - ${t('dailySummaryPage:GROSS_MARGIN')}`,
      dataKey: getirDriveTableChartKeys.grossMargin,
      divideBy: 1000,
      plotDecimalCount: currencyDecimalCount,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsBySourceType },
    },
    {
      name: `${t('GETIR_DRIVE')} - ${t('dailySummaryPage:BASKET_TOTAL')}`,
      dataKey: getirDriveTableChartKeys.basketValue,
      divideBy: 1000,
      plotDecimalCount: currencyDecimalCount,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsBySourceType },
    },
    {
      name: `${t('GETIR_DRIVE')} - ${t('dailySummaryPage:BASKET_AVERAGE')}`,
      dataKey: getirDriveTableChartKeys.basketAverage,
      divideBy: 1,
      plotDecimalCount: currencyDecimalCount,
      tooltipDecimalCount: currencyDecimalCount,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsBySourceType },
      isTotalRowCalculated: true,
    },
    {
      name: `${t('GETIR_DRIVE')} - ${t('dailySummaryPage:TAB_CLICK_UNIQUE')}`,
      dataKey: getirDriveTableChartKeys.uniqueTabClickCounts,
      divideBy: 1000,
      plotDecimalCount: currencyDecimalCount,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsBySourceType },
    },
    {
      name: `${t('GETIR_DRIVE')} - ${t('dailySummaryPage:TAB_CLICK_TOTAL')}`,
      dataKey: getirDriveTableChartKeys.totalTabClickCounts,
      divideBy: 1000,
      plotDecimalCount: currencyDecimalCount,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsBySourceType },
    },
  ];
};

export const getirN11TableChartKeys = {
  orderCount: 'orderCount',
  grossMarketValue: 'totalGMV',
  revenue: 'totalRevenue',
  otherRevenue: 'otherRevenue',
  netRevenue: 'totalNetRevenue',
  gmvAverage: 'gmvAverage',
  revenueAverage: 'revenueAverage',
  totalTraffic: 'totalTraffic',
};

export const getN11TableChartConfigs = ({ t, currency }) => {
  const chartConfigsBySourceType = getN11TableChartLineConfigsForSource({ t });
  const chartConfigsByTraffic = getN11TableChartLineConfigsForTraffic({ t });
  const currencyDecimalCount = DECIMAL_COUNT_BY_CURRENCY?.[currency]?.minDecimal ?? 0;

  return [
    {
      name: `${t('dailySummaryPage:GETIR_N11')} ${t('dailySummaryPage:ORDER')}`,
      dataKey: getirN11TableChartKeys.orderCount,
      divideBy: 1000,
      plotDecimalCount: 1,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsBySourceType },
    },
    {
      name: `${t('dailySummaryPage:GETIR_N11')} ${t('dailySummaryPage:GROSS_MARKET_VALUE_SHORT')}`,
      dataKey: getirN11TableChartKeys.grossMarketValue,
      divideBy: 1000,
      plotDecimalCount: 1,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsBySourceType },
    },
    {
      name: `${t('dailySummaryPage:GETIR_N11')} ${t('dailySummaryPage:REVENUE')}`,
      dataKey: getirN11TableChartKeys.revenue,
      divideBy: 1000,
      plotDecimalCount: 1,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsBySourceType },
    },
    {
      name: `${t('dailySummaryPage:GETIR_N11')} ${t('dailySummaryPage:NET_REVENUE')}`,
      dataKey: getirN11TableChartKeys.netRevenue,
      divideBy: 1000,
      plotDecimalCount: 1,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsBySourceType },
    },
    {
      name: `${t('dailySummaryPage:GETIR_N11')} ${t('dailySummaryPage:OTHER_REVENUE')}`,
      dataKey: getirN11TableChartKeys.otherRevenue,
      divideBy: 1000,
      plotDecimalCount: 1,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsBySourceType },
    },
    {
      name: `${t('dailySummaryPage:GETIR_N11')} ${t('dailySummaryPage:GMV_PER_ORDER')}`,
      dataKey: getirN11TableChartKeys.gmvAverage,
      divideBy: 1,
      plotDecimalCount: currencyDecimalCount,
      tooltipDecimalCount: currencyDecimalCount,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsBySourceType },
      isTotalRowCalculated: true,
    },
    {
      name: `${t('dailySummaryPage:GETIR_N11')} ${t('dailySummaryPage:REVENUE_PER_ORDER')}`,
      dataKey: getirN11TableChartKeys.revenueAverage,
      divideBy: 1,
      plotDecimalCount: currencyDecimalCount,
      tooltipDecimalCount: currencyDecimalCount,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsBySourceType },
      isTotalRowCalculated: true,
    },
    {
      name: `${t('dailySummaryPage:GETIR_N11')} ${t('dailySummaryPage:APP_OPEN_TOTAL')}`,
      dataKey: getirN11TableChartKeys.totalTraffic,
      divideBy: 1000,
      plotDecimalCount: 1,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsByTraffic },
    },
  ];
};

export const getirSelectTableChartKeys = {
  subClientCount: 'subClientCount',
  totalRevenue: 'totalRevenue',
  deliveryFeeDiscountCost: 'deliveryFeeDiscountCost',
  promoAandm: 'promoAandm',
};

export const getGetirSelectTableChartConfigs = ({ t, langKey, currency }) => {
  const chartConfigsByDomainType = getDomainTypeBasedLineConfigs({ langKey });
  const currencyDecimalCount = DECIMAL_COUNT_BY_CURRENCY?.[currency]?.minDecimal || 0;

  return [
    {
      name: t('dailySummaryPage:GETIR_SELECT_SECTION.SUBSCRIBED_CLIENT_COUNT'),
      dataKey: getirSelectTableChartKeys.subClientCount,
      divideBy: 1,
      plotDecimalCount: 0,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: [] },
    },
    {
      name: t('global:REVENUE'),
      dataKey: getirSelectTableChartKeys.totalRevenue,
      divideBy: 1000,
      plotDecimalCount: 1,
      pilotDecimalCount: currencyDecimalCount,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: [] },
    },
    {
      name: t('dailySummaryPage:GETIR_SELECT_SECTION.DELIVERY_FEE_DISCOUNT_COST'),
      dataKey: getirSelectTableChartKeys.deliveryFeeDiscountCost,
      divideBy: 1000,
      pilotDecimalCount: currencyDecimalCount,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsByDomainType },
    },
    {
      name: t('dailySummaryPage:GETIR_SELECT_SECTION.PROMO_A_AND_M_COST'),
      dataKey: getirSelectTableChartKeys.promoAandm,
      divideBy: 1000,
      pilotDecimalCount: currencyDecimalCount,
      defaultVisibleKeys: ['total'],
      linesConfig: { configs: chartConfigsByDomainType },
    },
  ];
};

export const gorillasTableChartKeys = {
  orderCount: 'orderCount',
  netRevenue: 'netRevenue',
  gmv: 'gmv',
};

export const getGorillasTableChartConfigs = ({ t, currency }) => {
  const currencyDecimalCount = DECIMAL_COUNT_BY_CURRENCY?.[currency]?.minDecimal || 0;

  return [
    {
      name: t('dailySummaryPage:GORILLAS_SECTION.ORDER_COUNT'),
      dataKey: gorillasTableChartKeys.orderCount,
      divideBy: 1000,
      plotDecimalCount: 0,
      defaultVisibleKeys: ['total'],
      linesConfig: {
        configs: [
          {
            key: 'gorillasOnly',
            title: t('dailySummaryPage:GORILLAS_SECTION.GORILLAS_ONLY'),
          },
          {
            key: 'getirGorillas',
            title: t('dailySummaryPage:GORILLAS_SECTION.GETIR_GORILLAS'),
          },
        ],
      },
    },
    {
      name: t('dailySummaryPage:GORILLAS_SECTION.NET_REVENUE'),
      dataKey: gorillasTableChartKeys.netRevenue,
      divideBy: 1000,
      plotDecimalCount: currencyDecimalCount,
      defaultVisibleKeys: ['total'],
      linesConfig: {
        configs: [
          {
            key: 'gorillasOnly',
            title: t('dailySummaryPage:GORILLAS_SECTION.GORILLAS_ONLY'),
          },
          {
            key: 'getirGorillas',
            title: t('dailySummaryPage:GORILLAS_SECTION.GETIR_GORILLAS'),
          },
        ],
      },
    },
    {
      name: t('dailySummaryPage:GORILLAS_SECTION.GMV'),
      dataKey: gorillasTableChartKeys.gmv,
      divideBy: 1000,
      plotDecimalCount: currencyDecimalCount,
      defaultVisibleKeys: ['total'],
      linesConfig: {
        configs: [
          {
            key: 'gorillasOnly',
            title: t('dailySummaryPage:GORILLAS_SECTION.GORILLAS_ONLY'),
          },
          {
            key: 'getirGorillas',
            title: t('dailySummaryPage:GORILLAS_SECTION.GETIR_GORILLAS'),
          },
        ],
      },
    },
  ];
};

export const getirMarketIntegrationTableChartKeys = {
  orderCount: 'orderCount',
  netRevenue: 'netRevenue',
  gmv: 'gmv',
};

export const getGetirMarketIntegrationTableChartConfigs = ({ t, currency }) => {
  const currencyDecimalCount = DECIMAL_COUNT_BY_CURRENCY?.[currency]?.minDecimal || 0;

  return [
    {
      name: t('dailySummaryPage:INTEGRATION_ORDERS_SECTION.ORDER_COUNT'),
      dataKey: getirMarketIntegrationTableChartKeys.orderCount,
      divideBy: 1000,
      plotDecimalCount: 0,
      defaultVisibleKeys: ['total'],
      linesConfig: {
        configs: [
          {
            key: 'GETIR',
            title: t('dailySummaryPage:INTEGRATION_ORDERS_SECTION.GETIR'),
          },
          {
            key: 'N11',
            title: t('dailySummaryPage:INTEGRATION_ORDERS_SECTION.N11'),
          },
          {
            key: 'GORILLAS',
            title: t('dailySummaryPage:INTEGRATION_ORDERS_SECTION.GORILLAS'),
          },
          {
            key: 'JET',
            title: t('dailySummaryPage:INTEGRATION_ORDERS_SECTION.JET'),
          },
          {
            key: 'UBER',
            title: t('dailySummaryPage:INTEGRATION_ORDERS_SECTION.UBER'),
          },
        ],
      },
    },
    {
      name: t('dailySummaryPage:INTEGRATION_ORDERS_SECTION.NET_REVENUE'),
      dataKey: getirMarketIntegrationTableChartKeys.netRevenue,
      divideBy: 1000,
      plotDecimalCount: currencyDecimalCount,
      defaultVisibleKeys: ['total'],
      linesConfig: {
        configs: [
          {
            key: 'GETIR',
            title: t('dailySummaryPage:INTEGRATION_ORDERS_SECTION.GETIR'),
          },
          {
            key: 'N11',
            title: t('dailySummaryPage:INTEGRATION_ORDERS_SECTION.N11'),
          },
          {
            key: 'GORILLAS',
            title: t('dailySummaryPage:INTEGRATION_ORDERS_SECTION.GORILLAS'),
          },
          {
            key: 'JET',
            title: t('dailySummaryPage:INTEGRATION_ORDERS_SECTION.JET'),
          },
          {
            key: 'UBER',
            title: t('dailySummaryPage:INTEGRATION_ORDERS_SECTION.UBER'),
          },
        ],
      },
    },
    {
      name: t('dailySummaryPage:INTEGRATION_ORDERS_SECTION.GMV'),
      dataKey: getirMarketIntegrationTableChartKeys.gmv,
      divideBy: 1000,
      plotDecimalCount: currencyDecimalCount,
      defaultVisibleKeys: ['total'],
      linesConfig: {
        configs: [
          {
            key: 'GETIR',
            title: t('dailySummaryPage:INTEGRATION_ORDERS_SECTION.GETIR'),
          },
          {
            key: 'N11',
            title: t('dailySummaryPage:INTEGRATION_ORDERS_SECTION.N11'),
          },
          {
            key: 'GORILLAS',
            title: t('dailySummaryPage:INTEGRATION_ORDERS_SECTION.GORILLAS'),
          },
          {
            key: 'JET',
            title: t('dailySummaryPage:INTEGRATION_ORDERS_SECTION.JET'),
          },
          {
            key: 'UBER',
            title: t('dailySummaryPage:INTEGRATION_ORDERS_SECTION.UBER'),
          },
        ],
      },
    },
  ];
};
