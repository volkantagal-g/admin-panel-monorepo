import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.EMAIL.DETAIL;

export const emailDetailSelector = {
  getData: state => state?.[reducerKey]?.emailDetail?.data ?? {},
  getIsPending: state => state?.[reducerKey]?.emailDetail?.isPending ?? false,
  getError: state => state?.[reducerKey]?.emailDetail?.error ?? null,
};

export const emailConfigSelector = {
  getEmailConfig: state => state?.[reducerKey]?.config?.data,
  getEmailConfigIsPending: state => state?.[reducerKey]?.config?.isPending,
};

export const fileUploadSelector = {
  getUserFile: state => state?.[reducerKey]?.uploadedFile?.userList?.data,
  getIncludedUserFile: state => state?.[reducerKey]?.uploadedFile?.clientImportTemplate?.data,
  isIncludedUserFileUploading: state => state?.[reducerKey]?.uploadedFile?.clientImportTemplate?.isPending,
  isUserFileUploading: state => state?.[reducerKey]?.uploadedFile?.userList?.isPending,
  getExcludedUserFile: state => state?.[reducerKey]?.uploadedFile?.excludedUserList?.data,
  isExcludedUserFileUploading: state => state?.[reducerKey]?.uploadedFile?.excludedUserList?.isPending,
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

export const testEmailSelector = {
  getData: state => state?.[reducerKey]?.testEmail?.data,
  getIsPending: state => state?.[reducerKey]?.testEmail?.isPending,
};

export const emailStatisticsSelector = {
  getData: state => state?.[reducerKey]?.statistic?.data,
  getIsPending: state => state?.[reducerKey]?.statistic?.isPending,
  getError: state => state?.[reducerKey]?.statistic?.error,
};

export const targetAudienceStatisticsSelector = {
  getData: state => state?.[reducerKey]?.targetAudienceStatistics?.data,
  getIsPending: state => state?.[reducerKey]?.targetAudienceStatistics?.isPending,
  getError: state => state?.[reducerKey]?.targetAudienceStatistics?.error,
};
