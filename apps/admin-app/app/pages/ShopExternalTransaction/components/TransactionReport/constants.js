import moment from 'moment';

import { MANUAL_TYPES } from '@app/pages/GetirFood/RestaurantExternalTransaction/constants';

export const MAX_DATE_RANGE_IN_DAYS = 92;

export const disabledDate = dates => current => {
  if (!dates || dates.length === 0) {
    return false;
  }
  const laterThanToday = current && current > moment().endOf('day');
  const tooLate = dates[0] && current.diff(dates[0], 'days') > MAX_DATE_RANGE_IN_DAYS;
  const tooEarly = dates[1] && dates[1].diff(current, 'days') > MAX_DATE_RANGE_IN_DAYS;
  return laterThanToday || tooEarly || tooLate;
};

export const MANUAL_TYPES_VALUES = {
  [MANUAL_TYPES.ALL]: { tr: 'Tüm İşlemler', en: 'All Transactions' },
  [MANUAL_TYPES.NEGATIVE]: { tr: 'İşletmeden Alacaklar', en: 'Shop Paybacks' },
  [MANUAL_TYPES.POSITIVE]: { tr: 'İşletmeye Ödemeler', en: 'Shop Payments' },
};

export const getInitialValues = () => ({
  dateRange: [moment().startOf('day').subtract(7, 'days'), moment().endOf('day')],
  manualType: MANUAL_TYPES.ALL,
});
