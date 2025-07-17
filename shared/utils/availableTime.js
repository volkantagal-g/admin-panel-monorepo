import { DAYS_IN_A_WEEK, HOURS_IN_A_DAY, MINUTES_IN_A_HOUR } from '@shared/shared/constants';

const allAvailableTimes = [
  {
    startMin: 0,
    endMin: 1440,
  },
  {
    startMin: 1440,
    endMin: 2880,
  },
  {
    startMin: 2880,
    endMin: 4320,
  },
  {
    startMin: 4320,
    endMin: 5760,
  },
  {
    startMin: 5760,
    endMin: 7200,
  },
  {
    startMin: 7200,
    endMin: 8640,
  },
  {
    startMin: 8640,
    endMin: 10080,
  },
];

const MINUTES_IN_A_DAY = HOURS_IN_A_DAY * MINUTES_IN_A_HOUR;
const MINUTES_IN_A_HALF_HOUR = 30;

const isInRange = (source, value) => {
  return source.some(timeObject => {
    return value > timeObject.startMin && timeObject.endMin >= value;
  });
};

export const getAvailableTimeBoxesMap = (availableTimes = [], rangeInMins = MINUTES_IN_A_HALF_HOUR) => {
  const availableTimeBoxesMap = Array.from({ length: DAYS_IN_A_WEEK * (MINUTES_IN_A_DAY / rangeInMins) }).reduce((sumObject, tempValue, tempIndex) => {
    const timeValue = (tempIndex * rangeInMins) + rangeInMins;
    return {
      ...sumObject,
      [tempIndex]: isInRange(availableTimes, timeValue),
    };
  }, {});
  return availableTimeBoxesMap;
};

const getEndOfDays = () => Array.from({ length: DAYS_IN_A_WEEK }).map((x, index) => {
  return (index + 1) * 48 * 30;
});

export const getInitialAvailableTimes = allTime => {
  if (allTime) {
    return allAvailableTimes;
  }

  return [];
};

export const transformFromTimeBoxesToAvailableTimes = (availableTimeBoxesMap, rangeInMins = MINUTES_IN_A_HALF_HOUR) => {
  return Object.keys(availableTimeBoxesMap).reduce((newAvailableTimes, timeIndexKey) => {
    const isTimeBoxSelected = availableTimeBoxesMap[timeIndexKey];
    if (!isTimeBoxSelected) {
      return newAvailableTimes;
    }
    const timeIndex = parseInt(timeIndexKey, 10);
    const startMin = timeIndex * rangeInMins;
    const endMin = (timeIndex + 1) * rangeInMins;
    const isEndOfDay = getEndOfDays().includes(startMin);

    if (newAvailableTimes.length && !isEndOfDay && newAvailableTimes[newAvailableTimes.length - 1].endMin === startMin) {
      // eslint-disable-next-line no-param-reassign
      newAvailableTimes[newAvailableTimes.length - 1].endMin = endMin;
    }
    else {
      newAvailableTimes.push({ startMin, endMin });
    }
    return newAvailableTimes;
  }, []);
};
