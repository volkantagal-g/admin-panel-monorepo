import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return {
    refundInfo: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    refundMain: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    total: { marginLeft: '250px' },
    totalPrice: { padding: '0 5px' },
    userInfo: { padding: '0 5px' },
    userDate: { padding: '0 5px' },
  };
});
