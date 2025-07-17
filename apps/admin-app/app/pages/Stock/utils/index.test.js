import moment from 'moment';

import { datePickerRender } from './datePickerRender';

describe('Date Picker Render', () => {
  it('should work as expected', () => {
    const format = 'DD-MM-YYYY';
    const startDate = moment('30-08-2022', format);
    const endDate = moment('31-08-2022', format);
    const input = [startDate, endDate];
    const output = [startDate, endDate];
    expect(datePickerRender(input)).toEqual(output);
  });
});
