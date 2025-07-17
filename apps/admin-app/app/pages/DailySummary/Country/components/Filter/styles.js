import { createUseStyles } from 'react-jss';

export default createUseStyles({
  mediumWidth: { width: '160px' },
  filterRow: { alignItems: 'center' },
  countInput: { width: '50px' },
  lastUsedDateFilter: { border: '2px dashed #432a97' },
  sortByLabel: { fontSize: '12px', marginRight: '4px' },
  dateRangePicker: { width: 190 },
  selectCity: {
    composes: '$mediumWidth',
    '& .ant-select-selection-overflow': {
      '& .ant-select-selection-item-content': { maxWidth: 60 },
      '& div:nth-last-child(n + 3) .ant-select-selection-item-content': { maxWidth: 30 },
    },
  },
  radioGroupWrapper: {
    '& .ant-radio-wrapper': { marginRight: 4 },
    '& .ant-radio-button-wrapper': { paddingRight: 5, paddingLeft: 5 },
  },
  dateType: { '& .ant-radio-button-wrapper': { paddingLeft: 10, paddingRight: 10 } },
});
