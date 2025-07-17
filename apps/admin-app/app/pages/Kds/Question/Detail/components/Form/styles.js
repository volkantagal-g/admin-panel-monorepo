import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return {
    selectItem: { width: '100%' },
    submitButton: { display: 'flex', justifyContent: 'end' },
    rowWrapper: { display: 'flex', alignItems: 'center' },
    infoAlert: { marginBottom: '10px' },
  };
});
