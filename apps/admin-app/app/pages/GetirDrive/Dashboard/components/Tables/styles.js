import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => ({
  tableContainer: { margin: '.1rem 0 0.5rem 0' },
  antTableContainer: { marginBottom: '1px' },
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
    color: '#fff',
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
    '& .ant-table.ant-table-small .ant-table-tbody > tr > td': { padding: '1px 2px !important' },
    '& .ant-table.ant-table-small .ant-table-thead > tr > th': { padding: '1px 2px !important' },
    '& .ant-table.ant-table-small .ant-table-thead .ant-table-column-sorters': {
      padding: '1px 2px !important',
      fontWeight: 600,
      '& .ant-table-column-sorter': { display: 'none' },
    },
  },
  warehouseTable: {
    composes: '$table',
    '& .ant-table-footer': { padding: '0px !important' },
  },
  footerTable: {
    composes: '$table',
    '& .ant-table.ant-table-small .ant-table-tbody > tr > td': { fontWeight: 600 },
  },
  footerItemsContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fafafa',
    borderBottom: '1px solid #e8e8e8',
  },
  smallerPadding: {
    padding: '1px 2px !important',
    fontSize: '12px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    border: '2px red solid',
  },
  clickable: { cursor: 'pointer' },
  // for non-scrollable ant table bodies
  noScrollTable: {
    composes: '$table',
    '& .ant-table.ant-table-small .ant-table-tbody > tr > td': { fontWeight: 600 },
  },
  textBold: { fontWeight: 600 },
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
}));
