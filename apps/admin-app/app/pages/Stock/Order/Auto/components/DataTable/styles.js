import { createUseStyles } from 'react-jss';

export default createUseStyles({
  tableWrapper: {
    '& .ant-table-cell': { padding: '0 !important' },
    '& .ant-picker': { width: '100%' },
    '& th': { fontSize: '0.8em', fontWeight: 600 },
  },
});
