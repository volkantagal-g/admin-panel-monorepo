import { get, invert } from 'lodash';

import moment from 'moment';

import { t } from '@shared/i18n';
import { lowerCaseN11 } from '../integrationTypeUtils';
import { INTEGRATION_TYPE_TO_ACCESS_KEY, REST_OF_GETIR_ACCESS_KEY } from './constants';
import { ORDER_STATUS_FOR_ACTIVE_ORDERS_PAGES } from '@app/pages/MarketOrderAnalytics/constants';

const STATUS_CODE_TO_KEY_STRING = invert(ORDER_STATUS_FOR_ACTIVE_ORDERS_PAGES);

export const formatActiveOrders = ({ activeOrders }) => {
  return activeOrders.map(order => {
    const filteredOrder = {};

    filteredOrder.warehouse = order.warehouse.warehouse.name;
    filteredOrder.courier = order.courier?.courier?.name || '-';

    filteredOrder.isSlottedDelivery = order.delivery?.isSlottedDelivery;
    filteredOrder.client = order.client.client.name;
    filteredOrder.status = t(`global:MARKET_ORDER_STATUSES_SHORT:${STATUS_CODE_TO_KEY_STRING[order.status]}`);
    filteredOrder.actionId = order.id;
    filteredOrder.checkoutDate = order.checkoutDateL;
    filteredOrder.domainType = order.domainType;
    filteredOrder._id = order._id;

    if (filteredOrder.isSlottedDelivery) {
      const pickingDate = get(order, 'picking.date');
      filteredOrder.slottedOrderDuration = pickingDate ? moment().diff(pickingDate, 'minute') : 0;
      filteredOrder.slottedDeliveryInfo = order?.delivery?.slottedDeliveryInfo;
    }

    return filteredOrder;
  });
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
