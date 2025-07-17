import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.COURIER_STATUS_AND_BUSY.LIST;

export const courierListStatusAndBusy = {
  getIsPending: state => state[reduxKey]?.filterCourier?.isPending,
  getData: state => state[reduxKey]?.filterCourier?.data,
};
