import moment from 'moment';

import { WORKING_HOURS } from './constants';
import { SUNDAY, SATURDAY } from '@shared/shared/constants';

export function getWeekMinutesMap() {
  const obj: { [key: number | string]: number[]; } = {};
  //  Iterate over the days of the week (0 to 6)
  for (let day = 0; day < 7; day++) {
    const minutes: number[] = [];
    let minute: number = day * 1440; // Start minute of the day

    // Generate the array of minutes in 1-hour intervals for the current day
    while (minute < (day + 1) * 1440) {
      minutes.push(minute);
      minute += 60;
    }

    // Assign the array of minutes to the current day in the object
    obj[day] = minutes;
  }
  return obj;
}

export const getWorkingHoursByDay = () => {
  const obj: { [key: number | string]: number[]; } = {};
  const minutesOfWeek = getWeekMinutesMap();

  for (let day = 1; day <= 5; day++) {
    const startTimeOfWork = (1440 * day) + (WORKING_HOURS.START.hour * 60); // start 9am
    const endTimeOfWork = (1440 * day) + (WORKING_HOURS.END.hour * 60); // end 7pm

    const minutesOfDay = minutesOfWeek[day];

    const workinhHoursOfDay = minutesOfDay.filter(
      minute => minute >= startTimeOfWork && minute < endTimeOfWork,
    );
    obj[day] = workinhHoursOfDay;
  }

  return { ...obj, [SATURDAY]: [], [SUNDAY]: [] };
};

export function formatMinToHourRange(min: number): string {
  const duration = moment.duration(min, 'minutes');
  const hours = duration.hours();
  const mins = duration.minutes();

  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}
