import { toString } from 'lodash';

import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { providersObj } from '@app/pages/CommunicationServiceCredentials/constantValues';

export const convertPhoneLanguageOptions = countryLanguages => {
  return countryLanguages?.map(item => ({
    value: toString(item.toLowerCase()),
    label: item,
  }));
};

export const getLanguages = () => {
  const languageOptionNames = getSelectedCountry().name;
  const languageOptions = [];
  if (typeof languageOptionNames !== 'undefined') {
    Object.keys(languageOptionNames).forEach(key => {
      languageOptions.push(key);
    });
  }
  return languageOptions;
};

export const parseProviderObj = () => {
  const provider = {};
  Object.keys(providersObj).forEach(key => {
    const providerData = providersObj[key];
    provider[providerData?.name] = {
      isPending: false,
      data: [],
      error: null,
    };
  });
  return provider;
};

export const convertAccountsToSelectOptions = (values = {}) => {
  return Object.entries(values).map(([, value]) => {
    return {
      value: `${value.id}`,
      label: value.desc,
    };
  });
};

export const convertHeadersToSelectOptions = (values = {}) => {
  return Object.entries(values).map(([, value]) => {
    return {
      value,
      label: value,
    };
  });
};

export const getDetailPageTitle = serviceType => {
  let title = '';
  if (serviceType === 1) {
    title = 'NOTIFICATION_COMMUNICATION_SERVICE_CREDENTIALS_DETAIL';
  }
  else if (serviceType === 2) {
    title = 'SMS_COMMUNICATION_SERVICE_CREDENTIALS_DETAIL';
  }
  else if (serviceType === 3) {
    title = 'EMAIL_COMMUNICATION_SERVICE_CREDENTIALS_DETAIL';
  }
  return title;
};
