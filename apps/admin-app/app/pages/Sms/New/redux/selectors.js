import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.SMS.NEW;

export const smsConfigSelector = {
  getSmsConfig: state => state?.[reducerKey]?.config?.data,
  getSmsConfigIsPending: state => state?.[reducerKey]?.config?.isPending,
};

export const fileUploadSelector = {
  getUserListTemplateFile: state => state?.[reducerKey]?.fileUploads?.clientImportTemplate?.data,
  isUserListTemplateFilePending: state => state?.[reducerKey]?.fileUploads?.clientImportTemplate?.isPending,
  getExcludedUserFile: state => state?.[reducerKey]?.fileUploads?.excludedUserList?.data,
  isExcludedUserFileUploading: state => state?.[reducerKey]?.fileUploads?.excludedUserList?.isPending,
};
