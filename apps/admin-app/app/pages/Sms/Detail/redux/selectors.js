import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.SMS.DETAIL;

export const smsDetailSelector = {
  getData: state => state?.[reducerKey]?.smsDetail?.data ?? {},
  getIsPending: state => state?.[reducerKey]?.smsDetail?.isPending ?? false,
  getError: state => state?.[reducerKey]?.smsDetail?.error ?? null,
};

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

export const smsStatisticsSelector = {
  getData: state => state?.[reducerKey]?.statistic?.data,
  getIsPending: state => state?.[reducerKey]?.statistic?.isPending,
  getError: state => state?.[reducerKey]?.statistic?.error,
};

export const targetAudienceStatisticsSelector = {
  getData: state => state?.[reducerKey]?.targetAudienceStatistics?.data,
  getIsPending: state => state?.[reducerKey]?.targetAudienceStatistics?.isPending,
  getError: state => state?.[reducerKey]?.targetAudienceStatistics?.error,
};

export const testSmsSelector = {
  getData: state => state?.[reducerKey]?.testSms?.data,
  getIsPending: state => state?.[reducerKey]?.testSms?.isPending,
  getError: state => state?.[reducerKey]?.testSms?.error,
};

export const contentValidationSelector = { getContent: state => state?.[reducerKey]?.contentValidation.content };
