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
});
