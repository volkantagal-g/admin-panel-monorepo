import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  personCandidateList: {
    data: [],
    total: 0,
    isPending: false,
  },
  updateAssignee: { isPending: false },
  personCandidateActionHistory: {
    data: [],
    total: 0,
    isPending: false,
    error: null,
    candidate: null,
  },
};

export const personCandidateListRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    personCandidateList: {
      ...state.personCandidateList,
      isPending: true,
    },
  };
};

export const personCandidateListSuccess = (state = INITIAL_STATE, { data = [], total = 0 }) => {
  return {
    ...state,
    personCandidateList: {
      ...state.personCandidateList,
      data,
      total,
      isPending: false,
    },
  };
};

export const personCandidateListFailure = (state = INITIAL_STATE) => {
  return {
    ...state,
    personCandidateList: {
      ...state.personCandidateList,
      data: [],
      total: 0,
      isPending: false,
    },
  };
};

export const updateAssigneeRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateAssignee: {
      ...state.updateAssignee,
      isPending: true,
    },
  };
};

export const updateAssigneeSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateAssignee: {
      ...state.updateAssignee,
      isPending: false,
    },
  };
};

export const updateAssigneeFailure = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateAssignee: {
      ...state.updateAssignee,
      isPending: false,
    },
  };
};

export const getPersonCandidateActionHistoryRequest = (state = INITIAL_STATE, { candidate }) => {
  return {
    ...state,
    personCandidateActionHistory: {
      ...state.personCandidateActionHistory,
      data: [],
      total: 0,
      isPending: true,
      error: null,
      candidate,
    },
  };
};

export const getPersonCandidateActionHistorySuccess = (state = INITIAL_STATE, { data = [] }) => {
  return {
    ...state,
    personCandidateActionHistory: {
      ...state.personCandidateActionHistory,
      data,
      total: data?.length,
      isPending: false,
      error: null,
    },
  };
};

export const getPersonCandidateActionHistoryFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    personCandidateActionHistory: {
      ...state.personCandidateActionHistory,
      data: [],
      total: 0,
      isPending: false,
      error,
    },
  };
};

export const getPersonCandidateListReportRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    personCandidateList: {
      ...state.personCandidateList,
      isPending: true,
    },
  };
};

export const getPersonCandidateListReportSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    personCandidateList: {
      ...state.personCandidateList,
      isPending: false,
    },
  };
};

export const getPersonCandidateListReportFailure = getPersonCandidateListReportSuccess;

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_PERSON_CANDIDATE_LIST_REQUEST]: personCandidateListRequest,
  [Types.GET_PERSON_CANDIDATE_LIST_SUCCESS]: personCandidateListSuccess,
  [Types.GET_PERSON_CANDIDATE_LIST_FAILURE]: personCandidateListFailure,
  [Types.UPDATE_ASSIGNEE_REQUEST]: updateAssigneeRequest,
  [Types.UPDATE_ASSIGNEE_SUCCESS]: updateAssigneeSuccess,
  [Types.UPDATE_ASSIGNEE_FAILURE]: updateAssigneeFailure,
  [Types.GET_PERSON_CANDIDATE_ACTION_HISTORY_REQUEST]: getPersonCandidateActionHistoryRequest,
  [Types.GET_PERSON_CANDIDATE_ACTION_HISTORY_SUCCESS]: getPersonCandidateActionHistorySuccess,
  [Types.GET_PERSON_CANDIDATE_ACTION_HISTORY_FAILURE]: getPersonCandidateActionHistoryFailure,
  [Types.GET_PERSON_CANDIDATE_LIST_REPORT_REQUEST]: getPersonCandidateListReportRequest,
  [Types.GET_PERSON_CANDIDATE_LIST_REPORT_SUCCESS]: getPersonCandidateListReportSuccess,
  [Types.GET_PERSON_CANDIDATE_LIST_REPORT_FAILURE]: getPersonCandidateListReportFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
