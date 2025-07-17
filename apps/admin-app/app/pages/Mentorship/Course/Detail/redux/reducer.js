import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  courseId: null,
  mentorshipUserOfCurrentUser: {
    data: {},
    isPending: false,
    error: false,
  },
  mentorshipCourseDetail: {
    isPending: false,
    data: {},
    error: null,
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

const getMentorshipCourseDetailRequest = (state, { courseId }) => ({
  ...state,
  courseId,
  mentorshipCourseDetail: {
    ...state.mentorshipCourseDetail,
    isPending: true,
    error: false,
  },
});

const getMentorshipCourseDetailSuccess = (state, { data }) => ({
  ...state,
  mentorshipCourseDetail: {
    ...state.mentorshipCourseDetail,
    isPending: false,
    data,
  },
});

const getMentorshipCourseDetailFailure = state => ({
  ...state,
  mentorshipCourseDetail: {
    ...state.mentorshipCourseDetail,
    isPending: false,
    error: true,
  },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_MENTORSHIP_USER_OF_CURRENT_USER_REQUEST]: getMentorshipUserOfCurrentUserRequest,
  [Types.GET_MENTORSHIP_USER_OF_CURRENT_USER_SUCCESS]: getMentorshipUserOfCurrentUserSuccess,
  [Types.GET_MENTORSHIP_USER_OF_CURRENT_USER_FAILURE]: getMentorshipUserOfCurrentUserFailure,
  [Types.GET_MENTORSHIP_COURSE_DETAIL_REQUEST]: getMentorshipCourseDetailRequest,
  [Types.GET_MENTORSHIP_COURSE_DETAIL_SUCCESS]: getMentorshipCourseDetailSuccess,
  [Types.GET_MENTORSHIP_COURSE_DETAIL_FAILURE]: getMentorshipCourseDetailFailure,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
