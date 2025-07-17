import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  isModalOpen: false,
  createOrUpdateMentorshipCourse: {
    isPending: false,
    data: {},
    error: null,
  },
  deleteMentorshipCourse: {
    isPending: false,
    data: {},
    error: null,
  },
  mentorshipCourses: {
    data: [],
    isPending: false,
    error: false,
    pagination: {
      previousPageCursor: undefined,
      nextPageCursor: undefined,
      limit: 10,
    },
  },
};

export const openModal = state => ({
  ...state,
  isModalOpen: true,
});

export const closeModal = state => ({
  ...state,
  isModalOpen: false,
});

export const createOrUpdateMentorshipCourseRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    createOrUpdateMentorshipCourse: {
      ...state.createOrUpdateMentorshipCourse,
      isPending: true,
      error: null,
    },
  };
};

export const createOrUpdateMentorshipCourseSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    createOrUpdateMentorshipCourse: {
      ...state.createOrUpdateMentorshipCourse,
      data,
      isPending: false,
      error: null,
    },
  };
};

export const createOrUpdateMentorshipCourseFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    createOrUpdateMentorshipCourse: {
      ...state.createOrUpdateMentorshipCourse,
      isPending: false,
      error,
    },
  };
};

export const deleteMentorshipCourseRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    deleteMentorshipCourse: {
      ...state.deleteMentorshipCourse,
      isPending: true,
      error: null,
    },
  };
};

export const deleteMentorshipCourseSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    deleteMentorshipCourse: {
      ...state.deleteMentorshipCourse,
      data,
      isPending: false,
      error: null,
    },
  };
};

export const deleteMentorshipCourseFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    deleteMentorshipCourse: {
      ...state.deleteMentorshipCourse,
      isPending: false,
      error,
    },
  };
};

const filterMentorshipCoursesRequest = (state = INITIAL_STATE) => ({
  ...state,
  mentorshipCourses: {
    ...state.mentorshipCourses,
    isPending: true,
    error: false,
  },
});

const filterMentorshipCoursesSuccess = (state = INITIAL_STATE, { data, nextPageCursor, previousPageCursor }) => ({
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

const filterMentorshipCoursesFailure = (state = INITIAL_STATE, { error }) => ({
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
  [Types.OPEN_MODAL]: openModal,
  [Types.CLOSE_MODAL]: closeModal,
  [Types.CREATE_OR_UPDATE_MENTORSHIP_COURSE_REQUEST]: createOrUpdateMentorshipCourseRequest,
  [Types.CREATE_OR_UPDATE_MENTORSHIP_COURSE_SUCCESS]: createOrUpdateMentorshipCourseSuccess,
  [Types.CREATE_OR_UPDATE_MENTORSHIP_COURSE_FAILURE]: createOrUpdateMentorshipCourseFailure,
  [Types.DELETE_MENTORSHIP_COURSE_REQUEST]: deleteMentorshipCourseRequest,
  [Types.DELETE_MENTORSHIP_COURSE_SUCCESS]: deleteMentorshipCourseSuccess,
  [Types.DELETE_MENTORSHIP_COURSE_FAILURE]: deleteMentorshipCourseFailure,
  [Types.FILTER_MENTORSHIP_COURSES_REQUEST]: filterMentorshipCoursesRequest,
  [Types.FILTER_MENTORSHIP_COURSES_SUCCESS]: filterMentorshipCoursesSuccess,
  [Types.FILTER_MENTORSHIP_COURSES_FAILURE]: filterMentorshipCoursesFailure,
  [Types.SET_PAGINATION]: setPagination,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
