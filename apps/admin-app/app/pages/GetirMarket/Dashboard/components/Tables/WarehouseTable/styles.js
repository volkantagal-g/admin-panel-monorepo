import { createUseStyles } from 'react-jss';

export default createUseStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '12px',
    margin: '0 8px',
  },
  valueContainer: { margin: '4px 0px' },
  tableWrapper: { '& .ant-table-summary': { fontSize: 12, '& td:last-child': { paddingRight: '9px' } } },
});
