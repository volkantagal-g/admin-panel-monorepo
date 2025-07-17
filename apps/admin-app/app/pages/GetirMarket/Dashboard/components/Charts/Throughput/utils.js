import _ from 'lodash';
import momentTZ from 'moment-timezone';

import { CHART_DOMAIN_KEYS } from '../utils';

const calculateThroughput = (operationStats, { timezone }) => {
  const sortedOperationStats = _.sortBy(operationStats, 'startDate');
  let totalOrderCount = 0;
  let totalAvailableHours = 0;
  const hourlyStats = sortedOperationStats.map(hour => {
    totalOrderCount += hour.orderCount;
    totalAvailableHours += hour.availableHours;
    return [momentTZ(hour.startDate).tz(timezone).valueOf(), hour.orderCount / hour.availableHours];
  });
  const avg = totalOrderCount / totalAvailableHours;
  return { avg, hourlyStats };
};

export const getFormattedThroughputData = (data, { timezone }) => {
  if (_.isEmpty(data)) return data;
  const formatted = {};

  CHART_DOMAIN_KEYS.forEach(key => {
    formatted[key] = calculateThroughput(data?.[key], { timezone });
  });
  return formatted;
};
