import { createUseStyles } from 'react-jss';

export default createUseStyles({
  filterRow: { alignItems: 'center' },
  countInput: { width: '60px' },
  lastUsedDateFilter: { border: '2px dashed #432a97' },
  sortByLabel: { fontSize: '12px', marginRight: '4px' },
  radioGroupWrapper: {
    '& .ant-radio-wrapper': { marginRight: 4 },
    '& .ant-radio-button-wrapper': { paddingRight: 5, paddingLeft: 5 },
  },
});
