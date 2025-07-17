import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    image: { width: '100%' },
    buttonWrapper: { width: '100%', margin: '15px 0' },
    switchWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '14px',
      paddingTop: '7px',
      fontWeight: 'bold',
    },
    switch: { marginLeft: '10px' },
    pushMessageInput: { width: 'calc(100% - 80px) !important' },
    pushButton: { width: '80px' },
  };
});
