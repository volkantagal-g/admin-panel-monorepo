import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return { 
    defaultCollapseWrapper: { },
    parentCollapseWrapper: { marginBottom: '1rem' },
    collapseHeaderWrapper: { 
      display: 'flex',
      alignItems: 'center',
    },
    switchWrapperChecked: { 
      marginRight: '.5rem',
      backgroundColor: '#5CB85C',
    },
    switchWrapperUnchecked: { 
      marginRight: '.5rem',
      backgroundColor: '#D9534F',
    },
    container: { width: '100%' },
  };
});