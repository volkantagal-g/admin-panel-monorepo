import { createActions } from 'reduxsauce';

import { reduxKey } from '../constants';

export const { Types, Creators } = createActions({
  getEmployeeOfCurrentUserRequest: {},
  getEmployeeOfCurrentUserSuccess: { data: null },
  getEmployeeOfCurrentUserFailure: { error: null },
  getMentorshipUserRequest: { employeeId: null, id: null },
  getMentorshipUserSuccess: { data: null },
  getMentorshipUserFailure: { error: null },
  createOrUpdateMentorshipUserRequest: { body: null },
  createOrUpdateMentorshipUserSuccess: { data: null },
  createOrUpdateMentorshipUserFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${reduxKey}_` });
