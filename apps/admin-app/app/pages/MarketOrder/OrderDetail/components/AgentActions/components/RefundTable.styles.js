import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => ({
  table: {
    marginTop: 14,
    border: '1px solid #f0f0f0',
    '& .ant-table-cell': { maxWidth: 0 },
    '& .ant-table-footer': {
      display: 'flex',
      alignItems: 'start',
      justifyContent: 'space-between',
      gap: 24,
      '& span': {
        fontSize: 14,
        lineHeight: '24px',
        margin: 0,
      },
    },
  },
  buttonStyle: {
    display: 'block',
    width: '100%',
    border: 'none',
    padding: '0 5px',
    color: theme.color.red,
  },
  amount: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  alert: {
    marginTop: 32,
    fontSize: 14,
  },
  feeContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  feeLabel: { marginRight: 4 },
  feeItem: { display: 'flex' },
  financialDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    flex: 0.4,
    '& > :not(:last-child)': {
      paddingBottom: 2,
      borderBottom: '2px solid #ececec',
    },
  },
}));
