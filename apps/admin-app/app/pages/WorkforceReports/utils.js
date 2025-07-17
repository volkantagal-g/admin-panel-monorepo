import { cloneDeep } from 'lodash';
import moment from 'moment';
import localeEN from 'antd/lib/date-picker/locale/en_US';
import localeTR from 'antd/lib/date-picker/locale/tr_TR';

export function customizeLocale(lang) {
  if (lang === 'tr') {
    return localeTR;
  }

  moment.defineLocale('en-custom', {
    parentLocale: 'en',
    week: {
      dow: 1,
      doy: 7,
    },
  });

  const locale = cloneDeep(localeEN);
  locale.lang.locale = 'en-custom';
  return locale;
}
