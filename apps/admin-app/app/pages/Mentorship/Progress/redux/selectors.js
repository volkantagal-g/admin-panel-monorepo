import { reduxKey } from '../constants';

export const getMentorshipUserOfCurrentUserSelector = {
  getData: state => state?.[reduxKey]?.mentorshipUserOfCurrentUser?.data,
  getIsPending: state => state?.[reduxKey]?.mentorshipUserOfCurrentUser?.isPending,
  hasError: state => state?.[reduxKey]?.mentorshipUserOfCurrentUser?.error,
};

export const getMentorshipRequestDetailSelector = {
  getData: state => state?.[reduxKey]?.mentorshipRequestDetail?.data,
  getIsPending: state => state?.[reduxKey]?.mentorshipRequestDetail?.isPending,
  hasError: state => state?.[reduxKey]?.mentorshipRequestDetail?.error,
};

export const getMentorshipTodosSelector = {
  getData: state => state?.[reduxKey]?.mentorshipTodos?.data,
  getIsPending: state => state?.[reduxKey]?.mentorshipTodos?.isPending,
};

export const addOrUpdateMentorshipTodoSelector = {
  getData: state => state?.[reduxKey]?.addOrUpdateMentorshipTodo?.data,
  getIsPending: state => state?.[reduxKey]?.addOrUpdateMentorshipTodo?.isPending,
};

export const getMentorshipSessionNotesSelector = {
  getData: state => state?.[reduxKey]?.mentorshipSessionNotes?.data,
  getIsPending: state => state?.[reduxKey]?.mentorshipSessionNotes?.isPending,
};

export const addOrUpdateMentorshipSessionNoteSelector = {
  getData: state => state?.[reduxKey]?.addOrUpdateMentorshipSessionNote?.data,
  getIsPending: state => state?.[reduxKey]?.addOrUpdateMentorshipSessionNote?.isPending,
};
