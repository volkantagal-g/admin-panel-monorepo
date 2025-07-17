import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: theme.color.lightGray,
    borderBottom: theme.border.type1,
    alignItems: 'center',
    padding: '0 2px',
  },
  headerText: {
    fontSize: '12px',
    fontWeight: '600',
  },
  tableTitle: { backgroundColor: 'red' },
  smallerPadding: { padding: '4px !important' },
  table: {
    width: '100%',
    fontSize: '12px',
    '& table': { width: '100% !important' },
    '& thead > tr > th': { fontWeight: '600' },
    '& .ant-table-expanded-row-fixed': { width: '100% !important' },
    '& .ant-table.ant-table-small .ant-table-tbody > tr:not(.ant-table-measure-row) > td': {
      padding: '1px 2px',
      lineHeight: '15px',
    },
    '& .ant-table.ant-table-small .ant-table-thead > tr > th': {
      padding: '1px 2px !important',
      lineHeight: '15px',
    },
    '& .ant-table.ant-table-small .ant-table-thead .ant-table-column-sorters': {
      padding: '1px 2px !important',
      fontWeight: 600,
      '& .ant-table-column-sorter': { display: 'none' },
    },
    '& .ant-table-cell::before': { display: 'none' },
    '& .ant-table-measure-row > td': { padding: '0 !important', margin: '0 !important' },
  },
  smallerMarginBottom: { marginBottom: '3px' },
}));
