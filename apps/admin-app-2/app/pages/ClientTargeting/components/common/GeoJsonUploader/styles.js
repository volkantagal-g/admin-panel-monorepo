import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return { 
    container: { 
      width: '100%',
      padding: '.5rem',
    },
    fullWidth: { width: '100%' },
    inputContainer: { 
      width: '100%',
      display: 'flex',
      alignItems: 'center',
    },
    closeButton: { 
      backgroundColor: '#EE3A38', 
      color: '#fff', 
      fontSize: '1rem', 
      display: 'flex', 
      marginLeft: '.5rem',
    },
  };
});