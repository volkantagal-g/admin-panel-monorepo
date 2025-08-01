import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return {
    filterWrapper: { width: '100%' },
    inputWrapper: { width: '100%' },
    submitButtonContainer: { display: 'flex', justifyContent: 'flex-end' },
  };
});
