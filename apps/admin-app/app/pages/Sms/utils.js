import { toString } from 'lodash';

import { getLangKey } from '@shared/i18n';
import { PROCESS_STATUS } from '@app/pages/Sms/constants';

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
    case PROCESS_STATUS.CREATED:
    case PROCESS_STATUS.READY:
      return 'cyan';
    case PROCESS_STATUS.PRE_PROCESS:
    case PROCESS_STATUS.IN_PROCESS:
      return 'green';
    case PROCESS_STATUS.CANCEL:
    case PROCESS_STATUS.FAIL:
      return 'red';
    case PROCESS_STATUS.FINISHED:
      return 'green';
    default:
      return null;
  }
};
