import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return {
    fullWidth: { width: '100%' },
    submitButtonContainer: { display: 'flex', justifyContent: 'flex-end' },
  };
});
