import { get, isEmpty, isNull } from 'lodash';
import moment from 'moment';

import { t } from '@shared/i18n';
import { formatDate } from '@shared/utils/dateHelper';
import { calculateLastActivity } from '../utils';
import { lowerCaseN11 } from '../integrationTypeUtils';
import { INTEGRATION_TYPE_TO_ACCESS_KEY, ORDER_STATUS_FOR_OPERATION_PAGE, REST_OF_GETIR_ACCESS_KEY } from './constants';
import { ORDER_STATUS_FOR_ACTIVE_ORDERS_PAGES } from '@app/pages/MarketOrderAnalytics/constants';

const activeOrderEntriesReversed = Object.entries(ORDER_STATUS_FOR_OPERATION_PAGE).map(([key, val]) => [val, key]);
const STATUS_CODE_TO_KEY_STRING = Object.fromEntries(activeOrderEntriesReversed);

const getName = (order, nameField) => {
  return get(order, nameField, '-');
};

export const getFormattedData = unformattedOrders => {
  const now = moment();

  const formattedOrders = unformattedOrders.map(marketOrder => {
    const formattedOrder = {};

    formattedOrder._id = marketOrder._id;
    formattedOrder.domainType = marketOrder.domainType;
    const queueStatusStr = t(`activeOrdersForOperationPage:MARKET_QUEUE_STATUS:${marketOrder.delivery.queue.status}`);
    formattedOrder.queueStatus = queueStatusStr;

    formattedOrder.isSlottedDelivery = !!marketOrder?.delivery?.isSlottedDelivery;
    if (formattedOrder.isSlottedDelivery) {
      const pickingDate = get(marketOrder, 'picking.date');
      formattedOrder.slottedOrderDuration = pickingDate ? now.diff(pickingDate, 'minute') : 0;
      formattedOrder.slottedDeliveryInfo = marketOrder?.delivery?.slottedDeliveryInfo;
    }

    formattedOrder.warehouseName = getName(marketOrder, 'warehouse.warehouse.name');

    formattedOrder.warehouseId = getName(marketOrder, 'warehouse.warehouse.id');

    formattedOrder.checkoutDate = formatDate(marketOrder.checkout.date);

    formattedOrder.clientName = getName(marketOrder, 'client.client.name');

    formattedOrder.courierName = getName(marketOrder, 'courier.courier.name');

    formattedOrder.pickerName = getName(marketOrder, 'picking.picker.name');

    formattedOrder.weight = getName(marketOrder, 'basket.calculation.totalWeight');

    formattedOrder.volume = getName(marketOrder, 'basket.calculation.totalVolume');

    formattedOrder.vehicle = getName(marketOrder, 'courier.courier.fleetVehicleType');

    const isPromoApplied = getName(marketOrder, 'promo.applied');

    formattedOrder.isPromoUsed = !isEmpty(isPromoApplied);

    const statusStr = t(`global:MARKET_ORDER_STATUSES_SHORT:${STATUS_CODE_TO_KEY_STRING[marketOrder.status]}`);
    formattedOrder.status = statusStr;

    const totalTimeDiff = now.diff(marketOrder.checkout.date);
    const totalTimeDiffStr = parseInt(moment.duration(totalTimeDiff).asMinutes(), 10);
    formattedOrder.sum = totalTimeDiffStr;

    formattedOrder.statusUpdatedAt = calculateLastActivity({ marketOrder });

    return formattedOrder;
  });

  return formattedOrders;
};

export const manipulateValuesBeforeSubmit = ({
  requestBody,
  warehouseIds,
  orderStatus,
  orderStatusMoreThan,
  city,
  sortOptions = {},
  selectedCourierId = null,
}) => {
  const formattedRequestBody = { ...requestBody };
  if (warehouseIds?.length) {
    formattedRequestBody.warehouseIds = warehouseIds;
  }

  if (orderStatus.length === 0) {
    formattedRequestBody.statuses = Object.values(ORDER_STATUS_FOR_ACTIVE_ORDERS_PAGES);
  }

  if (orderStatus.length === 1) {
    const [selectedStatus] = orderStatus;
    formattedRequestBody.status = selectedStatus;
  }

  if (orderStatus.length > 1) {
    formattedRequestBody.statuses = orderStatus;
  }

  if (orderStatusMoreThan && orderStatus.length > 0) {
    formattedRequestBody.statusChangedDateEnd = moment().subtract(orderStatusMoreThan || 0, 'minutes');
  }

  if (!isNull(city)) {
    formattedRequestBody.city = city;
  }

  if (!isNull(selectedCourierId)) {
    formattedRequestBody.courierId = selectedCourierId;
  }

  if (!isEmpty(sortOptions)) {
    formattedRequestBody.sortOptions = sortOptions;
  }

  return formattedRequestBody;
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
