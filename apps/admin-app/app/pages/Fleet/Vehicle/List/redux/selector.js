import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.VEHICLE.LIST;

export const vehicleListSelector = {
  getData: state => state?.[reducerKey]?.vehicleList?.data,
  getIsPending: state => state?.[reducerKey]?.vehicleList?.isPending,
  getVehicleTypeData: state => state?.[reducerKey]?.vehicleTypeList?.data,
  getVehicleTypeIsPending: state => state?.[reducerKey]?.vehicleTypeList?.isPending,
  getBulkUploadIsPending: state => state?.[reducerKey]?.bulkVehicleCreateUpdate?.isPending,
  getFailedUploadCsvVehicleLogs: state => state?.[reducerKey]?.bulkVehicleCreateUpdate?.data,
  isCsvWarningModalVisible: state => state?.[reducerKey]?.showCsvWarningModal,
};
