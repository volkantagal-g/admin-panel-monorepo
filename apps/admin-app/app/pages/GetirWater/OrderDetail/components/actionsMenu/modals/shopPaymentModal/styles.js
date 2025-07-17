import { createUseStyles } from 'react-jss';

export default createUseStyles(theme => {
  return {
    title: {
      display: 'block',
      marginBottom: '15px',
    },
    space: { marginBottom: '10px' },
    amount: { marginRight: '10px' },
    buttonStyle: {
      display: 'block',
      width: '100%',
      border: 'none',
      color: '#fa0707',
      padding: '0 5px',
    },
  };
});
