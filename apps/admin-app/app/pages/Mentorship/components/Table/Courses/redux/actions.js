import { createActions } from 'reduxsauce';

import { reduxKey } from '../constants';

export const { Types, Creators } = createActions({
  openModal: null,
  closeModal: null,
  createOrUpdateMentorshipCourseRequest: { body: null },
  createOrUpdateMentorshipCourseSuccess: { data: null },
  createOrUpdateMentorshipCourseFailure: { error: null },
  deleteMentorshipCourseRequest: { body: null },
  deleteMentorshipCourseSuccess: { data: null },
  deleteMentorshipCourseFailure: { error: null },
  filterMentorshipCoursesRequest: { body: null },
  filterMentorshipCoursesSuccess: { data: null, nextPageCursor: null, previousPageCursor: null },
  filterMentorshipCoursesFailure: { error: null },
  setPagination: { pagination: {} },
  initPage: null,
  destroyPage: null,
}, { prefix: `${reduxKey}_` });
