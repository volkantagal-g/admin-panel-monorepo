import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return { 
    textWrapper: { margin: '.5rem', width: '100%' },
    checkboxesContainer: { display: 'flex' },
  };
});