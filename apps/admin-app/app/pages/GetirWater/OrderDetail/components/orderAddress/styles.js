import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    colInfo: {
      display: 'flex',
      flexDirection: 'column',
    },
    customerInfo: {
      padding: '10px',
      marginBottom: '10px',
      background: '#ffffff',
      fontSize: '12px',
      borderBottom: '1px solid #edf1f2',
    },
  };
});
