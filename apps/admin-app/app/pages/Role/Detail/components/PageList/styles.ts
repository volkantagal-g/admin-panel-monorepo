import { createUseStyles } from 'react-jss';

export default createUseStyles({
  card: { '& .ant-card-head': { height: 'auto !important' } },
  table: {
    overflowX: 'auto',
    '& table': { width: '100% !important' },
    '& .ant-table-body': { overflowY: 'auto !important' },
  },
});
