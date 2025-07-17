import { createActions } from 'reduxsauce';

import { reduxKey } from '../constants';

export const { Types, Creators } = createActions({
  getMentorshipUserOfCurrentUserRequest: { },
  getMentorshipUserOfCurrentUserSuccess: { data: null },
  getMentorshipUserOfCurrentUserFailure: { error: null },
  getMentorshipMentorDetailRequest: { mentorId: null },
  getMentorshipMentorDetailSuccess: { data: null },
  getMentorshipMentorDetailFailure: { error: null },
  filterMentorshipCoursesRequest: { body: null },
  filterMentorshipCoursesSuccess: { data: null, nextPageCursor: null, previousPageCursor: null },
  filterMentorshipCoursesFailure: { error: null },
  setPagination: { pagination: {} },
  initPage: null,
  destroyPage: null,
}, { prefix: `${reduxKey}_` });
