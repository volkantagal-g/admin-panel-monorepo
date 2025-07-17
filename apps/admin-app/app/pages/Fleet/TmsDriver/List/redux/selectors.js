import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.TMS_DRIVER.LIST;

export const TmsDriversSelector = {
  getIsPending: state => state[reduxKey]?.tmsDrivers?.isPending,
  getData: state => state[reduxKey]?.tmsDrivers?.data,
  getTotalCount: state => state[reduxKey]?.tmsDrivers?.totalCount,
};
