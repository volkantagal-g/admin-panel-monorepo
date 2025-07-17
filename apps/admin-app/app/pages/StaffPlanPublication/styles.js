import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
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
    importWrapper: {
      marginTop: '1rem',
      display: 'flex',
      justifyContent: 'center',
    },
    fileName: { margin: 'auto 10px', width: '75%' },
    fileInput: { display: 'none' },
    selectFileButton: { padding: 0 },
    selectFileLabel: {
      margin: 0,
      padding: '8px 15px',
      cursor: 'pointer',
    },
  };
});
