import { getSelectedCountry, getSelectedCountryLanguages } from '@shared/redux/selectors/countrySelection';
import { getLangKey, t } from '@shared/i18n';
import { convertTimeToDuration } from '@app/pages/TransactionalSms/utils';

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
  delete tempValues.placeholderText;
  return tempValues;
};

export const getInitialValues = () => {
  const selectedCountry = getSelectedCountry();

  return {
    country: { label: selectedCountry.name[getLangKey()], value: selectedCountry._id },
    phoneLanguages: getSelectedCountryLanguages(),
    isDataCallbackUrlEnabled: false,
    isStatusCallbackUrlEnabled: false,
  };
};
