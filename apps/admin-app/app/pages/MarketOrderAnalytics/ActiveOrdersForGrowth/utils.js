import moment from 'moment';

import { get } from 'lodash';

import { getLangKey, t } from '@shared/i18n';
import { GETIR_DOMAIN_TYPE_CODES } from '@shared/shared/constants';
import { paymentMethods } from '@shared/shared/constantValues';
import { calculateLastActivity } from '../utils';
import { lowerCaseN11 } from '../integrationTypeUtils';
import { INTEGRATION_TYPE_TO_ACCESS_KEY, ORDER_STATUS_FOR_GROWTH_PAGE, REST_OF_GETIR_ACCESS_KEY } from './constants';

const activeOrderEntriesReversed = Object.entries(ORDER_STATUS_FOR_GROWTH_PAGE).map(([key, val]) => [val, key]);
const STATUS_CODE_TO_KEY_STRING = Object.fromEntries(activeOrderEntriesReversed);

const fallbackPromoCode = '';
const fallbackBgColor = '#4CAF50';
const fallbackTextColor = '#FFFFFF';

export const getFormattedData = unformattedOrderData => {
  const domainTypesCountSample = {};
  GETIR_DOMAIN_TYPE_CODES.forEach(domainTypeCode => {
    domainTypesCountSample[domainTypeCode] = 0;
  });

  const formattedOrders = [];

  unformattedOrderData.forEach(orderData => {
    const promoData = orderData.promo.applied;

    const { sucOrderCounts = [] } = orderData.client.client;

    const domainTypesCount = { ...domainTypesCountSample };

    sucOrderCounts.forEach(sucOrder => {
      domainTypesCount[sucOrder.domainType] = sucOrder.count;
    });

    const now = moment();
    const totalTimeDiff = now.diff(orderData.checkout.date);
    const totalTimeDiffStr = parseInt(moment.duration(totalTimeDiff).asMinutes(), 10);

    const lastActivity = calculateLastActivity({ marketOrder: orderData });
    let paymentType = orderData?.payment?.method;
    paymentType = paymentType ? paymentMethods[paymentType]?.[getLangKey()] : '-';

    const deviceType = orderData.client?.deviceType;

    const formattedOrder = {
      _id: orderData._id,
      promo: promoData.map(promo => ({
        code: (promo && promo.promoCode) || fallbackPromoCode,
        bgColor: (promo && promo.bgColor) || fallbackBgColor,
        textColor: (promo && promo.textColor) || fallbackTextColor,
      })),
      domainTypesCount,
      paymentType,
      deviceType: deviceType ? t(`activeOrdersForGrowthPage:DEVICE_TYPES:${deviceType.toUpperCase()}`) : '-',
      warehouse: orderData.warehouse.warehouse.name,
      totalBasketAmount: orderData.basket.calculation.totalAmount,
      totalChargedAmount: orderData.basket.calculation.totalChargedAmount,
      deliveryFee: orderData.basket.calculation.deliveryFee,
      date: orderData.checkout.date,
      lastActivity,
      sum: totalTimeDiffStr,
      status: t(`global:MARKET_ORDER_STATUSES_SHORT:${STATUS_CODE_TO_KEY_STRING[orderData.status]}`),
      aggressionLevel: orderData.warehouse.warehouse.aggressionLevel,
      domainType: orderData.domainType,
      isSlottedDelivery: orderData?.delivery?.isSlottedDelivery || false,
      // Integration type is a single value for now
      // But it can have multiple integration types in some cases in the future
      // So, it is an array in the backend
      integrationTypes: orderData?.integrations?.types || [],
    };

    if (formattedOrder.isSlottedDelivery) {
      const pickingDate = get(orderData, 'picking.date');
      formattedOrder.slottedOrderDuration = pickingDate ? now.diff(pickingDate, 'minute') : 0;
      formattedOrder.slottedDeliveryInfo = orderData?.delivery?.slottedDeliveryInfo;
    }

    formattedOrders.push(formattedOrder);
  });

  return formattedOrders;
};

export function getFilteredAndExcludedIntegrationTypes({
  canAccess,
  permittedIntegrationTypes,
  selectedIntegrationTypes = null,
}) {
  // if there is only one integration type selectable and the user only has access to that integration type, and nothing else
  // then it is forced
  if (permittedIntegrationTypes.length === 1 &&
    canAccess(INTEGRATION_TYPE_TO_ACCESS_KEY[permittedIntegrationTypes[0]]) &&
    !canAccess(REST_OF_GETIR_ACCESS_KEY)) {
    return {
      filtered: permittedIntegrationTypes,
      excluded: null,
      isForced: true,
    };
  }

  if (!canAccess(INTEGRATION_TYPE_TO_ACCESS_KEY[lowerCaseN11])) {
    return {
      filtered: selectedIntegrationTypes,
      excluded: [lowerCaseN11],
      isForced: false,
    };
  }

  return {
    filtered: selectedIntegrationTypes,
    excluded: null,
    isForced: false,
  };
}
