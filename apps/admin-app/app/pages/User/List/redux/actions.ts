import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getUsersRequest: { limit: 10, offset: 0, queryText: '', id: '', isActive: undefined, sortOptions: {} },
  getUsersSuccess: { data: [] },
  getUsersFailure: { error: null },
  getUserRolesRequest: { userId: null },
  getUserRolesSuccess: { data: [] },
  getUserRolesFailure: { error: null },

  getDepartmentsRequest: {},
  getDepartmentsSuccess: { data: [] },
  getDepartmentsFailure: { error: null },

  getUsersForExcelTableRequest: { isActive: null, countries: null, filters: null, t: null },
  getUsersForExcelTableSuccess: { data: [] },
  getUsersForExcelTableFailure: { error: null },

  setSortOptions: { sortOptions: {} },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.USER.LIST}_` });
