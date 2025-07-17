import { isEmpty, sortBy } from 'lodash';
import momentTZ from 'moment-timezone';

import { CHART_DOMAIN_KEYS } from '../utils';

const getUtilization = (operationStats, { timezone }) => {
  const sortedOperationStats = sortBy(operationStats, 'startDate');
  let totalUtilizedHours = 0;
  let totalAvailableHours = 0;
  const hourlyStats = sortedOperationStats.map(hour => {
    totalUtilizedHours += hour.utilizedHours;
    totalAvailableHours += hour.availableHours;
    return [momentTZ(hour.startDate).tz(timezone).valueOf(), (hour.utilizedHours / hour.availableHours) * 100];
  });
  const avg = (totalUtilizedHours / totalAvailableHours) * 100;
  return { avg, hourlyStats };
};

const getCourierCounts = (operationStats, { timezone }) => {
  const sortedOperationStats = sortBy(operationStats, 'startDate');
  let totalWorkHours = 0;
  let totalHourCount = 0;
  const hourlyStats = sortedOperationStats.map(hour => {
    totalWorkHours += hour.totalHours;
    totalHourCount += 1;
    return [momentTZ(hour.startDate).tz(timezone).valueOf(), hour.totalHours];
  });
  const avg = totalWorkHours / totalHourCount;
  return { avg, hourlyStats };
};

export const getFormattedUtilizationAndCourierData = (data, { timezone }) => {
  if (isEmpty(data)) return data;
  const formatted = {
    utils: {},
    couriers: {},
  };

  CHART_DOMAIN_KEYS.forEach(key => {
    formatted.utils[key] = getUtilization(data?.[key], { timezone });
    formatted.couriers[key] = getCourierCounts(data?.[key], { timezone });
  });
  return formatted;
};
