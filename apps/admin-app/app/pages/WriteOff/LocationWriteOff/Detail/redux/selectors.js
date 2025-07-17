import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.LOCATION_WRITE_OFF.DETAIL;

export const locationWriteOffSelector = {
  getData: state => state[reducerKey].locationWriteOff?.data,
  getIsPending: state => state[reducerKey].locationWriteOff?.isPending,
};
