import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    formButtonsWrapper: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    cancelButton: { margin: '0px 4px' },
  };
});
