import { createActions } from 'reduxsauce';

import prefix from './key';

const getCourierCrisesRequest = {
  filters: {
    topics: undefined,
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

    getCourierCrisesRequest,
    getCourierCrisesSuccess: { data: [], count: 0 },
    getCourierCrisesFailure: { error: null },

    exportCourierCrisesRequest: getCourierCrisesRequest,
    exportCourierCrisesSuccess: { data: [], count: 0 },
    exportCourierCrisesFailure: { error: null },

    deleteCourierCrisisRequest: { id: undefined, deletedBy: undefined },
    deleteCourierCrisisSuccess: { data: null },
    deleteCourierCrisisFailure: { error: null },

    uploadCourierCrisisFilesStart: { files: [], user: null },
    uploadCourierCrisisFilesProgress: { currentFile: null },
    uploadCourierCrisisFilesEnd: null,

    saveCourierCrisisRequest: { details: null },
    saveCourierCrisisSuccess: { data: null },
    saveCourierCrisisFailure: { error: null },
    saveCourierCrisisReset: null,

    downloadAttachmentRequest: { file: null },
    downloadAttachmentSuccess: { data: null },
    downloadAttachmentFailure: { error: null },

    deleteAttachmentRequest: { file: null },
    deleteAttachmentSuccess: { data: null },
    deleteAttachmentFailure: { error: null },
  },
  { prefix },
);
