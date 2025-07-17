import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY, GETIR_FOOD_DOMAIN_TYPE, GETIR_LOCALS_DOMAIN_TYPE } from '@shared/shared/constants';
import { formatDomainSummaryTableData } from '../utils';

const reducerKey = REDUX_KEY.GROWTH.DAILY_DASHBOARD;
const commonReducerKey = REDUX_KEY.COMMON;

export const domainSummaryTableDataSelector = {
  getData: createSelector(
    state => getStateObject(state, reducerKey, 'rawData'),
    ({ current, previous }) => ({
      current: current.data,
      previous: previous.data,
    }),
  ),
  getFormattedData: (classes, availableDomainTypes) => {
    return createSelector(
      state => getStateObject(state, reducerKey, 'rawData'),
      state => getStateObject(state, reducerKey, 'orderCounts'),
      state => getStateObject(state, reducerKey, 'missedOrderCounts'),
      state => getStateObject(state, reducerKey, 'netRevenues'),
      state => getStateObject(state, reducerKey, 'orderCountsOfDeliveryType'),
      state => getStateObject(state, reducerKey, 'missedOrderCountsOfDeliveryType'),
      state => getStateObject(state, reducerKey, 'netRevenueOfDeliveryType'),
      (
        { current, previous },
        orderCounts,
        missedOrderCounts,
        netRevenues,
        orderCountsOfDeliveryType,
        {
          [GETIR_FOOD_DOMAIN_TYPE]: getirFoodMissedOrderCounts = {},
          [GETIR_LOCALS_DOMAIN_TYPE]: getirLocalsMissedOrderCounts = {},
        },
        {
          [GETIR_FOOD_DOMAIN_TYPE]: getirFoodNetRevenue = {},
          [GETIR_LOCALS_DOMAIN_TYPE]: getirLocalsNetRevenue = {},
        },
      ) => {
        return formatDomainSummaryTableData({
          current: current?.data,
          previous: previous?.data,
          orderCounts: orderCounts?.data,
          missedOrderCounts: missedOrderCounts?.data,
          netRevenues: netRevenues?.data,
          getirFoodOrderCounts: orderCountsOfDeliveryType[GETIR_FOOD_DOMAIN_TYPE]?.data,
          getirFoodMissedOrderCounts: getirFoodMissedOrderCounts?.data,
          getirFoodNetRevenue: getirFoodNetRevenue?.data,
          getirLocalsOrderCounts: orderCountsOfDeliveryType[GETIR_LOCALS_DOMAIN_TYPE]?.data,
          getirLocalsMissedOrderCounts: getirLocalsMissedOrderCounts?.data,
          getirLocalsNetRevenue: getirLocalsNetRevenue?.data,
          classes,
          availableDomainTypes,
        });
      },
    );
  },
  getIsPending: createSelector(
    state => getStateObject(state, reducerKey, 'rawData'),
    state => getStateObject(state, reducerKey, 'orderCounts'),
    state => getStateObject(state, reducerKey, 'missedOrderCounts'),
    state => getStateObject(state, reducerKey, 'netRevenues'),
    state => getStateObject(state, reducerKey, 'orderCountsOfDeliveryType'),
    state => getStateObject(state, reducerKey, 'missedOrderCountsOfDeliveryType'),
    state => getStateObject(state, reducerKey, 'netRevenueOfDeliveryType'),
    state => getStateObject(state, commonReducerKey, 'getFilteredWarehouses'),
    state => getStateObject(state, commonReducerKey, 'getCities'),
    (
      { current, previous },
      orderCounts,
      missedOrderCounts,
      netRevenues,
      orderCountsOfDeliveryType,
      {
        [GETIR_FOOD_DOMAIN_TYPE]: getirFoodMissedOrderCounts = {},
        [GETIR_LOCALS_DOMAIN_TYPE]: getirLocalsMissedOrderCounts = {},
      },
      {
        [GETIR_FOOD_DOMAIN_TYPE]: getirFoodNetRevenue = {},
        [GETIR_LOCALS_DOMAIN_TYPE]: getirLocalsNetRevenue = {},
      },
      { isPending: isWarehouseStatePending },
      { isPending: isCitiesStatePending },
    ) => {
      return (
        current.isPending ||
        previous.isPending ||
        orderCounts?.isPending ||
        missedOrderCounts?.isPending ||
        netRevenues?.isPending ||
        orderCountsOfDeliveryType?.isPending ||
        getirFoodMissedOrderCounts?.isPending ||
        getirLocalsMissedOrderCounts?.isPending ||
        getirFoodNetRevenue.isPending ||
        getirLocalsNetRevenue.isPending ||
        isWarehouseStatePending ||
        isCitiesStatePending
      );
    },
  ),
};

export const configSelector = {
  getData: createSelector(
    state => state[reducerKey]?.configs?.data,
    data => data || {},
  ),
  getIsPending: createSelector(
    state => state[reducerKey]?.configs.isPending,
    isPending => isPending,
  ),
};
