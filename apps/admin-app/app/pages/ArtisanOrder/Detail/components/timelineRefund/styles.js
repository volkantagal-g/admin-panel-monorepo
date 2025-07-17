import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => ({
  tabs: {
    '& .ant-tabs-nav-wrap': {
      justifyContent: 'center',
      borderBottom: '1px solid rgba(28, 55, 90, 0.2)',
    },

    '& .ant-tabs-tabpane': { display: 'flex' },
  },

  refundEventCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '10px',
    maxWidth: '314px',
    width: '100%',
  },

  refundInfo: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '314px',
    width: '100%',
  },

  refundInfoItem: {
    display: 'flex',
    gap: 8,
  },

  labelCard: { whiteSpace: 'pre' },

  customerName: { color: theme.color.primary },

  editDateBtn: {
    whiteSpace: 'nowrap',
    alignSelf: 'flex-start',
  },

  title: {
    display: 'block',
    textAlign: 'center',
    color: theme.color.title,
    fontWeight: 700,
    fontSize: '16px',
  },
}));
