import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return {
    cursorPointer: { cursor: 'pointer' },
    cursorAuto: { cursor: 'auto' },
    disabledButton: { backgroundColor: `${theme.color.disabledPrimary} !important` },
    tableWrapper: { '& td.ant-table-cell': { padding: '1px' } },
    transitionZero: { transition: 'none' },
  };
});
