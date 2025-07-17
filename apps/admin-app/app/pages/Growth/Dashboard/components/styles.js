import { createUseStyles } from 'react-jss';

export default createUseStyles(() => ({
  tableContainer: { margin: '.1rem 0 0.5rem 0' },
  antTableContainer: {
    marginBottom: '2px',
    '& thead > tr > th:first-of-type': { opactiy: '0 !important' },
  },
  tableRowLight: { backgroundColor: '#ffffff' },
  tableRowDark: { backgroundColor: '#fafbfc' },
  // for common table styles
  table: {
    width: '100%',
    fontSize: '12px',
    '& table': { width: '100% !important' },
    '& .ant-table-expanded-row-fixed': { width: '100% !important' },
    '& .ant-table.ant-table-small .ant-table-tbody > tr > td': { padding: '1px 2px !important' },
    '& .ant-table.ant-table-small .ant-table-thead > tr > th': { padding: '1px 2px !important' },
    '& .indent-level-1': { paddingLeft: '0 !important' },
    '& .ant-table-row-expand-icon-spaced': { display: 'none' },
  },
  twoRowContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  textBold: { fontWeight: 700 },
  textDanger: {
    composes: '$textBold',
    color: '#f05050',
  },
  textSuccess: {
    composes: '$textBold',
    color: '#27c24c',
  },
  textSmall: { fontSize: '.9em' },
  // to prevent the scrollbar overlapping with numbers
  rightPaddingForScrollBar: {
    '& .ant-table.ant-table-small .ant-table-tbody > tr > td:last-child': { paddingRight: '9px !important' },
    '& .ant-table.ant-table-small .ant-table-thead > tr > th:last-child': { paddingRight: '9px !important' },
  },
}));
