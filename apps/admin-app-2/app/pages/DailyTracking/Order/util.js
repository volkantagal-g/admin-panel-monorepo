import { isEmpty as _isEmpty } from 'lodash';
import moment from 'moment-timezone';

import { numberFormat } from '@shared/utils/localization';

export const calculateWarehouseData = data => {
  const warehouseMappedData = {
    mergedOrderRatio: 0,
    missedOrderRatio: 0,
    averageDeliveryDurationOfUnbatchedOrders: 0,
    averageDeliveryDurationOfTotalOrders: 0,
    queueOrderRatio: 0,
    queueDuration: 0,
  };
  if (_isEmpty(data)) return warehouseMappedData;

  let totalMissedOrderCount = 0;
  let totalOrderCount = 0;
  let totalBatchedOrderCount = 0;
  let totalCheckoutToReachDuration = 0;
  let totalUnBatchedOrderCount = 0;
  let totalNonQueuedOrderCount = 0;
  let totalCheckoutToReachDurationNonQueued = 0;
  let totalUnBatchedOrdersCheckoutToReachDuration = 0;

  Object.keys(data).forEach(domainType => {
    data[domainType].forEach(warehouse => {
      totalMissedOrderCount += warehouse.missedOrderCount;
      totalOrderCount += warehouse.orderCount;
      if (!_isEmpty(warehouse.batchOrder)) {
        warehouse.batchOrder.forEach(eachOrder => {
          totalCheckoutToReachDuration += eachOrder.checkoutToReachDuration;
          totalNonQueuedOrderCount += eachOrder.nonQueuedOrderCount;
          totalCheckoutToReachDurationNonQueued += eachOrder.checkoutToReachDurationNonQueued;
          if (eachOrder.batchIndex === 0) {
            totalUnBatchedOrdersCheckoutToReachDuration += eachOrder.checkoutToReachDuration;
            totalUnBatchedOrderCount += eachOrder.orderCount;
          }
          else {
            totalBatchedOrderCount += eachOrder.orderCount;
          }
        });
      }
    });
  });

  const SECONDS_TO_MINUTES = 60;

  warehouseMappedData.mergedOrderRatio = ((totalBatchedOrderCount / (totalOrderCount || 1)) * 100).toFixed(1);
  warehouseMappedData.missedOrderRatio = numberFormat({ maxDecimal: 2 })
    .format(((totalMissedOrderCount / totalOrderCount) * 100));
  warehouseMappedData.averageDeliveryDurationOfUnbatchedOrders = (totalUnBatchedOrdersCheckoutToReachDuration
    / (totalUnBatchedOrderCount || 1) / SECONDS_TO_MINUTES).toFixed(1);
  warehouseMappedData.averageDeliveryDurationOfTotalOrders =
    (totalCheckoutToReachDuration / (totalOrderCount || 1) / SECONDS_TO_MINUTES).toFixed(1);
  warehouseMappedData.queueOrderRatio = numberFormat({ maxDecimal: 1 })
    .format(((totalOrderCount - totalNonQueuedOrderCount) / totalOrderCount) * 100) || '-';
  warehouseMappedData.queueDuration = ((totalCheckoutToReachDuration - totalCheckoutToReachDurationNonQueued)
    / (totalOrderCount || 1) / SECONDS_TO_MINUTES).toFixed(1);

  return warehouseMappedData;
};

export const calculateDiscountedOrderRatio = data => {
  if (_isEmpty(data)) return 0;
  const usedPromoOrdersRatio = (data.usedPromoOrders / (data.totalOrder || 1)) * 100;
  return usedPromoOrdersRatio.toFixed(1);
};

export const calculateRateCount = data => {
  if (_isEmpty(data)) return 0;

  let totalRate = 0;
  let totalOrderCount = 0;

  Object.values(data).forEach(domainType => {
    domainType.forEach(({ rate, order_count: orderCount }) => {
      totalRate += rate * orderCount;
      totalOrderCount += orderCount;
    });
  });

  const averageRate = totalRate / totalOrderCount;
  return numberFormat({ maxDecimal: 1 }).format(averageRate);
};

export const getInitialEndTime = timezone => {
  return moment.tz(timezone).startOf('hour');
};

export const getInitialStartTime = timezone => getInitialEndTime(timezone).subtract(1, 'hour');
