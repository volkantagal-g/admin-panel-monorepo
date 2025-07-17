import { createUseStyles } from 'react-jss';

export default createUseStyles({
  fullWidth: { width: '100%' },
  buttonContainer: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    gap: '4px',
    marginTop: '4px',
  },
  description: { '& td[colspan="5"]': { minWidth: '100px' } },
});
