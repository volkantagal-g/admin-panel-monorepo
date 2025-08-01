import { createUseStyles } from 'react-jss';

export default createUseStyles({
  infoBadgeContainer: {
    display: 'flex',
    gap: 10,
    padding: '10px 0',
  },
  infoBadge: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    fontSize: 12,
    padding: '5px 20px',
  },
});
