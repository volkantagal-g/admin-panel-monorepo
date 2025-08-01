import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    antTable: {
      '& div.ant-table-body': { maxHeight: '100% !important' },
      '& th.ant-table-cell': { padding: '2px !important' },
      '& td.ant-table-cell': { padding: '2px !important' },
    },
    promoContainer: {
      whiteSpace: 'nowrap',
      overflowX: 'scroll',
      '&::-webkit-scrollbar': { display: 'none' },
    },
    promoCellTag: {
      maxWidth: '160px !important',
      padding: '0px !important',
      border: '0px !important',
    },
    promoCodeText: {
      padding: '0 2px',
      maxWidth: 160,
      fontSize: '.65rem',
      fontWeight: 'bold',
      textShadow: '0 1px 0 rgb(0 0 0 / 20%)',
    },
    warehouseText: { width: 100 },
    lastRightAlignedColumn: { paddingRight: '8px' },
    lastRightAlignedColumn2: { paddingRight: '24px' },
    boldText: { fontWeight: 'bold' },
  };
});
