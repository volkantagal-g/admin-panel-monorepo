import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.COURIER_LOYALTY.LIST;

export const courierLoyaltySelector = {
  getIsPending: state => state[reduxKey]?.courierLoyalty?.isPending,
  getData: state => state[reduxKey]?.courierLoyalty?.data,
};
