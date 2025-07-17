import { createActions } from 'reduxsauce';

import { reduxKey } from '../constants';

export const { Types, Creators } = createActions({
  getMentorshipUserOfCurrentUserRequest: { },
  getMentorshipUserOfCurrentUserSuccess: { data: null },
  getMentorshipUserOfCurrentUserFailure: { error: null },

  getMentorshipRequestDetailRequest: { body: null },
  getMentorshipRequestDetailSuccess: { data: null },
  getMentorshipRequestDetailFailure: { error: null },
  updateMentorshipRequestDetailRequest: { body: null },
  updateMentorshipRequestDetailSuccess: { data: null },
  updateMentorshipRequestDetailFailure: { error: null },

  getMentorshipTodosRequest: { body: null },
  getMentorshipTodosSuccess: { data: null },
  getMentorshipTodosFailure: { error: null },
  addOrUpdateMentorshipTodoRequest: { body: null },
  addOrUpdateMentorshipTodoSuccess: { data: null },
  addOrUpdateMentorshipTodoFailure: { error: null },

  getMentorshipSessionNotesRequest: { body: null },
  getMentorshipSessionNotesSuccess: { data: null },
  getMentorshipSessionNotesFailure: { error: null },
  addOrUpdateMentorshipSessionNoteRequest: { body: null },
  addOrUpdateMentorshipSessionNoteSuccess: { data: null },
  addOrUpdateMentorshipSessionNoteFailure: { error: null },

  initPage: null,
  destroyPage: null,
}, { prefix: `${reduxKey}_` });
