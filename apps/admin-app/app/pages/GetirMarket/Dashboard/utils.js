import moment from 'moment-timezone';
import { Tooltip, Typography } from 'antd';
import { concat, forEach, isEmpty, orderBy, sumBy, values } from 'lodash';

import { t, getLangKey } from '@shared/i18n';
import { numberFormat, percentFormatWithOneDecimal } from '@shared/utils/localization';

import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import {
  COUNTRY_IDS,
  DEVICE_TYPES,
  APP_DEVICES,
  GETIR_DOMAIN_TYPES,
  GETIR_FOOD,
  GETIR_LOCALS,
  GETIR_MARKET_DOMAIN_TYPE,
  GETIR_10_DOMAIN_TYPE,
  GETIR_FOOD_DOMAIN_TYPE,
  GETIR_VOYAGER_DOMAIN_TYPE,
  GETIR_LOCALS_DOMAIN_TYPE,
  GETIR_BITAKSI_DOMAIN_TYPE,
  GETIR_WATER_MARKETPLACE_DOMAIN_TYPE,
  GETIR_DRIVE_DOMAIN_TYPE,
  INTEGRATION_TYPES,
  GETIR_MARKET_DOMAIN_TYPES,
  LOCALS_DELIVERY,
} from '@shared/shared/constants';
import { deliveryFeeDiscountReasons, promoObjectiveTypes } from '@shared/shared/constantValues';
import { getSelectedCountryTimezone } from '@shared/redux/selectors/common';

const { Text } = Typography;

export const getInitialDateRanges = () => ({
  startDate: moment.tz(getSelectedCountryTimezone.getData()).startOf('day'),
  endDate: moment.tz(getSelectedCountryTimezone.getData()),
});

export const getIsoDateString = date => {
  const selectedCountryTimezone = getSelectedCountry().timezones[0].timezone;
  return moment.tz(date, selectedCountryTimezone).toISOString();
};

export const getHours = (hourRangeMin, hourRangeMax, timezone) => {
  const hourRange = [];

  if (!(hourRangeMin === 0 && hourRangeMax === 24)) {
    const startHour = hourRangeMin;
    const endHour = hourRangeMax;
    for (let i = startHour; i < endHour; i += 1) {
      hourRange.push(moment.tz(timezone).startOf('day').add(i, 'hours').utc()
        .hour());
    }
  }

  return hourRange;
};

export const getDataSource = ({
  totalApplicationOrderCount,
  applicationOrderCountRatio,
  totalWebOrderCount,
  webOrderCountRatio,
  totalN11QuickOrderCount,
  N11QuickOrderCountRatio,
  totalJetOrderCount,
  jetOrderCountRatio,
  totalUberOrderCount,
  uberOrderCountRatio,
  totalGorillasOrderCount,
  gorillasOrderCountRatio,
}) => [...(totalApplicationOrderCount ?
  [{
    key: '1',
    name: <Text>{t('getirMarketDashboardPage:APPLICATION')}</Text>,
    orderCount: Math.round(totalApplicationOrderCount) || 0,
    orderRatio: Math.round(applicationOrderCountRatio) || 0,
  },
  ] :
  []
),
...(totalWebOrderCount ?
  [
    {
      key: '2',
      name: <Text>{t('getirMarketDashboardPage:WEB')}</Text>,
      orderCount: Math.round(totalWebOrderCount) || 0,
      orderRatio: Math.round(webOrderCountRatio) || 0,
    },
  ] :
  []
),
...(totalJetOrderCount ?
  [
    {
      key: '3',
      name: <Text>{t('getirMarketDashboardPage:JET')}</Text>,
      orderCount: Math.round(totalJetOrderCount) || 0,
      orderRatio: Math.round(jetOrderCountRatio) || 0,
    },
  ] :
  []
),
...(totalGorillasOrderCount ?
  [
    {
      key: '4',
      name: <Text>{t('getirMarketDashboardPage:GORILLAS')}</Text>,
      orderCount: Math.round(totalGorillasOrderCount) || 0,
      orderRatio: Math.round(gorillasOrderCountRatio) || 0,
    },
  ] :
  []
),
...(totalN11QuickOrderCount ?
  [
    {
      key: '5',
      name: <Text>{t('global:GETIR_MARKET_INTEGRATION_TYPES.N11QUICK')}</Text>,
      orderCount: Math.round(totalN11QuickOrderCount) || 0,
      orderRatio: Math.round(N11QuickOrderCountRatio) || 0,
    },
  ] :
  []
),
...(totalUberOrderCount ?
  [
    {
      key: '6',
      name: <Text>{t('global:GETIR_MARKET_INTEGRATION_TYPES.UBER')}</Text>,
      orderCount: Math.round(totalUberOrderCount) || 0,
      orderRatio: Math.round(uberOrderCountRatio) || 0,
    },
  ] :
  []
)];

export const formatDeviceStats = (deviceStats, selectedDomainType) => {
  // Getir
  let totalWebOrderCount = 0;
  let totalApplicationOrderCount = 0;
  // Integrations
  let totalJetOrderCount = 0;
  let totalGorillasOrderCount = 0;
  let totalN11QuickOrderCount = 0;
  let totalUberOrderCount = 0;

  deviceStats?.forEach(stat => {
    if (stat.domainType === selectedDomainType) {
      if (stat.integrationType === INTEGRATION_TYPES.GETIR) {
        if (stat.deviceType === DEVICE_TYPES.WEB) {
          totalWebOrderCount += stat.orderCount;
        }
        else if (APP_DEVICES.includes(stat.deviceType)) {
          totalApplicationOrderCount += stat.orderCount;
        }
      }
      else if (stat.integrationType === INTEGRATION_TYPES.JET) {
        totalJetOrderCount += stat.orderCount;
      }
      else if (stat.integrationType === INTEGRATION_TYPES.N11) {
        totalN11QuickOrderCount += stat.orderCount;
      }
      else if (stat.integrationType === INTEGRATION_TYPES.GORILLAS) {
        totalGorillasOrderCount += stat.orderCount;
      }
      else if (stat.integrationType === INTEGRATION_TYPES.UBER) {
        totalUberOrderCount += stat.orderCount;
      }
    }
  });
  const totalOrderCount =
    totalWebOrderCount + totalApplicationOrderCount + totalJetOrderCount + totalN11QuickOrderCount + totalGorillasOrderCount + totalUberOrderCount;
  const webOrderCountRatio = (totalWebOrderCount / totalOrderCount) * 100;
  const applicationOrderCountRatio = (totalApplicationOrderCount / totalOrderCount) * 100;
  const jetOrderCountRatio = (totalJetOrderCount / totalOrderCount) * 100;
  const N11QuickOrderCountRatio = (totalN11QuickOrderCount / totalOrderCount) * 100;
  const gorillasOrderCountRatio = (totalGorillasOrderCount / totalOrderCount) * 100;
  const uberOrderCountRatio = (totalUberOrderCount / totalOrderCount) * 100;
  return getDataSource({
    totalApplicationOrderCount,
    applicationOrderCountRatio,
    totalWebOrderCount,
    webOrderCountRatio,
    totalN11QuickOrderCount,
    N11QuickOrderCountRatio,
    totalJetOrderCount,
    jetOrderCountRatio,
    totalGorillasOrderCount,
    gorillasOrderCountRatio,
    totalUberOrderCount,
    uberOrderCountRatio,
  });
};

export const numberFormatter = (num, maxDecimal = 0) => {
  if (!num) return 0;
  return numberFormat({ maxDecimal }).format(num);
};

export const dataSource = cardGroupDistribution => {
  const {
    masterpassCreditCardCount,
    total,
    masterpassDebitwo3DCount,
    masterpassDebitw3DCount,
    bkmCount,
    istanbulCardCount,
    adyenIdealCount,
    notChargedCount,
    adyenCreditCardCount,
    paypalCount,
    applePayCount,
    googlePayCount,
    sofortCount,
    getirMoneyOrderCount,
  } = cardGroupDistribution;

  const freeOfChargeData = {
    key: '7',
    name: t('getirMarketDashboardPage:CARD_GROUP_DIST_NOT_CHARGED'),
    count: numberFormatter(notChargedCount),
    ratio: numberFormatter((notChargedCount * 100) / total),
  };

  const rows = [];

  if (getSelectedCountry()._id === COUNTRY_IDS.TR) {
    if (masterpassCreditCardCount) {
      rows.push({
        key: '1',
        name: t('getirMarketDashboardPage:CARD_GROUP_DIST_MASSTERPASS_CREDIT_CARD'),
        count: numberFormatter(masterpassCreditCardCount),
        ratio: numberFormatter((masterpassCreditCardCount * 100) / total),
      });
    }
    if (masterpassDebitwo3DCount) {
      rows.push({
        key: '2',
        name: t('getirMarketDashboardPage:CARD_GROUP_DIST_MASSTERPASS_DEBIT_WO3D'),
        count: numberFormatter(masterpassDebitwo3DCount),
        ratio: numberFormatter((masterpassDebitwo3DCount * 100) / total),
      });
    }
    if (masterpassDebitw3DCount) {
      rows.push({
        key: '3',
        name: t('getirMarketDashboardPage:CARD_GROUP_DIST_MASSTERPASS_DEBIT_W3D'),
        count: numberFormatter(masterpassDebitw3DCount),
        ratio: numberFormatter((masterpassDebitw3DCount * 100) / total),
      });
    }
    if (bkmCount) {
      rows.push({
        key: '4',
        name: t('getirMarketDashboardPage:CARD_GROUP_DIST_BKM'),
        count: numberFormatter(bkmCount),
        ratio: numberFormatter((bkmCount * 100) / total),
      });
    }
    if (istanbulCardCount) {
      rows.push({
        key: '5',
        name: t('getirMarketDashboardPage:CARD_GROUP_DIST_ISTANBUL_CARD'),
        count: numberFormatter(istanbulCardCount),
        ratio: numberFormatter((istanbulCardCount * 100) / total),
      });
    }
    if (getirMoneyOrderCount) {
      rows.push({
        key: 'GETIR_MONEY_ORDER_COUNT',
        name: t('getirMarketDashboardPage:CARD_GROUP_DIST_GETIR_MONEY'),
        count: numberFormatter(getirMoneyOrderCount),
        ratio: numberFormatter((getirMoneyOrderCount * 100) / total),
      });
    }
    rows.push(freeOfChargeData);
    return rows;
  }

  if (adyenIdealCount) {
    rows.push({
      key: '1',
      name: t('getirMarketDashboardPage:CARD_GROUP_DIST_ADYEN_IDEAL'),
      count: numberFormatter(adyenIdealCount),
      ratio: numberFormatter((adyenIdealCount * 100) / total),
    });
  }
  if (adyenCreditCardCount) {
    rows.push({
      key: '2',
      name: t('getirMarketDashboardPage:CARD_GROUP_DIST_ADYEN_CREDIT_CARD'),
      count: numberFormatter(adyenCreditCardCount),
      ratio: numberFormatter((adyenCreditCardCount * 100) / total),
    });
  }
  if (paypalCount) {
    rows.push({
      key: 'PAYPAL_COUNT',
      name: t('getirMarketDashboardPage:CARD_GROUP_DIST_PAYPAL'),
      count: numberFormatter(paypalCount),
      ratio: numberFormatter((paypalCount * 100) / total),
    });
  }
  if (applePayCount) {
    rows.push({
      key: 'APPLE_PAY_COUNT',
      name: t('getirMarketDashboardPage:CARD_GROUP_DIST_APPLE_PAY'),
      count: numberFormatter(applePayCount),
      ratio: numberFormatter((applePayCount * 100) / total),
    });
  }
  if (googlePayCount) {
    rows.push({
      key: 'GOOGLE_PAY_COUNT',
      name: t('getirMarketDashboardPage:CARD_GROUP_DIST_GOOGLE_PAY'),
      count: numberFormatter(googlePayCount),
      ratio: numberFormatter((googlePayCount * 100) / total),
    });
  }
  if (sofortCount) {
    rows.push({
      key: 'SOFORT_COUNT',
      name: t('getirMarketDashboardPage:CARD_GROUP_DIST_SOFORT'),
      count: numberFormatter(sofortCount),
      ratio: numberFormatter((sofortCount * 100) / total),
    });
  }
  rows.push(freeOfChargeData);
  return rows;
};

export const formatCardGroupDistribution = cardStats => {
  const concatArray = concat.apply([], values(cardStats));

  const data = {
    debitOrderCount: sumBy(concatArray, 'debit_order_count'),
    debit3dOrderCount: sumBy(concatArray, 'debit_3d_order_count'),
    creditCardOrderCount: sumBy(concatArray, 'credit_card_order_count'),
    istanbulCardOrderCount: sumBy(concatArray, 'istanbul_card_order_count'),
    bkmCount: sumBy(concatArray, 'bkm_order_count'),
    adyenIdealCount: sumBy(concatArray, 'adyen_ideal_order_count'),
    adyenCreditCardCount: sumBy(concatArray, 'adyen_card_order_count'),
    notChargedCount: sumBy(concatArray, 'zero_charged_order_count'),
    paypalOrderCount: sumBy(concatArray, 'adyen_paypal_order_count'),
    applePayOrderCount: sumBy(concatArray, 'adyen_applepay_order_count'),
    googlePayOrderCount: sumBy(concatArray, 'adyen_googlepay_order_count'),
    sofortOrderCount: sumBy(concatArray, 'adyen_sofort_order_count'),
    getirMoneyOrderCount: sumBy(concatArray, 'getir_money_order_count'),
    total: sumBy(concatArray, 'order_count'),
  };

  const cardGroupDistribution = {
    notChargedCount: data.notChargedCount,
    bkmCount: data.bkmCount,
    istanbulCardCount: data.istanbulCardOrderCount,
    masterpassCreditCardCount: data.creditCardOrderCount,
    masterpassDebitw3DCount: data.debit3dOrderCount,
    masterpassDebitwo3DCount: data.debitOrderCount - data.debit3dOrderCount,
    adyenIdealCount: data.adyenIdealCount,
    adyenCreditCardCount: data.adyenCreditCardCount,
    paypalCount: data.paypalOrderCount,
    applePayCount: data.applePayOrderCount,
    googlePayCount: data.googlePayOrderCount,
    sofortCount: data.sofortOrderCount,
    getirMoneyOrderCount: data.getirMoneyOrderCount,
    total: data.total,
  };

  return dataSource(cardGroupDistribution);
};

export const formatDeliveryFeeDiscountDataSource = deliveryStats => {
  let totalDeliveryFeeDiscountCount = 0;
  let totalOrderCount = 0;
  const discountReasonsMap = {};
  forEach(deliveryStats, ({ discountReason: discountReasonId, orderCount }) => {
    if (discountReasonId !== 0) {
      totalDeliveryFeeDiscountCount += orderCount;
    }

    totalOrderCount += orderCount;

    const discount = discountReasonsMap[discountReasonId];
    if (!isEmpty(discount)) {
      discountReasonsMap[discountReasonId].orderCount += orderCount;
    }
    else {
      discountReasonsMap[discountReasonId] = {
        discountReasonId,
        orderCount,
      };
    }
  });

  const discountReasons = values(discountReasonsMap);

  const discountReasonsDataSource = [];
  discountReasons?.forEach((reason, index) => {
    if (reason.discountReasonId === 0) {
      return;
    }
    discountReasonsDataSource.push({
      key: index,
      name: deliveryFeeDiscountReasons?.[reason.discountReasonId]?.[getLangKey()] || 'N/A',
      count: reason.orderCount || 0,
      ratio: numberFormatter((reason.orderCount / totalOrderCount) * 100),
    });
  });
  discountReasonsDataSource.push({
    key: 'total',
    name: '',
    count: <Text strong>{numberFormatter(totalDeliveryFeeDiscountCount)}</Text>,
    ratio: <Text strong>{numberFormatter((totalDeliveryFeeDiscountCount / totalOrderCount) * 100)}</Text>,
  });

  return orderBy(discountReasonsDataSource, ['count'], ['desc']);
};

export const formatPromoTableData = (promoStatistics, selectedRows) => {
  const promoTableData = [
    {
      name: t('getirMarketDashboardPage:ORGANIC_ORDER'),
      count: numberFormatter(promoStatistics.organicOrders),
      ratio: numberFormatter((promoStatistics.organicOrders / promoStatistics.totalOrder) * 100),
    },
    {
      name: t('getirMarketDashboardPage:PROMO_ORDER'),
      count: numberFormatter(promoStatistics.usedPromoOrders),
      ratio: numberFormatter((promoStatistics.usedPromoOrders / promoStatistics.totalOrder) * 100),
    },
    {
      name: t('getirMarketDashboardPage:PROMO_USED_COUNT'),
      count: numberFormatter(promoStatistics.usedTotalPromoCounts),
      ratio: '-',
    },
    {
      name: 'GETIR_FINANCED',
      count: numberFormatter(promoStatistics.getirFinancedCount),
      ratio: numberFormatter((promoStatistics.getirFinancedCount / promoStatistics.usedTotalPromoCounts) * 100),
    },
    {
      name: 'SUPPLIER_SUPPORTED',
      count: numberFormatter(promoStatistics.supplierSupportedCount),
      ratio: numberFormatter((promoStatistics.supplierSupportedCount / promoStatistics.usedTotalPromoCounts) * 100),
    },
    {
      name: 'THIRD_PARTY_SUPPORTED',
      count: numberFormatter(promoStatistics.thirdPartySupportedCount),
      ratio: numberFormatter((promoStatistics.thirdPartySupportedCount / promoStatistics.usedTotalPromoCounts) * 100),
    },
  ];

  if (!promoStatistics.data) return promoTableData;
  Object.entries(promoStatistics.data).forEach(([code, promo], i) => {
    promoTableData.push({
      name: promoObjectiveTypes[code]?.[getLangKey()] || 'N/A',
      count: numberFormatter(promo.orderCount),
      ratio: numberFormatter((promo.orderCount / promoStatistics.totalOrder) * 100),
      type: 'dropdown',
      index: i,
      objectiveType: Number(code),
    });
    if (selectedRows.has(i)) {
      promo.items?.forEach(promoItem => {
        promoTableData.push({
          name: promoItem.promoCode,
          count: numberFormatter(promoItem.orderCount),
          ratio: numberFormatter((promoItem.orderCount / promoStatistics.totalOrder) * 100),
        });
      });
    }
  });

  return promoTableData;
};

const statsTemplate = {
  orderCount: 0,
  missedOrderCount: 0,
  netRevenue: 0,
  scheduledOrderCount: 0,
};

const calculateDomainTotals = (domainStats, domainType) => {
  const totals = { ...statsTemplate };
  totals.restaurantDelivery = { ...statsTemplate };
  totals.getirDelivery = { ...statsTemplate };
  totals.getirLocalsStoreDelivery = { ...statsTemplate };
  totals.getirLocalsGetirDelivery = { ...statsTemplate };

  forEach(domainStats, warehouseStats => {
    if (GETIR_MARKET_DOMAIN_TYPES.includes(Number(domainType))) {
      totals.orderCount += warehouseStats.orderCount || 0;
      totals.missedOrderCount += warehouseStats.missedOrderCount || 0;
      totals.netRevenue += warehouseStats.netRevenueTaxExcluded || 0;
      totals.scheduledOrderCount += warehouseStats.scheduledOrderCount || 0;
    }
    else {
      totals.orderCount += warehouseStats.order_count || 0;
      totals.missedOrderCount += warehouseStats.missed_order_count || 0;
      totals.netRevenue += warehouseStats.net_revenue_tax_excluded || 0;
      totals.scheduledOrderCount += warehouseStats.scheduledOrderCount || 0;
    }

    if (domainType === GETIR_DOMAIN_TYPES.FOOD.toString()) {
      if (warehouseStats.order_delivery_type === GETIR_FOOD.DELIVERY_TYPES.RESTAURANT) {
        totals.restaurantDelivery.orderCount += warehouseStats.order_count || 0;
        totals.restaurantDelivery.missedOrderCount += warehouseStats.missed_order_count || 0;
        totals.restaurantDelivery.netRevenue += warehouseStats.net_revenue_tax_excluded || 0;
      }
      else if (warehouseStats.order_delivery_type === GETIR_FOOD.DELIVERY_TYPES.GETIR) {
        totals.getirDelivery.orderCount += warehouseStats.order_count || 0;
        totals.getirDelivery.missedOrderCount += warehouseStats.missed_order_count || 0;
        totals.getirDelivery.netRevenue += warehouseStats.net_revenue_tax_excluded || 0;
      }
    }

    if (domainType === GETIR_DOMAIN_TYPES.LOCALS.toString()) {
      if (warehouseStats.order_delivery_type === GETIR_LOCALS.DELIVERY_TYPES.STORE) {
        totals.getirLocalsStoreDelivery.orderCount += warehouseStats.order_count || 0;
        totals.getirLocalsStoreDelivery.missedOrderCount += warehouseStats.missed_order_count || 0;
        totals.getirLocalsStoreDelivery.netRevenue += warehouseStats.net_revenue_tax_excluded || 0;
      }
      else if (warehouseStats.order_delivery_type === GETIR_LOCALS.DELIVERY_TYPES.GETIR) {
        totals.getirLocalsGetirDelivery.orderCount += warehouseStats.order_count || 0;
        totals.getirLocalsGetirDelivery.missedOrderCount += warehouseStats.missed_order_count || 0;
        totals.getirLocalsGetirDelivery.netRevenue += warehouseStats.net_revenue_tax_excluded || 0;
      }
    }
  });
  return totals;
};

const calculateTotals = ({
  otherDomainWarehouseStats,
  waterMarketplaceData,
  getirMarketWarehouseData,
  locals,
}) => {
  const totals = {
    total: { ...statsTemplate },
    [GETIR_DOMAIN_TYPES.GETIR10]: {},
    [GETIR_DOMAIN_TYPES.MARKET]: {},
    [GETIR_DOMAIN_TYPES.FOOD]: {},
    [GETIR_DOMAIN_TYPES.VOYAGER]: {},
    [GETIR_DOMAIN_TYPES.LOCALS]: {},
    restaurantDelivery: { ...statsTemplate },
    getirDelivery: { ...statsTemplate },
    getirLocalsStoreDelivery: { ...statsTemplate },
    getirLocalsGetirDelivery: { ...statsTemplate },
  };
  forEach({ ...otherDomainWarehouseStats, ...getirMarketWarehouseData }, (domainStats, domainType) => {
    totals[domainType] = calculateDomainTotals(domainStats, domainType);

    if (!GETIR_MARKET_DOMAIN_TYPES.includes(Number(domainType))) {
      totals.restaurantDelivery.orderCount += totals[domainType].restaurantDelivery.orderCount;
      totals.restaurantDelivery.missedOrderCount += totals[domainType].restaurantDelivery.missedOrderCount;
      totals.restaurantDelivery.netRevenue += totals[domainType].restaurantDelivery.netRevenue;

      totals.getirLocalsStoreDelivery.orderCount += totals[domainType].getirLocalsStoreDelivery.orderCount;
      totals.getirLocalsStoreDelivery.missedOrderCount += totals[domainType].getirLocalsStoreDelivery.missedOrderCount;
      totals.getirLocalsStoreDelivery.netRevenue += totals[domainType].getirLocalsStoreDelivery.netRevenue;

      totals.getirDelivery.orderCount += totals[domainType].getirDelivery.orderCount;
      totals.getirDelivery.missedOrderCount += totals[domainType].getirDelivery.missedOrderCount;
      totals.getirDelivery.netRevenue += totals[domainType].getirDelivery.netRevenue;

      totals.getirLocalsGetirDelivery.orderCount += totals[domainType].getirLocalsGetirDelivery.orderCount;
      totals.getirLocalsGetirDelivery.missedOrderCount += totals[domainType].getirLocalsGetirDelivery.missedOrderCount;
      totals.getirLocalsGetirDelivery.netRevenue += totals[domainType].getirLocalsGetirDelivery.netRevenue;
    }

    totals.total.orderCount += totals[domainType].orderCount;
    totals.total.missedOrderCount += totals[domainType].missedOrderCount;
    totals.total.netRevenue += totals[domainType].netRevenue;
  });
  totals.total.orderCount += waterMarketplaceData?.successfulOrderCount || 0;
  totals.total.missedOrderCount += waterMarketplaceData?.missedOrderCount || 0;
  totals.total.netRevenue += waterMarketplaceData?.netRevenue || 0;

  totals.total.orderCount += locals.orderCount || 0;
  totals.total.missedOrderCount += locals.missedOrderCount || 0;
  totals.total.netRevenue += locals.netRevenue || 0;

  return totals;
};

const formatMoovStats = ({ data }) => {
  const moovStatsTemplate = {
    rentCount: 0,
    missedRentCount: 0,
    netRevenue: 0,
  };

  forEach(data, value => {
    moovStatsTemplate.rentCount += value.rental_count || 0;
    moovStatsTemplate.missedRentCount += value.missed_rental_count || 0;
    moovStatsTemplate.netRevenue += value.net_revenue_tax_excluded || 0;
  });
  return moovStatsTemplate;
};

export const formatWarehouseStatsTable = ({
  currentData = {},
  previousData = {},
  classes,
  availableDomainTypes,
  getirMarketWarehouseStats,
}) => {
  const current = calculateTotals({
    otherDomainWarehouseStats: currentData.warehouseData,
    waterMarketplaceData: currentData.waterMarketplaceData,
    getirMarketWarehouseData: getirMarketWarehouseStats?.current?.data || {},
    locals: currentData?.locals?.total || {},
  }) || {};
  const previous = calculateTotals({
    otherDomainWarehouseStats: previousData.warehouseData,
    waterMarketplaceData: previousData.waterMarketplaceData,
    getirMarketWarehouseData: getirMarketWarehouseStats?.previous?.data || {},
    locals: currentData?.locals?.total || {},
  }) || {};
  const currentMoovData = formatMoovStats(currentData.moovData) || {};
  const previousMoovData = formatMoovStats(previousData.moovData) || {};
  const { GETIR10, MARKET, FOOD, VOYAGER } = GETIR_DOMAIN_TYPES;

  const orderAndRevenueRowFormatter = (currentRowData, previousRowData) => {
    let textColor = classes.textNeutral;
    if (currentRowData > previousRowData) {
      textColor = classes.textSuccess;
    }
    else if (currentRowData < previousRowData) {
      textColor = classes.textDanger;
    }
    return (
      <span className={textColor}>
        {percentFormatWithOneDecimal.format(((currentRowData - previousRowData) / previousRowData) || 0)}
      </span>
    );
  };
  const formattedRows = [
    {
      key: 1,
      name: (
        <Tooltip title={t('getirMarketDashboardPage:ORDER_GROWTH_SUMMARY_TOTAL_TOOLTIP')}>
          <Text>
            {t('global:TOTAL')}
          </Text>
        </Tooltip>
      ),
      order: numberFormatter(current.total?.orderCount),
      orderRatio: orderAndRevenueRowFormatter(current.total?.orderCount, previous.total?.orderCount),
      missedOrder: numberFormatter(current.total?.missedOrderCount),
      missedOrderRatio: percentFormatWithOneDecimal.format(
        (
          ((current.total?.missedOrderCount || 0)) /
          ((current.total?.missedOrderCount || 0) + (current.total?.orderCount || 0))
        ) || 0,
      ),
      netRevenue: numberFormatter(current.total?.netRevenue),
      netRevenueRatio: orderAndRevenueRowFormatter(current.total?.netRevenue, previous.total?.netRevenue),
    },
    {
      key: 2,
      name: t('global:GETIR_MARKET_DOMAIN_TYPES:1'),
      order: numberFormatter(current[GETIR10]?.orderCount),
      orderRatio: orderAndRevenueRowFormatter(current[GETIR10]?.orderCount, previous[GETIR10]?.orderCount),
      missedOrder: numberFormatter(current[GETIR10]?.missedOrderCount),
      missedOrderRatio: percentFormatWithOneDecimal.format(
        (
          (current[GETIR10]?.missedOrderCount ?? 0) /
          ((current[GETIR10]?.missedOrderCount ?? 0) + (current[GETIR10]?.orderCount ?? 0))
        ) || 0,
      ),
      netRevenue: numberFormatter(current[GETIR10]?.netRevenue),
      netRevenueRatio: orderAndRevenueRowFormatter(current[GETIR10]?.netRevenue, previous[GETIR10]?.netRevenue),
      domainType: GETIR_10_DOMAIN_TYPE,
    },
    {
      key: 3,
      name: (
        <Tooltip title={t('getirMarketDashboardPage:SCHEDULED_ORDER_COUNT_TOOLTIP', { scheduledOrderCount: current[MARKET]?.scheduledOrderCount || 0 })}>
          <Text>
            {t('global:GETIR_MARKET_DOMAIN_TYPES:3')}
          </Text>
        </Tooltip>
      ),
      order: (
        <Tooltip title={t('getirMarketDashboardPage:SCHEDULED_ORDER_COUNT_TOOLTIP', { scheduledOrderCount: current[MARKET]?.scheduledOrderCount || 0 })}>
          <Text>
            {numberFormatter(current[MARKET]?.orderCount)}
          </Text>
        </Tooltip>
      ),
      orderRatio: orderAndRevenueRowFormatter(current[MARKET]?.orderCount, previous[MARKET]?.orderCount),
      missedOrder: numberFormatter(current[MARKET]?.missedOrderCount),
      missedOrderRatio: percentFormatWithOneDecimal.format(
        (
          (current[MARKET]?.missedOrderCount ?? 0) /
          ((current[MARKET]?.missedOrderCount ?? 0) + (current[MARKET]?.orderCount ?? 0))
        ) || 0,
      ),
      netRevenue: numberFormatter(current[MARKET]?.netRevenue),
      netRevenueRatio: orderAndRevenueRowFormatter(current[MARKET]?.netRevenue, previous[MARKET]?.netRevenue),
      domainType: GETIR_MARKET_DOMAIN_TYPE,
    },
    {
      key: 4,
      name: t('global:GETIR_MARKET_DOMAIN_TYPES:2'),
      order: numberFormatter(current[FOOD]?.orderCount),
      orderRatio: orderAndRevenueRowFormatter(current[FOOD]?.orderCount, previous[FOOD]?.orderCount),
      missedOrder: numberFormatter(current[FOOD]?.missedOrderCount),
      missedOrderRatio: percentFormatWithOneDecimal.format(
        (
          (current[FOOD]?.missedOrderCount ?? 0) /
          ((current[FOOD]?.missedOrderCount ?? 0) + (current[FOOD]?.orderCount ?? 0))
        ) || 0,
      ),
      netRevenue: numberFormatter(current[FOOD]?.netRevenue),
      netRevenueRatio: orderAndRevenueRowFormatter(current[FOOD]?.netRevenue, previous[FOOD]?.netRevenue),
      domainType: GETIR_FOOD_DOMAIN_TYPE,
    },
    {
      key: 5,
      name: t('getirMarketDashboardPage:GF_RESTAURANT_DELIVERY'),
      order: numberFormatter(current.restaurantDelivery?.orderCount),
      orderRatio: orderAndRevenueRowFormatter(current.restaurantDelivery?.orderCount, previous.restaurantDelivery?.orderCount),
      missedOrder: numberFormatter(current.restaurantDelivery?.missedOrderCount),
      missedOrderRatio: percentFormatWithOneDecimal.format(
        (
          (current.restaurantDelivery?.missedOrderCount ?? 0) /
          ((current.restaurantDelivery?.missedOrderCount ?? 0) + (current.restaurantDelivery?.orderCount ?? 0))
        ) || 0,
      ),
      netRevenue: numberFormatter(current.restaurantDelivery?.netRevenue),
      netRevenueRatio: orderAndRevenueRowFormatter(current.restaurantDelivery?.netRevenue, previous.restaurantDelivery?.netRevenue),
      domainType: GETIR_FOOD_DOMAIN_TYPE,
    },
    {
      key: 6,
      name: t('getirMarketDashboardPage:GF_GETIR_DELIVERY'),
      order: numberFormatter(current.getirDelivery?.orderCount),
      orderRatio: orderAndRevenueRowFormatter(current.getirDelivery?.orderCount, previous.getirDelivery?.orderCount),
      missedOrder: numberFormatter(current.getirDelivery?.missedOrderCount),
      missedOrderRatio: percentFormatWithOneDecimal.format(
        (
          (current.getirDelivery?.missedOrderCount ?? 0) /
          ((current.getirDelivery?.missedOrderCount ?? 0) + (current.getirDelivery?.orderCount ?? 0))
        ) || 0,
      ),
      netRevenue: numberFormatter(current.getirDelivery?.netRevenue),
      netRevenueRatio: orderAndRevenueRowFormatter(current.getirDelivery?.netRevenue, previous.getirDelivery?.netRevenue),
      domainType: GETIR_FOOD_DOMAIN_TYPE,
    },
    {
      key: 7,
      name: (
        <Tooltip title={t('getirMarketDashboardPage:SCHEDULED_ORDER_COUNT_TOOLTIP', { scheduledOrderCount: current[VOYAGER]?.scheduledOrderCount || 0 })}>
          <Text>
            {t('global:GETIR_MARKET_DOMAIN_TYPES:4')}
          </Text>
        </Tooltip>
      ),
      order: (
        <Tooltip title={t('getirMarketDashboardPage:SCHEDULED_ORDER_COUNT_TOOLTIP', { scheduledOrderCount: current[VOYAGER]?.scheduledOrderCount || 0 })}>
          <Text>
            {numberFormatter(current[VOYAGER]?.orderCount)}
          </Text>
        </Tooltip>
      ),
      orderRatio: orderAndRevenueRowFormatter(current[VOYAGER]?.orderCount, previous[VOYAGER]?.orderCount),
      missedOrder: numberFormatter(current[VOYAGER]?.missedOrderCount),
      missedOrderRatio: percentFormatWithOneDecimal.format(
        (
          (current[VOYAGER]?.missedOrderCount ?? 0) /
          ((current[VOYAGER]?.missedOrderCount ?? 0) + (current[VOYAGER]?.orderCount ?? 0))
        ) || 0,
      ),
      netRevenue: numberFormatter(current[VOYAGER]?.netRevenue),
      netRevenueRatio: orderAndRevenueRowFormatter(current[VOYAGER]?.netRevenue, previous[VOYAGER]?.netRevenue),
      domainType: GETIR_VOYAGER_DOMAIN_TYPE,
    },
    {
      key: 8,
      name: t('global:GETIR_MARKET_DOMAIN_TYPES:6'),
      order: numberFormatter(currentData.locals?.total?.orderCount),
      orderRatio: orderAndRevenueRowFormatter(currentData.locals?.total?.orderCount, previousData.locals?.total?.orderCount),
      missedOrder: numberFormatter(currentData.locals?.total?.missedOrderCount),
      missedOrderRatio: percentFormatWithOneDecimal.format(
        (
          (currentData.locals?.total?.missedOrderCount ?? 0) /
          ((currentData.locals?.total?.missedOrderCount ?? 0) + (currentData.locals?.total?.orderCount ?? 0))
        ) || 0,
      ),
      netRevenue: numberFormatter(currentData.locals?.total?.netRevenue),
      netRevenueRatio: orderAndRevenueRowFormatter(currentData.locals?.total?.netRevenue, previousData.locals?.total?.netRevenue),
      domainType: GETIR_LOCALS_DOMAIN_TYPE,
    },
    {
      key: 9,
      name: t('getirMarketDashboardPage:GETIR_LOCALS_STORE_DELIVERY'),
      order: numberFormatter(currentData.locals?.[LOCALS_DELIVERY.STORE]?.orderCount),
      orderRatio: orderAndRevenueRowFormatter(
        currentData.locals?.[LOCALS_DELIVERY.STORE]?.orderCount,
        previousData.locals?.[LOCALS_DELIVERY.STORE]?.orderCount,
      ),
      missedOrder: numberFormatter(currentData.locals?.[LOCALS_DELIVERY.STORE]?.missedOrderCount),
      missedOrderRatio: percentFormatWithOneDecimal.format(
        (
          (currentData.locals?.[LOCALS_DELIVERY.STORE]?.missedOrderCount ?? 0) /
          ((currentData.locals?.[LOCALS_DELIVERY.STORE]?.missedOrderCount ?? 0) + (currentData.locals?.[LOCALS_DELIVERY.STORE]?.orderCount ?? 0))
        ) || 0,
      ),
      netRevenue: numberFormatter(currentData.locals?.[LOCALS_DELIVERY.STORE]?.netRevenue),
      netRevenueRatio: orderAndRevenueRowFormatter(
        currentData.locals?.[LOCALS_DELIVERY.STORE]?.netRevenue,
        previousData.locals?.[LOCALS_DELIVERY.STORE]?.netRevenue,
      ),
      domainType: GETIR_LOCALS_DOMAIN_TYPE,
    },
    {
      key: 10,
      name: t('getirMarketDashboardPage:GETIR_LOCALS_GETIR_DELIVERY'),
      order: numberFormatter(currentData.locals?.[LOCALS_DELIVERY.GETIR]?.orderCount),
      orderRatio: orderAndRevenueRowFormatter(
        currentData.locals?.[LOCALS_DELIVERY.GETIR]?.orderCount,
        previousData.locals?.[LOCALS_DELIVERY.GETIR]?.orderCount,
      ),
      missedOrder: numberFormatter(currentData.locals?.[LOCALS_DELIVERY.GETIR]?.missedOrderCount),
      missedOrderRatio: percentFormatWithOneDecimal.format(
        (
          (currentData.locals?.[LOCALS_DELIVERY.GETIR]?.missedOrderCount ?? 0) /
          ((currentData.locals?.[LOCALS_DELIVERY.GETIR]?.missedOrderCount ?? 0) + (currentData.locals?.[LOCALS_DELIVERY.GETIR]?.orderCount ?? 0))
        ) || 0,
      ),
      netRevenue: numberFormatter(currentData.locals?.[LOCALS_DELIVERY.GETIR]?.netRevenue),
      netRevenueRatio: orderAndRevenueRowFormatter(
        currentData.locals?.[LOCALS_DELIVERY.GETIR]?.netRevenue,
        previousData.locals?.[LOCALS_DELIVERY.GETIR]?.netRevenue,
      ),
      domainType: GETIR_LOCALS_DOMAIN_TYPE,
    },
    {
      key: 11,
      name: t('getirMarketDashboardPage:GETIR_WATER_MARKETPLACE_SHORT'),
      order: numberFormatter(currentData.waterMarketplaceData?.successfulOrderCount),
      orderRatio: orderAndRevenueRowFormatter(currentData.waterMarketplaceData?.successfulOrderCount, previousData.waterMarketplaceData?.successfulOrderCount),
      missedOrder: numberFormatter(currentData.waterMarketplaceData?.missedOrderCount),
      missedOrderRatio: percentFormatWithOneDecimal.format(
        (
          (currentData.waterMarketplaceData?.missedOrderCount ?? 0) /
          ((currentData.waterMarketplaceData?.missedOrderCount ?? 0) + (currentData.waterMarketplaceData?.successfulOrderCount ?? 0))
        ) || 0,
      ),
      netRevenue: numberFormatter(currentData.waterMarketplaceData?.netRevenue),
      netRevenueRatio: orderAndRevenueRowFormatter(currentData.waterMarketplaceData?.netRevenue, previousData.waterMarketplaceData?.netRevenue),
      domainType: GETIR_WATER_MARKETPLACE_DOMAIN_TYPE,
    },
    {
      key: 12,
      name: t('global:GETIR_DRIVE_EXTERNAL_SOURCE.MOOV'),
      order: numberFormatter(currentMoovData?.rentCount),
      orderRatio: orderAndRevenueRowFormatter(currentMoovData?.rentCount, previousMoovData?.rentCount),
      missedOrder: numberFormatter(currentMoovData?.missedRentCount),
      missedOrderRatio: percentFormatWithOneDecimal.format(
        (
          (currentMoovData?.missedRentCount ?? 0) /
          ((currentMoovData?.missedRentCount ?? 0) + (currentMoovData?.rentCount ?? 0))
        ) || 0,
      ),
      netRevenue: numberFormatter(currentMoovData?.netRevenue),
      netRevenueRatio: orderAndRevenueRowFormatter(currentMoovData?.netRevenue, previousMoovData?.netRevenue),
      domainType: GETIR_DRIVE_DOMAIN_TYPE,
    },
    {
      key: 13,
      name: t('global:GETIR_DRIVE_EXTERNAL_SOURCE.BITAKSI'),
      order: numberFormatter(currentData.biTaksiData?.successfulOrderCount),
      orderRatio: orderAndRevenueRowFormatter(currentData.biTaksiData?.successfulOrderCount, previousData.biTaksiData?.successfulOrderCount),
      missedOrder: numberFormatter(currentData.biTaksiData?.missedOrderCount),
      missedOrderRatio: percentFormatWithOneDecimal.format(
        (
          (currentData.biTaksiData?.missedOrderCount ?? 0) /
          ((currentData.biTaksiData?.missedOrderCount ?? 0) + (currentData.biTaksiData?.successfulOrderCount ?? 0))
        ) || 0,
      ),
      netRevenue: numberFormatter(currentData.biTaksiData?.netRevenue),
      netRevenueRatio: orderAndRevenueRowFormatter(currentData.biTaksiData?.netRevenue, previousData.biTaksiData?.netRevenue),
      domainType: GETIR_BITAKSI_DOMAIN_TYPE,
    },
  ];
  let filteredFormattedRows = formattedRows;

  if (!isEmpty(availableDomainTypes)) {
    filteredFormattedRows = formattedRows.filter(item => {
      if ('domainType' in item && !availableDomainTypes.includes(item.domainType)) return null;

      return item;
    });
  }

  return filteredFormattedRows;
};
