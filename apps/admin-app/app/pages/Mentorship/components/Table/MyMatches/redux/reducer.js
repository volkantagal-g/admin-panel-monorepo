import { createReducer } from 'reduxsauce';

import { Types } from './actions';
import { MENTORSHIP_STATUSES } from '@app/pages/Mentorship/constants';

export const INITIAL_STATE = {
  mentorshipRequestMatches: {
    data: [],
    isPending: false,
    error: false,
    filters: { mentorshipStatus: [MENTORSHIP_STATUSES.IN_PROGRESS] },
    pagination: {
      previousPageCursor: undefined,
      nextPageCursor: undefined,
      limit: 10,
    },
  },
};

const filterMentorshipRequestMatchesRequest = (state = INITIAL_STATE) => ({
  ...state,
  mentorshipRequestMatches: {
    ...state.mentorshipRequestMatches,
    isPending: true,
    error: false,
  },
});

const filterMentorshipRequestMatchesSuccess = (state = INITIAL_STATE, { data, nextPageCursor, previousPageCursor }) => ({
  ...state,
  mentorshipRequestMatches: {
    ...state.mentorshipRequestMatches,
    isPending: false,
    error: false,
    data,
    pagination: {
      ...state.mentorshipRequestMatches.pagination,
      nextPageCursor,
      previousPageCursor,
    },
  },
});

const filterMentorshipRequestMatchesFailure = (state = INITIAL_STATE, { error }) => ({
  ...state,
  mentorshipRequestMatches: {
    ...state.mentorshipRequestMatches,
    isPending: false,
    error,
  },
});

const setPagination = (state, { pagination }) => {
  return {
    ...state,
    mentorshipRequestMatches: {
      ...state.mentorshipRequestMatches,
      pagination: {
        ...state.mentorshipRequestMatches.pagination,
        ...pagination,
      },
      isPending: false,
    },
  };
};

const setFilters = (state, { filters }) => {
  return {
    ...state,
    mentorshipRequestMatches: {
      ...state.mentorshipRequestMatches,
      isPending: false,
      filters: {
        ...state.mentorshipRequestMatches.filters,
        ...filters,
      },
      pagination: {
        ...state.mentorshipRequestMatches.pagination,
        previousPageCursor: undefined,
        nextPageCursor: undefined,
      },
    },
  };
};

const resetFilters = state => {
  return {
    ...state,
    mentorshipRequestMatches: {
      ...state.mentorshipRequestMatches,
      isPending: false,
      filters: {},
    },
  };
};

const initPage = () => ({ ...INITIAL_STATE });

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.FILTER_MENTORSHIP_REQUEST_MATCHES_REQUEST]: filterMentorshipRequestMatchesRequest,
  [Types.FILTER_MENTORSHIP_REQUEST_MATCHES_SUCCESS]: filterMentorshipRequestMatchesSuccess,
  [Types.FILTER_MENTORSHIP_REQUEST_MATCHES_FAILURE]: filterMentorshipRequestMatchesFailure,
  [Types.SET_PAGINATION]: setPagination,
  [Types.SET_FILTERS]: setFilters,
  [Types.RESET_FILTERS]: resetFilters,
  [Types.INIT_PAGE]: initPage,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
