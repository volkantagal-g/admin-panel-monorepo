import { toString } from 'lodash';

import moment from 'moment';

import { getLangKey } from '@shared/i18n';

export const convertDomainTypes = (values = {}, activeDomainsFromConfig) => {
  return Object.entries(values)
    .map(([value, label]) => {
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
    })
    .filter(value => value !== null);
};

export const convertPhoneLanguageOptions = countryLanguages => {
  return countryLanguages?.map(item => ({
    value: toString(item.toLowerCase()),
    label: item,
    disabled: item === 'en' || item === 'tr',
  }));
};

export const toSnakeCase = str => {
  return str.replace(/[\W_]+/g, '_').toUpperCase();
};

export const convertTimeToDuration = time => {
  const hour = parseInt(time.split(':')[0], 10);
  const minute = parseInt(time.split(':')[1], 10);

  return `PT${hour}H${minute}M`;
};

export const convertDurationToTime = duration => {
  if (duration === null) {
    return null;
  }

  const hourIndex = duration?.indexOf('H');
  const hour = hourIndex !== -1 ? duration?.substring(2, hourIndex) : '0';

  const minuteIndex = duration?.indexOf('M');
  const minute = minuteIndex !== -1 ? duration?.substring(hourIndex + 1, minuteIndex) : '0';

  const hourAndMinute = `${(`0${hour}`).slice(-2)}:${(`0${minute}`).slice(-2)}`;
  const date = moment().format('YYYY-MM-DD');

  return moment(`${date} ${hourAndMinute}`, 'YYYY-MM-DD HH:mm');
};
