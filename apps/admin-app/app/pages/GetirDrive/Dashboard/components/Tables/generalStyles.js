import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: theme.color.lightGray,
    borderBottom: theme.border.type1,
    alignItems: 'center',
    padding: '1px',
  },
  headerText: {
    fontSize: '12px',
    fontWeight: '600',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    padding: '1px 4px',
    fontSize: '12px',
    height: '18px',
    margin: '0 !important',
    flexDirection: 'row',
  },
  buttonContainer: { display: 'flex', justifyContent: 'right' },
  tableTitle: { backgroundColor: 'red' },
  smallerPadding: { padding: '1px !important' },
  table: {
    width: '100%',
    fontSize: '12px',
    '& table': { width: '100% !important' },
    '& thead > tr > th': { fontWeight: '600' },
    '& .ant-table-expanded-row-fixed': { width: '100% !important' },
    '& .ant-table.ant-table-small .ant-table-tbody > tr > td': { padding: '0px 2px !important' },
    '& .ant-table.ant-table-small .ant-table-thead > tr > th': { padding: '0px 2px !important' },
    '& .ant-table.ant-table-small .ant-table-thead .ant-table-column-sorters': {
      padding: '1px 2px !important',
      fontWeight: 600,
      '& .ant-table-column-sorter': { display: 'none' },
    },
  },
}));
