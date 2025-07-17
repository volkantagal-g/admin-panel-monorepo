import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  isModalOpen: false,
  finishMentorship: {
    isPending: false,
    data: {},
    error: null,
  },
};

export const finishMentorshipRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    finishMentorship: {
      ...INITIAL_STATE.finishMentorship,
      isPending: true,
      error: null,
    },
  };
};

export const finishMentorshipSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    finishMentorship: {
      ...INITIAL_STATE.finishMentorship,
      data,
      isPending: false,
      error: null,
    },
  };
};

export const finishMentorshipFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    finishMentorship: {
      ...INITIAL_STATE.finishMentorship,
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
  [Types.FINISH_MENTORSHIP_REQUEST]: finishMentorshipRequest,
  [Types.FINISH_MENTORSHIP_SUCCESS]: finishMentorshipSuccess,
  [Types.FINISH_MENTORSHIP_FAILURE]: finishMentorshipFailure,
  [Types.OPEN_MODAL]: openModal,
  [Types.CLOSE_MODAL]: closeModal,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
