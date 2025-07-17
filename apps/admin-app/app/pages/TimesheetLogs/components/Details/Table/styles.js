import { createUseStyles } from 'react-jss';

export default createUseStyles({
  wrapperTimePeriod: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
  divider: {
    height: 0.5,
    width: '100%',
    borderBottom: '1px dotted #c9c9c9',
  },
  approved: { background: '#ddffdd' },
  container: {
    maxHeight: 'calc(100vh - 200px)',
    maxWidth: '95vw',
    overflow: 'auto',
  },
  table: {
    '& .ant-table-tbody > tr > td': { borderBottom: '1px solid #c9c9c9' },
    '& .ant-table-thead > tr > th': { fontWeight: 'bold' },
  },
  actionColumn: { borderLeft: '1px solid #c9c9c9' },
  redColor: { color: 'red' },
});
