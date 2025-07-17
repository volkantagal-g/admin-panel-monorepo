import { createUseStyles } from 'react-jss';

export default createUseStyles({
  pageContainer: { padding: '24px' },
  header: {
    paddingBottom: '24px',
    fontSize: '22px',
    fontWeight: 600,
    color: '#5D3EBC',
    width: '100%',
  },
  actionContainer: {
    display: 'flex',
    justifyContent: 'end',
    gap: '4px',
  },
});
