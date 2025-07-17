import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.VEHICLE.NEW;

export const createVehicleSelector = {
  getIsPending: state => state?.[reducerKey]?.createVehicle?.isPending,
  getVehicleTypeData: state => state?.[reducerKey]?.vehicleType?.data,
  getVehicleTypeIsPending: state => state?.[reducerKey]?.vehicleType?.isPending,
};
