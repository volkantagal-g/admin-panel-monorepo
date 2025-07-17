import { t } from '@shared/i18n';
import { convertDurationToTime, convertTimeToDuration } from '@app/pages/TransactionalNotification/utils';

export const rules = {
  requiredArray: [{ required: true, message: t('error:REQUIRED'), type: 'array' }],
  onlyRequired: [{ required: true, message: t('error:REQUIRED') }],
};

export const manipulateValuesBeforeSubmit = values => {
  const tempValues = { ...values };
  const hourAndMinute = tempValues.maxPushingDuration.format('HH:mm');
  tempValues.maxPushingDuration = convertTimeToDuration(hourAndMinute);
  // Fe - content: { tr: {"message": "string",...}, en: { "message": "string",... } }
  // Backend Accept - content: [ { language:'tr', title: 'string',... }, { language:'en', title: 'string',... } ]
  tempValues.contentList = values.phoneLanguages.map(lang => ({
    language: lang,
    title: values.contentList[lang].title,
    body: values.contentList[lang].body,
    imgURL: values.picURL[lang] !== null ? values.picURL[lang] : undefined,
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
  if (typeof (tempValues.notificationCategory) === 'object') {
    tempValues.notificationCategory = values?.notificationCategory?.value;
  }
  delete tempValues.isDataCallbackUrlEnabled;
  delete tempValues.dataCallbackUrlIdList;
  delete tempValues.notificationCenterTtlInHours;
  delete tempValues.isStatusCallbackUrlEnabled;
  delete tempValues.statusCallbackUrlIdList;
  delete tempValues.placeholderTextTitle;
  delete tempValues.placeholderTextBody;
  delete tempValues.picURL;
  return tempValues;
};

export const getInitialValues = values => {
  const contentList = {};
  const phoneLanguages = [];
  const picURL = {};
  // Fe Handle With - contents: { tr: {"title": "string",...}, en: { "title": "string",... } }
  // Backend Response - contents: [ { language:'tr', title: 'string',... }, { language:'en', title: 'string',... } ]
  values?.contentList?.forEach(({ language, title, body, imgURL }) => {
    phoneLanguages.push(language);
    contentList[language] = { title, body };
    picURL[language] = imgURL;
  });
  const tempValues = { phoneLanguages, contentList, picURL };
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

  tempValues.notificationCategory = { label: values?.notificationCategory?.content, value: values?.notificationCategory?.id };
  tempValues.maxPushingDuration = convertDurationToTime(values.maxPushingDuration);
  return { ...values, ...tempValues };
};
