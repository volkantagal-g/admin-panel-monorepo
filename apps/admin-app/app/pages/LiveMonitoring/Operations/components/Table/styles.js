import { createUseStyles } from 'react-jss';

export default createUseStyles({
  thickBordersLeft: { borderLeft: '3px solid #EDEDED' },
  thickBordersRight: { borderRight: '3px solid #EDEDED !important' },
  thickBorders: {
    borderLeft: '3px solid #EDEDED',
    borderRight: '3px solid #EDEDED !important',
  },
  container: { width: '100%' },
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
});
