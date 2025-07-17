import moment from 'moment';

import { getLocalDateFormat } from '@shared/utils/localization';

export function getLeaveCalculations({
  t,
  timezone,
  startDatetime,
  endDatetime,
  workableTime,
}) {
  // implement selected country timezone
  const startDate = moment(startDatetime).tz(timezone);
  const endDate = moment(endDatetime).tz(timezone);

  const formattedStartDate = startDate.format(getLocalDateFormat());
  const formattedEndDate = endDate.format(getLocalDateFormat());
  const isSameDate = formattedStartDate === formattedEndDate;

  const diff = endDate.diff(startDate);
  const days = Math.ceil(moment.duration(diff).asDays());
  const hours = Math.ceil(workableTime / 60) || '-';

  return {
    leaveDates: isSameDate
      ? `${formattedStartDate}`
      : `${formattedStartDate} - ${formattedEndDate}`,
    leaveDuration: `${days} ${t('DAYS')} / ${hours} ${t('HOURS')}`,
  };
}
