import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    customRow: { width: '100%', display: 'flex', marginBottom: '8px' },
    fullWidth: { width: '100%' },
    label: { fontWeight: 'bold' },
  };
});
