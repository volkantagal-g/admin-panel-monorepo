import reduxKey from './key';

export const courierCrisesSelector = {
  getData: state => state[reduxKey]?.courierCrises.data,
  getCount: state => state[reduxKey]?.courierCrises.count,
  getIsPending: state => state[reduxKey]?.courierCrises.isPending,
  isExportPending: state => state[reduxKey]?.courierCrisesExport.isPending,
};

export const courierCrisisUploadSelector = {
  getIsPending: state => state[reduxKey]?.uploadFiles.isPending,
  getCurrentFile: state => state[reduxKey]?.uploadFiles.currentFile,
  getIsCompleted: state => !state[reduxKey]?.uploadFiles.files.length &&
    state[reduxKey]?.uploadFiles.isPending === false &&
    state[reduxKey]?.uploadFiles.currentFile === null,
};

export const courierCrisisDeleteSelector = {
  getIsPending: state => state[reduxKey]?.deleteCrisis.isPending,
  getRefreshList: state => state[reduxKey]?.deleteCrisis.refreshList === true,
};

export const courierCrisisSaveSelector = {
  getIsPending: state => state[reduxKey]?.saveCrisis.isPending || state[reduxKey]?.uploadFiles.isPending,
  getIsCompleted: state => !state[reduxKey]?.saveCrisis.isPending && state[reduxKey]?.saveCrisis.isCompleted,
};

export const attachmentSelector = {
  getIsDeleting: state => state[reduxKey]?.deleteAttachment.isPending,
  getDeletedFile: state => state[reduxKey]?.deleteAttachment.file,
  getIsDownloading: state => state[reduxKey]?.downloadAttachment.isPending,
};
