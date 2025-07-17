import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  mentorshipCourses: {
    data: [],
    isPending: false,
    error: false,
    filters: {
      mentors: undefined,
      topics: undefined,
      jobFamilyId: undefined,
      languages: undefined,
    },
    pagination: {
      previousPageCursor: undefined,
      nextPageCursor: undefined,
      limit: 10,
    },
  },
};

const searchMentorshipCoursesRequest = (state = INITIAL_STATE) => ({
  ...state,
  mentorshipCourses: {
    ...state.mentorshipCourses,
    isPending: true,
    error: false,
  },
});

const searchMentorshipCoursesSuccess = (state = INITIAL_STATE, { data, nextPageCursor, previousPageCursor }) => ({
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

const searchMentorshipCoursesFailure = (state = INITIAL_STATE, { error }) => ({
  ...state,
  mentorshipCourses: {
    ...state.mentorshipCourses,
    isPending: false,
    error,
  },
});

const setPagination = (state = INITIAL_STATE, { pagination }) => {
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

const setFilters = (state, { filters }) => {
  return {
    ...state,
    mentorshipCourses: {
      ...state.mentorshipCourses,
      isPending: false,
      filters: {
        ...state.mentorshipCourses.filters,
        ...filters,
      },
      pagination: {
        ...state.mentorshipCourses.pagination,
        previousPageCursor: undefined,
        nextPageCursor: undefined,
      },
    },
  };
};

const resetFilters = state => {
  return {
    ...state,
    mentorshipCourses: {
      ...state.mentorshipCourses,
      isPending: false,
      filters: {
        mentors: undefined,
        topics: undefined,
        jobFamilyId: undefined,
        languages: undefined,
      },
    },
  };
};

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.SEARCH_MENTORSHIP_COURSES_REQUEST]: searchMentorshipCoursesRequest,
  [Types.SEARCH_MENTORSHIP_COURSES_SUCCESS]: searchMentorshipCoursesSuccess,
  [Types.SEARCH_MENTORSHIP_COURSES_FAILURE]: searchMentorshipCoursesFailure,
  [Types.SET_PAGINATION]: setPagination,
  [Types.SET_FILTERS]: setFilters,
  [Types.RESET_FILTERS]: resetFilters,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
