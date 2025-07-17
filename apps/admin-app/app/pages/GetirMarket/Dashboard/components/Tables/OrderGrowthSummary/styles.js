import { createUseStyles } from 'react-jss';

export default createUseStyles(() => ({
  tableContainer: { marginTop: '.1rem' },
  antTableContainer: { marginBottom: '2px', '& .ant-table-pagination': { display: 'none' }, fontWeight: '600' },
  tableRowLight: { backgroundColor: '#ffffff' },
  tableRowDark: { backgroundColor: '#fafbfc' },
  // for common table styles
  table: {
    width: '100%',
    fontSize: '12px',
    '& table': { width: '100% !important' },
    '& .ant-table-expanded-row-fixed': { width: '100% !important' },
    '& .ant-table.ant-table-small .ant-table-tbody > tr > td': { padding: '0 2px !important' },
    '& .ant-table.ant-table-small .ant-table-thead > tr > th': { padding: '0 2px !important' },
    '& .ant-table.ant-table-small .ant-table-thead .ant-table-column-sorters': {
      padding: '1px 2px !important',
      fontWeight: 600,
      '& .ant-table-column-sorter': { display: 'none' },
    },
    '& .ant-table-cell::before': { display: 'none' },
  },
  // for non-scrollable ant table bodies
  textBold: { fontWeight: 700 },
  textDanger: {
    composes: '$textBold',
    color: '#f05050',
  },
  textSuccess: {
    composes: '$textBold',
    color: '#27c24c',
  },
}));
