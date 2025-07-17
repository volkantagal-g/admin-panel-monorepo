import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.ARTISAN_ORDER.DETAIL;

export const orderDetailSelector = {
  getData: state => state?.[reducerKey]?.orderDetail?.data,
  getIsPending: state => state?.[reducerKey]?.orderDetail?.isPending,
};

export const orderCancelOptionSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'orderCancelOption');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'orderCancelOption');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const orderCancelSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'orderCancel');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'orderCancel');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const orderShopRefundOptionSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'orderRefundOption');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'orderRefundOption');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const orderShopRefundSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'refund');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'refund');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const orderReturnsSelector = {
  getData: createSelector(
    state => {
      return state?.[reducerKey]?.orderReturns;
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return state?.[reducerKey]?.orderReturns;
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const returnsAvailabilitySelector = {
  getData: createSelector(
    state => {
      return state?.[reducerKey]?.returnsAvailability;
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return state?.[reducerKey]?.returnsAvailability;
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const cancelReturnSelector = {
  getIsPending: createSelector(
    state => {
      return state?.[reducerKey]?.cancelReturn;
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const refundTabActiveKeySelector = {
  getData: createSelector(
    state => {
      return state?.[reducerKey]?.refundTabActiveKey;
    },
    refundTabActiveKey => {
      return refundTabActiveKey;
    },
  ),
};

export const financialInfoSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'financial');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'financial');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const getOrderNoteSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'orderNotes');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'orderNotes');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const getWarehouseRequestSelector = {
  getData: state => state?.[reducerKey]?.warehouse?.data,
  getIsPending: state => state?.[reducerKey]?.warehouse?.isPending,
};

export const createOrderNoteSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'createOrderNote');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'createOrderNote');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const createForbiddenMatchSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'forbiddenMatch');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'forbiddenMatch');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const paymentMethodsSelector = {
  getPaymentMethods: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'paymentMethods');
    },
    ({ data }) => {
      return data;
    },
  ),
  getPaymentMethodsIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'paymentMethods');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const getUserByIdSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getUserById');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getUserById');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const returnRequestSelector = createSelector(
  state => state?.[reducerKey]?.returnRequest,
  data => data,
);

export const returnDeliverySelector = createSelector(
  state => state?.[reducerKey]?.returnDelivery,
  data => data,
);

export const createReturnRequestSelector = createSelector(
  state => state?.[reducerKey]?.createReturnRequest,
  data => data,
);

export const getCourierByIdSelector = {
  getData: state => state?.[reducerKey]?.courierId?.data,
  getIsPending: state => state?.[reducerKey]?.courierId?.isPending,
};

export const currentRunnerSelector = createSelector(
  state => state?.[reducerKey]?.currentRunner?.data?.data,
  data => data,
);

export const returnRunnerSelector = createSelector(
  state => state?.[reducerKey]?.returnRunner,
  data => data,
);

export const returnRunnerHistorySelector = createSelector(
  state => state?.[reducerKey]?.returnRunnerHistory,
  data => data,
);

export const activeReturnDetailsModalSelector = { getData: state => state[reducerKey]?.activeReturnDetailsModal?.data };

export const courierTasksSelector = {
  getData: state => state?.[reducerKey]?.courierTasks?.data,
  getIsPending: state => state?.[reducerKey]?.courierTasks?.isPending,
};

export const getArtisanCourierByIdSelector = {
  getData: state => state?.[reducerKey]?.artisanCourierId?.data,
  getIsPending: state => state?.[reducerKey]?.artisanCourierId?.isPending,
};

export const courierRouteSelector = {
  getData: state => state?.[reducerKey]?.courierRoute?.data,
  getIsPending: state => state?.[reducerKey]?.courierRoute?.getIsPending,
};

export const courierReturnRouteSelector = {
  getData: state => state?.[reducerKey]?.courierReturnRoute?.data,
  getIsPending: state => state?.[reducerKey]?.courierReturnRoute?.getIsPending,
};

export const callPinSelector = createSelector(
  state => state?.[reducerKey]?.orderDetail?.data?.callPin,
  data => data,
);

export const callInfoSelector = createSelector(
  state => state?.[reducerKey]?.callInfo,
  data => data,
);

export const callInfoMessagesSelector = createSelector(
  state => state?.[reducerKey]?.callInfoMessages,
  data => data,
);

export const returnDetailsWithReturnIdListSelector = {
  getData: state => state?.[reducerKey]?.returnDetailsWithReturnIdList?.data,
  getIsPending: state => state?.[reducerKey]?.returnDetailsWithReturnIdList?.getIsPending,
};
