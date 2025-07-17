import moment from 'moment';
import { isEmpty } from 'lodash';

export const getStoreAuditFilterRequestBody = filters => {
  const requestBody = {};

  Object.keys(filters).forEach(filterKey => {
    if (!isEmpty(filters[filterKey])) {
      if (filterKey.includes('Date')) {
        const [startDate, endDate] = filters[filterKey];
        const key = filterKey.split('Date')[0];
        const startDateKey = `${key}StartDate`;
        const endDateKey = `${key}EndDate`;
        requestBody[startDateKey] = moment(startDate).format('YYYY-MM-DD');
        requestBody[endDateKey] = moment(endDate).format('YYYY-MM-DD');
      }
      else {
        requestBody[filterKey] = filters[filterKey];
      }
    }
  });

  return { ...requestBody };
};
