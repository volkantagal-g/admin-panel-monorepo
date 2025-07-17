import moment from 'moment';

import { GETIR_10_DOMAIN_TYPE } from '@shared/shared/constants';

export const getNumberOfWeek = country => {
  if (!country) {
    return null;
  }
  const { domainStartDates } = country;
  const startDate = domainStartDates[GETIR_10_DOMAIN_TYPE];
  const startOfWeek = moment(startDate).startOf('week');
  return moment().diff(startOfWeek, 'week');
};
