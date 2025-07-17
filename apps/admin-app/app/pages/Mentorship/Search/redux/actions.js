import { createActions } from 'reduxsauce';

import { reduxKey } from '../constants';

export const { Types, Creators } = createActions({
  searchMentorshipCoursesRequest: { body: null },
  searchMentorshipCoursesSuccess: { data: null, nextPageCursor: null, previousPageCursor: null },
  searchMentorshipCoursesFailure: { error: null },
  setPagination: { pagination: {} },
  setFilters: { filters: {} },
  resetFilters: {},
  initPage: null,
  destroyPage: null,
}, { prefix: `${reduxKey}_` });
