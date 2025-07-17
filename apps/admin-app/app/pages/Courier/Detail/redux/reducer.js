import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  courier: {
    data: {},
    isPending: false,
    error: null,
  },
  releaseCourier: {
    isPending: false,
    isSuccess: false,
    error: null,
  },
  courierBusyOptions: {
    data: [],
    isPending: false,
    error: null,
  },
  courierOperation: {
    isPending: false,
    error: null,
  },
  forceLogout: {
    isPending: false,
    isSuccess: false,
    error: null,
  },
  setWarehouseToCourier: {
    isPending: false,
    isSuccess: false,
    error: null,
  },
  setDomainType: {
    isPending: false,
    isSuccess: false,
    error: null,
  },
  setAvailableVehicleTypes: {
    isPending: false,
    isSuccess: false,
    error: null,
  },
  setEmploymentType: {
    isPending: false,
    isSuccess: false,
    error: null,
  },
  setChiefCourier: {
    isPending: false,
    isSuccess: false,
    error: null,
  },
  setIsLoginDisabled: {
    isPending: false,
    isSuccess: false,
    error: null,
  },
  orderList: {
    data: [],
    count: 10000,
    isPending: false,
    error: null,
  },
  returnDetailsWithReturnIdList: {
    data: [],
    isPending: false,
    error: null,
  },
  statusLogs: {
    batchData: [],
    data: [],
    isPending: false,
    error: null,
  },
  courierTasks: {
    data: [],
    isPending: false,
    error: null,
  },
  geoFenceLogs: {
    batchData: [],
    data: [],
    isPending: false,
    error: null,
  },
  getCourierFeedback: {
    data: [],
    isPending: false,
    error: null,
  },
  getCourierLogs: {
    isPending: false,
    error: null,
  },
  resetCourierPassword: {
    data: {},
    isPending: false,
    error: null,
  },
  setGeofenceByCourierId: {
    data: {},
    isPending: false,
    error: null,
  },
};

export const getCourierFeedbackRequest = state => {
  return {
    ...state,
    getCourierFeedback: {
      ...state.getCourierFeedback,
      isPending: true,
    },
  };
};

export const getCourierFeedbackSuccess = (state, { data }) => {
  return {
    ...state,
    getCourierFeedback: {
      ...state.getCourierFeedback,
      data,
      isPending: false,
    },
  };
};

export const getCourierFeedbackFailure = (state, { error }) => {
  return {
    ...state,
    getCourierFeedback: {
      ...state.getCourierFeedback,
      isPending: false,
      error,
    },
  };
};

export const getCourierRequest = state => {
  return {
    ...state,
    courier: {
      ...state.courier,
      isPending: true,
    },
  };
};

export const getCourierSuccess = (state, { data }) => {
  return {
    ...state,
    courier: {
      ...state.courier,
      data,
      isPending: false,
    },
  };
};

export const getCourierFailure = (state, { error }) => {
  return {
    ...state,
    courier: {
      ...state.courier,
      isPending: false,
      error,
    },
  };
};

export const releaseCourierRequest = state => {
  return {
    ...state,
    releaseCourier: {
      ...state.releaseCourier,
      isPending: true,
      isSuccess: false,
    },
  };
};

export const releaseCourierSuccess = state => {
  return {
    ...state,
    releaseCourier: {
      ...state.releaseCourier,
      isPending: false,
      isSuccess: true,
    },
  };
};

export const releaseCourierFailure = state => {
  return {
    ...state,
    releaseCourier: {
      ...state.releaseCourier,
      isPending: false,
      isSuccess: false,
    },
  };
};

export const forceLogoutRequest = state => {
  return {
    ...state,
    forceLogout: {
      ...state.forceLogout,
      isPending: true,
      isSuccess: false,
    },
  };
};

export const forceLogoutSuccess = state => {
  return {
    ...state,
    forceLogout: {
      ...state.forceLogout,
      isPending: false,
      isSuccess: true,
    },
  };
};

export const forceLogoutFailure = state => {
  return {
    ...state,
    forceLogout: {
      ...state.forceLogout,
      isPending: false,
      isSuccess: false,
    },
  };
};

export const getCourierBusyOptionsRequest = state => {
  return {
    ...state,
    courierBusyOptions: {
      ...state.courierBusyOptions,
      isPending: true,
    },
  };
};

export const getCourierBusyOptionsSuccess = (state, { data }) => {
  return {
    ...state,
    courierBusyOptions: {
      ...state.courierBusyOptions,
      data,
      isPending: false,
    },
  };
};

export const getCourierBusyOptionsFailure = (state, { error }) => {
  return {
    ...state,
    courierBusyOptions: {
      ...state.courierBusyOptions,
      isPending: false,
      error,
    },
  };
};

export const setCourierOperationRequest = state => {
  return {
    ...state,
    courierOperation: {
      ...state.courierOperation,
      isPending: true,
    },
  };
};

export const setCourierOperationSuccess = state => {
  return {
    ...state,
    courierOperation: {
      ...state.courierOperation,
      isPending: false,
    },
  };
};

export const setCourierOperationFailure = (state, { error }) => {
  return {
    ...state,
    courierOperation: {
      ...state.courierOperation,
      isPending: false,
      error,
    },
  };
};

export const setWarehouseToCourierRequest = state => {
  return {
    ...state,
    setWarehouseToCourier: {
      ...state.setWarehouseToCourier,
      isPending: true,
      isSuccess: false,
    },
  };
};

export const setWarehouseToCourierSuccess = (state, { data }) => {
  return {
    ...state,
    setWarehouseToCourier: {
      ...state.setWarehouseToCourier,
      data,
      isPending: false,
      isSuccess: true,
    },
  };
};

export const setWarehouseToCourierFailure = (state, { error }) => {
  return {
    ...state,
    setWarehouseToCourier: {
      ...state.setWarehouseToCourier,
      isPending: false,
      isSuccess: false,
      error,
    },
  };
};

export const setDomainTypeRequest = state => {
  return {
    ...state,
    setDomainType: {
      ...state.setDomainType,
      isPending: true,
      isSuccess: false,
    },
  };
};

export const setDomainTypeSuccess = state => {
  return {
    ...state,
    setDomainType: {
      ...state.setDomainType,
      isPending: false,
      isSuccess: true,
    },
  };
};

export const setDomainTypeFailure = (state, { error }) => {
  return {
    ...state,
    setDomainType: {
      ...state.setDomainType,
      isPending: false,
      isSuccess: false,
      error,
    },
  };
};

export const setAvailableVehicleTypesRequest = state => {
  return {
    ...state,
    setAvailableVehicleTypes: {
      ...state.setAvailableVehicleTypes,
      isPending: true,
      isSuccess: false,
    },
  };
};

export const setAvailableVehicleTypesSuccess = state => {
  return {
    ...state,
    setAvailableVehicleTypes: {
      ...state.setAvailableVehicleTypes,
      isPending: false,
      isSuccess: true,
    },
  };
};

export const setAvailableVehicleTypesFailure = (state, { error }) => {
  return {
    ...state,
    setAvailableVehicleTypes: {
      ...state.setAvailableVehicleTypes,
      isPending: false,
      isSuccess: false,
      error,
    },
  };
};

export const setIsLoginDisabledRequest = state => {
  return {
    ...state,
    setIsLoginDisabled: {
      ...state.setIsLoginDisabled,
      isPending: true,
      isSuccess: false,
    },
  };
};

export const setIsLoginDisabledSuccess = state => {
  return {
    ...state,
    setIsLoginDisabled: {
      ...state.setIsLoginDisabled,
      isPending: false,
      isSuccess: true,
    },
  };
};

export const setIsLoginDisabledFailure = (state, { error }) => {
  return {
    ...state,
    setIsLoginDisabled: {
      ...state.setIsLoginDisabled,
      isPending: false,
      isSuccess: false,
      error,
    },
  };
};

export const setChiefCourierRequest = state => {
  return {
    ...state,
    setChiefCourier: {
      ...state.setChiefCourier,
      isPending: true,
      isSuccess: false,
    },
  };
};

export const setChiefCourierSuccess = state => {
  return {
    ...state,
    setChiefCourier: {
      ...state.setChiefCourier,
      isPending: false,
      isSuccess: true,
    },
  };
};

export const setChiefCourierFailure = (state, { error }) => {
  return {
    ...state,
    setChiefCourier: {
      ...state.setChiefCourier,
      isPending: false,
      isSuccess: false,
      error,
    },
  };
};

export const setEmploymentTypeRequest = state => {
  return {
    ...state,
    setEmploymentType: {
      ...state.setEmploymentType,
      isPending: true,
      isSuccess: false,
    },
  };
};

export const setEmploymentTypeSuccess = state => {
  return {
    ...state,
    setEmploymentType: {
      ...state.setEmploymentType,
      isPending: false,
      isSuccess: true,
    },
  };
};

export const setEmploymentTypeFailure = (state, { error }) => {
  return {
    ...state,
    setEmploymentType: {
      ...state.setEmploymentType,
      isPending: false,
      isSuccess: false,
      error,
    },
  };
};

export const getOrderListRequest = state => {
  return {
    ...state,
    orderList: {
      ...state.orderList,
      isPending: true,
    },
  };
};

export const getOrderListSuccess = (state, { data }) => {
  return {
    ...state,
    orderList: {
      ...state.orderList,
      data,
      isPending: false,
    },
  };
};

export const getOrderListFailure = (state, { error }) => {
  return {
    ...state,
    orderList: {
      ...state.orderList,
      isPending: false,
      error,
    },
  };
};

export const getReturnDetailsWithReturnIdListRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    returnDetailsWithReturnIdList: {
      ...INITIAL_STATE.returnDetailsWithReturnIdList,
      isPending: true,
    },
  };
};

export const getReturnDetailsWithReturnIdListSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    returnDetailsWithReturnIdList: {
      ...INITIAL_STATE.returnDetailsWithReturnIdList,
      data,
      isPending: false,
    },
  };
};

export const getReturnDetailsWithReturnIdListFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    returnDetailsWithReturnIdList: {
      ...INITIAL_STATE.returnDetailsWithReturnIdList,
      isPending: false,
      error,
    },
  };
};

export const getStatusLogsRequest = state => {
  return {
    ...state,
    statusLogs: {
      ...state.statusLogs,
      isPending: true,
    },
  };
};

export const getStatusLogsSuccess = (state, { data, batchData }) => {
  return {
    ...state,
    statusLogs: {
      ...state.statusLogs,
      data,
      batchData,
      isPending: false,
    },
  };
};

export const getStatusLogsFailure = (state, { error }) => {
  return {
    ...state,
    statusLogs: {
      ...state.statusLogs,
      isPending: false,
      error,
    },
  };
};

export const getCourierTasksRequest = state => {
  return {
    ...state,
    courierTasks: {
      ...state.courierTasks,
      isPending: true,
    },
  };
};

export const getCourierTasksSuccess = (state, { data }) => {
  return {
    ...state,
    courierTasks: {
      ...state.courierTasks,
      data,
      isPending: false,
    },
  };
};

export const getCourierTasksFailure = (state, { error }) => {
  return {
    ...state,
    courierTasks: {
      ...state.courierTasks,
      isPending: false,
      error,
    },
  };
};

export const geoFenceLogsRequest = state => {
  return {
    ...state,
    geoFenceLogs: {
      ...state.geoFenceLogs,
      isPending: true,
    },
  };
};

export const geoFenceLogsSuccess = (state, { data, batchData }) => {
  return {
    ...state,
    geoFenceLogs: {
      ...state.geoFenceLogs,
      data,
      batchData,
      isPending: false,
    },
  };
};

export const geoFenceLogsFailure = (state, { error }) => {
  return {
    ...state,
    geoFenceLogs: {
      ...state.geoFenceLogs,
      isPending: false,
      error,
    },
  };
};

export const getCourierLogsRequest = state => {
  return {
    ...state,
    getCourierLogs: {
      ...state.getCourierLogs,
      isPending: true,
    },
  };
};

export const getCourierLogsSuccess = state => {
  return {
    ...state,
    getCourierLogs: {
      ...state.getCourierLogs,
      isPending: false,
    },
  };
};

export const getCourierLogsFailure = (state, { error }) => {
  return {
    ...state,
    getCourierLogs: {
      ...state.getCourierLogs,
      isPending: false,
      error,
    },
  };
};

export const resetCourierPasswordRequest = state => {
  return {
    ...state,
    resetCourierPassword: {
      ...state.resetCourierPassword,
      isPending: true,
    },
  };
};

export const resetCourierPasswordSuccess = (state, { data }) => {
  return {
    ...state,
    resetCourierPassword: {
      ...state.resetCourierPassword,
      data,
      isPending: false,
    },
  };
};

export const resetCourierPasswordFailure = (state, { error }) => {
  return {
    ...state,
    resetCourierPassword: {
      ...state.resetCourierPassword,
      isPending: false,
      error,
    },
  };
};

export const setGeofenceByCourierIdRequest = state => {
  return {
    ...state,
    setGeofenceByCourierId: {
      ...state.setGeofenceByCourierId,
      isPending: true,
    },
  };
};

export const setGeofenceByCourierIdSuccess = (state, { data }) => {
  return {
    ...state,
    setGeofenceByCourierId: {
      ...state.setGeofenceByCourierId,
      data,
      isPending: false,
    },
  };
};

export const setGeofenceByCourierIdFailure = (state, { error }) => {
  return {
    ...state,
    setGeofenceByCourierId: {
      ...state.setGeofenceByCourierId,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_COURIER_REQUEST]: getCourierRequest,
  [Types.GET_COURIER_SUCCESS]: getCourierSuccess,
  [Types.GET_COURIER_FAILURE]: getCourierFailure,
  [Types.RELEASE_COURIER_REQUEST]: releaseCourierRequest,
  [Types.RELEASE_COURIER_SUCCESS]: releaseCourierSuccess,
  [Types.RELEASE_COURIER_FAILURE]: releaseCourierFailure,
  [Types.GET_COURIER_BUSY_OPTIONS_REQUEST]: getCourierBusyOptionsRequest,
  [Types.GET_COURIER_BUSY_OPTIONS_SUCCESS]: getCourierBusyOptionsSuccess,
  [Types.GET_COURIER_BUSY_OPTIONS_FAILURE]: getCourierBusyOptionsFailure,
  [Types.SET_COURIER_FREE_REQUEST]: setCourierOperationRequest,
  [Types.SET_COURIER_FREE_SUCCESS]: setCourierOperationSuccess,
  [Types.SET_COURIER_FREE_FAILURE]: setCourierOperationFailure,
  [Types.SET_COURIER_BUSY_REQUEST]: setCourierOperationRequest,
  [Types.SET_COURIER_BUSY_SUCCESS]: setCourierOperationSuccess,
  [Types.SET_COURIER_BUSY_FAILURE]: setCourierOperationFailure,
  [Types.SET_COURIER_ACTIVATE_REQUEST]: setCourierOperationRequest,
  [Types.SET_COURIER_ACTIVATE_SUCCESS]: setCourierOperationSuccess,
  [Types.SET_COURIER_ACTIVATE_FAILURE]: setCourierOperationFailure,
  [Types.SET_COURIER_DEACTIVATE_REQUEST]: setCourierOperationRequest,
  [Types.SET_COURIER_DEACTIVATE_SUCCESS]: setCourierOperationSuccess,
  [Types.SET_COURIER_DEACTIVATE_FAILURE]: setCourierOperationFailure,
  [Types.RESTART_COURIER_MDU_REQUEST]: setCourierOperationRequest,
  [Types.RESTART_COURIER_MDU_SUCCESS]: setCourierOperationSuccess,
  [Types.RESTART_COURIER_MDU_FAILURE]: setCourierOperationFailure,
  [Types.SEND_PULL_APPS_NOTIFICATION_REQUEST]: setCourierOperationRequest,
  [Types.SEND_PULL_APPS_NOTIFICATION_SUCCESS]: setCourierOperationSuccess,
  [Types.SEND_PULL_APPS_NOTIFICATION_FAILURE]: setCourierOperationFailure,
  [Types.SEND_CHECK_SERVICES_NOTIFICATION_REQUEST]: setCourierOperationRequest,
  [Types.SEND_CHECK_SERVICES_NOTIFICATION_SUCCESS]: setCourierOperationSuccess,
  [Types.SEND_CHECK_SERVICES_NOTIFICATION_FAILURE]: setCourierOperationFailure,
  [Types.SEND_START_SERVICES_NOTIFICATION_REQUEST]: setCourierOperationRequest,
  [Types.SEND_START_SERVICES_NOTIFICATION_SUCCESS]: setCourierOperationSuccess,
  [Types.SEND_START_SERVICES_NOTIFICATION_FAILURE]: setCourierOperationFailure,
  [Types.REMOVE_COURIER_FROM_SYSTEM_REQUEST]: setCourierOperationRequest,
  [Types.REMOVE_COURIER_FROM_SYSTEM_SUCCESS]: setCourierOperationSuccess,
  [Types.REMOVE_COURIER_FROM_SYSTEM_FAILURE]: setCourierOperationFailure,
  [Types.SEND_NOTIFICATION_MESSAGE_REQUEST]: setCourierOperationRequest,
  [Types.SEND_NOTIFICATION_MESSAGE_SUCCESS]: setCourierOperationSuccess,
  [Types.SEND_NOTIFICATION_MESSAGE_FAILURE]: setCourierOperationFailure,
  [Types.SET_WAREHOUSE_TO_COURIER_REQUEST]: setWarehouseToCourierRequest,
  [Types.SET_WAREHOUSE_TO_COURIER_SUCCESS]: setWarehouseToCourierSuccess,
  [Types.SET_WAREHOUSE_TO_COURIER_FAILURE]: setWarehouseToCourierFailure,
  [Types.SET_DOMAIN_TYPE_REQUEST]: setDomainTypeRequest,
  [Types.SET_DOMAIN_TYPE_SUCCESS]: setDomainTypeSuccess,
  [Types.SET_DOMAIN_TYPE_FAILURE]: setDomainTypeFailure,
  [Types.SET_AVAILABLE_VEHICLE_TYPES_REQUEST]: setAvailableVehicleTypesRequest,
  [Types.SET_AVAILABLE_VEHICLE_TYPES_SUCCESS]: setAvailableVehicleTypesSuccess,
  [Types.SET_AVAILABLE_VEHICLE_TYPES_FAILURE]: setAvailableVehicleTypesFailure,
  [Types.SET_CHIEF_COURIER_REQUEST]: setChiefCourierRequest,
  [Types.SET_CHIEF_COURIER_SUCCESS]: setChiefCourierSuccess,
  [Types.SET_CHIEF_COURIER_FAILURE]: setChiefCourierFailure,
  [Types.SET_EMPLOYMENT_TYPE_REQUEST]: setEmploymentTypeRequest,
  [Types.SET_EMPLOYMENT_TYPE_SUCCESS]: setEmploymentTypeSuccess,
  [Types.SET_EMPLOYMENT_TYPE_FAILURE]: setEmploymentTypeFailure,
  [Types.SET_IS_LOGIN_DISABLED_REQUEST]: setIsLoginDisabledRequest,
  [Types.SET_IS_LOGIN_DISABLED_SUCCESS]: setIsLoginDisabledSuccess,
  [Types.SET_IS_LOGIN_DISABLED_FAILURE]: setIsLoginDisabledFailure,
  [Types.GET_ORDER_LIST_REQUEST]: getOrderListRequest,
  [Types.GET_ORDER_LIST_SUCCESS]: getOrderListSuccess,
  [Types.GET_ORDER_LIST_FAILURE]: getOrderListFailure,
  [Types.GET_RETURN_DETAILS_WITH_RETURN_ID_LIST_REQUEST]: getReturnDetailsWithReturnIdListRequest,
  [Types.GET_RETURN_DETAILS_WITH_RETURN_ID_LIST_SUCCESS]: getReturnDetailsWithReturnIdListSuccess,
  [Types.GET_RETURN_DETAILS_WITH_RETURN_ID_LIST_FAILURE]: getReturnDetailsWithReturnIdListFailure,
  [Types.GET_STATUS_LOGS_REQUEST]: getStatusLogsRequest,
  [Types.GET_STATUS_LOGS_SUCCESS]: getStatusLogsSuccess,
  [Types.GET_STATUS_LOGS_FAILURE]: getStatusLogsFailure,
  [Types.GET_COURIER_TASKS_REQUEST]: getCourierTasksRequest,
  [Types.GET_COURIER_TASKS_SUCCESS]: getCourierTasksSuccess,
  [Types.GET_COURIER_TASKS_FAILURE]: getCourierTasksFailure,
  [Types.FORCE_LOGOUT_REQUEST]: forceLogoutRequest,
  [Types.FORCE_LOGOUT_SUCCESS]: forceLogoutSuccess,
  [Types.FORCE_LOGOUT_FAILURE]: forceLogoutFailure,
  [Types.GET_GEO_FENCE_REQUEST]: geoFenceLogsRequest,
  [Types.GET_GEO_FENCE_SUCCESS]: geoFenceLogsSuccess,
  [Types.GET_GEO_FENCE_FAILURE]: geoFenceLogsFailure,
  [Types.GET_COMMON_FEEDBACK_REQUEST]: getCourierFeedbackRequest,
  [Types.GET_COMMON_FEEDBACK_REQUEST_SUCCESS]: getCourierFeedbackSuccess,
  [Types.GET_COMMON_FEEDBACK_REQUEST_FAILURE]: getCourierFeedbackFailure,
  [Types.GET_COURIER_LOGS_REQUEST]: getCourierLogsRequest,
  [Types.GET_COURIER_LOGS_SUCCESS]: getCourierLogsSuccess,
  [Types.GET_COURIER_LOGS_FAILURE]: getCourierLogsFailure,
  [Types.RESET_COURIER_PASSWORD_REQUEST]: resetCourierPasswordRequest,
  [Types.RESET_COURIER_PASSWORD_SUCCESS]: resetCourierPasswordSuccess,
  [Types.RESET_COURIER_PASSWORD_FAILURE]: resetCourierPasswordFailure,
  [Types.SET_GEOFENCE_BY_COURIER_ID_REQUEST]: setGeofenceByCourierIdRequest,
  [Types.SET_GEOFENCE_BY_COURIER_ID_SUCCESS]: setGeofenceByCourierIdSuccess,
  [Types.SET_GEOFENCE_BY_COURIER_ID_FAILURE]: setGeofenceByCourierIdFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
