import moment from 'moment';
import _isEmpty from 'lodash/isEmpty';

export const getAggressionLevelOptions = agresionLevel => {
  return Object.entries(agresionLevel).map(([key, value]) => {
    return {
      value: key.toString(),
      label: value,
    };
  });
};

export const isActiveServiceAppropriateForController = (domainTypes, controlEligibleDomains) => {
  return domainTypes.some(domainType => controlEligibleDomains?.includes(domainType));
};

export const get24TimeRangeArray = () => {
  const startOfDay = moment().startOf('day');
  const format = 'HH:mm';
  const timeRanges = Array(24).fill(null).map(() => {
    return `${startOfDay.format(format)}-${startOfDay.add(60, 'minutes').format(format)}`;
  });
  timeRanges[23] = '23:00-23:59';
  return timeRanges;
};

// source: [[0,1],[0,2],[1,3],[2,4]]
// result: [{"day": 1,"timePeriods": [{"startTime": "00:30","endTime": "01:00"}]},{...}],
// IMPORTANT: Normalized day is starting 1 instead of 0
export const normalizeHourSchedulerData = availableDayPeriods => {
  const timeRangeArr = get24TimeRangeArray();
  const schedulerObj = {};

  availableDayPeriods.forEach(availablePeriod => {
    schedulerObj[availablePeriod[1]] = {
      timePeriods: {
        ...(schedulerObj[availablePeriod[1]] ? schedulerObj[availablePeriod[1]].timePeriods : []),
        [availablePeriod[0]]: {
          startTime: timeRangeArr[availablePeriod[0]].split('-')[0],
          endTime: timeRangeArr[availablePeriod[0]].split('-')[1],
        },
      },
    };
  });

  return Object.keys(schedulerObj).flatMap(key => {
    if (!_isEmpty(schedulerObj[key].timePeriods)) {
      const timePeriods = Object.values(schedulerObj[key].timePeriods);
      return { timePeriods, day: +key + 1 };
    }
    return {};
  });
};

// source: [{"day": 1,"timePeriods": [{"startTime": "00:30","endTime": "01:00"}]},{...}],
// result: [[0,1],[0,2],[1,3],[2,4]]
export const convertSchedulerDatesToArr = schedulerDates => {
  const timeRangeArr = get24TimeRangeArray();
  return schedulerDates?.flatMap(dayPeriod => {
    return dayPeriod.timePeriods?.map(timePeriod => [timeRangeArr.findIndex(range => {
      return range === `${timePeriod.startTime}-${timePeriod.endTime}`;
    }), dayPeriod.day - 1]);
  });
};
