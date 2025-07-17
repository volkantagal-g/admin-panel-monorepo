import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.TMS.DETAIL;

export const tmsVehicleSelector = {
  getIsPending: state => state[reduxKey]?.tmsVehicle?.isPending,
  getData: state => state[reduxKey]?.tmsVehicle?.data,
};
