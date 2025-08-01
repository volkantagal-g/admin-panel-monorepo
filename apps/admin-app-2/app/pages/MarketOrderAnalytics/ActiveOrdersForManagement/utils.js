import _, { isNull } from 'lodash';
import moment from 'moment';

import { CLIENT_ADDRESS_TYPES, GETIR_DOMAIN_TYPE_CODES } from '@shared/shared/constants';
import { calculateLastActivity } from '../utils';
import { lowerCaseN11 } from '../integrationTypeUtils';
import { INTEGRATION_TYPE_TO_ACCESS_KEY, REST_OF_GETIR_ACCESS_KEY } from './constant';

export const getFormattedData = unformattedOrders => {
  const now = moment();

  const formattedOrders = unformattedOrders.map(marketOrder => {
    const formattedOrder = {};
    formattedOrder._id = marketOrder._id;
    formattedOrder.id = marketOrder._id;

    formattedOrder.domainType = marketOrder.domainType;

    formattedOrder.addressType = _.get(marketOrder, 'delivery.address.addressType', CLIENT_ADDRESS_TYPES.OTHER);

    formattedOrder.queueStatus = _.get(marketOrder, 'delivery.queue.status');

    formattedOrder.clientOrderCountByDomainTypeMap = {};
    GETIR_DOMAIN_TYPE_CODES.forEach(code => {
      formattedOrder.clientOrderCountByDomainTypeMap[code] = 0;
    });
    _.get(marketOrder, 'client.client.sucOrderCounts', []).forEach(orderCountObj => {
      formattedOrder.clientOrderCountByDomainTypeMap[orderCountObj.domainType] = orderCountObj.count;
    });

    formattedOrder.promos = _.get(marketOrder, ['promo', 'applied'], null);

    formattedOrder.warehouseName = _.get(marketOrder, 'warehouse.warehouse.name');

    const { method, paymentMethodType } = _.get(marketOrder, 'basket.paymentInfo', {});
    formattedOrder.paymentMethod = paymentMethodType ?? method;

    formattedOrder.basketAmount = _.get(marketOrder, 'basket.calculation.totalAmount');

    formattedOrder.chargedAmount = _.get(marketOrder, 'basket.calculation.totalChargedAmount');

    formattedOrder.checkoutDate = _.get(marketOrder, 'checkout.date');

    formattedOrder.clientName = _.get(marketOrder, 'client.client.name', '');
    [formattedOrder.clientShortName] = formattedOrder.clientName.split(' ');

    formattedOrder.courierName = _.get(marketOrder, 'courier.courier.name', '');
    [formattedOrder.courierShortName] = formattedOrder.courierName.split(' ');

    formattedOrder.pickerName = _.get(marketOrder, 'picking.picker.name', '');
    [formattedOrder.pickerShortName] = formattedOrder.pickerName.split(' ');

    formattedOrder.status = _.get(marketOrder, 'status');

    formattedOrder.lastActivityDuration = calculateLastActivity({ marketOrder });

    // since slotted orders become RESERVED state and take long time after checkout,
    // for duration calculation, the checkout date is not that meaningful to show vs normal orders (hours vs 30-40minutes)
    // if it is slotted order, calculate additional duration, from picker assigned to current time (more realistic comparison with other orders)
    formattedOrder.isSlottedDelivery = marketOrder?.delivery?.isSlottedDelivery;
    if (formattedOrder.isSlottedDelivery) {
      const pickingDate = _.get(marketOrder, 'picking.date');
      formattedOrder.slottedOrderDuration = pickingDate ? now.diff(pickingDate, 'minute') : 0;
      formattedOrder.slottedDeliveryInfo = _.get(marketOrder, 'delivery.slottedDeliveryInfo', {});
    }
    const totalDuration = now.diff(marketOrder.checkout.date);
    formattedOrder.totalDuration = parseInt(moment.duration(totalDuration).asMinutes(), 10);

    return formattedOrder;
  });

  return formattedOrders;
};

export const filterNonNullFields = requestBody => {
  const formattedRequest = {};

  Object.entries(requestBody).forEach(([key, value]) => {
    if (!isNull(value) || key === 'integrationType') {
      formattedRequest[key] = value;
    }
  });

  return formattedRequest;
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
