import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    actionButtons: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginRight: '2%',
    },
    backButton: { margin: '0 8px' },
  };
});
