import { createUseStyles } from 'react-jss';

export default createUseStyles({
  table: {
    overflowX: 'auto',
    '& table': { width: '100% !important' },
    '& .ant-table-body': { overflowY: 'auto !important' },
  },
});
