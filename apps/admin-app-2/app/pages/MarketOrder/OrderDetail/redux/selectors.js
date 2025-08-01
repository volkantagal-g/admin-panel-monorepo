import { isEmpty, orderBy } from 'lodash';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.MARKET_ORDER.ORDER_DETAIL;

export const orderDetailSelector = {
  getData: state => state[reducerKey]?.orderDetail?.data ?? {},
  getISOCountryCode: state => state[reducerKey]?.orderDetail?.data?.country?.currency?.code?.alpha ||
    'TRY',
  getIsPending: state => state[reducerKey]?.orderDetail?.isPending,
};

export const fraudOrderDetailSelector = { getData: state => state[reducerKey]?.fraudOrderDetail?.data };

export const orderFeedbackSelector = { getData: state => state[reducerKey]?.feedbacks?.orderFeedbacks || [] };

export const clientFeedbackSelector = {
  getData: state => {
    const data = state[reducerKey]?.feedbacks?.data;
    return data ? orderBy(data, ['createdAt'], 'desc') : [];
  },
  getCount: state => state[reducerKey]?.feedbacks?.count || 0,
  getIsPending: state => state[reducerKey]?.feedbacks?.isPending || false,
};

export const getConfigsWithKeySelector = key => {
  return {
    getData: state => (state[reducerKey]?.configs?.data ? state[reducerKey]?.configs?.data[key] : undefined),
    getIsPending: state => state[reducerKey]?.configs.isPending,
  };
};

export const marketOrderFeedbackSelector = {
  getData: state => {
    const data = state[reducerKey]?.marketOrderFeedbacks?.data;
    return data ? orderBy(data, ['createdAt'], 'desc') : [];
  },
  getCount: state => state[reducerKey]?.marketOrderFeedbacks?.count || 0,
  getIsPending: state => state[reducerKey]?.marketOrderFeedbacks?.isPending || false,
};

export const orderNotesSelector = {
  getData: state => state[reducerKey]?.notes?.data || [],
  getIsPending: state => state[reducerKey]?.notes?.isPending || false,
};

export const orderCancelOptionsSelector = {
  getData: state => state[reducerKey]?.cancelOptions?.data || [],
  getIsPending: state => state[reducerKey]?.cancelOptions?.isPending || false,
};

export const wholeRefundReasonsSelector = {
  getData: state => state[reducerKey]?.wholeRefundReasons?.data || [],
  getIsPending: state => state[reducerKey]?.wholeRefundReasons?.isPending,
};

export const getDiscountWarnConfigSelector = {
  getData: state => state[reducerKey]?.discountWarnAmounts?.data,
  getIsPending: state => state[reducerKey]?.discountWarnAmounts?.isPending,
};

export const getSlottedDeliveryOptionsSelector = {
  getData: state => state[reducerKey]?.slottedDeliveryOptions?.data,
  getIsPending: state => state[reducerKey]?.slottedDeliveryOptions?.isPending,
  isSlotModalVisible: state => state[reducerKey]?.slotModal?.isVisible,
};

export const cancelOrderSelector = {
  getIsPending: state => state[reducerKey]?.cancelOrder?.isPending,
  isCancelOrderModalVisible: state => state[reducerKey]?.cancelOrderModal?.isVisible,
};
export const changeDeliveryTimeSlotSelector = {
  getIsPending: state => state[reducerKey]?.changeDeliveryTimeSlot?.isPending,
  getUpdatedSlot: state => state[reducerKey]?.changeDeliveryTimeSlot?.slotId,
};

export const orderRefundReasonsSelector = {
  getData: state => state[reducerKey]?.refundReasons?.data,
  hasFetchedRefundReasons: state => !isEmpty(state[reducerKey]?.refundReasons?.data),
  getIsPending: state => state[reducerKey]?.refundReasons?.isPending || false,
};

export const getOrderByIdSelector = {
  getData: state => state[reducerKey]?.newOrderDetail?.data,
  getIsPending: state => state[reducerKey]?.newOrderDetail?.isPending,
};
