import { createActions } from 'reduxsauce';

import prefix from './key';

const getPickerCrisesRequest = {
  filters: {
    topics: undefined,
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

    changePickerCrisesFilters: getPickerCrisesRequest.filters,
    changePickerCrisesPagination: getPickerCrisesRequest.pagination,
    getPickerCrisesRequest,
    getPickerCrisesSuccess: { data: [], count: 0 },
    getPickerCrisesFailure: { error: null },

    exportPickerCrisesRequest: getPickerCrisesRequest,
    exportPickerCrisesSuccess: { data: [], count: 0 },
    exportPickerCrisesFailure: { error: null },

    deletePickerCrisisRequest: { id: undefined, deletedBy: undefined },
    deletePickerCrisisSuccess: { data: null },
    deletePickerCrisisFailure: { error: null },

    uploadPickerCrisisFilesStart: { files: [], user: null },
    uploadPickerCrisisFilesProgress: { currentFile: null },
    uploadPickerCrisisFilesEnd: null,

    savePickerCrisisRequest: { details: null },
    savePickerCrisisSuccess: { data: null },
    savePickerCrisisFailure: { error: null },
    savePickerCrisisReset: null,

    downloadAttachmentRequest: { file: null },
    downloadAttachmentSuccess: { data: null },
    downloadAttachmentFailure: { error: null },

    deleteAttachmentRequest: { file: null },
    deleteAttachmentSuccess: { data: null },
    deleteAttachmentFailure: { error: null },
  },
  { prefix },
);
