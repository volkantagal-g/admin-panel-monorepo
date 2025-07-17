import moment from 'moment';

export const getDateTimeWithZoneOffset = (dateString: string, timeString: string) => {
  const dateTimeString = `${dateString} ${timeString}`;
  const utcDateTime = moment.utc(dateTimeString, 'DD.MM.YYYY HH:mm');
  return utcDateTime.local().format('DD.MM.YYYY HH:mm');
};
