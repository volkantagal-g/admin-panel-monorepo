import { createUseStyles } from 'react-jss';

export default createUseStyles({
  page: {
    minHeight: 'calc(100vh - 30px)',
    paddingBottom: '70px',
    position: 'relative',
    // So that every card is consistent
    '& .ant-card-head-title': {
      fontSize: 16,
      fontWeight: 600,
    },

    '& .ant-page-header-heading-title': { whiteSpace: 'break-spaces' },
  },
  titleEmoji: { padding: '0 0 5px 5px' },
  cardWrapper: { height: '100%' },
  footer: {
    position: 'absolute',
    bottom: '20px',
    width: '100%',
    textAlign: 'center',
  },
  footerTitle: {
    fontSize: '1rem',
    fontWeight: '600',
  },
  footerSubtitle: { fontWeight: '600' },
});
