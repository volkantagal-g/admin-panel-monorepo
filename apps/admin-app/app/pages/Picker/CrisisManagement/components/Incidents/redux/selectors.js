import reduxKey from './key';

export const pickerCrisesSelector = {
  getData: state => state[reduxKey]?.pickerCrises.data,
  getCount: state => state[reduxKey]?.pickerCrises.count,
  getFilters: state => state[reduxKey]?.pickerCrises.filters,
  getIsPending: state => state[reduxKey]?.pickerCrises.isPending,
  getPagination: state => state[reduxKey]?.pickerCrises.pagination,
  isExportPending: state => state[reduxKey]?.pickerCrisesExport.isPending,
};

export const pickerCrisisUploadSelector = {
  getIsPending: state => state[reduxKey]?.uploadFiles.isPending,
  getCurrentFile: state => state[reduxKey]?.uploadFiles.currentFile,
  getIsCompleted: state => !state[reduxKey]?.uploadFiles.files.length &&
    state[reduxKey]?.uploadFiles.isPending === false &&
    state[reduxKey]?.uploadFiles.currentFile === null,
};

export const pickerCrisisDeleteSelector = {
  getIsPending: state => state[reduxKey]?.deleteCrisis.isPending,
  getRefreshList: state => state[reduxKey]?.deleteCrisis.refreshList === true,
};

export const pickerCrisisSaveSelector = {
  getIsPending: state => state[reduxKey]?.saveCrisis.isPending || state[reduxKey]?.uploadFiles.isPending,
  getIsCompleted: state => !state[reduxKey]?.saveCrisis.isPending && state[reduxKey]?.saveCrisis.isCompleted,
};

export const attachmentSelector = {
  getIsDeleting: state => state[reduxKey]?.deleteAttachment.isPending,
  getDeletedFile: state => state[reduxKey]?.deleteAttachment.file,
  getIsDownloading: state => state[reduxKey]?.downloadAttachment.isPending,
};
