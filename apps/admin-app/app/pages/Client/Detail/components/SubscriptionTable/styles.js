import { createUseStyles } from 'react-jss';

export default createUseStyles({
  table: {
    '& th.ant-table-cell': {
      fontWeight: 'bold',
      padding: '4px 8px',
    },
    '& td.ant-table-cell': { padding: '12.5px 8px' },
  },
  tableWrapper: {
    width: 'calc(100% - 2rem)',
    margin: '0 1rem 1rem',
  },
  noPanelPadding: {
    '& .ant-collapse-content-box': { padding: 0 },
    '& .ant-table-pagination': { marginRight: '16px' },
    '& .ant-form': { margin: '16px 16px -10px' },
  },
  priceColumn: {
    display: 'flex',
    alignItems: 'center',
    gap: '18px',
  },
});
