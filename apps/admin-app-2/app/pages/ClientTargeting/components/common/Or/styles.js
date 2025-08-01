import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return { 
    container: { 
      padding: '.5rem',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  };
});