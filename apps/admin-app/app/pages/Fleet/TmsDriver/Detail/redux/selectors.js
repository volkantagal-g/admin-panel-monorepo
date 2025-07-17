import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.TMS_DRIVER.DETAIL;

export const tmsDriverSelector = {
  getIsPending: state => state[reduxKey]?.tmsDriver?.isPending,
  getData: state => state[reduxKey]?.tmsDriver?.data,
};
