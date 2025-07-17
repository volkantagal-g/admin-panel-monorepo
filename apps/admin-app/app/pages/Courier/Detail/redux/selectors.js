import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.COURIER.DETAIL;

export const courierSelector = {
  getData: state => state[reducerKey]?.courier.data,
  getIsPending: state => state[reducerKey]?.courier.isPending,
};

export const releaseCourierSelector = {
  getIsPending: state => state[reducerKey]?.releaseCourier.isPending,
  getIsSuccess: state => state[reducerKey]?.releaseCourier.isSuccess,
};

export const courierBusyOptionsSelector = {
  getData: state => state[reducerKey]?.courierBusyOptions.data,
  getIsPending: state => state[reducerKey]?.courierBusyOptions.isPending,
};

export const courierOperationSelector = { getIsPending: state => state[reducerKey]?.courierOperation.isPending };

export const setWarehouseToCourierSelector = {
  getIsPending: state => state[reducerKey]?.setWarehouseToCourier.isPending,
  getIsSuccess: state => state[reducerKey]?.setWarehouseToCourier.isSuccess,
};

export const setDomainTypeSelector = {
  getIsPending: state => state[reducerKey]?.setDomainType.isPending,
  getIsSuccess: state => state[reducerKey]?.setDomainType.isSuccess,
};

export const setAvailableVehicleTypesSelector = {
  getIsPending: state => state[reducerKey]?.setAvailableVehicleTypes.isPending,
  getIsSuccess: state => state[reducerKey]?.setAvailableVehicleTypes.isSuccess,
};

export const setEmploymentTypeSelector = {
  getIsPending: state => state[reducerKey]?.setEmploymentType.isPending,
  getIsSuccess: state => state[reducerKey]?.setEmploymentType.isSuccess,
};

export const setIsLoginDisabledSelector = {
  getIsPending: state => state[reducerKey]?.setIsLoginDisabled.isPending,
  getIsSuccess: state => state[reducerKey]?.setIsLoginDisabled.isSuccess,
};

export const orderListSelector = {
  getData: state => state[reducerKey]?.orderList.data,
  getCount: state => state[reducerKey]?.orderList.count,
  getIsPending: state => state[reducerKey]?.orderList.isPending,
};

export const statusLogsSelector = {
  getData: state => state[reducerKey]?.statusLogs.data,
  getBatchData: state => state[reducerKey]?.statusLogs.batchData,
  getIsPending: state => state[reducerKey]?.statusLogs.isPending,
};

export const courierTasksSelector = {
  getData: state => state[reducerKey]?.courierTasks.data,
  getIsPending: state => state[reducerKey]?.courierTasks.isPending,
};

export const geoFenceLogsSelector = {
  getData: state => state[reducerKey]?.geoFenceLogs.data,
  getBatchData: state => state[reducerKey]?.geoFenceLogs.batchData,
  getIsPending: state => state[reducerKey]?.geoFenceLogs.isPending,
};

export const getCourierFeedbackSelector = {
  getData: state => state[reducerKey]?.getCourierFeedback.data,
  getIsPending: state => state[reducerKey]?.getCourierFeedback.isPending,
};

export const getResetCourierPasswordSelector = {
  getData: state => state[reducerKey]?.resetCourierPassword.data,
  getIsPending: state => state[reducerKey]?.resetCourierPassword.isPending,
};

export const returnDetailsWithReturnIdListSelector = {
  getData: state => state?.[reducerKey]?.returnDetailsWithReturnIdList?.data,
  getIsPending: state => state?.[reducerKey]?.returnDetailsWithReturnIdList?.getIsPending,
};

export const setGeofenceByCourierIdSelector = {
  getData: state => state[reducerKey]?.setGeofenceByCourierId.data,
  getIsPending: state => state[reducerKey]?.setGeofenceByCourierId.isPending,
  getError: state => state[reducerKey]?.setGeofenceByCourierId.error,
};
