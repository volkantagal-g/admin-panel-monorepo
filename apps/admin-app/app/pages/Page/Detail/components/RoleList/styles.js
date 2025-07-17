import { createUseStyles } from 'react-jss';

export default createUseStyles({
  antCard: {
    // give extra buttons some space
    '& .ant-card-extra > *': { margin: '0 2px' },
  },
  table: {
    overflowX: 'auto',
    '& table': { width: '100% !important' },
    '& .ant-table-body': { overflowY: 'auto !important' },
  },
});
