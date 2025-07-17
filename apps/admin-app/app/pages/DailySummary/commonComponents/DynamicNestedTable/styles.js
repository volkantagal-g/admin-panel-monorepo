/* eslint-disable object-curly-newline */
import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => ({
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
    '&.multipleDate': {
      '& colgroup > col:nth-child(odd), col:nth-child(2)': { minWidth: '65px !important' },
      '& colgroup > col:nth-last-child(1)': { width: '100%', minWidth: '100% !important' },
      '& colgroup > col:nth-child(2)': { minWidth: '75px !important' },
    },
    '& colgroup > col:nth-child(odd), col:nth-child(2)': { minWidth: '55px !important' },
    '& colgroup > col:nth-last-child(1)': { width: '100%', minWidth: '100% !important' },
    '& colgroup > col:nth-child(2)': { minWidth: '65px !important' },
    '& colgroup:first-child': { width: '185px !important' },
    '& td': {
      padding: '0 1px 0 1px !important',
      borderRight: '1px solid #dddddd',
      borderBottom: '1px solid #dddddd !important',
      fontWeight: '600 !important',
    },
    '& th': {
      padding: '2px !important',
      fontSize: '0.9rem !important',
      borderRight: '1px solid #dddddd',
      borderBottom: '1px solid #dddddd !important',
      textAlign: 'center !important',
      fontWeight: '700 !important',
    },
    '& .ant-table-tbody > tr > :first-child:not(:has(span[aria-label*="-circle"])):not(:has([class*="ant-spin"]))': {
      '& > [class*="chartVisibilityChangeCheckbox"]': { marginLeft: '8px !important' },
    },
    '& .ant-table-measure-row td': { padding: '0px !important' },
    '& .ant-table-measure-row th': { padding: '0px !important' },
    '& thead th': { borderBottom: '1px solid black !important' },
    // don't show header scrollbar
    '& thead .ant-table-cell-scrollbar': { display: 'none' },
    // custom hover backgroundColor
    '& .ant-table-cell-row-hover': { backgroundColor: 'rgb(221, 218, 249) !important' },
    '& .emptyColumn': { border: 'none !important', backgroundColor: '#ffffff' },
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
  expandButtonDisabled: {
    visibility: 'visible !important',
    height: '21px',
    width: '21px !important',
    marginRight: '4px',
    cursor: 'default !important',
    '& > span': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
      visibility: 'hidden',
    },
    '&:hover, &:focus': {
      color: `${theme.color.primary} !important`,
      backgroundColor: `${theme.color.primary} !important`,
    },
  },
  expandedRow: { '& td:first-child': { display: 'table-cell !important' } },
  spinnerIcon: {
    width: 21,
    height: 20,
    paddingTop: 1,
    marginRight: '4px',
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
  nameColumnWrapper: {
    width: 185,
  },
  nameColumn: {
    width: 185,
    display: 'table-cell',
    minHeight: 20,
    '& > span:not(.indent-level-0) ~ $nameColumnWrapper > $expandButton': { height: '28px' },
    '& > span:not(.indent-level-0) ~ $nameColumnWrapper > $expandButtonDisabled': { height: '28px' },
  },
  oddNestLevel: {
    backgroundColor: '#edf1f2',
    '& .ant-table-cell-fix-left': { backgroundColor: '#edf1f2' },
  },
  baseDiffPercent: { fontSize: '0.7rem', fontWeight: 'bold' },
  diffPercent: { composes: '$baseDiffPercent', position: 'relative', bottom: '8px' },
  topPosDiff: { composes: '$baseDiffPercent', color: 'green' },
  topNegDiff: { composes: '$baseDiffPercent', color: '#ad1e16' },
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
  chartVisibilityChangeCheckbox: {
    margin: '1px 0 1px 0',
    padding: '3px 3px 0 3px',
    lineHeight: '0.9rem',
    height: 21,
    width: 21,
  },
  chartVisibilityChangeCheckboxNonChecked: {
    backgroundColor: 'rgb(250, 250, 250)',
    borderColor: 'rgb(217, 217, 217)',
  },
  unifiedCell: { borderRight: 'none !important' },
  boldCellsExceptPercentage: { fontWeight: 'bold', fontSize: '1.1em' },
  percentageCell: { fontWeight: 600, fontSize: '0.9em' },
  firstStartDate: { minWidth: '82px' },
}));
