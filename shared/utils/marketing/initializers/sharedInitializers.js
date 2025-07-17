// /app/utils/marketing/sharedInitializers.js
import moment from 'moment';

import { getSelectedCountry, getSelectedCountryLanguages, getSelectedCountryTimeZones } from '@shared/redux/selectors/countrySelection';
import { getLangKey } from '@shared/i18n';
import { DEVICE_TYPES } from '@shared/shared/constants';

export function getDefaultCountry() {
  const country = getSelectedCountry();
  return {
    label: country.name[getLangKey()],
    value: country._id,
  };
}

export function getDefaultPhoneLanguages() {
  return getSelectedCountryLanguages();
}

export function getDefaultContentLanguages() {
  return { languages: getSelectedCountryLanguages() };
}

export function getDefaultDeviceTypes() {
  return [DEVICE_TYPES.ANDROID, DEVICE_TYPES.IPHONE];
}

export function getDefaultValidDates(offsetInMinutes = 15, includeEndOfDay = true) {
  const from = moment().add(offsetInMinutes, 'minutes');
  const to = includeEndOfDay ? moment().endOf('day') : moment().add(2, 'days');
  return [from, to];
}

export function getPrimaryTimezone() {
  return getSelectedCountryTimeZones()[0]?.timezone;
}

export const formatDate = date => {
  const dateFormat = 'YYYY-MM-DD HH:mm:ss';
  const selectedCountryPrimaryTimeZone = getSelectedCountryTimeZones()[0]?.timezone;
  return moment(moment.utc(date).tz(selectedCountryPrimaryTimeZone).format(dateFormat));
};
