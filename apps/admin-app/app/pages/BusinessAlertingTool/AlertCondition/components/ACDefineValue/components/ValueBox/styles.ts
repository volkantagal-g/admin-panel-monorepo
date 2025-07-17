import { createUseStyles } from 'react-jss';

export default createUseStyles({
  valueContainer: {
    display: 'inline-flex',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  letterContainer: {
    width: '100%',
    display: 'inline-flex',
    gap: '12px',
    alignItems: 'center',
  },
  letterBox: {
    minWidth: '31px',
    minHeight: '31px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    fontWeight: '600',
    backgroundColor: '#F3F0FE',
    borderRadius: '8px',
    color: '#5D3EBC',
    padding: '0 4px',
  },
});
