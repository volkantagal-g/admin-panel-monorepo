import { createReducer } from 'reduxsauce';

import { Types } from './actions';

const INITIAL_STATE = {
  createAlertCondition: {
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
interface IState {
  createAlertCondition: {
    data: object,
    isPending: boolean,
  },
  operationHoursByDomainType: {
    data: object,
    isPending: boolean,
  },
  tempDefinedHours: object,
}

const createAlertConditionRequest = (state: IState) => {
  return {
    ...state,
    createAlertCondition: {
      ...state.createAlertCondition,
      isPending: true,
    },
  };
};

const createAlertConditionSuccess = (state: IState, { data }: any) => {
  return {
    ...state,
    createAlertCondition: {
      ...state.createAlertCondition,
      data,
      isPending: false,
    },
  };
};

const createAlertConditionFailure = (state: IState, { error }: any) => {
  return {
    ...state,
    createAlertCondition: {
      ...state.createAlertCondition,
      error,
      isPending: false,
    },
  };
};
const getOperationHoursByDomainTypeRequest = (state: IState) => {
  return {
    ...state,
    operationHoursByDomainType: {
      ...state.operationHoursByDomainType,
      isPending: true,
    },
  };
};

const getOperationHoursByDomainTypeSuccess = (state: IState, { data }: any) => {
  return {
    ...state,
    operationHoursByDomainType: {
      ...state.operationHoursByDomainType,
      data,
      isPending: false,
    },
  };
};

const getOperationHoursByDomainTypeFailure = (state: IState, { error }: any) => {
  return {
    ...state,
    operationHoursByDomainType: {
      ...state.operationHoursByDomainType,
      error,
      isPending: false,
    },
  };
};

const setTempDefinedHours = (state: IState, { data }: any) => {
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
  [Types.CREATE_ALERT_CONDITION_REQUEST]: createAlertConditionRequest,
  [Types.CREATE_ALERT_CONDITION_SUCCESS]: createAlertConditionSuccess,
  [Types.CREATE_ALERT_CONDITION_FAILURE]: createAlertConditionFailure,
  [Types.GET_OPERATION_HOURS_BY_DOMAIN_TYPE_REQUEST]: getOperationHoursByDomainTypeRequest,
  [Types.GET_OPERATION_HOURS_BY_DOMAIN_TYPE_SUCCESS]: getOperationHoursByDomainTypeSuccess,
  [Types.GET_OPERATION_HOURS_BY_DOMAIN_TYPE_FAILURE]: getOperationHoursByDomainTypeFailure,
  [Types.SET_TEMP_DEFINED_HOURS]: setTempDefinedHours,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
