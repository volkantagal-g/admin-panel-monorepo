import { getLangKey } from '@shared/i18n';
import {
  PAYMENT_METHOD, ADDRESS_TYPE, PROMO_OBJECTIVE_TYPE, PROMO_FINANCED_BY, GETIR_MARKET_QUEUE_STATUS,
  MARKET_ACTIVE_ORDER_STATUS,
} from '@shared/shared/constants';
import { paymentMethods, addressTypesShort, promoFinancedBy, promoObjectiveTypes } from '@shared/shared/constantValues';
import { FILTER_FIELD_NAMES, PROMO_OPTIONS, UNKNOWN_TYPE, UNKNOWN_VALUE } from '../../redux/reducer';

export const CHART_COLUMNS_NAME = t => {
  return {
    [UNKNOWN_TYPE]: t('UNKNOWN'),
    promo: {
      promo: t('activeOrdersForExecutiveDashboardPage:PROMO_ONLY'),
      organic: t('activeOrdersForExecutiveDashboardPage:ORGANIC_ONLY'),
    },
    paymentType: {
      [PAYMENT_METHOD.MASTER_PASS]: paymentMethods[PAYMENT_METHOD.MASTER_PASS][getLangKey()],
      [PAYMENT_METHOD.BKM]: paymentMethods[PAYMENT_METHOD.BKM][getLangKey()],
      [PAYMENT_METHOD.ON_DELIVERY_CREDIT_CARD]: paymentMethods[PAYMENT_METHOD.ON_DELIVERY_CREDIT_CARD][getLangKey()],
      [PAYMENT_METHOD.CASH]: paymentMethods[PAYMENT_METHOD.CASH][getLangKey()],
      [PAYMENT_METHOD.ISTANBUL_CARD]: paymentMethods[PAYMENT_METHOD.ISTANBUL_CARD][getLangKey()],
      [PAYMENT_METHOD.ADYEN]: paymentMethods[PAYMENT_METHOD.ADYEN][getLangKey()],
      [PAYMENT_METHOD.MULTINET_CARD]: paymentMethods[PAYMENT_METHOD.MULTINET_CARD][getLangKey()],
      [PAYMENT_METHOD.SODEXO_CARD]: paymentMethods[PAYMENT_METHOD.SODEXO_CARD][getLangKey()],
      [PAYMENT_METHOD.SODEXO_VOUCHER]: paymentMethods[PAYMENT_METHOD.SODEXO_VOUCHER][getLangKey()],
      [PAYMENT_METHOD.TICKET_CARD]: paymentMethods[PAYMENT_METHOD.TICKET_CARD][getLangKey()],
      [PAYMENT_METHOD.TICKET_VOUCHER]: paymentMethods[PAYMENT_METHOD.TICKET_VOUCHER][getLangKey()],
      [PAYMENT_METHOD.SETCARD_CARD]: paymentMethods[PAYMENT_METHOD.SETCARD_CARD][getLangKey()],
      // [PAYMENT_METHOD.METROPOL_CARD]: paymentMethods[PAYMENT_METHOD.METROPOL_CARD][getLangKey()],
      // [PAYMENT_METHOD.PAYE_CARD]: paymentMethods[PAYMENT_METHOD.PAYE_CARD][getLangKey()],
    },
    addressType: {
      [ADDRESS_TYPE.HOME]: addressTypesShort[ADDRESS_TYPE.HOME][getLangKey()],
      [ADDRESS_TYPE.OFFICE]: addressTypesShort[ADDRESS_TYPE.OFFICE][getLangKey()],
      [ADDRESS_TYPE.OTHER]: addressTypesShort[ADDRESS_TYPE.OTHER][getLangKey()],
    },
    promoType: {
      [PROMO_OBJECTIVE_TYPE.ACQUISITION]: promoObjectiveTypes[PROMO_OBJECTIVE_TYPE.ACQUISITION][getLangKey()],
      [PROMO_OBJECTIVE_TYPE.HABIT_BUILDING]: promoObjectiveTypes[PROMO_OBJECTIVE_TYPE.HABIT_BUILDING][getLangKey()],
      [PROMO_OBJECTIVE_TYPE.UPSELL_FREQUENCY]: promoObjectiveTypes[PROMO_OBJECTIVE_TYPE.UPSELL_FREQUENCY][getLangKey()],
      [PROMO_OBJECTIVE_TYPE.UPSELL_BASKET]: promoObjectiveTypes[PROMO_OBJECTIVE_TYPE.UPSELL_BASKET][getLangKey()],
      [PROMO_OBJECTIVE_TYPE.ACTIVATION_WATCH_OUT]: promoObjectiveTypes[PROMO_OBJECTIVE_TYPE.ACTIVATION_WATCH_OUT][getLangKey()],
      [PROMO_OBJECTIVE_TYPE.ACTIVATION_RE_ACTIVATE_CHURN]:
        promoObjectiveTypes[PROMO_OBJECTIVE_TYPE.ACTIVATION_RE_ACTIVATE_CHURN][getLangKey()],
      [PROMO_OBJECTIVE_TYPE.ACTIVATION_RE_ACTIVATE_COHORT]:
        promoObjectiveTypes[PROMO_OBJECTIVE_TYPE.ACTIVATION_RE_ACTIVATE_COHORT][getLangKey()],
      [PROMO_OBJECTIVE_TYPE.BURN_BAYI_MUTLULUK]: promoObjectiveTypes[PROMO_OBJECTIVE_TYPE.BURN_BAYI_MUTLULUK][getLangKey()],
      [PROMO_OBJECTIVE_TYPE.DISCOUNT_CODE]: promoObjectiveTypes[PROMO_OBJECTIVE_TYPE.DISCOUNT_CODE][getLangKey()],
      [PROMO_OBJECTIVE_TYPE.WASTE]: promoObjectiveTypes[PROMO_OBJECTIVE_TYPE.WASTE][getLangKey()],
      [PROMO_OBJECTIVE_TYPE.RAF_SENDER]: promoObjectiveTypes[PROMO_OBJECTIVE_TYPE.RAF_SENDER][getLangKey()],
      [PROMO_OBJECTIVE_TYPE.GETIR_SELECT]: promoObjectiveTypes[PROMO_OBJECTIVE_TYPE.GETIR_SELECT][getLangKey()],
    },
    promoFinanced: {
      [PROMO_FINANCED_BY.SUPPLIER]: promoFinancedBy[PROMO_FINANCED_BY.SUPPLIER][getLangKey()],
      [PROMO_FINANCED_BY.THIRD_PARTY]: promoFinancedBy[PROMO_FINANCED_BY.THIRD_PARTY][getLangKey()],
      [PROMO_FINANCED_BY.GETIR]: promoFinancedBy[PROMO_FINANCED_BY.GETIR][getLangKey()],
    },
    queueStatus: {
      [GETIR_MARKET_QUEUE_STATUS.NOT_INVOLVED]: t(
        `activeOrdersForExecutiveDashboardPage:MARKET_QUEUE_STATUS:${GETIR_MARKET_QUEUE_STATUS.NOT_INVOLVED}`,
      ),
      [GETIR_MARKET_QUEUE_STATUS.QUESTION_ASKED]: t(
        `activeOrdersForExecutiveDashboardPage:MARKET_QUEUE_STATUS:${GETIR_MARKET_QUEUE_STATUS.QUESTION_ASKED}`,
      ),
      [GETIR_MARKET_QUEUE_STATUS.ENQUEUED]: t(
        `activeOrdersForExecutiveDashboardPage:MARKET_QUEUE_STATUS:${GETIR_MARKET_QUEUE_STATUS.ENQUEUED}`,
      ),
      [GETIR_MARKET_QUEUE_STATUS.DEQUEUED]: t(
        `activeOrdersForExecutiveDashboardPage:MARKET_QUEUE_STATUS:${GETIR_MARKET_QUEUE_STATUS.DEQUEUED}`,
      ),
    },
    orderStatus: Object.keys(MARKET_ACTIVE_ORDER_STATUS).reduce((acc, key) => {
      // { 375: 'Waiting For Picker', 400: '...', ... }
      acc[MARKET_ACTIVE_ORDER_STATUS[key]] = t(`global:MARKET_ORDER_STATUSES:${key}`);
      return acc;
    }, {}),
  };
};

export const CHART_COLUMNS_TITLE = t => ({
  promo: t('activeOrdersForExecutiveDashboardPage:PROMO_DIST'),
  paymentType: t('activeOrdersForExecutiveDashboardPage:PAYMENT_TYPE'),
  addressType: t('activeOrdersForExecutiveDashboardPage:ADDRESS_TYPE'),
  promoType: t('activeOrdersForExecutiveDashboardPage:PROMO_OBJECTIVE_TYPE'),
  promoFinanced: t('activeOrdersForExecutiveDashboardPage:PROMO_FINANCED'),
  queueStatus: t('activeOrdersForExecutiveDashboardPage:QUEUE_STATUS'),
  orderStatus: t('global:STATUS'),
});

// Field name same from redux chart filters state
const TEMPLATE = {
  promo: (promoCountData, organicCountData, t) => {
    const option = {
      title: CHART_COLUMNS_TITLE(t).promo,
      fieldName: FILTER_FIELD_NAMES.promo,
      seriesOption: { data: [] },
    };

    if (!promoCountData?.length && !organicCountData?.length) {
      return option;
    }

    if (promoCountData[0]?.totalOrderCount) {
      option.seriesOption.data.push({
        name: t('global:PROMO'),
        filterValue: PROMO_OPTIONS.promo,
        y: promoCountData[0].totalOrderCount,
      });
    }

    if (organicCountData[0]?.totalOrderCount) {
      option.seriesOption.data.push({
        name: t('global:ORGANIC'),
        filterValue: PROMO_OPTIONS.organic,
        y: organicCountData[0]?.totalOrderCount || 0,
      });
    }

    return option;
  },

  paymentType: (paymentsData, t) => {
    const option = {
      title: CHART_COLUMNS_TITLE(t).paymentType,
      fieldName: FILTER_FIELD_NAMES.paymentType,
      seriesOption: { data: [] },
    };
    if (!paymentsData) return option;

    paymentsData.forEach(paymentTypeRecord => {
      const dataItem = {
        name: CHART_COLUMNS_NAME(t).paymentType[paymentTypeRecord._id],
        filterValue: paymentTypeRecord._id,
        y: paymentTypeRecord.totalOrderCount,
      };
      option.seriesOption.data.push(dataItem);
    });

    return option;
  },

  addressType: (addressData, t) => {
    const option = {
      title: CHART_COLUMNS_TITLE(t).addressType,
      fieldName: FILTER_FIELD_NAMES.addressType,
      seriesOption: { data: [] },
    };
    if (!addressData) return option;

    // sum all the unknowns
    let unknownY = 0;

    addressData.forEach(addressTypeRecord => {
      const name = CHART_COLUMNS_NAME(t).addressType[addressTypeRecord._id];
      // if the type is not one of our known types
      if (!name) {
        unknownY += addressTypeRecord.totalOrderCount;
        return;
      }
      const dataItem = {
        name,
        filterValue: addressTypeRecord._id,
        y: addressTypeRecord.totalOrderCount,
      };
      option.seriesOption.data.push(dataItem);
    });
    // if there are unknown address types
    if (unknownY) {
      const unknownDataItem = {
        name: CHART_COLUMNS_NAME(t)[UNKNOWN_TYPE],
        filterValue: UNKNOWN_VALUE,
        y: unknownY,
      };
      option.seriesOption.data.push(unknownDataItem);
    }
    return option;
  },
  // loop over promos once, get both options
  promoTypeAndFinanced: (promoData, t) => {
    const promoTypeOption = {
      title: CHART_COLUMNS_TITLE(t).promoType,
      legendFont: '10px',
      legendMaxHeight: '54',
      chartMarginTop: 52,
      seriesOption: { data: [] },
    };
    const promoFinancedOption = {
      title: CHART_COLUMNS_TITLE(t).promoFinanced,
      seriesOption: { data: [] },
    };
    if (!promoData) return [promoTypeOption, promoFinancedOption];

    const promoTypeToCount = {};
    const promoFinancedTotal = {
      [PROMO_FINANCED_BY.SUPPLIER]: 0,
      [PROMO_FINANCED_BY.THIRD_PARTY]: 0,
      [PROMO_FINANCED_BY.GETIR]: 0,
    };

    promoData.forEach(promo => {
      // no promotion, skip
      if (promo.promo.promoCode === 'ORGANIC') return;

      // accumulate order counts for promo type, gather objectiveless promos under unknown
      const type = promo.promo?.promoClassification?.objective || UNKNOWN_TYPE;

      if (promoTypeToCount[type]) {
        promoTypeToCount[type] += promo.useCount;
      }
      else {
        promoTypeToCount[type] = promo.useCount;
      }

      // accumulate finance rate for supplier or third party or getir
      promoFinancedTotal[PROMO_FINANCED_BY.SUPPLIER] += promo.totalDiscountAmount * promo.promo.supplierSupportRate;
      promoFinancedTotal[PROMO_FINANCED_BY.THIRD_PARTY] += promo.totalDiscountAmount * promo.promo.thirdPartySupportRate;
      promoFinancedTotal[PROMO_FINANCED_BY.GETIR] +=
        promo.totalDiscountAmount * (1 - promo.promo.supplierSupportRate + promo.promo.thirdPartySupportRate);
    });
    // Add promoType options to initial option
    Object.entries(promoTypeToCount).forEach(([promoType, useCount]) => {
      const name = CHART_COLUMNS_NAME(t).promoType[promoType] || CHART_COLUMNS_NAME(t)[UNKNOWN_TYPE];
      const filterValue = name ? promoType : UNKNOWN_VALUE;

      const dataItem = {
        name,
        filterValue,
        y: useCount,
      };
      promoTypeOption.seriesOption.data.push(dataItem);
    });

    // Get the sum so we can calculate percents
    const sumOfFinance = Object.values(promoFinancedTotal).reduce((a, b) => a + b, 0);
    // Add promoFinanced options to initial option
    Object.entries(promoFinancedTotal).forEach(([key, val]) => {
      if (val === 0) return;
      const dataItem = {
        name: CHART_COLUMNS_NAME(t).promoFinanced[key],
        filterValue: key,
        y: (val * 100) / sumOfFinance,
      };
      promoFinancedOption.seriesOption.data.push(dataItem);
    });

    return [promoTypeOption, promoFinancedOption];
  },
  queueStatus: (queueData, t) => {
    const option = {
      title: CHART_COLUMNS_TITLE(t).queueStatus,
      legendFont: '10px',
      fieldName: FILTER_FIELD_NAMES.queueStatus,
      chartMarginTop: 50,
      seriesOption: { data: [] },
    };
    if (!queueData) return option;

    queueData.forEach(queueStatusRecord => {
      const dataItem = {
        name: CHART_COLUMNS_NAME(t).queueStatus[queueStatusRecord._id],
        filterValue: queueStatusRecord._id,
        y: queueStatusRecord.totalOrderCount,
      };
      option.seriesOption.data.push(dataItem);
    });

    return option;
  },
  orderStatus: (orderStatusData, t) => {
    const option = {
      title: t('global:ORDER_STATUS_TEXT'),
      legendFont: '10px',
      fieldName: FILTER_FIELD_NAMES.orderStatus,
      chartMarginTop: 50,
      seriesOption: { data: [] },
    };
    if (!orderStatusData) return option;

    orderStatusData.forEach(orderStatusRecord => {
      const dataItem = {
        name: CHART_COLUMNS_NAME(t).orderStatus[orderStatusRecord._id],
        filterValue: orderStatusRecord._id,
        y: orderStatusRecord.totalOrderCount,
      };
      option.seriesOption.data.push(dataItem);
    });

    return option;
  },
};

function sortOptionSeriesData(option) {
  option.seriesOption.data.sort((data1, data2) => data2.y - data1.y);
  return option;
}

export const getChartOptionsFromExecutiveStatsData = (data, t) => {
  const promoDistOptions = TEMPLATE.promo(data?.promoOrderFinancialStats, data?.organicOrderFinancialStats, t);
  const paymentTypeOptions = TEMPLATE.paymentType(data?.orderCountsByPaymentType, t);
  const addressTypeOptions = TEMPLATE.addressType(data?.orderCountsByAddressType, t);
  const [promoTypeOption, promoFinancedOption] = TEMPLATE.promoTypeAndFinanced(data?.promoStats, t);
  const queueStatusOptions = TEMPLATE.queueStatus(data?.orderCountsByQueueStatus, t);
  const orderStatusOptions = TEMPLATE.orderStatus(data?.orderCountsByStatus, t);

  return [promoDistOptions, paymentTypeOptions, addressTypeOptions, promoTypeOption, promoFinancedOption, queueStatusOptions, orderStatusOptions].map(
    sortOptionSeriesData,
  );
};
