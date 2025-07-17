import { FOOD_DELIVERY } from '@shared/shared/constants';
import {
  foodOrderCancelReasonSource as cancelSource,
  foodOrderRequestSource as requestSource,
} from '@shared/shared/constantValues';

const isFoodOrderReady = {
  yes: { isFoodOrderReady: true },
  no: { isFoodOrderReady: false },
};

const isRestaurantReached = {
  yes: { isFoodOrderReady },
  no: { isFoodOrderReady: false },
};

const isHandover = {
  yes: { isFoodOrderReady: true },
  no: { isRestaurantReached },
};

const isXMinutesPassedFromCheckout = {
  yes: { isFoodOrderReady: true },
  no: { isFoodOrderReady: false },
};

const cancelFlowTree = {
  [FOOD_DELIVERY.GETIR]: {
    [requestSource.COURIER]: {
      [cancelSource.CLIENT]: { isFoodOrderReady: true },
      [cancelSource.RESTAURANT]: { isFoodOrderReady: true },
      [cancelSource.GETIR]: {
        isApprovedByOperationSquad: {
          yes: { isHandover },
          no: { isHandover },
        },
      },
    },
    [requestSource.CLIENT]: {
      [cancelSource.CLIENT]: {
        isHandover: {
          yes: { isFoodOrderReady: true },
          no: {
            isRestaurantReached: {
              yes: { isFoodOrderReady },
              no: { isXMinutesPassedFromCheckout },
            },
          },
        },
      },
      [cancelSource.GETIR]: { isFoodOrderReady: true },
      [cancelSource.RESTAURANT]: { isFoodOrderReady: true },
    },
    [requestSource.RESTAURANT]: {
      [cancelSource.CLIENT]: { isFoodOrderReady: true },
      [cancelSource.GETIR]: { isFoodOrderReady: true },
      [cancelSource.RESTAURANT]: { isFoodOrderReady: true },
    },
  },
  [FOOD_DELIVERY.RESTAURANT]: {
    [requestSource.CLIENT]: {
      [cancelSource.CLIENT]: {
        isRestaurantReached: {
          yes: { isFoodOrderReady },
          no: { isXMinutesPassedFromCheckout },
        },
      },
      [cancelSource.RESTAURANT]: { isFoodOrderReady: true },
    },
    [requestSource.RESTAURANT]: { isFoodOrderReady: true },
  },
};

export default cancelFlowTree;
