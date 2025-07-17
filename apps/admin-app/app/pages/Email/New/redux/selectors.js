import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.EMAIL.NEW;

export const fileUploadSelector = {
  getUserFile: state => state?.[reducerKey]?.uploadedFile?.userList?.data,
  isUserFileUploading: state => state?.[reducerKey]?.uploadedFile?.clientImportTemplate?.isPending,
  getExcludedUserFile: state => state?.[reducerKey]?.uploadedFile?.excludedUserList?.data,
  isExcludedUserFileUploading: state => state?.[reducerKey]?.uploadedFile?.excludedUserList?.isPending,
};

export const emailConfigSelector = {
  getEmailConfig: state => state?.[reducerKey]?.config?.data,
  getEmailConfigIsPending: state => state?.[reducerKey]?.config?.isPending,
};

export const senderMailConfigSelector = {
  getSenderMail: state => state?.[reducerKey]?.mailInfoFromConfig?.senderMail?.data,
  isSenderMailPending: state => state?.[reducerKey]?.mailInfoFromConfig?.senderMail?.isPending,
  getSenderName: state => state?.[reducerKey]?.mailInfoFromConfig?.senderName?.data,
  isSenderNamePending: state => state?.[reducerKey]?.mailInfoFromConfig?.senderName?.isPending,
};

export const previewImageSelector = {
  getData: state => state?.[reducerKey]?.previewImage?.data,
  getIsPending: state => state?.[reducerKey]?.previewImage?.isPending,
};
