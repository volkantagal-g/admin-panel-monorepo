import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.COURIER.LIST;

export const courierListSelector = {
  getIsPending: state => state[reduxKey]?.courierList.isPending,
  getData: state => state[reduxKey]?.courierList.data,
  getCount: state => state[reduxKey]?.courierList.totalCount,
};
