import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return { 
    container: { 
      padding: '.5rem',
      width: '100%',
    },
    switchWrapperChecked: { backgroundColor: '#5CB85C' },
    switchWrapperUnchecked: { backgroundColor: '#D9534F' },
  };
});