import { createUseStyles } from 'react-jss';

export default createUseStyles({
  '.ant-table.ant-table-small .ant-table-title, .ant-table.ant-table-small .ant-table-footer': { padding: '0 !important' },
  footerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 !important',
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
  buttonContainer: {
    display: 'flex',
    '& > button': { paddingRight: 2, paddingLeft: 2 },
  },
  totalsContainer: { marginRight: '24px' },
  filteredRateText: {
    display: 'inline-block',
    width: 24,
    textAlign: 'right',
  },
  marginRight: { marginRight: '6px' },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },
  headerText: {
    fontSize: '11px',
    margin: '0 2px',
    '& > span': { marginRight: '2px' },
  },
  searchInput: {
    width: '80px',
    padding: '2px',
  },
  table: {
    '& .ant-table.ant-table-small .ant-table-body': { height: 209 },
    '& .ant-table.ant-table-small .ant-table-footer': { paddingBottom: 1, paddingTop: 1 },
    '& .ant-table.ant-table-small .ant-table-thead .ant-table-column-sorters': {
      padding: '1px 2px !important',
      fontWeight: 600,
      '& .ant-table-column-sorter': { display: 'block !important' },
    },
    '& .ant-table-cell::before': { display: 'block !important' },
  },
});
