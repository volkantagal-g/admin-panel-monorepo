import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  id: null,
  employeeId: null,
  employeeOfCurrentUser: {
    data: {},
    isPending: false,
    error: false,
  },
  mentorshipUserInfo: {
    data: {
      bio: undefined,
      employeeId: undefined,
      isMentor: false,
      languages: undefined,
      picURL: undefined,
      topicsInterested: undefined,
      topicsToTeach: undefined,
    },
    isPending: false,
    error: false,
  },
};

const getEmployeeOfCurrentUserRequest = state => ({
  ...state,
  employeeOfCurrentUser: {
    ...state.employeeOfCurrentUser,
    isPending: true,
    error: false,
  },
});

const getEmployeeOfCurrentUserSuccess = (state, { data }) => ({
  ...state,
  employeeOfCurrentUser: {
    ...state.employeeOfCurrentUser,
    isPending: false,
    data,
  },
});

const getEmployeeOfCurrentUserFailure = state => ({
  ...state,
  employeeOfCurrentUser: {
    ...state.employeeOfCurrentUser,
    isPending: false,
    error: true,
  },
});

const getMentorshipUserRequest = (state, { employeeId, id }) => ({
  ...state,
  employeeId,
  id,
  mentorshipUserInfo: {
    ...state.mentorshipUserInfo,
    isPending: true,
    error: false,
  },
});

const getMentorshipUserSuccess = (state, { data }) => ({
  ...state,
  id: data._id,
  employeeId: data.employeeId,
  mentorshipUserInfo: {
    ...state.mentorshipUserInfo,
    isPending: false,
    data,
  },
});

const getMentorshipUserFailure = state => ({
  ...state,
  id: null,
  employeeId: null,
  mentorshipUserInfo: {
    ...state.mentorshipUserInfo,
    isPending: false,
    error: true,
  },
});

const createOrUpdateMentorshipUserRequest = state => ({
  ...state,
  mentorshipUserInfo: {
    ...state.mentorshipUserInfo,
    isPending: true,
    error: false,
  },
});

const createOrUpdateMentorshipUserSuccess = (state, { data }) => ({
  ...state,
  mentorshipUserInfo: {
    ...state.mentorshipUserInfo,
    isPending: false,
    data,
  },
});

const createOrUpdateMentorshipUserFailure = state => ({
  ...state,
  mentorshipUserInfo: {
    ...state.mentorshipUserInfo,
    isPending: false,
    error: true,
  },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_EMPLOYEE_OF_CURRENT_USER_REQUEST]: getEmployeeOfCurrentUserRequest,
  [Types.GET_EMPLOYEE_OF_CURRENT_USER_SUCCESS]: getEmployeeOfCurrentUserSuccess,
  [Types.GET_EMPLOYEE_OF_CURRENT_USER_FAILURE]: getEmployeeOfCurrentUserFailure,
  [Types.GET_MENTORSHIP_USER_REQUEST]: getMentorshipUserRequest,
  [Types.GET_MENTORSHIP_USER_SUCCESS]: getMentorshipUserSuccess,
  [Types.GET_MENTORSHIP_USER_FAILURE]: getMentorshipUserFailure,
  [Types.CREATE_OR_UPDATE_MENTORSHIP_USER_REQUEST]: createOrUpdateMentorshipUserRequest,
  [Types.CREATE_OR_UPDATE_MENTORSHIP_USER_SUCCESS]: createOrUpdateMentorshipUserSuccess,
  [Types.CREATE_OR_UPDATE_MENTORSHIP_USER_FAILURE]: createOrUpdateMentorshipUserFailure,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
