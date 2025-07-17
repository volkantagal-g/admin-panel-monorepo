import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.BASKET_ORDER.DETAIL;

export const orderDetailSelector = {
  getData: state => state?.[reducerKey]?.orderDetail?.data,
  getIsPending: state => state?.[reducerKey]?.orderDetail?.isPending,
};

export const getUserByIdSelector = {
  getData: state => state?.[reducerKey]?.getUserById?.data,
  getIsPending: state => state?.[reducerKey]?.getUserById?.isPending,
};
