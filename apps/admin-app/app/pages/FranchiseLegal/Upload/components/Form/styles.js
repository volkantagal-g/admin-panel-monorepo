import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return {
    container: { width: '100%' },
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      outline: '2px solid black',
      width: '80%',
      padding: '4px',
      margin: '0 auto',
    },
    datePicker: { marginLeft: theme.spacing(3) },
    uploadButton: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    fileName: { margin: 'auto 10px', width: '75%' },
    fileInput: { display: 'none' },
  };
});
