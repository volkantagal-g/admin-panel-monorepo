import { createUseStyles } from 'react-jss';

export default createUseStyles({
  thickBordersLeft: { borderLeft: '3px solid #EDEDED' },
  thickBordersRight: { borderRight: '3px solid #EDEDED !important' },
  thickBorders: {
    borderLeft: '3px solid #EDEDED',
    borderRight: '3px solid #EDEDED !important',
  },
  container: { width: 'calc(100% - 12px)' },
  tableBody: { maxHeight: '70vh' },
  selectIcon: { display: 'none' },
  cellPaddingReset: { borderLeft: '3px solid #EDEDED' },
  alignRight: { textAlign: 'right' },
  table: {
    '& .ant-table-column-sorters': {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
    },
  },
  searchBox: {
    maxWidth: '200px',
    padding: '8px',
  },
  actionButtonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '8px',
    marginTop: '8px',
    '& > button': { width: '100%' },
  },
});
