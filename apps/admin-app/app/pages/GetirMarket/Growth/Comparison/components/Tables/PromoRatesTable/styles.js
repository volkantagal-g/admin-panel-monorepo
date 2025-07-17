import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => ({
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
  tableRowPurpleBg: {
    backgroundColor: theme.color.primary,
    color: '#f4f3f9',
    '& > td.ant-table-cell-row-hover': {
      backgroundColor: '#5D3EBC !important',
      opacity: 0.8,
    },
    '& > td.ant-table-cell > .neg, .pos': {
      fontSize: 13,
      fontWeight: 900,
    },
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: theme.color.primary,
    },
    '& > .ant-table-column-sort': { backgroundColor: theme.color.primary },
  },
  purpleText: { color: '#5D3EBD' },
  tableRowLight: { backgroundColor: '#ffffff' },
  tableRowDark: { backgroundColor: '#fafbfc' },
  expandedRowContainer: {
    '& .ant-table': {
      margin: '-5px -8px !important',
      borderBottom: '1px solid #f0f0f0',
    },
    '& .ant-table .ant-table-thead > tr:first-child > .ant-table-cell': { padding: '0 !important' },
  },
  headerSwitchButton: {
    marginRight: 12,
    display: 'flex',
    alignItems: 'center',
    '& .icon-type2': { marginRight: '3px' },
  },
  highlightBorderBottom: { '& > td': { borderBottom: '2px solid #d0d0d0 !important' } },
}));
