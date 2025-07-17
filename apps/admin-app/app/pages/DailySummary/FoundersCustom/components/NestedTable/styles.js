/* eslint-disable object-curly-newline */
import { createUseStyles } from 'react-jss';

export default createUseStyles({
  tableContainer: { marginTop: '5px' },
  antTable: {
    '& .ant-table': { lineHeight: '0.9rem !important', paddingBottom: '5px', tableLayout: 'unset' },
    '& table': {
      width: '100% !important',
      minWidth: '100% !important',
      maxWidth: '100% !important',
    },
    '& .ant-table-header > table': { tableLayout: 'fixed !important' },
    '& .ant-table-body > table': { tableLayout: 'auto !important' },
    '& colgroup > col:nth-child(odd), col:nth-child(2), col:nth-child(3), col:nth-child(4) ': { minWidth: '45px !important' },
    '& colgroup > col:nth-last-child(1)': { width: '100%', minWidth: '100% !important' },
    '& colgroup:first-child': { width: '115px !important' },
    '& td': {
      padding: '0 4px 0 4px !important',
      borderRight: '1px solid #D9D9D9',
      borderBottom: '1px solid #D9D9D9 !important',
      fontWeight: '600 !important',
      fontSize: '1.16em !important',
      '&$unifiedCell': { paddingRight: '0 !important' },
      '&$growthCell': { paddingLeft: '2px !important' },
    },
    '& th': {
      padding: '2px !important',
      fontSize: '0.8rem !important',
      borderRight: '1px solid #D9D9D9 !important',
      borderBottom: '1px solid #D9D9D9 !important',
      textAlign: 'center !important',
      fontWeight: '700 !important',
    },
    '& .ant-table-thead > tr > th:nth-child(even)': {
      backgroundColor: '#F7F5FE !important',
    },
    '& .ant-table-tbody': {
      '& > tr': {
        height: 36,
        '& td.stripedColumn': {
          backgroundColor: '#F7F5FE',
          '&.ant-table-cell-row-hover': {
            backgroundColor: '#C6C7F6 !important',
            borderRightColor: '#B3ACF1 !important',
          },
        },
        '& > td.ant-table-cell-row-hover': {
          backgroundColor: '#DDD5FB !important',
          borderRightColor: '#D2C7FA !important',
        },
      },
    },
    '& .ant-table-measure-row td': { padding: '0px !important' },
    '& .ant-table-measure-row th': { padding: '0px !important' },
    '& thead th': { borderBottom: '1px solid black !important' },
    // don't show header scrollbar
    '& thead .ant-table-cell-scrollbar': { display: 'none' },
    '& .emptyColumn': {
      border: 'none !important',
      backgroundColor: '#ffffff !important',
    },
  },
  expandButton: {
    height: '21px',
    width: '21px',
    marginRight: '4px',
    '& > span': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
    },
  },
  expandedRow: { '& td:first-child': { display: 'table-cell !important' } },
  spinnerIcon: {
    fontSize: '0.4em',
    marginRight: '6px',
    '& .ant-spin-dot': { fontSize: '12px' },
  },
  sectionHeaderRow: {
    '& .ant-table-cell-fix-left': {
      fontSize: '0.9rem !important',
      borderRight: '1px solid #dddddd',
    },
    '& td': {
      borderRight: 'none',
      paddingTop: '3px !important',
      paddingBottom: '3px !important',
    },
  },
  nameColumnWrapper: { width: 115 },
  nameColumn: {
    composes: '$nameColumnWrapper',
    display: 'table-cell',
    minHeight: 20,
    '& > $nameColumnWrapper:not(:has($expandButton))': { paddingLeft: 35 },
  },
  oddNestLevel: {
    backgroundColor: '#edf1f2',
    '& .ant-table-cell-fix-left': { backgroundColor: '#edf1f2' },
  },
  baseDiffPercent: { fontSize: '0.7rem', fontWeight: 'bold' },
  diffPercent: { composes: '$baseDiffPercent', position: 'relative', bottom: '0.45rem' },
  singlePosDiff: { composes: '$baseDiffPercent', color: 'green' },
  singleNegDiff: { composes: '$baseDiffPercent', color: '#ad1e16' },
  positiveDiff: {
    composes: '$diffPercent',
    color: 'green',
  },
  negativeDiff: {
    composes: '$diffPercent',
    color: '#ad1e16',
  },
  emptyColumn: { border: 'none !important' },
  someMarginForEmptyChild: { marginRight: '10px' },
  unifiedCell: { borderRight: 'none !important' },
  boldCellsExceptPercentage: { fontWeight: 'bold' },
  gorillasOnly: {
    fontWeight: 600,
    color: '#313131',
  },
  growthCell: { fontSize: '0.7rem' },
});
