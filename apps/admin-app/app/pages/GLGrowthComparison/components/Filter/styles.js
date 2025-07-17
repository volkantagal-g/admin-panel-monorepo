import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return {
    fullWidth: { width: '100%' },
    customRow: { width: '100%', display: 'flex', alignItems: 'center', marginBottom: '8px' },
    buttonWrapper: { color: '#fff', backgroundColor: '#5E3EBD' },
  };
});
