import { createUseStyles } from 'react-jss';

export default createUseStyles({
  courierCountsWrapper: {
    boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.1)',
    background: '#f5f5f5',
    width: '300px',
    borderRadius: '5px',
    right: 0,
    top: '400px',
    overflow: 'scroll',
    zIndex: '200',
    maxHeight: '180px !important',
    '& > div': { width: 'calc(100% - 1rem)' },
    '& div table': {
      margin: '0.25rem',
      tableLayout: 'auto',
      width: '100%',
    },
    '& > div > table tr td:first-child': {
      textAlign: 'left',
      paddingLeft: '5px',
    },
    '& > div > table tr td': {
      fontSize: '11px',
      textAlign: 'right',
    },
    '& > div > table tr th': {
      fontSize: '11px',
      textAlign: 'right',
    },
  },
  rowName: {
    fontWeight: 'bold',
    fontSize: '12px',
  },
  warehouseName: {
    maxWidth: '60px',
    overflowX: 'scroll',
  },
  searchBox: {
    border: '1px solid #eaeff0',
    width: 'calc(100% - 1rem)',
    margin: '0.25rem',
    fontSize: '12px',
    borderRadius: '5px',
  },
  parentTableRow: {
    borderBottom: '1px solid #eaeff0',
    '& > td:first-child:hover': {
      color: '#5D3EBC',
      cursor: 'pointer',
    },
  },
  expandedParentTableRow: {
    background: '#fff',
    '& > td:first-child': { paddingLeft: '16px' },
  },
  expandedRow: {
    padding: '0.25rem',
    border: '1px solid #ccc',
  },
  expandedTable: {
    width: '100%',
    minHeight: 'auto',
    maxHeight: '140px',
    overflowY: 'scroll',
    '& > thead': { display: 'none' },
  },
});
