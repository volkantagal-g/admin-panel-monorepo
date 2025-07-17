import moment from 'moment-timezone';

export const DATE_PICKER_OPTIONS = {
  format: 'YYYY-MM-DD',
  allowClear: false,
  disabledDate: selectableDate => selectableDate.isAfter(moment()),
};

export const MONTH_PICKER_OPTIONS = {
  format: 'MMMM-YYYY', // ex: January 2022
  allowClear: false,
  disabledDate: selectableDate => {
    return selectableDate.isAfter(moment().subtract(1, 'day'));
  },
};
