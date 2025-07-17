import { createUseStyles } from 'react-jss';

export default createUseStyles({
  courierCountTableWrapper: {
    marginBottom: '5px !important',
    borderRadius: '5px 5px',
    backgroundColor: '#fff',
    boxShadow: '2px 2px 10px rgb(0 0 0 / 10%)',
  },
  table: {
    width: '320px',
    padding: '0 5px',
    '& .ant-table-row-level-0': { '& > td': { padding: '1px 0px !important' } },
  },
  innerTable: {
    marginLeft: '0 !important',
    width: '320px',
    overflowY: 'auto',
    maxHeight: '130px',
    '& .ant-table-row-level-0': {
      background: '#f5f5f5 !important',
      '& > td': {
        background: 'inherit !important',
        cursor: 'default !important',
      },
    },
  },
  cell: {
    padding: '1px !important',
    fontSize: '12px !important',
  },
  alignRight: { textAlign: 'right' },
  name: {
    fontWeight: 'bold !important',
    padding: '4px 0 !important',
    fontSize: '12px !important',
    cursor: 'pointer',
  },
  noClick: { cursor: 'default !important' },
  planned: { color: '#697488 !important' },
  totalCourier: {
    fontWeight: 'bold !important',
    color: '#58666E !important',
  },
  freeCourier: {
    fontWeight: 'bold !important',
    color: '#1C8C04 !important',
  },
  onDuty: {
    fontWeight: 'bold !important',
    color: '#5D3EBC !important',
  },
  returning: {
    fontWeight: 'bold !important',
    color: '#FF974A !important',
  },
  busy: {
    fontWeight: 'bold !important',
    color: '#F05050 !important',
  },
  utilization: {
    fontWeight: 'bold !important',
    color: '#24B7E6 !important',
  },
  childName: {
    fontWeight: 400,
    color: '#2A00AA !important',
  },
  none: { display: 'none' },
  childRowContainer: { overflowY: 'auto' },
  nameSpan: {
    userSelect: 'none',
    color: '#363f44',
  },
  sortableCell: { cursor: 'pointer' },
  activeSorted: { textDecoration: 'underline' },
});
