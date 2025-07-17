import { createActions } from 'reduxsauce';

import { reduxKey } from '../constants';

export const { Types, Creators } = createActions({
  filterMentorshipRequestsRequest: { body: null },
  filterMentorshipRequestsSuccess: { data: null, nextPageCursor: null, previousPageCursor: null },
  filterMentorshipRequestsFailure: { error: null },
  acceptMentorshipRequest: { body: null },
  acceptMentorshipSuccess: { data: null },
  acceptMentorshipFailure: { error: null },
  withdrawMentorshipRequest: { body: null },
  withdrawMentorshipSuccess: { data: null },
  withdrawMentorshipFailure: { error: null },
  declineMentorshipRequest: { body: null },
  declineMentorshipSuccess: { data: null },
  declineMentorshipFailure: { error: null },
  setPagination: { pagination: {} },
  setFilters: { filters: {} },
  resetFilters: {},
  initPage: null,
  destroyPage: null,
}, { prefix: `${reduxKey}_` });
