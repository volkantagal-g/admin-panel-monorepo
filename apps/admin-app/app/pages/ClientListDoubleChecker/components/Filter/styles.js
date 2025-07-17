import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return {
    container: {
      padding: '.5rem',
      width: '100%',
    },
    checkboxesContainer: { width: '100%', display: 'flex' },
    permissionsContainer: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      padding: '.5rem',
    },
    uploadButtonCont: {
      width: '100%',
      '& > div': {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      },
    },
  };
});
