import { createUseStyles } from 'react-jss';

import Theme from '@shared/jssTheme';

export default createUseStyles((theme: typeof Theme) => {
  return {
    table: {
      overflowX: 'auto',
      '& table': { width: '100% !important' },
      '& .ant-table-body': { overflowY: 'auto !important' },
    },
    box: {
      borderRadius: theme.spacing(2),
      backgroundColor: '#fafafa',
      border: '1px solid #e0e0e0',
      padding: '6px 10px 6px 10px',
      marginBottom: theme.spacing(2),
    },
    tableSearchWrapper: { padding: theme.spacing(2) },
    tableSearchInput: {
      width: 188,
      marginBottom: theme.spacing(2),
      display: 'block',
    },
    tableSearchButton: {
      width: 90,
      marginRight: theme.spacing(2),
    },
    tableSearchResetButton: { width: 90 },
    tableSearchOnlyResetButton: {
      marginLeft: 90 + theme.spacing(2),
      width: 90,
    },
    actionButton: { margin: `0 ${theme.spacing(1) / 2}px` },
    filterIcon: { margin: '0 8px' },
  };
});
