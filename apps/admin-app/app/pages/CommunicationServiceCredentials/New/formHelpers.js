import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { getLangKey, t } from '@shared/i18n';
import { SERVICE_TYPES, STATUSES } from '@app/pages/CommunicationServiceCredentials/constants';
import { getLanguages } from '@app/pages/CommunicationServiceCredentials/utils';
import { providersObj } from '@app/pages/CommunicationServiceCredentials/constantValues';

export const rules = {
  requiredArray: [{ required: true, message: t('error:REQUIRED'), type: 'array' }],
  onlyRequired: [{ required: true, message: t('error:REQUIRED') }],
};

export const manipulateValuesBeforeSubmit = (values, serviceType) => {
  const tempValues = { ...values };

  if (serviceType === SERVICE_TYPES.NOTIF) {
    // Fe - content: { tr: {"designId": "string",...}, en: { "designId": "string",... } }
    // Backend Accept - content: [ { phoneLanguage:'tr', message: 'string',... }, { phoneLanguage:'en', message: 'string',... } ]
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
    callbackUrlIdList: values?.statusCallbackUrlIdList,
  };
  tempValues.isActive = tempValues.isActive === STATUSES.ACTIVE;

  delete tempValues.isStatusCallbackUrlEnabled;
  delete tempValues.statusCallbackUrlIdList;
  delete tempValues.serviceType;
  delete tempValues.phoneLanguages;
  return tempValues;
};

export const getInitialValues = () => {
  const selectedCountry = getSelectedCountry();
  const initialProvider = {};
  Object.keys(providersObj).forEach(key => {
    const providerData = providersObj[key];
    initialProvider[providerData?.name] = providerData?.defaultValue;
    initialProvider[providerData?.dependentComponentName] = providerData?.defaultDependentValue;
  });
  return {
    country: { label: selectedCountry.name[getLangKey()], value: selectedCountry._id },
    phoneLanguages: getLanguages(),
    isStatusCallbackUrlEnabled: false,
    segmentDataFeed: false,
    mixpanelDataFeed: false,
    ...initialProvider,
  };
};
