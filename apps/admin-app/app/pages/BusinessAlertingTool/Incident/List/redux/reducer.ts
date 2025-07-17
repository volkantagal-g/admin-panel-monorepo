import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  alertConditions: {
    data: [],
    total: 0,
    isPending: false,
    error: null,
  },
  incidents: {
    data: [],
    total: 0,
    isPending: false,
    error: null,
  },
  filters: {
    statuses: undefined,
    createdBy: undefined,
    priority: undefined,
    alertCondition: undefined,
    createdAtRange: [],
    limit: undefined,
    offset: undefined,
    sortDirection: undefined,
    sortKey: 'createdAt', // mvp version only has createdAt sortKey we can set in future if needed
  },
};

const getAlertConditionsRequest = (state: { alertConditions: any; }) => {
  return {
    ...state,
    alertConditions: {
      ...state.alertConditions,
      isPending: true,
    },
  };
};

const getAlertConditionsSuccess = (state: { alertConditions: any; }, { data, total }: any) => {
  return {
    ...state,
    alertConditions: {
      ...state.alertConditions,
      data,
      total,
      isPending: false,
    },
  };
};

const getAlertConditionsFailure = (state: { alertConditions: any; }, { error }: any) => {
  return {
    ...state,
    alertConditions: {
      ...state.alertConditions,
      isPending: false,
      error,
    },
  };
};

const filterIncidentsRequest = (state: { incidents: any; }) => {
  return {
    ...state,
    incidents: {
      ...state.incidents,
      isPending: true,
    },
  };
};

const filterIncidentsSuccess = (state: { incidents: any; }, { data, total }: any) => {
  return {
    ...state,
    incidents: {
      ...state.incidents,
      data,
      total,
      isPending: false,
    },
  };
};

const filterIncidentsFailure = (state: { incidents: any; }, { error }: any) => {
  return {
    ...state,
    incidents: {
      ...state.incidents,
      isPending: false,
      error,
    },
  };
};

const setFilterStatuses = (state: { filters: any; }, { statuses }: any) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      statuses,
    },
  };
};

const setFilterPriority = (state: { filters: any; }, { priority }: any) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      priority,
    },
  };
};

const setFilterAlertCondition = (state: { filters: any; }, { alertCondition }: any) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      alertCondition,
    },
  };
};

const setFilterCreatedAtRange = (state: { filters: any; }, { createdAtRange }: any) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      createdAtRange: [...createdAtRange],
    },
  };
};

const setFilterSortDirection = (state: { filters: any; }, { sortDirection }: any) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      sortDirection,
    },
  };
};

const resetFilters = (state: any) => {
  return {
    ...state,
    filters: { ...INITIAL_STATE.filters },
  };
};

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_ALERT_CONDITIONS_REQUEST]: getAlertConditionsRequest,
  [Types.GET_ALERT_CONDITIONS_SUCCESS]: getAlertConditionsSuccess,
  [Types.GET_ALERT_CONDITIONS_FAILURE]: getAlertConditionsFailure,

  [Types.FILTER_INCIDENTS_REQUEST]: filterIncidentsRequest,
  [Types.FILTER_INCIDENTS_SUCCESS]: filterIncidentsSuccess,
  [Types.FILTER_INCIDENTS_FAILURE]: filterIncidentsFailure,

  [Types.SET_FILTER_STATUSES]: setFilterStatuses,
  [Types.SET_FILTER_ALERT_CONDITION]: setFilterAlertCondition,
  [Types.SET_FILTER_PRIORITY]: setFilterPriority,
  [Types.SET_FILTER_CREATED_AT_RANGE]: setFilterCreatedAtRange,
  [Types.SET_FILTER_SORT_DIRECTION]: setFilterSortDirection,
  [Types.RESET_FILTERS]: resetFilters,

  [Types.INIT_PAGE]: destroyPage,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
