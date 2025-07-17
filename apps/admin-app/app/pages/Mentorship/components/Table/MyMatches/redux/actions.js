import { createActions } from 'reduxsauce';

import { reduxKey } from '../constants';

export const { Types, Creators } = createActions({
  filterMentorshipRequestMatchesRequest: { body: null },
  filterMentorshipRequestMatchesSuccess: { data: null, nextPageCursor: null, previousPageCursor: null },
  filterMentorshipRequestMatchesFailure: { error: null },
  setPagination: { pagination: {} },
  setFilters: { filters: {} },
  resetFilters: {},
  initPage: null,
  destroyPage: null,
}, { prefix: `${reduxKey}_` });
