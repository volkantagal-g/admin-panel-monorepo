import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => ({
  thickBordersLeft: { borderLeft: '3px solid #EDEDED' },
  thickBordersRight: { borderRight: '3px solid #EDEDED !important' },
  thickBorders: {
    borderLeft: '3px solid #EDEDED',
    borderRight: '3px solid #EDEDED !important',
  },
  container: { width: 'calc(100% - 12px)' },
  tableBody: { maxHeight: '70vh' },
  citySelectButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 'calc(100% + 12px)',
    height: '100%',
    background: 'transparent',
    border: '0',
    textAlign: 'start',
    padding: '4px 6px',
    borderRadius: '4px',
    transition: 'all 200ms ease',
    margin: '0 -6px',
    '&:hover': {
      boxShadow: 'rgb(93 62 188 / 15%) 0px 0px 8px',
      '& $selectIcon': { display: 'block' },
    },
  },
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
  filterDropdownContainer: {
    display: 'grid',
    gap: theme.spacing(),
    padding: theme.spacing(),
  },
  inputSectionContainer: {
    display: 'grid',
    gap: theme.spacing(),
    gridTemplateColumns: 'repeat(2, auto)',
  },
  actionSectionContainer: {
    display: 'flex',
    justifyContent: 'end',
    gap: theme.spacing(),
  },
  csvButtonRow: { margin: '0 2px 8px 0' },
}));
