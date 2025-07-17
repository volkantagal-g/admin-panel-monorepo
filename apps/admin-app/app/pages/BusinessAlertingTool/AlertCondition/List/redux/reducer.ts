import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  alertConditions: {
    data: [],
    total: 0,
    isPending: false,
    error: null,
  },
  filters: {
    statuses: undefined,
    createdBy: undefined,
    permittedRoles: [],
    notificationChannels: [],
    createdAtRange: [],
    searchTerm: undefined,
    limit: undefined,
    offset: undefined,
  },
};

const filterAlertConditionsRequest = (state: { alertConditions: any; }) => {
  return {
    ...state,
    alertConditions: {
      ...state.alertConditions,
      isPending: true,
    },
  };
};

const filterAlertConditionsSuccess = (state: { alertConditions: any; }, { data, total }: any) => {
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

const filterAlertConditionsFailure = (state: { alertConditions: any; }, { error }: any) => {
  return {
    ...state,
    alertConditions: {
      ...state.alertConditions,
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

const setFilterCreatedBy = (state: { filters: any; }, { createdBy }: any) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      createdBy,
    },
  };
};

const setFilterPermittedRoles = (state: { filters: any; }, { permittedRoles }: any) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      permittedRoles,
    },
  };
};

const setFilterNotificationChannels = (state: { filters: any; }, { notificationChannels }: any) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      notificationChannels: [...notificationChannels],
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

const setFilterSearchTerm = (state: { filters: any; }, { searchTerm }: any) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      searchTerm,
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
  [Types.FILTER_ALERT_CONDITIONS_REQUEST]: filterAlertConditionsRequest,
  [Types.FILTER_ALERT_CONDITIONS_SUCCESS]: filterAlertConditionsSuccess,
  [Types.FILTER_ALERT_CONDITIONS_FAILURE]: filterAlertConditionsFailure,

  [Types.SET_FILTER_STATUSES]: setFilterStatuses,
  [Types.SET_FILTER_CREATED_BY]: setFilterCreatedBy,
  [Types.SET_FILTER_PERMITTED_ROLES]: setFilterPermittedRoles,
  [Types.SET_FILTER_NOTIFICATION_CHANNELS]: setFilterNotificationChannels,
  [Types.SET_FILTER_CREATED_AT_RANGE]: setFilterCreatedAtRange,
  [Types.SET_FILTER_SEARCH_TERM]: setFilterSearchTerm,
  [Types.RESET_FILTERS]: resetFilters,

  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
