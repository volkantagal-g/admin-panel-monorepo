import { toString } from 'lodash';

import { getLangKey } from '@shared/i18n';
import { EMAIL_PROCESS_STATUS } from '@app/pages/Email/constants';

export const convertDomainTypes = (values = {}, activeDomainsFromConfig) => {
  const types = Object.entries(values).map(([value, label]) => {
    if (!activeDomainsFromConfig) {
      return {
        value: parseInt(value, 10),
        label: label[getLangKey()] || label,
      };
    }
    if (activeDomainsFromConfig && activeDomainsFromConfig.includes(parseInt(value, 10))) {
      return {
        value: parseInt(value, 10),
        label: label[getLangKey()] || label,
      };
    }
    return null;
  }).filter(value => value !== null);
  return types;
};

export const convertPhoneLanguageOptions = countryLanguages => {
  return countryLanguages?.map(item => ({
    value: toString(item.toLowerCase()),
    label: item,
  }));
};

export const getPageHeaderTagColor = status => {
  switch (status) {
    case EMAIL_PROCESS_STATUS.CREATED:
    case EMAIL_PROCESS_STATUS.READY:
      return 'cyan';
    case EMAIL_PROCESS_STATUS.PRE_PROCESS:
    case EMAIL_PROCESS_STATUS.IN_PROCESS:
      return 'green';
    case EMAIL_PROCESS_STATUS.CANCEL:
    case EMAIL_PROCESS_STATUS.FAIL:
      return 'red';
    case EMAIL_PROCESS_STATUS.FINISHED:
      return 'green';
    default:
      return null;
  }
};

export const filterSenderBySelectedDomain = (senderArr, selectedDomain) => {
  return senderArr?.filter(sender => sender?.eligibleDomains?.includes(selectedDomain));
};
