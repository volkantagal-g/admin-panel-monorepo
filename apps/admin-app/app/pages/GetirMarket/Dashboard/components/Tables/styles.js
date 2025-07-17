import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => ({
  tableContainer: { marginTop: '.1rem' },
  antTableContainer: { marginBottom: '2px', '& .ant-table-pagination': { display: 'none' } },
  emptyTable: {
    backgroundColor: 'white',
    padding: '1rem 2rem',
    margin: '.5rem 0',
  },
  emptyDiv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: 'white',
    minHeight: '165px',
    padding: '1rem',
    margin: '0 0 2px 0',
  },
  emptyDivDescription: {
    fontWeight: 'bold',
    wordWrap: 'break-word',
    wordBreak: 'break-word',
  },
  tableRowLight: { backgroundColor: '#ffffff' },
  tableRowDark: { backgroundColor: '#fafbfc' },
  tableRowPurpleBg: {
    backgroundColor: theme.color.primary,
    color: '#f4f3f9',
    '& > td.ant-table-cell-row-hover': {
      backgroundColor: '#5D3EBD !important',
      opacity: 0.8,
    },
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: theme.color.primary,
    },
  },
  // for common table styles
  table: {
    width: '100%',
    fontSize: '12px',
    '& table': { width: '100% !important' },
    '& .ant-table-expanded-row-fixed': { width: '100% !important' },
    '& .ant-table.ant-table-small .ant-table-tbody > tr > td': { padding: '0px 2px !important' },
    '& .ant-table.ant-table-small .ant-table-thead > tr > th': { padding: '1px 2px !important' },
    '& .ant-table.ant-table-small .ant-table-thead .ant-table-column-sorters': {
      padding: '1px 2px !important',
      fontWeight: 600,
      '& .ant-table-column-sorter': { display: 'none' },
    },
    '& .ant-table-cell::before': { display: 'none' },
  },
  // to prevent the scrollbar overlapping with numbers
  rightPaddingForScrollBar: {
    '& .ant-table.ant-table-small .ant-table-tbody > tr > td:last-child': { paddingRight: '9px !important' },
    '& .ant-table.ant-table-small .ant-table-thead > tr > th:last-child': { paddingRight: '9px !important' },
  },
  warehouseTable: {
    composes: '$table',
    '& .ant-table-tbody': { height: 'max-content' },
    '& .ant-table-footer': { padding: '0px !important' },
    '& .ant-table-summary .ant-table-cell': { padding: '0px 2px 0px 0px', textAlign: 'right' },
  },
  footerTable: {
    composes: '$table',
    '& .ant-table.ant-table-small .ant-table-tbody > tr > td': { fontWeight: 600 },
  },
  footerItemsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'right',
    backgroundColor: '#fafafa',
    borderBottom: '1px solid #e8e8e8',
  },
  ellipsesCell: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  smallerPadding: {
    composes: '$ellipsesCell',
    padding: '1px 2px !important',
    fontSize: '12px',
  },
  clickable: { cursor: 'pointer' },
  // for non-scrollable ant table bodies
  noScrollTable: {
    composes: '$table',
    '& .ant-table.ant-table-small .ant-table-tbody > tr > td': { fontWeight: 600 },
  },
  textBold: { fontWeight: 700 },
  purpleText: { color: '#5D3EBD' },
  textDanger: {
    composes: '$textBold',
    color: '#f05050',
  },
  textSuccess: {
    composes: '$textBold',
    color: '#27c24c',
  },
  multipleNumberColumnContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  smallRightMargin: { marginRight: '2px' },
  promoTable: { '& .ant-table.ant-table-small .ant-table-thead > tr > th': { padding: '0px 2px !important' } },
}));
