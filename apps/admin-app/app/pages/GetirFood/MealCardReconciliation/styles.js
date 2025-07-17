import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    filter: { 
      marginTop: '1px',
      '@media (max-width: 992px)': { marginBottom: '12px' }, 
    }, 
  };
});
