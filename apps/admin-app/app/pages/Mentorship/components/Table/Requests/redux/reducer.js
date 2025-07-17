import { createReducer } from 'reduxsauce';

import { Types } from './actions';
import { MENTORSHIP_REQUEST_STATUSES } from '@app/pages/Mentorship/constants';

export const INITIAL_STATE = {
  mentorshipRequests: {
    data: [],
    isPending: false,
    error: false,
    filters: { requestStatus: [MENTORSHIP_REQUEST_STATUSES.PENDING] },
    pagination: {
      previousPageCursor: undefined,
      nextPageCursor: undefined,
      limit: 10,
    },
  },
  acceptMentorship: {
    data: {},
    isPending: false,
    error: null,
  },
  withdrawMentorship: {
    isPending: false,
    data: {},
    error: null,
  },
  declineMentorship: {
    isPending: false,
    data: {},
    error: null,
  },
};

const filterMentorshipRequestsRequest = (state = INITIAL_STATE) => ({
  ...state,
  mentorshipRequests: {
    ...state.mentorshipRequests,
    isPending: true,
    error: false,
  },
});

const filterMentorshipRequestsSuccess = (state = INITIAL_STATE, { data, nextPageCursor, previousPageCursor }) => ({
  ...state,
  mentorshipRequests: {
    ...state.mentorshipRequests,
    isPending: false,
    error: false,
    data,
    pagination: {
      ...state.mentorshipRequests.pagination,
      nextPageCursor,
      previousPageCursor,
    },
  },
});

const filterMentorshipRequestsFailure = (state = INITIAL_STATE, { error }) => ({
  ...state,
  mentorshipRequests: {
    ...state.mentorshipRequests,
    isPending: false,
    error,
  },
});

const setPagination = (state, { pagination }) => {
  return {
    ...state,
    mentorshipRequests: {
      ...state.mentorshipRequests,
      pagination: {
        ...state.mentorshipRequests.pagination,
        ...pagination,
      },
      isPending: false,
    },
  };
};

const setFilters = (state, { filters }) => {
  return {
    ...state,
    mentorshipRequests: {
      ...state.mentorshipRequests,
      isPending: false,
      filters: {
        ...state.mentorshipRequests.filters,
        ...filters,
      },
      pagination: {
        ...state.mentorshipRequests.pagination,
        previousPageCursor: undefined,
        nextPageCursor: undefined,
      },
    },
  };
};

const resetFilters = state => {
  return {
    ...state,
    mentorshipRequests: {
      ...state.mentorshipRequests,
      isPending: false,
      filters: {},
    },
  };
};

const acceptMentorshipRequest = (state = INITIAL_STATE) => ({
  ...state,
  acceptMentorship: {
    ...state.acceptMentorship,
    isPending: true,
    error: null,
  },
});
const acceptMentorshipSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  acceptMentorship: {
    ...state.acceptMentorship,
    isPending: false,
    error: null,
    data,
  },
});
const acceptMentorshipFailure = (state = INITIAL_STATE, { error }) => ({
  ...state,
  acceptMentorship: {
    ...state.acceptMentorship,
    isPending: false,
    error,
  },
});

const withdrawMentorshipRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    withdrawMentorship: {
      ...state.withdrawMentorship,
      isPending: true,
      error: null,
    },
  };
};

const withdrawMentorshipSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    withdrawMentorship: {
      ...state.withdrawMentorship,
      data,
      isPending: false,
      error: null,
    },
  };
};

const withdrawMentorshipFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    withdrawMentorship: {
      ...state.withdrawMentorship,
      isPending: false,
      error,
    },
  };
};

const declineMentorshipRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    declineMentorship: {
      ...state.declineMentorship,
      isPending: true,
      error: null,
    },
  };
};

const declineMentorshipSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    declineMentorship: {
      ...state.declineMentorship,
      data,
      isPending: false,
      error: null,
    },
  };
};

const declineMentorshipFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    declineMentorship: {
      ...state.declineMentorship,
      isPending: false,
      error,
    },
  };
};

const initPage = () => ({ ...INITIAL_STATE });

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.FILTER_MENTORSHIP_REQUESTS_REQUEST]: filterMentorshipRequestsRequest,
  [Types.FILTER_MENTORSHIP_REQUESTS_SUCCESS]: filterMentorshipRequestsSuccess,
  [Types.FILTER_MENTORSHIP_REQUESTS_FAILURE]: filterMentorshipRequestsFailure,
  [Types.SET_PAGINATION]: setPagination,
  [Types.SET_FILTERS]: setFilters,
  [Types.RESET_FILTERS]: resetFilters,
  [Types.ACCEPT_MENTORSHIP_REQUEST]: acceptMentorshipRequest,
  [Types.ACCEPT_MENTORSHIP_SUCCESS]: acceptMentorshipSuccess,
  [Types.ACCEPT_MENTORSHIP_FAILURE]: acceptMentorshipFailure,
  [Types.WITHDRAW_MENTORSHIP_REQUEST]: withdrawMentorshipRequest,
  [Types.WITHDRAW_MENTORSHIP_SUCCESS]: withdrawMentorshipSuccess,
  [Types.WITHDRAW_MENTORSHIP_FAILURE]: withdrawMentorshipFailure,
  [Types.DECLINE_MENTORSHIP_REQUEST]: declineMentorshipRequest,
  [Types.DECLINE_MENTORSHIP_SUCCESS]: declineMentorshipSuccess,
  [Types.DECLINE_MENTORSHIP_FAILURE]: declineMentorshipFailure,
  [Types.INIT_PAGE]: initPage,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
