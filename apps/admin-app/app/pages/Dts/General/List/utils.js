import moment from 'moment';
import { isEmpty } from 'lodash';

export const getDtsFilterRequestBody = (filters, sortedInfo) => {
  const requestBody = {};

  Object.keys(filters).forEach(filterKey => {
    if (!isEmpty(filters[filterKey])) {
      if (filterKey.includes('Date')) {
        const [startDate, endDate] = filters[filterKey];
        const startDateKey = 'startDate';
        const endDateKey = 'endDate';
        requestBody[startDateKey] = moment(startDate).startOf('day');
        requestBody[endDateKey] = moment(endDate).endOf('day');
      }
      else {
        requestBody[filterKey] = filters[filterKey];
      }
    }
  });
  if (!isEmpty(sortedInfo)) {
    requestBody.sort = [sortedInfo?.columnKey, sortedInfo?.order];
  }
  return { ...requestBody };
};
