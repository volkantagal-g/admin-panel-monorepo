import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    actionButtonContainer: {
      justifyContent: 'flex-end',
      gap: 1,
      display: 'flex',
    },
    actionButton: {
      display: 'flex',
      justifyContent: 'flex-end',
      paddingLeft: '5px',
    },
    redirectButton: { backgroundColor: '#5D3EBD', color: '#ffffff' },
    gorillasInfoCard: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
  };
});
