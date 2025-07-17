import { getSelectedCountry, getSelectedCountryLanguages } from '@shared/redux/selectors/countrySelection';
import { getLangKey, t } from '@shared/i18n';
import { convertTimeToDuration } from '@app/pages/TransactionalNotification/utils';

export const rules = {
  requiredArray: [{ required: true, message: t('error:REQUIRED'), type: 'array' }],
  onlyRequired: [{ required: true, message: t('error:REQUIRED') }],
};

export const manipulateValuesBeforeSubmit = values => {
  const tempValues = { ...values };
  const hourAndMinute = tempValues.maxPushingDuration.format('HH:mm');
  tempValues.maxPushingDuration = convertTimeToDuration(hourAndMinute);
  // Fe - content: { tr: {"designId": "string",...}, en: { "designId": "string",... } }
  // Backend Accept - content: [ { phoneLanguage:'tr', message: 'string',... }, { phoneLanguage:'en', message: 'string',... } ]
  tempValues.contentList = values.phoneLanguages.map(lang => ({
    language: lang,
    title: values.contentList[lang].title,
    body: values.contentList[lang].body,
    imgURL: values.picURL[lang],
  }));
  tempValues.dataCallbackProperty = {
    enabled: values?.isDataCallbackUrlEnabled,
    callbackUrlIdList: values?.dataCallbackUrlIdList,
    notificationCenterTtlInHours: values?.notificationCenterTtlInHours,
  };
  tempValues.statusCallbackProperty = {
    enabled: values?.isStatusCallbackUrlEnabled,
    callbackUrlIdList: values?.statusCallbackUrlIdList,
  };
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

export const getInitialValues = () => {
  const selectedCountry = getSelectedCountry();

  return {
    country: { label: selectedCountry.name[getLangKey()], value: selectedCountry._id },
    phoneLanguages: getSelectedCountryLanguages(),
    notificationInterruptionLevel: 'ACTIVE',
    isDataCallbackUrlEnabled: false,
    isStatusCallbackUrlEnabled: false,
  };
};
