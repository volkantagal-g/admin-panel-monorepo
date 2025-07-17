import { createActions } from 'reduxsauce';

import prefix from './key';

const getPickerCrisesLogsRequest = {
  filters: {
    cardNumbers: undefined,
    pickerId: undefined,
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

    changePickerCrisesLogsFilters: getPickerCrisesLogsRequest.filters,
    changePickerCrisesLogsPagination: getPickerCrisesLogsRequest.pagination,
    getPickerCrisesLogsRequest,
    getPickerCrisesLogsSuccess: { data: [], count: 0 },
    getPickerCrisesLogsFailure: { error: null },

    exportPickerCrisesLogsRequest: getPickerCrisesLogsRequest,
    exportPickerCrisesLogsSuccess: { data: [], count: 0 },
    exportPickerCrisesLogsFailure: { error: null },
  },
  { prefix },
);
