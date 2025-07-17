import { isEmpty, sortBy } from 'lodash';
import momentTZ from 'moment-timezone';

import { CHART_DOMAIN_KEYS } from '../utils';

const getFinancialThroughput = (operationStats, { financialKey = 'netRevenue', timezone }) => {
  const sortedOperationStats = sortBy(operationStats, 'startDate');
  let totalFinancialValue = 0;
  let totalAvailableHours = 0;
  const hourlyStats = sortedOperationStats.map(hour => {
    totalFinancialValue += hour[financialKey];
    totalAvailableHours += hour.availableHours;
    return [momentTZ(hour.startDate).tz(timezone).valueOf(), hour[financialKey] / hour.availableHours];
  });
  const avg = totalFinancialValue / totalAvailableHours;
  return { avg, hourlyStats };
};

export const getFormattedFinancialThroughputData = (data, { timezone }) => {
  if (isEmpty(data)) return data;
  const formatted = {};

  CHART_DOMAIN_KEYS.forEach(key => {
    formatted[key] = getFinancialThroughput(data?.[key], { timezone });
  });
  return formatted;
};
