import { createActions } from 'reduxsauce';

import prefix from './key';

const getCourierCrisesLogsRequest = {
  filters: {
    cardNumbers: undefined,
    courierId: undefined,
  },
  pagination: {
    currentPage: 1,
    rowsPerPage: 10,
  },
};

export const { Types, Creators } = createActions(
  {
    initContainer: null,
    destroyContainer: null,

    changeCourierCrisesLogsFilters: getCourierCrisesLogsRequest.filters,
    changeCourierCrisesLogsPagination: getCourierCrisesLogsRequest.pagination,
    getCourierCrisesLogsRequest,
    getCourierCrisesLogsSuccess: { data: [], count: 0 },
    getCourierCrisesLogsFailure: { error: null },

    exportCourierCrisesLogsRequest: getCourierCrisesLogsRequest,
    exportCourierCrisesLogsSuccess: { data: [], count: 0 },
    exportCourierCrisesLogsFailure: { error: null },
  },
  { prefix },
);
