import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  mentorId: null,
  mentorshipUserOfCurrentUser: {
    data: {},
    isPending: false,
    error: false,
  },
  mentorshipRequestDetail: {
    isPending: false,
    data: {},
    error: null,
  },
  mentorshipTodos: {
    isPending: false,
    data: [],
    error: null,
  },
  addOrUpdateMentorshipTodo: {
    isPending: false,
    data: {},
    error: null,
  },
  mentorshipSessionNotes: {
    isPending: false,
    data: [],
    error: null,
  },
  addOrUpdateMentorshipSessionNote: {
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

const getMentorshipRequestDetailRequest = (state, { mentorId }) => ({
  ...state,
  mentorId,
  mentorshipRequestDetail: {
    ...state.mentorshipRequestDetail,
    isPending: true,
    error: false,
  },
});

const getMentorshipRequestDetailSuccess = (state, { data }) => ({
  ...state,
  mentorshipRequestDetail: {
    ...state.mentorshipRequestDetail,
    isPending: false,
    data,
  },
});

const getMentorshipRequestDetailFailure = state => ({
  ...state,
  mentorshipRequestDetail: {
    ...state.mentorshipRequestDetail,
    isPending: false,
    error: true,
  },
});

const updateMentorshipRequestDetailRequest = (state, { mentorId }) => ({
  ...state,
  mentorId,
  mentorshipRequestDetail: {
    ...state.mentorshipRequestDetail,
    isPending: true,
    error: false,
  },
});

const updateMentorshipRequestDetailSuccess = (state, { data }) => ({
  ...state,
  mentorshipRequestDetail: {
    ...state.mentorshipRequestDetail,
    isPending: false,
    data,
  },
});

const updateMentorshipRequestDetailFailure = state => ({
  ...state,
  mentorshipRequestDetail: {
    ...state.mentorshipRequestDetail,
    isPending: false,
    error: true,
  },
});

const getMentorshipTodosRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    mentorshipTodos: {
      ...state.mentorshipTodos,
      isPending: true,
      error: null,
    },
  };
};

const getMentorshipTodosSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    mentorshipTodos: {
      ...state.mentorshipTodos,
      data,
      isPending: false,
      error: null,
    },
  };
};

const getMentorshipTodosFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    mentorshipTodos: {
      ...state.mentorshipTodos,
      isPending: false,
      error,
    },
  };
};

const addOrUpdateMentorshipTodoRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    addOrUpdateMentorshipTodo: {
      ...state.addOrUpdateMentorshipTodo,
      isPending: true,
      error: null,
    },
  };
};

const addOrUpdateMentorshipTodoSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    addOrUpdateMentorshipTodo: {
      ...state.addOrUpdateMentorshipTodo,
      data,
      isPending: false,
      error: null,
    },
  };
};

const addOrUpdateMentorshipTodoFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    addOrUpdateMentorshipTodo: {
      ...state.addOrUpdateMentorshipTodo,
      isPending: false,
      error,
    },
  };
};

const getMentorshipSessionNotesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    mentorshipSessionNotes: {
      ...state.mentorshipSessionNotes,
      isPending: true,
      error: null,
    },
  };
};

const getMentorshipSessionNotesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    mentorshipSessionNotes: {
      ...state.mentorshipSessionNotes,
      data,
      isPending: false,
      error: null,
    },
  };
};

const getMentorshipSessionNotesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    mentorshipSessionNotes: {
      ...state.mentorshipSessionNotes,
      isPending: false,
      error,
    },
  };
};

const addOrUpdateMentorshipSessionNoteRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    addOrUpdateMentorshipSessionNote: {
      ...state.addOrUpdateMentorshipSessionNote,
      isPending: true,
      error: null,
    },
  };
};

const addOrUpdateMentorshipSessionNoteSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    addOrUpdateMentorshipSessionNote: {
      ...state.addOrUpdateMentorshipSessionNote,
      data,
      isPending: false,
      error: null,
    },
  };
};

const addOrUpdateMentorshipSessionNoteFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    addOrUpdateMentorshipSessionNote: {
      ...state.addOrUpdateMentorshipSessionNote,
      isPending: false,
      error,
    },
  };
};

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_MENTORSHIP_USER_OF_CURRENT_USER_REQUEST]: getMentorshipUserOfCurrentUserRequest,
  [Types.GET_MENTORSHIP_USER_OF_CURRENT_USER_SUCCESS]: getMentorshipUserOfCurrentUserSuccess,
  [Types.GET_MENTORSHIP_USER_OF_CURRENT_USER_FAILURE]: getMentorshipUserOfCurrentUserFailure,

  [Types.GET_MENTORSHIP_REQUEST_DETAIL_REQUEST]: getMentorshipRequestDetailRequest,
  [Types.GET_MENTORSHIP_REQUEST_DETAIL_SUCCESS]: getMentorshipRequestDetailSuccess,
  [Types.GET_MENTORSHIP_REQUEST_DETAIL_FAILURE]: getMentorshipRequestDetailFailure,
  [Types.UPDATE_MENTORSHIP_REQUEST_DETAIL_REQUEST]: updateMentorshipRequestDetailRequest,
  [Types.UPDATE_MENTORSHIP_REQUEST_DETAIL_SUCCESS]: updateMentorshipRequestDetailSuccess,
  [Types.UPDATE_MENTORSHIP_REQUEST_DETAIL_FAILURE]: updateMentorshipRequestDetailFailure,

  [Types.GET_MENTORSHIP_TODOS_REQUEST]: getMentorshipTodosRequest,
  [Types.GET_MENTORSHIP_TODOS_SUCCESS]: getMentorshipTodosSuccess,
  [Types.GET_MENTORSHIP_TODOS_FAILURE]: getMentorshipTodosFailure,
  [Types.ADD_OR_UPDATE_MENTORSHIP_TODO_REQUEST]: addOrUpdateMentorshipTodoRequest,
  [Types.ADD_OR_UPDATE_MENTORSHIP_TODO_SUCCESS]: addOrUpdateMentorshipTodoSuccess,
  [Types.ADD_OR_UPDATE_MENTORSHIP_TODO_FAILURE]: addOrUpdateMentorshipTodoFailure,

  [Types.GET_MENTORSHIP_SESSION_NOTES_REQUEST]: getMentorshipSessionNotesRequest,
  [Types.GET_MENTORSHIP_SESSION_NOTES_SUCCESS]: getMentorshipSessionNotesSuccess,
  [Types.GET_MENTORSHIP_SESSION_NOTES_FAILURE]: getMentorshipSessionNotesFailure,
  [Types.ADD_OR_UPDATE_MENTORSHIP_SESSION_NOTE_REQUEST]: addOrUpdateMentorshipSessionNoteRequest,
  [Types.ADD_OR_UPDATE_MENTORSHIP_SESSION_NOTE_SUCCESS]: addOrUpdateMentorshipSessionNoteSuccess,
  [Types.ADD_OR_UPDATE_MENTORSHIP_SESSION_NOTE_FAILURE]: addOrUpdateMentorshipSessionNoteFailure,

  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
