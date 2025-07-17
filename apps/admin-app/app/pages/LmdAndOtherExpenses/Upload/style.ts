import { createUseStyles } from 'react-jss';

export default createUseStyles({
  pageContainer: { padding: '24px' },
  card: {
    background: '#FFFFFF',
    boxShadow: '0px 3px 12px -1px rgba(28, 52, 84, 0.13), 0px 2px 4px -1px rgba(28, 55, 90, 0.08)',
    borderRadius: '8px',
    padding: '22px',
  },
  header: {
    paddingBottom: '24px',
    fontSize: '22px',
    fontWeight: 600,
    color: '#5D3EBC',
    width: '100%',
  },
});
