import { createUseStyles } from 'react-jss';

export default createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    textAlign: 'center',
  },
  error: {
    margin: '1rem 0',
    padding: '1rem',
    backgroundColor: '#ffebee',
    borderRadius: '4px',
    color: '#c62828',
    fontSize: '0.875rem',
    maxWidth: '100%',
    overflow: 'auto',
  },
});
