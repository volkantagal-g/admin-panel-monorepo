import moment from 'moment/moment';

import { DEFAULT_DATE_FORMAT } from '@shared/shared/constants';

import { getLangKey, t } from '../i18n';
import { getLocalDateFormat, getLocalDateTimeFormat } from './localization';

export const defaultFormat = 'DD.MM.YYYY HH:mm';
export const defaultFormatWithSecond = 'DD.MM.YYYY HH:mm:ss';

export const formatDate = (date, format = defaultFormat, localeKey = getLangKey()) => {
  return date ? moment(date).locale(localeKey).format(format) : '';
};

export const formatDateWithSecond = (date, format = defaultFormatWithSecond, localeKey = getLangKey()) => {
  return date ? moment(date).locale(localeKey).format(format) : '';
};

export const formatUTCDate = (date, format = defaultFormat) => {
  return date ? moment(date).utc().format(format) : '';
};

export const getTime = (date, localeKey = getLangKey()) => moment(date).isValid() && moment(date).locale(localeKey).format('HH:mm:ss');

export const secondToMs = duration => duration * 1000;

export const msToString = ({ duration, shouldAddSecond = false, isAbbreviationText = true }) => {
  const textType = isAbbreviationText ? 'ABBR' : 'FULL';
  const momentDuration = moment.duration(duration);
  let durationText = '';
  if (momentDuration.years() > 0) {
    durationText += `${momentDuration.years()} ${t(`global:TIME.${textType}.YEAR`)} `;
  }
  if (momentDuration.months() > 0) {
    durationText += `${momentDuration.months()} ${t(`global:TIME.${textType}.MONTH`)} `;
  }
  if (momentDuration.days() > 0) {
    durationText += `${momentDuration.days()} ${t(`global:TIME.${textType}.DAY`)} `;
  }
  if (momentDuration.hours() > 0) {
    durationText += `${momentDuration.hours()} ${t(`global:TIME.${textType}.HOUR`)} `;
  }
  if (parseInt(momentDuration.minutes().toFixed(0), 10)) {
    durationText += `${momentDuration.minutes().toFixed(0)} ${t(`global:TIME.${textType}.MINUTE`)} `;
  }
  if (shouldAddSecond && momentDuration.seconds().toFixed(0)) {
    durationText += `${momentDuration.seconds().toFixed(0)} ${t(`global:TIME.${textType}.SECOND`)} `;
  }
  return durationText.trimEnd();
};

export const toFakeLocalTime = time => {
  const date = moment(time);
  date.add(date.utcOffset(), 'minute');
  return date.valueOf();
};

export const toFakeLocalMoment = time => {
  const date = moment(time);
  date.add(date.utcOffset(), 'minute');
  return date.clone();
};

export const getTimeDiffWithNow = date => {
  const timeDiff = moment.duration(moment().diff(date));

  return timeDiff;
};

export const toFakeLocalDate = time => {
  const date = moment(time);
  date.add(date.utcOffset(), 'minute');
  return date;
};

export const toTimeZoneWithoutChangingLocalTime = ({ date, destinationTimezone }) => {
  return date.clone().tz(destinationTimezone, true);
};

export const reverseLocalTime = time => {
  const date = moment(time);
  date.subtract(date.utcOffset(), 'minute');
  return date.valueOf();
};

export const getParsedDateFromUTCDateString = utcDateString => {
  if (!utcDateString) return undefined;
  return moment(moment.utc(utcDateString).format(DEFAULT_DATE_FORMAT));
};

export const getFormattedUTCDate = date => (date ? moment.utc(date).format(getLocalDateFormat()) : '');

export const getFormattedUTCDateTime = date => (date ? moment.utc(date).format(getLocalDateTimeFormat()) : '');
