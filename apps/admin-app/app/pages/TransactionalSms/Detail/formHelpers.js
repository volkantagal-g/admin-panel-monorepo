import { t } from '@shared/i18n';
import { convertDurationToTime, convertTimeToDuration } from '@app/pages/TransactionalSms/utils';

export const rules = {
  requiredArray: [{ required: true, message: t('error:REQUIRED'), type: 'array' }],
  onlyRequired: [{ required: true, message: t('error:REQUIRED') }],
};

export const manipulateValuesBeforeSubmit = values => {
  const tempValues = { ...values };
  const hourAndMinute = tempValues.maxSendingDuration.format('HH:mm');
  tempValues.maxSendingDuration = convertTimeToDuration(hourAndMinute);

  tempValues.contentList = values.phoneLanguages.map(lang => ({
    language: lang,
    message: values.contentList[lang].message,
  }));
  tempValues.dataCallbackProperty = {
    enabled: values?.isDataCallbackUrlEnabled,
    callbackUrlIdList: values?.dataCallbackUrlIdList?.map(callback => callback.value ?? callback),
    notificationCenterTtlInHours: values?.notificationCenterTtlInHours,
  };
  tempValues.statusCallbackProperty = {
    enabled: values?.isStatusCallbackUrlEnabled,
    callbackUrlIdList: values?.statusCallbackUrlIdList?.map(callback => callback.value ?? callback),
  };
  if (typeof (tempValues.smsCategory) === 'object') {
    tempValues.smsCategory = values?.smsCategory?.value;
  }
  delete tempValues.isDataCallbackUrlEnabled;
  delete tempValues.dataCallbackUrlIdList;
  delete tempValues.notificationCenterTtlInHours;
  delete tempValues.isStatusCallbackUrlEnabled;
  delete tempValues.statusCallbackUrlIdList;
  delete tempValues.placeholderText;
  return tempValues;
};

export const getInitialValues = values => {
  const contentList = {};
  const phoneLanguages = [];

  values?.contentList?.forEach(({ language, message }) => {
    phoneLanguages.push(language);
    contentList[language] = { message };
  });
  const tempValues = { phoneLanguages, contentList };

  tempValues.isDataCallbackUrlEnabled = values?.dataCallbackProperty?.enabled ?? false;
  const dataValueArray = values?.dataCallbackProperty?.callbackUrlList || [];
  tempValues.dataCallbackUrlIdList = tempValues.dataCallbackUrlIdList || [];
  dataValueArray?.forEach(obj => {
    const { serviceName, url, id } = obj;
    tempValues?.dataCallbackUrlIdList.push({ value: id, label: `${serviceName} - ${url}` });
  });

  tempValues.notificationCenterTtlInHours = values?.dataCallbackProperty?.notificationCenterTtlInHours;

  tempValues.isStatusCallbackUrlEnabled = values?.statusCallbackProperty?.enabled ?? false;
  const statusValueArray = values?.statusCallbackProperty?.callbackUrlList || [];
  tempValues.statusCallbackUrlIdList = tempValues.statusCallbackUrlIdList || [];
  statusValueArray?.forEach(obj => {
    const { serviceName, url, id } = obj;
    tempValues?.statusCallbackUrlIdList.push({ value: id, label: `${serviceName} - ${url}` });
  });

  tempValues.smsCategory = { label: values?.smsCategory?.content, value: values?.smsCategory?.id };
  tempValues.maxSendingDuration = convertDurationToTime(values.maxSendingDuration);
  return { ...values, ...tempValues };
};
