import _ from 'lodash';
import momentTZ from 'moment-timezone';

export const getFormattedOrderTimeSeries = (orderStats = [], { timezone }) => {
  const formattedArray = _.map(orderStats, item => ({
    orderCount: _.get(item, 'orderCount', 0),
    slottedOrderCount: _.get(item, 'slottedOrderCount', 0),
    batchedOrderCount: _.get(item, 'batchedOrderCount', 0),
    batchCount: _.get(item, 'batchCount', 0),
    queuedOrderCount: _.get(item, 'queuedOrderCount', 0),
    missedOrders: _.get(item, 'missedOrderCount', 0),
    demandOrderCount: _.get(item, 'orderCount', 0) + _.get(item, 'missedOrderCount', 0),
    startDate: momentTZ(item.startDate).tz(timezone).valueOf(),
  }));

  const startDateMap = formattedArray.reduce((accum, item) => {
    // eslint-disable-next-line no-param-reassign
    accum[item.startDate] = item;
    return accum;
  }, {});

  const startDates = _.keys(startDateMap).sort();
  const totals = {
    demandTotal: _.sumBy(formattedArray, 'demandOrderCount') || 0,
    orderTotal: _.sumBy(formattedArray, 'orderCount') || 0,
    slottedOrderTotal: _.sumBy(formattedArray, 'slottedOrderCount') || 0,
    coverageRatio: (
      _.sumBy(formattedArray, 'orderCount') / (_.sumBy(formattedArray, 'orderCount') + _.sumBy(formattedArray, 'missedOrders'))
    ) || 0,
    batchedTotal: _.sumBy(formattedArray, 'batchedOrderCount') || 0,
    orderPerTrip: (
      _.sumBy(formattedArray, 'orderCount') /
      (_.sumBy(formattedArray, 'batchCount') + _.sumBy(formattedArray, 'orderCount') - _.sumBy(formattedArray, 'batchedOrderCount'))
    ) || 0,
    queuedOrderRatio: (_.sumBy(formattedArray, 'queuedOrderCount') || 0) / (_.sumBy(formattedArray, 'orderCount') || 1),
    missedOrder: _.sumBy(formattedArray, 'missedOrders') || 0,
    missedRatio: (
      _.sumBy(formattedArray, 'missedOrders') / (_.sumBy(formattedArray, 'missedOrders') + _.sumBy(formattedArray, 'orderCount'))
    ) || 0,
  };
  const { demandOrder, order, slottedOrder, batchedOrder, queuedOrder, missedOrder } = {
    demandOrder: _.map(startDates, key => [Number(key), startDateMap[key].orderCount + startDateMap[key].missedOrders]),
    order: _.map(startDates, key => [Number(key), startDateMap[key].orderCount]),
    slottedOrder: _.map(startDates, key => [Number(key), startDateMap[key].slottedOrderCount]),
    batchedOrder: _.map(startDates, key => [Number(key), startDateMap[key].batchedOrderCount]),
    queuedOrder: _.map(startDates, key => ({
      x: Number(key),
      y: startDateMap[key].queuedOrderCount,
      queuedOrderPercentage: (startDateMap[key].queuedOrderCount / startDateMap[key].orderCount) * 100,
    })),
    missedOrder: _.map(startDates, key => ({
      x: Number(key),
      y: startDateMap[key].missedOrders,
      missedOrderPercentage: (startDateMap[key].missedOrders / (startDateMap[key].orderCount + startDateMap[key].missedOrders)) * 100,
    })),
  };

  return {
    demandOrder,
    order,
    slottedOrder,
    batchedOrder,
    queuedOrder,
    missedOrder,
    totals,
  };
};
