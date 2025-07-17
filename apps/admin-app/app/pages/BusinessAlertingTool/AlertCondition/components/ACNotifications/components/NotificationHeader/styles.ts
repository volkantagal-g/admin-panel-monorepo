import { createUseStyles } from 'react-jss';

export default createUseStyles({
  notifHeaderContainer: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    marginBottom: '8px',
  },
  notifTitleContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  notifTitle: {
    fontSize: '16px',
    color: '#191919',
  },
  notifDescription: {
    fontSize: '12px',
    color: '#697488',
  },
});
