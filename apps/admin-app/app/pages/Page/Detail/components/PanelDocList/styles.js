import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return {
    actionButton: { margin: `0 ${theme.spacing(1) / 2}px` },
    table: {
      overflowX: 'auto',
      '& table': { width: '100% !important' },
      '& .ant-table-body': { overflowY: 'auto !important' },
    },
  };
});
