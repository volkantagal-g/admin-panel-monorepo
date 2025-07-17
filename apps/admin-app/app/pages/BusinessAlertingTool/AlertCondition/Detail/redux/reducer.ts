import { createReducer } from 'reduxsauce';

import { Types } from './actions';

const INITIAL_STATE = {
  alertConditionDetail: {
    data: {},
    isPending: false,
    error: null,
  },
  operationHoursByDomainType: {
    data: {},
    isPending: false,
    error: null,
  },
  tempDefinedHours: {},
};

type StateType = {
  alertConditionDetail: {
    data: object,
    isPending: boolean,
  },
  operationHoursByDomainType: {
    data: object,
    isPending: boolean,
  },
  tempDefinedHours: object,
}

const getAlertConditionDetailRequest = (state: StateType) => {
  return {
    ...state,
    alertConditionDetail: {
      ...state.alertConditionDetail,
      isPending: true,
    },
  };
};
const getAlertConditionDetailSuccess = (state: StateType, { data }: { data: { [key: string | number]: any } }) => {
  return {
    ...state,
    alertConditionDetail: {
      ...state.alertConditionDetail,
      isPending: false,
      data,
    },
  };
};
const getAlertConditionDetailFailure = (state: StateType, { error }: { error: any }) => {
  return {
    ...state,
    alertConditionDetail: {
      ...state.alertConditionDetail,
      isPending: false,
      error,
    },
  };
};

const activateAlertConditionRequest = (state: StateType) => {
  return {
    ...state,
    alertConditionDetail: {
      ...state.alertConditionDetail,
      isPending: true,
    },
  };
};
const activateAlertConditionSuccess = (state: StateType, { success }: { success: boolean }) => {
  return {
    ...state,
    alertConditionDetail: {
      ...state.alertConditionDetail,
      data: {
        ...state.alertConditionDetail.data,
        status: success ? 100 : 200,
      },
      isPending: false,
    },
  };
};
const activateAlertConditionFailure = (state: StateType, { error }: { error: any }) => {
  return {
    ...state,
    alertConditionDetail: {
      ...state.alertConditionDetail,
      isPending: false,
      error,
    },
  };
};

const deactivateAlertConditionRequest = (state: StateType) => {
  return {
    ...state,
    alertConditionDetail: {
      ...state.alertConditionDetail,
      isPending: true,
    },
  };
};
const deactivateAlertConditionSuccess = (state: StateType, { success }: { success: boolean }) => {
  return {
    ...state,
    alertConditionDetail: {
      ...state.alertConditionDetail,
      data: {
        ...state.alertConditionDetail.data,
        status: success ? 200 : 100,
      },
      isPending: false,
    },
  };
};
const deactivateAlertConditionFailure = (state: StateType, { error }: { error: any }) => {
  return {
    ...state,
    alertConditionDetail: {
      ...state.alertConditionDetail,
      isPending: false,
      error,
    },
  };
};

const getOperationHoursByDomainTypeRequest = (state: StateType) => {
  return {
    ...state,
    operationHoursByDomainType: {
      ...state.operationHoursByDomainType,
      isPending: true,
    },
  };
};
const getOperationHoursByDomainTypeSuccess = (state: StateType, { data }: any) => {
  return {
    ...state,
    operationHoursByDomainType: {
      ...state.operationHoursByDomainType,
      data,
      isPending: false,
    },
  };
};
const getOperationHoursByDomainTypeFailure = (state: StateType, { error }: any) => {
  return {
    ...state,
    operationHoursByDomainType: {
      ...state.operationHoursByDomainType,
      error,
      isPending: false,
    },
  };
};

const setTempDefinedHours = (state: StateType, { data }: any) => {
  return {
    ...state,
    tempDefinedHours: {
      ...state.tempDefinedHours,
      data,
    },
  };
};

const destroy = () => {
  return { ...INITIAL_STATE };
};

const HANDLERS = {
  [Types.GET_ALERT_CONDITION_DETAIL_REQUEST]: getAlertConditionDetailRequest,
  [Types.GET_ALERT_CONDITION_DETAIL_SUCCESS]: getAlertConditionDetailSuccess,
  [Types.GET_ALERT_CONDITION_DETAIL_FAILURE]: getAlertConditionDetailFailure,

  [Types.ACTIVATE_ALERT_CONDITION_REQUEST]: activateAlertConditionRequest,
  [Types.ACTIVATE_ALERT_CONDITION_SUCCESS]: activateAlertConditionSuccess,
  [Types.ACTIVATE_ALERT_CONDITION_FAILURE]: activateAlertConditionFailure,

  [Types.DEACTIVATE_ALERT_CONDITION_REQUEST]: deactivateAlertConditionRequest,
  [Types.DEACTIVATE_ALERT_CONDITION_SUCCESS]: deactivateAlertConditionSuccess,
  [Types.DEACTIVATE_ALERT_CONDITION_FAILURE]: deactivateAlertConditionFailure,

  [Types.GET_OPERATION_HOURS_BY_DOMAIN_TYPE_REQUEST]: getOperationHoursByDomainTypeRequest,
  [Types.GET_OPERATION_HOURS_BY_DOMAIN_TYPE_SUCCESS]: getOperationHoursByDomainTypeSuccess,
  [Types.GET_OPERATION_HOURS_BY_DOMAIN_TYPE_FAILURE]: getOperationHoursByDomainTypeFailure,
  [Types.SET_TEMP_DEFINED_HOURS]: setTempDefinedHours,

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
