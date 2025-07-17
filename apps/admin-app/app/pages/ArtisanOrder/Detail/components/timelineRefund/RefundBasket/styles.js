import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => ({
  basketCard: {
    maxWidth: '314px',
    width: '100%',
  },
  cardTitle: {
    display: 'block',
    marginBottom: '8px',
    color: theme.color.primary,
  },
  basketItems: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '12px',
  },
  totalPrice: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  showLessBtn: { margin: 'auto' },
  content: {
    width: '100%',
    padding: [0, 24],
  },
  product: { maxWidth: 220 },
  amount: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  table: {
    '& .ant-table-footer': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: 24,
      fontSize: 14,
      lineHeight: '24px',
    },

    '& .ant-table-row-expand-icon': { display: 'none' },
  },
}));
