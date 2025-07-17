import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  isModalOpen: false,
  requestMentorship: {
    isPending: false,
    data: {},
    error: null,
  },
};

export const requestMentorshipRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    requestMentorship: {
      ...INITIAL_STATE.requestMentorship,
      isPending: true,
      error: null,
    },
  };
};

export const requestMentorshipSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    requestMentorship: {
      ...INITIAL_STATE.requestMentorship,
      data,
      isPending: false,
      error: null,
    },
  };
};

export const requestMentorshipFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    requestMentorship: {
      ...INITIAL_STATE.requestMentorship,
      isPending: false,
      error,
    },
  };
};

export const openModal = state => ({
  ...state,
  isModalOpen: true,
});

export const closeModal = state => ({
  ...state,
  isModalOpen: false,
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.REQUEST_MENTORSHIP_REQUEST]: requestMentorshipRequest,
  [Types.REQUEST_MENTORSHIP_SUCCESS]: requestMentorshipSuccess,
  [Types.REQUEST_MENTORSHIP_FAILURE]: requestMentorshipFailure,
  [Types.OPEN_MODAL]: openModal,
  [Types.CLOSE_MODAL]: closeModal,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
