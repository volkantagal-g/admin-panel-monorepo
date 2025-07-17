import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return {
    container: { display: 'flex', flexDirection: 'column', width: '100%' },
    label: {
      display: 'flex',
      padding: '0.2rem',
      fontWeight: 'bold',
    },
    text: { marginLeft: '1rem' },
    confirmText: { margin: '0 auto' },
  };
});
