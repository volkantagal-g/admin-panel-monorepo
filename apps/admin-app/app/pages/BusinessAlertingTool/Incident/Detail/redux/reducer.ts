import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  incident: {
    data: null,
    isPending: false,
    error: null,
  },
  alertCondition: {
    data: null,
    isPending: false,
    error: null,
  },
};

const getIncidentByIdRequest = (state: { incident: any; }) => {
  return {
    ...state,
    incident: {
      ...state.incident,
      isPending: true,
    },
  };
};

const getIncidentByIdSuccess = (state: { incident: any; }, { data }: { data: object }) => {
  return {
    ...state,
    incident: {
      ...state.incident,
      data,
      isPending: false,
    },
  };
};

const getIncidentByIdFailure = (state: { incident: any; }, { error }: { error: any }) => {
  return {
    ...state,
    incident: {
      ...state.incident,
      isPending: false,
      error,
    },
  };
};

const getAlertConditionByIdRequest = (state: { alertCondition: any; }) => {
  return {
    ...state,
    alertCondition: {
      ...state.alertCondition,
      isPending: true,
    },
  };
};

const getAlertConditionByIdSuccess = (state: { alertCondition: any; }, { data }: { data: object }) => {
  return {
    ...state,
    alertCondition: {
      ...state.alertCondition,
      data,
      isPending: false,
    },
  };
};

const getAlertConditionByIdFailure = (state: { alertCondition: any; }, { error }: { error: any }) => {
  return {
    ...state,
    alertCondition: {
      ...state.alertCondition,
      isPending: false,
      error,
    },
  };
};

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_INCIDENT_BY_ID_REQUEST]: getIncidentByIdRequest,
  [Types.GET_INCIDENT_BY_ID_SUCCESS]: getIncidentByIdSuccess,
  [Types.GET_INCIDENT_BY_ID_FAILURE]: getIncidentByIdFailure,

  [Types.GET_ALERT_CONDITION_BY_ID_REQUEST]: getAlertConditionByIdRequest,
  [Types.GET_ALERT_CONDITION_BY_ID_SUCCESS]: getAlertConditionByIdSuccess,
  [Types.GET_ALERT_CONDITION_BY_ID_FAILURE]: getAlertConditionByIdFailure,

  [Types.INIT_PAGE]: destroyPage,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
