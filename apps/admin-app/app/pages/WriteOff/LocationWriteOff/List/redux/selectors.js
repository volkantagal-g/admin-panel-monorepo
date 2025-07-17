import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.LOCATION_WRITE_OFF.LIST;

export const locationWriteOffSelector = {
  getData: state => state[reducerKey].locationWriteOff?.data,
  getTotal: state => state[reducerKey].locationWriteOff?.total,
  getIsPending: state => state[reducerKey].locationWriteOff?.isPending,
};

export const locationsSelector = {
  getIsPending: state => state[reducerKey].locations?.isPending,
  getData: state => state[reducerKey].locations?.data,
};
