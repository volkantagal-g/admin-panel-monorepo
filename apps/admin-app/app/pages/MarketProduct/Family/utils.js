import moment from 'moment-timezone';

import { getLangKey } from '@shared/i18n';

export const selectFormatter = data => data?.map(item => ({ value: item?._id, label: item?.name?.[getLangKey()] }));

export const getCountryTimeZoneFormatter = date => {
  const storedCountry = localStorage.getItem('selectedCountry');
  if (storedCountry) {
    return moment.utc(date).tz(JSON.parse(storedCountry)?.timezones[0]?.timezone).format();
  }
  return date;
};

export const handleErrorMessages = error => {
  const errorData = error.response.data;
  let errorMessages = errorData?.message;
  let errorMessage = '';
  if (errorMessages?.message) {
    errorMessages = errorMessages.message;
    for (let i = 0; i < errorMessages.length; i += 1) {
      errorMessage += `ISSUE: ${errorMessages[i].message} ,`;
    }
  }
  else {
    errorMessage = errorMessages;
  }
  return errorMessage;
};
