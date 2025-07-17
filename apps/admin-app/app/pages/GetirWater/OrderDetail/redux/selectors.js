import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.GETIR_WATER.ORDER_DETAIL;

export const orderDetailSelector = {
  getData: state => state?.[reducerKey]?.orderDetail?.data,
  getIsPending: state => state?.[reducerKey]?.orderDetail?.isPending,
};

export const orderCancelOptionSelector = {
  getData: state => state?.[reducerKey]?.orderCancelOption?.data,
  getIsPending: state => state?.[reducerKey]?.orderCancelOption?.isPending,
};

export const orderCancelSelector = {
  getData: state => state?.[reducerKey]?.orderCancel?.data,
  getIsPending: state => state?.[reducerKey]?.orderCancel?.isPending,
};

export const isCancelOrderModalVisibleSelector = state => state?.[reducerKey]?.orderDetail?.isCancelOrderModalVisible;
export const isPartialRefundModalVisibleSelector = state => state?.[reducerKey]?.orderDetail?.isPartialRefundModalVisible;
export const isOrderRefundModalVisibleSelector = state => state?.[reducerKey]?.orderDetail?.isOrderRefundModalVisible;
