import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return {
    datePickerWrapper: { width: '100%' },
    datePicker: { visibility: 'hidden' },
    datePickerContainer: {
      '& .ant-picker-dropdown': { top: '0 !important' },
      '& .ant-picker-cell-selected > .ant-picker-cell-inner': { background: 'transparent', color: 'inherit' },
    },
    selectWrapper: {
      '& .ant-select-dropdown': { height: '270px', width: '280px', minWidth: '0 !important' },
      '& .ant-select-arrow': { top: '50% !important' },
    },
    selectedCell: { background: `${theme.color.primary} !important`, color: `${theme.color.white} !important` },
  };
});
