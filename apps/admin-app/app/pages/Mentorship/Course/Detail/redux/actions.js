import { createActions } from 'reduxsauce';

import { reduxKey } from '../constants';

export const { Types, Creators } = createActions({
  getMentorshipUserOfCurrentUserRequest: { },
  getMentorshipUserOfCurrentUserSuccess: { data: null },
  getMentorshipUserOfCurrentUserFailure: { error: null },
  getMentorshipCourseDetailRequest: { courseId: null },
  getMentorshipCourseDetailSuccess: { data: null },
  getMentorshipCourseDetailFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${reduxKey}_` });
