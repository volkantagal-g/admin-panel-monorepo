import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  mentorId: null,
  mentorshipUserOfCurrentUser: {
    data: {},
    isPending: false,
    error: false,
  },
  mentorshipMentorDetail: {
    isPending: false,
    data: {},
    error: null,
  },
  mentorshipCourses: {
    data: {},
    isPending: false,
    error: false,
    pagination: {
      previousPageCursor: undefined,
      nextPageCursor: undefined,
      limit: 10,
    },
  },
};

const getMentorshipUserOfCurrentUserRequest = state => ({
  ...state,
  mentorshipUserOfCurrentUser: {
    ...state.mentorshipUserOfCurrentUser,
    isPending: true,
    error: false,
  },
});

const getMentorshipUserOfCurrentUserSuccess = (state, { data }) => ({
  ...state,
  mentorshipUserOfCurrentUser: {
    ...state.mentorshipUserOfCurrentUser,
    isPending: false,
    data,
  },
});

const getMentorshipUserOfCurrentUserFailure = state => ({
  ...state,
  mentorshipUserOfCurrentUser: {
    ...state.mentorshipUserOfCurrentUser,
    isPending: false,
    error: true,
  },
});

const getMentorshipMentorDetailRequest = (state, { mentorId }) => ({
  ...state,
  mentorId,
  mentorshipMentorDetail: {
    ...state.mentorshipMentorDetail,
    isPending: true,
    error: false,
  },
});

const getMentorshipMentorDetailSuccess = (state, { data }) => ({
  ...state,
  mentorshipMentorDetail: {
    ...state.mentorshipMentorDetail,
    isPending: false,
    data,
  },
});

const getMentorshipMentorDetailFailure = state => ({
  ...state,
  mentorshipMentorDetail: {
    ...state.mentorshipMentorDetail,
    isPending: false,
    error: true,
  },
});

const filterMentorshipCoursesRequest = state => ({
  ...state,
  mentorshipCourses: {
    ...state.mentorshipCourses,
    isPending: true,
    error: false,
  },
});

const filterMentorshipCoursesSuccess = (state, { data, nextPageCursor, previousPageCursor }) => ({
  ...state,
  mentorshipCourses: {
    ...state.mentorshipCourses,
    isPending: false,
    error: false,
    data,
    pagination: {
      ...state.mentorshipCourses.pagination,
      nextPageCursor,
      previousPageCursor,
    },
  },
});

const filterMentorshipCoursesFailure = (state, { error }) => ({
  ...state,
  mentorshipCourses: {
    ...state.mentorshipCourses,
    isPending: false,
    error,
  },
});

const setPagination = (state, { pagination }) => {
  return {
    ...state,
    mentorshipCourses: {
      ...state.mentorshipCourses,
      pagination: {
        ...state.mentorshipCourses.pagination,
        ...pagination,
      },
      isPending: false,
    },
  };
};

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_MENTORSHIP_USER_OF_CURRENT_USER_REQUEST]: getMentorshipUserOfCurrentUserRequest,
  [Types.GET_MENTORSHIP_USER_OF_CURRENT_USER_SUCCESS]: getMentorshipUserOfCurrentUserSuccess,
  [Types.GET_MENTORSHIP_USER_OF_CURRENT_USER_FAILURE]: getMentorshipUserOfCurrentUserFailure,
  [Types.GET_MENTORSHIP_MENTOR_DETAIL_REQUEST]: getMentorshipMentorDetailRequest,
  [Types.GET_MENTORSHIP_MENTOR_DETAIL_SUCCESS]: getMentorshipMentorDetailSuccess,
  [Types.GET_MENTORSHIP_MENTOR_DETAIL_FAILURE]: getMentorshipMentorDetailFailure,
  [Types.FILTER_MENTORSHIP_COURSES_REQUEST]: filterMentorshipCoursesRequest,
  [Types.FILTER_MENTORSHIP_COURSES_SUCCESS]: filterMentorshipCoursesSuccess,
  [Types.FILTER_MENTORSHIP_COURSES_FAILURE]: filterMentorshipCoursesFailure,
  [Types.SET_PAGINATION]: setPagination,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
