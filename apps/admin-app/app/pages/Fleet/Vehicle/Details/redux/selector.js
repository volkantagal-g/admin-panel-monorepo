import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.VEHICLE.DETAIL;

export const vehicleDetailsSelector = {
  getData: state => state?.[reducerKey]?.vehicleDetails?.data,
  getVehicleTypeData: state => state?.[reducerKey]?.vehicleType?.data,
  getVehicleUpdateData: state => state?.[reducerKey]?.updateVehicle?.data,
};

export const vehicleLogsSelector = {
  getData: state => state?.[reducerKey]?.vehicleLogs?.data,
  getIsPending: state => state?.[reducerKey]?.vehicleLogs?.isPending,
};
