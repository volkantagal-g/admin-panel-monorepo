import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.TMS.LIST;

export const TmsListSelector = {
  getData: state => state?.[reducerKey]?.vehicleList?.data,
  getIsPending: state => state?.[reducerKey]?.vehicleList?.isPending,
  getDeleteData: state => state?.[reducerKey]?.deleteVehicle?.data,
};
