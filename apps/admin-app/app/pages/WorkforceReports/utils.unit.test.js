import cloneDeep from 'lodash/cloneDeep';
import moment from 'moment';
import localeEN from 'antd/lib/date-picker/locale/en_US';
import localeTR from 'antd/lib/date-picker/locale/tr_TR';

import { customizeLocale } from './utils';

jest.mock('moment', () => ({
  ...jest.requireActual('moment'),
  defineLocale: jest.fn(),
}));
jest.mock('lodash/cloneDeep', () => jest.fn(obj => ({ ...obj })));

describe('customizeLocale', () => {
  it('returns Turkish locale', () => {
    const lang = 'tr';
    const result = customizeLocale(lang);

    expect(result).toBe(localeTR);
  });
  it('returns the customized English locale', () => {
    const lang = 'en';
    const result = customizeLocale(lang);
    expect(moment.defineLocale).toHaveBeenCalledWith('en-custom', {
      parentLocale: 'en',
      week: {
        dow: 1,
        doy: 7,
      },
    });
    expect(cloneDeep).toHaveBeenCalledWith(localeEN);

    expect(result.lang.locale).toBe('en-custom');
  });
});
