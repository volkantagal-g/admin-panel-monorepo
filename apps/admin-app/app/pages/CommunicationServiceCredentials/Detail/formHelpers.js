import { t } from '@shared/i18n';
import { SERVICE_TYPES, STATUSES } from '@app/pages/CommunicationServiceCredentials/constants';
import { providersObj } from '@app/pages/CommunicationServiceCredentials/constantValues';

export const rules = {
  requiredArray: [{ required: true, message: t('error:REQUIRED'), type: 'array' }],
  onlyRequired: [{ required: true, message: t('error:REQUIRED') }],
};

export const manipulateValuesBeforeSubmit = (values, serviceType) => {
  const tempValues = { ...values };

  if (serviceType === SERVICE_TYPES.NOTIF) {
    // Fe - content: { tr: {"message": "string",...}, en: { "message": "string",... } }
    // Backend Accept - content: [ { language:'tr', title: 'string',... }, { language:'en', title: 'string',... } ]
    tempValues.titleList = values.phoneLanguages.map(lang => ({
      language: lang,
      text: values.titleList[lang].text,
    }));
  }
  else if (serviceType === SERVICE_TYPES.SMS) {
    Object.keys(providersObj).forEach(key => {
      const providerData = providersObj[key];
      tempValues[providerData?.preference] = {
        id: values[providerData?.name],
        [providerData?.key]: values[providerData?.dependentComponentName],
      };
      delete tempValues[providerData?.name];
      delete tempValues[providerData?.dependentComponentName];
    });
  }

  tempValues.statusCallbackProperty = {
    enabled: values?.isStatusCallbackUrlEnabled,
    callbackUrlIdList: values?.statusCallbackUrlIdList?.map(callback => callback.value ?? callback),
  };
  tempValues.isActive = tempValues.isActive === STATUSES.ACTIVE;

  delete tempValues.isStatusCallbackUrlEnabled;
  delete tempValues.statusCallbackUrlIdList;
  delete tempValues.serviceType;
  delete tempValues.phoneLanguages;
  return tempValues;
};

export const getInitialValues = (values, serviceType) => {
  const titleList = {};
  const phoneLanguages = [];
  let tempValues = {};

  if (serviceType === SERVICE_TYPES.NOTIF) {
    // Fe Handle With - contents: { tr: {"title": "string",...}, en: { "title": "string",... } }
    // Backend Response - contents: [ { language:'tr', title: 'string',... }, { language:'en', title: 'string',... } ]
    values?.titleList?.forEach(({ language, text }) => {
      phoneLanguages.push(language);
      titleList[language] = { text };
    });
    tempValues = { phoneLanguages, titleList };
  }
  else if (serviceType === SERVICE_TYPES.SMS) {
    Object.keys(providersObj).forEach(key => {
      const providerData = providersObj[key];
      tempValues[providerData?.name] = values?.[providerData?.preference]?.id;
      tempValues[providerData?.dependentComponentName] = values?.[providerData?.preference]?.[providerData?.key];
    });
  }
  tempValues.isStatusCallbackUrlEnabled = values?.statusCallbackProperty?.enabled ?? false;
  const statusValueArray = values?.statusCallbackProperty?.callbackUrlList || [];
  tempValues.statusCallbackUrlIdList = tempValues.statusCallbackUrlIdList || [];
  statusValueArray?.forEach(obj => {
    const { serviceName, url, id } = obj;
    tempValues?.statusCallbackUrlIdList.push({ value: id, label: `${serviceName} - ${url}` });
  });

  if (values.isActive === true) {
    tempValues.isActive = STATUSES.ACTIVE;
  }
  else {
    tempValues.isActive = STATUSES.INACTIVE;
  }
  return { ...values, ...tempValues };
};
